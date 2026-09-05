<?php

namespace App\Http\Controllers;

use App\Models\MasterStage;
use App\Models\Pekerjaan;
use App\Models\Project;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Configuration\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PekerjaanController extends Controller
{
    public function index(Request $request): Response
    {
        $search    = $request->input('search');
        $projectId = $request->input('project_id');
        $stageId   = $request->input('stage_id');
        $perPage   = (int) $request->input('per_page', 10);
        $rawOrder  = strtolower((string) $request->input('order', 'asc'));
        $order     = in_array($rawOrder, ['asc', 'desc'], true) ? $rawOrder : 'asc';

        $query = Pekerjaan::with([
            'project:id,project_code,site_id,site_name,area_id,sow_id',
            'project.area:id,nama_area,regional',
            'project.sow:id,nama_sow',
            'stage:id,kode_stage,nama_stage',
            'picUser:id,name',
        ]);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('kode_pekerjaan', 'like', "%{$search}%")
                  ->orWhere('nama_pekerjaan', 'like', "%{$search}%")
                  ->orWhere('catatan', 'like', "%{$search}%")
                  ->orWhereHas('project', function ($qp) use ($search) {
                      $qp->where('site_id', 'like', "%{$search}%")
                         ->orWhere('site_name', 'like', "%{$search}%");
                  });
            });
        }

        if ($projectId && $projectId !== 'ALL') {
            $query->where('project_id', $projectId);
        }

        if ($stageId && $stageId !== 'ALL') {
            $query->where('stage_id', $stageId);
        }

        $pekerjaans = $query->orderBy('project_id', 'asc')
            ->orderBy('kode_pekerjaan', $order)
            ->paginate($perPage)
            ->withQueryString();

        $projects = Project::select('id', 'project_code', 'site_id', 'site_name')
            ->orderBy('site_id', 'asc')
            ->get();

        $stages = MasterStage::orderBy('urutan', 'asc')->get();

        return Inertia::render('Pekerjaan/Index', [
            'pekerjaans' => $pekerjaans,
            'projects'   => $projects,
            'stages'     => $stages,
            'filters'    => [
                'search'     => $search ?? '',
                'project_id' => $projectId ?? 'ALL',
                'stage_id'   => $stageId ?? 'ALL',
                'order'      => $order,
                'per_page'   => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        // 1. Batch Insert (Multi baris / Paste Excel)
        if ($request->has('items') && is_array($request->items)) {
            $validated = $request->validate([
                'items'                    => 'required|array|min:1',
                'items.*.project_id'       => 'required|exists:projects,id',
                'items.*.stage_id'         => 'nullable|exists:master_stages,id',
                'items.*.kode_pekerjaan'   => 'required|string|max:50',
                'items.*.nama_pekerjaan'   => 'required|string|max:255',
                'items.*.satuan'           => 'nullable|string|max:30',
                'items.*.bobot'            => 'required|numeric|between:0,100',
                'items.*.progress_percent' => 'nullable|numeric|between:0,100',
                'items.*.status'           => 'nullable|string|max:30',
                'items.*.foto'             => 'nullable|string|max:500',
                'items.*.catatan'          => 'nullable|string|max:1000',
            ]);

            $affectedProjectIds = [];

            DB::transaction(function () use ($validated, $request, &$affectedProjectIds) {
                foreach ($validated['items'] as $item) {
                    $prog   = isset($item['progress_percent']) ? (float) $item['progress_percent'] : 0.0;
                    $status = $item['status'] ?? ($prog >= 100 ? 'COMPLETED' : ($prog > 0 ? 'IN_PROGRESS' : 'PLANNING'));

                    Pekerjaan::create([
                        'project_id'        => $item['project_id'],
                        'stage_id'          => $item['stage_id'] ?? null,
                        'kode_pekerjaan'    => strtoupper(trim($item['kode_pekerjaan'])),
                        'nama_pekerjaan'    => trim($item['nama_pekerjaan']),
                        'satuan'            => !empty($item['satuan']) ? trim($item['satuan']) : 'Lot',
                        'bobot'             => (float) $item['bobot'],
                        'progress_percent'  => $prog,
                        'status'            => $status,
                        'tanggal_pekerjaan' => now()->toDateString(),
                        'foto'              => !empty($item['foto']) ? trim($item['foto']) : null,
                        'user_id'           => $request->user()->id,
                        'catatan'           => !empty($item['catatan']) ? trim($item['catatan']) : null,
                    ]);

                    $affectedProjectIds[] = $item['project_id'];
                }
            });

            foreach (array_unique($affectedProjectIds) as $pId) {
                $this->syncProjectProgress($pId);
            }

            return redirect()->back()->with('success', count($validated['items']) . ' item pekerjaan berhasil ditambahkan.');
        }

        // 2. Single Insert (Upload Cloudinary)
        $validated = $request->validate([
            'project_id'        => 'required|exists:projects,id',
            'stage_id'          => 'nullable|exists:master_stages,id',
            'kode_pekerjaan'    => 'required|string|max:50',
            'nama_pekerjaan'    => 'required|string|max:255',
            'satuan'            => 'nullable|string|max:30',
            'bobot'             => 'required|numeric|between:0,100',
            'progress_percent'  => 'nullable|numeric|between:0,100',
            'status'            => 'nullable|string|max:30',
            'tanggal_pekerjaan' => 'nullable|date',
            'foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'foto'              => 'nullable|string|max:500',
            'catatan'           => 'nullable|string|max:1000',
        ]);

        if ($request->hasFile('foto_file')) {
            $validated['foto'] = $this->uploadToCloudinary($request->file('foto_file'));
        }

        $prog = isset($validated['progress_percent']) ? (float) $validated['progress_percent'] : 0.0;
        $validated['status']            = $validated['status'] ?? ($prog >= 100 ? 'COMPLETED' : ($prog > 0 ? 'IN_PROGRESS' : 'PLANNING'));
        $validated['kode_pekerjaan']    = strtoupper(trim($validated['kode_pekerjaan']));
        $validated['tanggal_pekerjaan'] = $validated['tanggal_pekerjaan'] ?? now()->toDateString();
        $validated['user_id']           = $request->user()->id; // Kunci otomatis akun login

        unset($validated['foto_file']);
        Pekerjaan::create($validated);
        $this->syncProjectProgress($validated['project_id']);

        return redirect()->back()->with('success', 'Pekerjaan dan foto Cloudinary berhasil disimpan.');
    }

    public function update(Request $request, int $id)
    {
        $pekerjaan    = Pekerjaan::findOrFail($id);
        $oldProjectId = $pekerjaan->project_id;

        $validated = $request->validate([
            'project_id'        => 'required|exists:projects,id',
            'stage_id'          => 'nullable|exists:master_stages,id',
            'kode_pekerjaan'    => 'required|string|max:50',
            'nama_pekerjaan'    => 'required|string|max:255',
            'satuan'            => 'nullable|string|max:30',
            'bobot'             => 'required|numeric|between:0,100',
            'progress_percent'  => 'nullable|numeric|between:0,100',
            'status'            => 'nullable|string|max:30',
            'tanggal_pekerjaan' => 'nullable|date',
            'foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'foto'              => 'nullable|string|max:500',
            'catatan'           => 'nullable|string|max:1000',
        ]);

        if ($request->hasFile('foto_file')) {
            $validated['foto'] = $this->uploadToCloudinary($request->file('foto_file'));
        }

        $prog = isset($validated['progress_percent']) ? (float) $validated['progress_percent'] : 0.0;
        $validated['status']         = $validated['status'] ?? ($prog >= 100 ? 'COMPLETED' : ($prog > 0 ? 'IN_PROGRESS' : 'PLANNING'));
        $validated['kode_pekerjaan'] = strtoupper(trim($validated['kode_pekerjaan']));
        $validated['user_id']        = $request->user()->id;

        unset($validated['foto_file']);
        $pekerjaan->update($validated);

        $this->syncProjectProgress($pekerjaan->project_id);
        if ($oldProjectId !== $pekerjaan->project_id) {
            $this->syncProjectProgress($oldProjectId);
        }

        return redirect()->back()->with('success', 'Item pekerjaan berhasil diperbarui.');
    }

    public function destroy(int $id)
    {
        $pekerjaan = Pekerjaan::findOrFail($id);
        $projectId = $pekerjaan->project_id;

        if ($pekerjaan->foto && str_contains($pekerjaan->foto, 'res.cloudinary.com')) {
            $this->deleteFromCloudinary($pekerjaan->foto);
        }

        $pekerjaan->delete();
        $this->syncProjectProgress($projectId);

        return redirect()->back()->with('success', 'Item pekerjaan berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        $pekerjaans = Pekerjaan::whereIn('id', $request->ids)->get();
        $affectedProjectIds = $pekerjaans->pluck('project_id')->unique()->toArray();

        foreach ($pekerjaans as $p) {
            if ($p->foto && str_contains($p->foto, 'res.cloudinary.com')) {
                $this->deleteFromCloudinary($p->foto);
            }
            $p->delete();
        }

        foreach ($affectedProjectIds as $pId) {
            $this->syncProjectProgress($pId);
        }

        return redirect()->back()->with('success', count($request->ids) . ' item pekerjaan berhasil dihapus.');
    }

    public function reset(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Hanya Admin yang memiliki akses.');
        }

        Pekerjaan::query()->delete();
        Project::query()->update(['progress_percent' => 0]);

        return redirect()->back()->with('success', 'Seluruh data pekerjaan berhasil dikosongkan.');
    }

    public function export(Request $request)
    {
        $pekerjaans = Pekerjaan::with(['project', 'stage', 'picUser'])->orderBy('project_id', 'asc')->get();
        $filename   = 'Master_Pekerjaan_WBS_Indojar_' . date('Ymd_His') . '.csv';

        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($pekerjaans) {
            $file = fopen('php://output', 'w');
            fputcsv($file, [
                'Site ID',
                'Nama Site',
                'Kode WBS',
                'Tahap',
                'Nama Pekerjaan',
                'Satuan',
                'Bobot (%)',
                'Progress Riil (%)',
                'Status',
                'Tanggal Pengerjaan',
                'PIC',
                'URL Foto Cloudinary',
                'Catatan',
            ]);

            foreach ($pekerjaans as $p) {
                fputcsv($file, [
                    $p->project->site_id ?? '-',
                    $p->project->site_name ?? '-',
                    $p->kode_pekerjaan,
                    $p->stage->nama_stage ?? ($p->kategori_tahap ?? '-'),
                    $p->nama_pekerjaan,
                    $p->satuan,
                    $p->bobot,
                    $p->progress_percent,
                    $p->status,
                    $p->tanggal_pekerjaan ? date('Y-m-d', strtotime($p->tanggal_pekerjaan)) : '-',
                    $p->picUser->name ?? '-',
                    $p->foto ?? '-',
                    $p->catatan ?? '-',
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    private function uploadToCloudinary($file): string
    {
        try {
            $caBundle = base_path('cacert.pem');
            if (file_exists($caBundle)) {
                putenv("CURL_CA_BUNDLE={$caBundle}");
                putenv("SSL_CERT_FILE={$caBundle}");
            }

            Configuration::instance([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME', 'lhpssdkn'),
                    'api_key'    => env('CLOUDINARY_API_KEY', '877577979266694'),
                    'api_secret' => env('CLOUDINARY_API_SECRET', 'acaIw-MqgMF4TsLQ2TfrZIx2GDI'),
                ],
                'url' => ['secure' => true],
            ]);

            $uploadApi = new UploadApi();
            $upload = $uploadApi->upload($file->getRealPath(), [
                'folder'        => 'indojar_pekerjaan',
                'resource_type' => 'image',
            ]);

            return $upload['secure_url'];
        } catch (\Throwable $e) {
            Log::error('Cloudinary Upload Gagal: ' . $e->getMessage());
            throw ValidationException::withMessages([
                'foto_file' => 'Gagal mengunggah foto ke Cloudinary: ' . $e->getMessage(),
            ]);
        }
    }

    private function deleteFromCloudinary(string $url): void
    {
        try {
            Configuration::instance([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME', 'lhpssdkn'),
                    'api_key'    => env('CLOUDINARY_API_KEY', '877577979266694'),
                    'api_secret' => env('CLOUDINARY_API_SECRET', 'acaIw-MqgMF4TsLQ2TfrZIx2GDI'),
                ],
                'url' => ['secure' => true],
            ]);

            $path = parse_url($url, PHP_URL_PATH);
            if (preg_match('/indojar_pekerjaan\/[^\.\/]+/', $path, $matches)) {
                (new UploadApi())->destroy($matches[0]);
            }
        } catch (\Throwable $e) {
            Log::warning('Gagal menghapus aset Cloudinary: ' . $e->getMessage());
        }
    }

    /**
     * Hitung total capaian progres tertimbang untuk proyek induk
     */
    private function syncProjectProgress(int $projectId): void
    {
        $project = Project::find($projectId);
        if (!$project) return;

        $items = Pekerjaan::where('project_id', $projectId)->get();
        if ($items->isEmpty()) {
            $project->update(['progress_percent' => 0.00]);
            return;
        }

        $weightedTotal = 0.0;
        foreach ($items as $item) {
            $weightedTotal += ($item->bobot * ($item->progress_percent / 100.0));
        }

        $calcProgress = min(100.0, round($weightedTotal, 2));

        $project->update([
            'progress_percent' => $calcProgress,
            'status'           => $calcProgress >= 100.0 ? 'COMPLETED' : 'ON_PROGRESS',
        ]);
    }
}