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
        // 1. Penanganan Batch Insert (Multi-Baris / Paste Excel)
        if ($request->has('items') && is_array($request->items)) {
            $validated = $request->validate([
                'items'                     => 'required|array|min:1',
                'items.*.project_id'        => 'required|exists:projects,id',
                'items.*.stage_id'          => 'nullable|exists:master_stages,id',
                'items.*.kode_pekerjaan'    => 'required|string|max:50',
                'items.*.nama_pekerjaan'    => 'required|string|max:255',
                'items.*.satuan'            => 'nullable|string|max:30',
                'items.*.tanggal_pekerjaan' => 'nullable|date',
                'items.*.tipe_foto'         => 'nullable|string|in:DOKUMENTASI,ISSUE',
                'items.*.foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
                'items.*.foto'              => 'nullable|string|max:500',
                'items.*.catatan'           => 'nullable|string|max:1000',
            ]);

            DB::transaction(function () use ($validated, $request) {
                foreach ($validated['items'] as $idx => $item) {
                    $tipeFoto = $item['tipe_foto'] ?? 'DOKUMENTASI';
                    $fotoUrl  = !empty($item['foto']) ? trim($item['foto']) : null;

                    if ($request->hasFile("items.{$idx}.foto_file")) {
                        $fotoUrl = $this->uploadToCloudinary($request->file("items.{$idx}.foto_file"));
                    }

                    $rawDate = !empty($item['tanggal_pekerjaan']) ? $item['tanggal_pekerjaan'] : now()->toDateString();
                    $dateTimeWithCurrentTime = $rawDate . ' ' . now()->format('H:i:s');

                    Pekerjaan::create([
                        'project_id'        => $item['project_id'],
                        'stage_id'          => $item['stage_id'] ?? null,
                        'kode_pekerjaan'    => strtoupper(trim($item['kode_pekerjaan'])),
                        'nama_pekerjaan'    => trim($item['nama_pekerjaan']),
                        'satuan'            => !empty($item['satuan']) ? trim($item['satuan']) : 'Lot',
                        'tanggal_pekerjaan' => $dateTimeWithCurrentTime,
                        'foto'              => $fotoUrl,
                        'tipe_foto'         => $tipeFoto,
                        'user_id'           => $request->user()->id,
                        'catatan'           => !empty($item['catatan']) ? trim($item['catatan']) : null,
                    ]);
                }
            });

            return redirect()->back()->with('success', count($validated['items']) . ' laporan pekerjaan berhasil dicatat.');
        }

        // 2. Penanganan Form Tunggal (1 Baris)
        $validated = $request->validate([
            'project_id'        => 'required|exists:projects,id',
            'stage_id'          => 'nullable|exists:master_stages,id',
            'kode_pekerjaan'    => 'required|string|max:50',
            'nama_pekerjaan'    => 'required|string|max:255',
            'satuan'            => 'nullable|string|max:30',
            'tanggal_pekerjaan' => 'nullable|date',
            'tipe_foto'         => 'nullable|string|in:DOKUMENTASI,ISSUE',
            'foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'foto'              => 'nullable|string|max:500',
            'catatan'           => 'nullable|string|max:1000',
        ]);

        $tipeFoto        = $validated['tipe_foto'] ?? 'DOKUMENTASI';
        $uploadedFotoUrl = null;

        if ($request->hasFile('foto_file')) {
            $uploadedFotoUrl = $this->uploadToCloudinary($request->file('foto_file'));
        }

        $fotoFinal = $uploadedFotoUrl ?? $validated['foto'] ?? null;
        $rawDate   = !empty($validated['tanggal_pekerjaan']) ? $validated['tanggal_pekerjaan'] : now()->toDateString();
        $dateTimeWithCurrentTime = $rawDate . ' ' . now()->format('H:i:s');

        Pekerjaan::create([
            'project_id'        => $validated['project_id'],
            'stage_id'          => $validated['stage_id'] ?? null,
            'kode_pekerjaan'    => strtoupper(trim($validated['kode_pekerjaan'])),
            'nama_pekerjaan'    => trim($validated['nama_pekerjaan']),
            'satuan'            => !empty($validated['satuan']) ? trim($validated['satuan']) : 'Lot',
            'tanggal_pekerjaan' => $dateTimeWithCurrentTime,
            'foto'              => $fotoFinal,
            'tipe_foto'         => $tipeFoto,
            'user_id'           => $request->user()->id,
            'catatan'           => !empty($validated['catatan']) ? trim($validated['catatan']) : null,
        ]);

        return redirect()->back()->with('success', 'Laporan pekerjaan fisik berhasil disimpan.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $pekerjaan = Pekerjaan::findOrFail($id);

        $validated = $request->validate([
            'project_id'        => 'required|exists:projects,id',
            'stage_id'          => 'nullable|exists:master_stages,id',
            'kode_pekerjaan'    => 'required|string|max:50',
            'nama_pekerjaan'    => 'required|string|max:255',
            'satuan'            => 'nullable|string|max:30',
            'tanggal_pekerjaan' => 'nullable|date',
            'tipe_foto'         => 'nullable|string|in:DOKUMENTASI,ISSUE',
            'foto_file'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'foto'              => 'nullable|string|max:500',
            'catatan'           => 'nullable|string|max:1000',
        ]);

        $tipeFoto        = $validated['tipe_foto'] ?? ($pekerjaan->tipe_foto ?? 'DOKUMENTASI');
        $uploadedFotoUrl = null;

        if ($request->hasFile('foto_file')) {
            if ($pekerjaan->foto && str_contains($pekerjaan->foto, 'res.cloudinary.com')) {
                $this->deleteFromCloudinary($pekerjaan->foto);
            }
            $uploadedFotoUrl = $this->uploadToCloudinary($request->file('foto_file'));
        }

        $rawDate = !empty($validated['tanggal_pekerjaan']) ? $validated['tanggal_pekerjaan'] : now()->toDateString();
        $dateTimeWithCurrentTime = $rawDate . ' ' . now()->format('H:i:s');
        $fotoTarget = $uploadedFotoUrl ?? $pekerjaan->foto;

        $pekerjaan->update([
            'project_id'        => $validated['project_id'],
            'stage_id'          => $validated['stage_id'] ?? null,
            'kode_pekerjaan'    => strtoupper(trim($validated['kode_pekerjaan'])),
            'nama_pekerjaan'    => trim($validated['nama_pekerjaan']),
            'satuan'            => !empty($validated['satuan']) ? trim($validated['satuan']) : 'Lot',
            'tanggal_pekerjaan' => $dateTimeWithCurrentTime,
            'foto'              => $fotoTarget,
            'tipe_foto'         => $tipeFoto,
            'user_id'           => $request->user()->id,
            'catatan'           => !empty($validated['catatan']) ? trim($validated['catatan']) : null,
        ]);

        return redirect()->back()->with('success', 'Laporan pekerjaan WBS berhasil diperbarui.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $pekerjaan = Pekerjaan::findOrFail($id);

        if ($pekerjaan->foto && str_contains($pekerjaan->foto, 'res.cloudinary.com')) {
            $this->deleteFromCloudinary($pekerjaan->foto);
        }

        $pekerjaan->delete();

        return redirect()->back()->with('success', 'Laporan pekerjaan berhasil dihapus.');
    }

    public function bulkDelete(Request $request): RedirectResponse
    {
        $request->validate(['ids' => 'required|array']);
        $pekerjaans = Pekerjaan::whereIn('id', $request->ids)->get();

        foreach ($pekerjaans as $p) {
            if ($p->foto && str_contains($p->foto, 'res.cloudinary.com')) {
                $this->deleteFromCloudinary($p->foto);
            }
            $p->delete();
        }

        return redirect()->back()->with('success', count($request->ids) . ' laporan pekerjaan berhasil dihapus.');
    }

    public function reset(Request $request): RedirectResponse
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Hanya Admin yang memiliki akses.');
        }

        Pekerjaan::query()->delete();

        return redirect()->back()->with('success', 'Seluruh data laporan pekerjaan berhasil dikosongkan.');
    }

    public function export(Request $request): StreamedResponse
    {
        $projectId = $request->input('project_id');
        $query     = Pekerjaan::with(['project', 'stage', 'picUser'])->orderBy('project_id', 'asc');

        if ($projectId && $projectId !== 'ALL') {
            $query->where('project_id', $projectId);
        }

        $pekerjaans = $query->get();
        $filename   = 'Laporan_Pekerjaan_Indojar_' . date('Ymd_His') . '.csv';
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
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key'    => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
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
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key'    => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
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
}