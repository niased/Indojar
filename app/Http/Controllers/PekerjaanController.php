<?php

namespace App\Http\Controllers;

use App\Models\Pekerjaan;
use App\Models\Project;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Configuration\Configuration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PekerjaanController extends Controller
{
    public function index(): RedirectResponse
    {
        return redirect()->route('project.index');
    }

    public function store(Request $request): RedirectResponse
    {
        $this->ensureColumnsExist();

        // 1. Penanganan Batch Insert (Multi-Baris / Paste Excel)
        if ($request->has('items') && is_array($request->items)) {
            $validated = $request->validate([
                'items'                     => 'required|array|min:1',
                'items.*.project_id'        => 'required|exists:projects,id',
                'items.*.stage_id'          => 'nullable|exists:master_stages,id',
                'items.*.kode_pekerjaan'    => 'required|string|max:50',
                'items.*.nama_pekerjaan'    => 'required|string|max:255',
                'items.*.satuan'            => 'nullable|string|max:30',
                'items.*.bobot'             => 'required|numeric|between:0,100',
                'items.*.progress_percent'  => 'nullable|numeric|between:0,100',
                'items.*.tanggal_pekerjaan' => 'nullable|date',
                'items.*.tipe_foto'         => 'nullable|string|in:DOKUMENTASI,ISSUE',
                'items.*.foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
                'items.*.foto'              => 'nullable|string|max:500',
                'items.*.catatan'           => 'nullable|string|max:1000',
            ]);

            $affectedProjectIds = [];

            DB::transaction(function () use ($validated, $request, &$affectedProjectIds) {
                foreach ($validated['items'] as $idx => $item) {
                    $prog      = isset($item['progress_percent']) ? (float) $item['progress_percent'] : 0.0;
                    $status    = $prog >= 100 ? 'COMPLETED' : ($prog > 0 ? 'IN_PROGRESS' : 'PLANNING');
                    $tipeFoto  = $item['tipe_foto'] ?? 'DOKUMENTASI';

                    $fotoUrl = !empty($item['foto']) ? trim($item['foto']) : null;
                    if ($request->hasFile("items.{$idx}.foto_file")) {
                        $fotoUrl = $this->uploadToCloudinary($request->file("items.{$idx}.foto_file"));
                    }

                    $rawDate = !empty($item['tanggal_pekerjaan']) ? $item['tanggal_pekerjaan'] : now()->toDateString();
                    $dateTimeWithCurrentTime = $rawDate . ' ' . now()->format('H:i:s');

                    $pekerjaan = new Pekerjaan();
                    $pekerjaan->forceFill([
                        'project_id'        => $item['project_id'],
                        'stage_id'          => $item['stage_id'] ?? null,
                        'kode_pekerjaan'    => strtoupper(trim($item['kode_pekerjaan'])),
                        'nama_pekerjaan'    => trim($item['nama_pekerjaan']),
                        'satuan'            => !empty($item['satuan']) ? trim($item['satuan']) : 'Lot',
                        'bobot'             => (float) $item['bobot'],
                        'progress_percent'  => $prog,
                        'status'            => $status,
                        'tanggal_pekerjaan' => $dateTimeWithCurrentTime,
                        'foto'              => $fotoUrl,
                        'tipe_foto'         => $tipeFoto,
                        'user_id'           => $request->user()->id,
                        'catatan'           => !empty($item['catatan']) ? trim($item['catatan']) : null,
                    ]);
                    $pekerjaan->save();

                    $affectedProjectIds[] = $item['project_id'];
                }
            });

            foreach (array_unique($affectedProjectIds) as $pId) {
                $this->syncProjectProgress($pId);
            }

            return redirect()->back()->with('success', count($validated['items']) . ' item pekerjaan WBS berhasil ditambahkan.');
        }

        // 2. Penanganan Form Tunggal
        $validated = $request->validate([
            'project_id'        => 'required|exists:projects,id',
            'stage_id'          => 'nullable|exists:master_stages,id',
            'kode_pekerjaan'    => 'required|string|max:50',
            'nama_pekerjaan'    => 'required|string|max:255',
            'satuan'            => 'nullable|string|max:30',
            'bobot'             => 'required|numeric|between:0,100',
            'progress_percent'  => 'nullable|numeric|between:0,100',
            'tanggal_pekerjaan' => 'nullable|date',
            'tipe_foto'         => 'nullable|string|in:DOKUMENTASI,ISSUE',
            'foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'foto'              => 'nullable|string|max:500',
            'catatan'           => 'nullable|string|max:1000',
        ]);

        $tipeFoto = $validated['tipe_foto'] ?? 'DOKUMENTASI';
        $uploadedFotoUrl = null;

        if ($request->hasFile('foto_file')) {
            $uploadedFotoUrl = $this->uploadToCloudinary($request->file('foto_file'));
        }

        $fotoFinal = $uploadedFotoUrl ?? $validated['foto'] ?? null;
        $prog      = isset($validated['progress_percent']) ? (float) $validated['progress_percent'] : 0.0;
        $status    = $prog >= 100 ? 'COMPLETED' : ($prog > 0 ? 'IN_PROGRESS' : 'PLANNING');

        $rawDate = !empty($validated['tanggal_pekerjaan']) ? $validated['tanggal_pekerjaan'] : now()->toDateString();
        $dateTimeWithCurrentTime = $rawDate . ' ' . now()->format('H:i:s');

        $pekerjaan = new Pekerjaan();
        $pekerjaan->forceFill([
            'project_id'        => $validated['project_id'],
            'stage_id'          => $validated['stage_id'] ?? null,
            'kode_pekerjaan'    => strtoupper(trim($validated['kode_pekerjaan'])),
            'nama_pekerjaan'    => trim($validated['nama_pekerjaan']),
            'satuan'            => !empty($validated['satuan']) ? trim($validated['satuan']) : 'Lot',
            'bobot'             => (float) $validated['bobot'],
            'progress_percent'  => $prog,
            'status'            => $status,
            'tanggal_pekerjaan' => $dateTimeWithCurrentTime,
            'foto'              => $fotoFinal,
            'tipe_foto'         => $tipeFoto,
            'user_id'           => $request->user()->id,
            'catatan'           => !empty($validated['catatan']) ? trim($validated['catatan']) : null,
        ]);
        $pekerjaan->save();

        $this->syncProjectProgress($validated['project_id']);

        return redirect()->back()->with('success', 'Rincian pekerjaan fisik berhasil disimpan.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $this->ensureColumnsExist();

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
            'tanggal_pekerjaan' => 'nullable|date',
            'tipe_foto'         => 'nullable|string|in:DOKUMENTASI,ISSUE',
            'foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'foto'              => 'nullable|string|max:500',
            'catatan'           => 'nullable|string|max:1000',
        ]);

        $tipeFoto = $validated['tipe_foto'] ?? ($pekerjaan->tipe_foto ?? 'DOKUMENTASI');
        $uploadedFotoUrl = null;

        if ($request->hasFile('foto_file')) {
            if ($pekerjaan->foto && str_contains($pekerjaan->foto, 'res.cloudinary.com')) {
                $this->deleteFromCloudinary($pekerjaan->foto);
            }
            $uploadedFotoUrl = $this->uploadToCloudinary($request->file('foto_file'));
        }

        $prog   = isset($validated['progress_percent']) ? (float) $validated['progress_percent'] : 0.0;
        $status = $prog >= 100 ? 'COMPLETED' : ($prog > 0 ? 'IN_PROGRESS' : 'PLANNING');

        $rawDate = !empty($validated['tanggal_pekerjaan']) ? $validated['tanggal_pekerjaan'] : now()->toDateString();
        $dateTimeWithCurrentTime = $rawDate . ' ' . now()->format('H:i:s');

        $fotoTarget = $uploadedFotoUrl ?? $pekerjaan->foto;

        $pekerjaan->forceFill([
            'project_id'        => $validated['project_id'],
            'stage_id'          => $validated['stage_id'] ?? null,
            'kode_pekerjaan'    => strtoupper(trim($validated['kode_pekerjaan'])),
            'nama_pekerjaan'    => trim($validated['nama_pekerjaan']),
            'satuan'            => !empty($validated['satuan']) ? trim($validated['satuan']) : 'Lot',
            'bobot'             => (float) $validated['bobot'],
            'progress_percent'  => $prog,
            'status'            => $status,
            'tanggal_pekerjaan' => $dateTimeWithCurrentTime,
            'foto'              => $fotoTarget,
            'tipe_foto'         => $tipeFoto,
            'user_id'           => $request->user()->id,
            'catatan'           => !empty($validated['catatan']) ? trim($validated['catatan']) : null,
        ]);
        $pekerjaan->save();

        $this->syncProjectProgress($pekerjaan->project_id);
        if ($oldProjectId !== $pekerjaan->project_id) {
            $this->syncProjectProgress($oldProjectId);
        }

        return redirect()->back()->with('success', 'Rincian pekerjaan WBS berhasil diperbarui.');
    }

    private function ensureColumnsExist(): void
    {
        try {
            if (Schema::hasTable('pekerjaans') && !Schema::hasColumn('pekerjaans', 'tipe_foto')) {
                DB::statement("ALTER TABLE pekerjaans ADD COLUMN tipe_foto VARCHAR(30) DEFAULT 'DOKUMENTASI' NULL");
            }
        } catch (\Throwable $e) {
            Log::warning('Column check info: ' . $e->getMessage());
        }
    }

    public function destroy(int $id): RedirectResponse
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

    public function bulkDelete(Request $request): RedirectResponse
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

    public function reset(Request $request): RedirectResponse
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Hanya Admin yang memiliki akses.');
        }

        Pekerjaan::query()->delete();
        Project::query()->update(['progress_percent' => 0]);

        return redirect()->back()->with('success', 'Seluruh data pekerjaan berhasil dikosongkan.');
    }

    public function export(Request $request): StreamedResponse
    {
        $projectId = $request->input('project_id');
        $query     = Pekerjaan::with(['project', 'stage', 'picUser'])->orderBy('project_id', 'asc');

        if ($projectId && $projectId !== 'ALL') {
            $query->where('project_id', $projectId);
        }

        $pekerjaans = $query->get();
        $filename   = 'WBS_Pekerjaan_Indojar_' . date('Ymd_His') . '.csv';
        $headers    = [
            'Content-Type'        => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($pekerjaans) {
            $file = fopen('php://output', 'w');
            fputs($file, "\xEF\xBB\xBF");
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
                'Tipe Foto',
                'PIC',
                'URL Foto Cloudinary',
                'Catatan',
            ], ';');

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
                    $p->tanggal_pekerjaan ? date('Y-m-d H:i:s', strtotime($p->tanggal_pekerjaan)) : '-',
                    $p->tipe_foto ?? 'DOKUMENTASI',
                    $p->picUser->name ?? '-',
                    $p->foto ?? '-',
                    $p->catatan ?? '-',
                ], ';');
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