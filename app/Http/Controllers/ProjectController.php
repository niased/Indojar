<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectPhoto;
use App\Models\ProjectProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search  = $request->input('search');
        $status  = $request->input('status', 'ALL');
        $wilayah = $request->input('wilayah', 'ALL');

        $query = Project::with(['picUser'])->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('site_id', 'like', "%{$search}%")
                  ->orWhere('site_name', 'like', "%{$search}%")
                  ->orWhere('pid', 'like', "%{$search}%")
                  ->orWhere('project_code', 'like', "%{$search}%");
            });
        }

        if ($status && $status !== 'ALL') {
            $query->where('status', $status);
        }

        if ($wilayah && $wilayah !== 'ALL') {
            $query->where('wilayah', $wilayah);
        }

        return Inertia::render('Project/Index', [
            'projects' => $query->paginate(10)->withQueryString(),
            'filters'  => [
                'search'  => $search ?? '',
                'status'  => $status,
                'wilayah' => $wilayah,
            ],
            'wilayahList' => Project::whereNotNull('wilayah')->distinct()->pluck('wilayah')->values(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pid'              => 'nullable|string|max:100',
            'site_id'          => 'required|string|max:100',
            'site_name'        => 'required|string|max:255',
            'client_name'      => 'nullable|string|max:255',
            'konsultan'        => 'nullable|string|max:255',
            'tipe_tower'       => 'required|string|max:100',
            'tinggi_tower'     => 'required|string|max:50',
            'wilayah'          => 'nullable|string|max:100',
            'alamat_site'      => 'nullable|string|max:500',
            'lat_long'         => 'nullable|string|max:100',
            'spk_date'         => 'nullable|date',
            'target_rfi_date'  => 'nullable|date',
            'status'           => 'required|string',
            'progress_percent' => 'nullable|numeric|between:0,100',
            'catatan_proyek'   => 'nullable|string|max:1000',
        ]);

        $count = Project::count() + 1;
        $validated['project_code'] = 'PRJ-IMA-' . date('Y') . '-' . str_pad($count, 3, '0', STR_PAD_LEFT);
        $validated['kontraktor']   = 'PT. INDOJAR MULIA ABADI';
        $validated['pic_user_id']  = $request->user()->id;

        Project::create($validated);

        return redirect()->back()->with('success', 'Master Proyek baru PT Indojar Mulia Abadi berhasil ditambahkan.');
    }

    public function show(int $id): Response
    {
        $project = Project::with([
            'picUser', 
            'progresses.user', 
            'photos'
        ])->findOrFail($id);

        return Inertia::render('Project/Show', [
            'project' => $project
        ]);
    }

    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'pid'              => 'nullable|string|max:100',
            'site_id'          => 'required|string|max:100',
            'site_name'        => 'required|string|max:255',
            'client_name'      => 'nullable|string|max:255',
            'konsultan'        => 'nullable|string|max:255',
            'tipe_tower'       => 'required|string|max:100',
            'tinggi_tower'     => 'required|string|max:50',
            'wilayah'          => 'nullable|string|max:100',
            'alamat_site'      => 'nullable|string|max:500',
            'lat_long'         => 'nullable|string|max:100',
            'spk_date'         => 'nullable|date',
            'target_rfi_date'  => 'nullable|date',
            'status'           => 'required|string',
            'progress_percent' => 'nullable|numeric|between:0,100',
            'catatan_proyek'   => 'nullable|string|max:1000',
        ]);

        $project->update($validated);

        return redirect()->back()->with('success', 'Data proyek berhasil diperbarui.');
    }

    public function destroy(int $id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return redirect()->back()->with('success', 'Proyek berhasil dihapus.');
    }

    public function storeProgress(Request $request, int $projectId)
    {
        $project = Project::findOrFail($projectId);

        $validated = $request->validate([
            'tahap'             => 'required|string|in:PONDASI,ERECTION,CME,RFI,ATP',
            'item_pekerjaan'    => 'required|string|max:255',
            'tanggal_pekerjaan' => 'required|date',
            'bobot_persen'      => 'required|numeric|between:0,100',
            'keterangan'        => 'nullable|string|max:1000',
        ]);

        $validated['project_id'] = $project->id;
        $validated['user_id']    = $request->user()->id;

        ProjectProgress::create($validated);

        // Update persentase dan status utama proyek
        $totalProgress = min(100, (float) $project->progresses()->sum('bobot_persen') + $validated['bobot_persen']);
        $project->update([
            'progress_percent' => $totalProgress,
            'status'           => $validated['tahap'],
        ]);

        return redirect()->back()->with('success', 'Progress pekerjaan lapangan berhasil ditambahkan.');
    }

    public function storePhoto(Request $request, int $projectId)
    {
        $project = Project::findOrFail($projectId);

        $request->validate([
            'kategori'     => 'required|string',
            'judul_foto'   => 'required|string|max:255',
            'tanggal_foto' => 'required|date',
            'hasil_ukur'   => 'nullable|string|max:100',
            'catatan'      => 'nullable|string|max:500',
            'foto'         => 'required|image|max:10240', // Maks 10MB
        ]);

        $path = $request->file('foto')->store("indojar/projects/{$project->site_id}", 'public');

        ProjectPhoto::create([
            'project_id'   => $project->id,
            'kategori'     => $request->kategori,
            'judul_foto'   => $request->judul_foto,
            'tanggal_foto' => $request->tanggal_foto,
            'hasil_ukur'   => $request->hasil_ukur,
            'catatan'      => $request->catatan,
            'file_path'    => '/storage/' . $path,
        ]);

        return redirect()->back()->with('success', 'Dokumentasi foto teknis berhasil diunggah.');
    }

    public function destroyPhoto(int $photoId)
    {
        $photo = ProjectPhoto::findOrFail($photoId);
        $cleanPath = str_replace('/storage/', '', $photo->file_path);
        Storage::disk('public')->delete($cleanPath);
        $photo->delete();

        return redirect()->back()->with('success', 'Foto dokumentasi berhasil dihapus.');
    }
}