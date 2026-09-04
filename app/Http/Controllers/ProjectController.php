<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectPhoto;
use App\Models\ProjectProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search   = $request->input('search');
        $perPage  = (int) $request->input('per_page', 10);
        $rawOrder = strtolower((string) $request->input('order', 'desc'));
        $order    = in_array($rawOrder, ['asc', 'desc'], true) ? $rawOrder : 'desc';

        $query = Project::with(['picUser']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('site_id', 'like', "%{$search}%")
                  ->orWhere('site_name', 'like', "%{$search}%")
                  ->orWhere('pid', 'like', "%{$search}%")
                  ->orWhere('project_code', 'like', "%{$search}%")
                  ->orWhere('wilayah', 'like', "%{$search}%")
                  ->orWhere('client_name', 'like', "%{$search}%");
            });
        }

        $projects = $query->orderBy('id', $order)
            ->paginate($perPage)
            ->withQueryString();

        $existingOptions = [
            'tipeTowerList'   => Project::whereNotNull('tipe_tower')->distinct()->pluck('tipe_tower')->values(),
            'tinggiTowerList' => Project::whereNotNull('tinggi_tower')->distinct()->pluck('tinggi_tower')->values(),
            'wilayahList'     => Project::whereNotNull('wilayah')->distinct()->pluck('wilayah')->values(),
            'clientList'      => Project::whereNotNull('client_name')->distinct()->pluck('client_name')->values(),
            'konsultanList'   => Project::whereNotNull('konsultan')->distinct()->pluck('konsultan')->values(),
        ];

        return Inertia::render('Project/Index', [
            'projects'        => $projects,
            'existingOptions' => $existingOptions,
            'filters'         => [
                'search'   => $search ?? '',
                'order'    => $order,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Mendukung Multi-Baris dari Modal / Paste Excel
        if ($request->has('items') && is_array($request->items)) {
            $validated = $request->validate([
                'items'                     => 'required|array|min:1',
                'items.*.site_id'           => 'required|string|max:100',
                'items.*.site_name'         => 'required|string|max:255',
                'items.*.pid'               => 'nullable|string|max:100',
                'items.*.tipe_tower'        => 'nullable|string|max:100',
                'items.*.tinggi_tower'      => 'nullable|string|max:50',
                'items.*.wilayah'           => 'nullable|string|max:100',
                'items.*.client_name'       => 'nullable|string|max:255',
                'items.*.konsultan'         => 'nullable|string|max:255',
                'items.*.target_rfi_date'   => 'nullable|date',
                'items.*.status'            => 'nullable|string',
            ]);

            DB::transaction(function () use ($validated, $request) {
                $lastCount = Project::count();
                foreach ($validated['items'] as $item) {
                    $lastCount++;
                    $projectCode = 'PRJ-IMA-' . date('Y') . '-' . str_pad($lastCount, 3, '0', STR_PAD_LEFT);

                    Project::create([
                        'project_code'     => $projectCode,
                        'site_id'          => strtoupper(trim($item['site_id'])),
                        'site_name'        => strtoupper(trim($item['site_name'])),
                        'pid'              => !empty($item['pid']) ? trim($item['pid']) : null,
                        'tipe_tower'       => $item['tipe_tower'] ?: 'SST 4 LEGS',
                        'tinggi_tower'     => $item['tinggi_tower'] ?: '52M',
                        'wilayah'          => !empty($item['wilayah']) ? trim($item['wilayah']) : null,
                        'client_name'      => $item['client_name'] ?: 'Telkomsel / Mitratel',
                        'kontraktor'       => 'PT. INDOJAR MULIA ABADI',
                        'konsultan'        => $item['konsultan'] ?: 'PT. ATRYA REKAYASA',
                        'target_rfi_date'  => $item['target_rfi_date'] ?: null,
                        'status'           => $item['status'] ?: 'PLANNING',
                        'progress_percent' => 0,
                        'pic_user_id'      => $request->user()->id,
                    ]);
                }
            });

            return redirect()->back()->with('success', count($validated['items']) . ' Site Proyek berhasil ditambahkan.');
        }

        // Single Insert
        $validated = $request->validate([
            'site_id'          => 'required|string|max:100',
            'site_name'        => 'required|string|max:255',
            'pid'              => 'nullable|string|max:100',
            'tipe_tower'       => 'nullable|string|max:100',
            'tinggi_tower'     => 'nullable|string|max:50',
            'wilayah'          => 'nullable|string|max:100',
            'client_name'      => 'nullable|string|max:255',
            'konsultan'        => 'nullable|string|max:255',
            'lat_long'         => 'nullable|string|max:100',
            'alamat_site'      => 'nullable|string|max:500',
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

        return redirect()->back()->with('success', 'Master Proyek berhasil ditambahkan.');
    }

    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'site_id'          => 'required|string|max:100',
            'site_name'        => 'required|string|max:255',
            'pid'              => 'nullable|string|max:100',
            'tipe_tower'       => 'nullable|string|max:100',
            'tinggi_tower'     => 'nullable|string|max:50',
            'wilayah'          => 'nullable|string|max:100',
            'client_name'      => 'nullable|string|max:255',
            'konsultan'        => 'nullable|string|max:255',
            'lat_long'         => 'nullable|string|max:100',
            'alamat_site'      => 'nullable|string|max:500',
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

        return redirect()->back()->with('success', 'Site proyek berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'exists:projects,id',
        ]);

        Project::destroy($request->ids);

        return redirect()->back()->with('success', count($request->ids) . ' site proyek berhasil dihapus.');
    }

    public function reset(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Hanya Admin yang dapat mengosongkan data proyek.');
        }

        ProjectProgress::query()->delete();
        ProjectPhoto::query()->delete();
        Project::query()->delete();

        return redirect()->back()->with('success', 'Seluruh master data proyek berhasil dikosongkan.');
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
}