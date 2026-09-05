<?php

namespace App\Http\Controllers;

use App\Models\MasterArea;
use App\Models\MasterSow;
use App\Models\MasterStage;
use App\Models\Pekerjaan;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search   = $request->input('search');
        $areaId   = $request->input('area_id');
        $sowId    = $request->input('sow_id');
        $status   = $request->input('status');
        $perPage  = (int) $request->input('per_page', 10);
        $rawOrder = strtolower((string) $request->input('order', 'desc'));
        $order    = in_array($rawOrder, ['asc', 'desc'], true) ? $rawOrder : 'desc';

        $query = Project::with(['area', 'sow', 'picUser:id,name']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('site_id', 'like', "%{$search}%")
                  ->orWhere('site_name', 'like', "%{$search}%")
                  ->orWhere('pid', 'like', "%{$search}%")
                  ->orWhere('project_code', 'like', "%{$search}%")
                  ->orWhere('site_id_dmt', 'like', "%{$search}%")
                  ->orWhere('site_id_tenant', 'like', "%{$search}%")
                  ->orWhere('client_name', 'like', "%{$search}%");
            });
        }

        if ($areaId && $areaId !== 'ALL') {
            $query->where('area_id', $areaId);
        }

        if ($sowId && $sowId !== 'ALL') {
            $query->where('sow_id', $sowId);
        }

        if ($status && $status !== 'ALL') {
            $query->where('status', $status);
        }

        $projects = $query->orderBy('id', $order)
            ->paginate($perPage)
            ->withQueryString();

        // Opsi untuk filter dan modal
        $areas = MasterArea::orderBy('nama_area', 'asc')->get();
        $sows  = MasterSow::orderBy('nama_sow', 'asc')->get();
        $users = User::select('id', 'name')->orderBy('name', 'asc')->get();

        return Inertia::render('Project/Index', [
            'projects' => $projects,
            'areas'    => $areas,
            'sows'     => $sows,
            'users'    => $users,
            'filters'  => [
                'search'   => $search ?? '',
                'area_id'  => $areaId ?? 'ALL',
                'sow_id'   => $sowId ?? 'ALL',
                'status'   => $status ?? 'ALL',
                'order'    => $order,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Mendukung multi-baris dari modal / paste Excel
        if ($request->has('items') && is_array($request->items)) {
            $validated = $request->validate([
                'items'                   => 'required|array|min:1',
                'items.*.site_id'         => 'required|string|max:100',
                'items.*.site_name'       => 'required|string|max:255',
                'items.*.pid'             => 'nullable|string|max:100',
                'items.*.site_id_dmt'     => 'nullable|string|max:100',
                'items.*.site_id_tenant'  => 'nullable|string|max:100',
                'items.*.area_id'         => 'nullable|exists:master_areas,id',
                'items.*.sow_id'          => 'nullable|exists:master_sows,id',
                'items.*.tipe_tower'      => 'nullable|string|max:100',
                'items.*.tinggi_tower'    => 'nullable|string|max:50',
                'items.*.client_name'     => 'nullable|string|max:255',
                'items.*.no_po'           => 'nullable|string|max:100',
                'items.*.status'          => 'nullable|string',
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
                        'site_id_dmt'      => $item['site_id_dmt'] ?? null,
                        'site_id_tenant'   => $item['site_id_tenant'] ?? null,
                        'area_id'          => $item['area_id'] ?? null,
                        'sow_id'           => $item['sow_id'] ?? null,
                        'tipe_tower'       => $item['tipe_tower'] ?: 'SST 4 LEGS',
                        'tinggi_tower'     => $item['tinggi_tower'] ?: '52M',
                        'client_name'      => $item['client_name'] ?: 'Telkomsel / Mitratel',
                        'kontraktor'       => 'PT. INDOJAR MULIA ABADI',
                        'no_po'            => $item['no_po'] ?? null,
                        'status'           => $item['status'] ?: 'PLANNING',
                        'progress_percent' => 0.00,
                        'pic_user_id'      => $request->user()->id,
                    ]);
                }
            });

            return redirect()->back()->with('success', count($validated['items']) . ' site proyek berhasil ditambahkan.');
        }

        // Single Insert
        $validated = $request->validate([
            'site_id'          => 'required|string|max:100',
            'site_name'        => 'required|string|max:255',
            'pid'              => 'nullable|string|max:100',
            'site_id_dmt'      => 'nullable|string|max:100',
            'site_id_tenant'   => 'nullable|string|max:100',
            'area_id'          => 'nullable|exists:master_areas,id',
            'sow_id'           => 'nullable|exists:master_sows,id',
            'client_name'      => 'nullable|string|max:255',
            'konsultan'        => 'nullable|string|max:255',
            'no_po'            => 'nullable|string|max:100',
            'tgl_po'           => 'nullable|date',
            'spk_date'         => 'nullable|date',
            'kompensasi'       => 'nullable|string|max:255',
            'tipe_tower'       => 'nullable|string|max:100',
            'tinggi_tower'     => 'nullable|string|max:50',
            'alamat_site'      => 'nullable|string|max:500',
            'latitude'         => 'nullable|numeric|between:-90,90',
            'longitude'        => 'nullable|numeric|between:-180,180',
            'tgl_mos'          => 'nullable|date',
            'tgl_start'        => 'nullable|date',
            'tgl_done'         => 'nullable|date',
            'target_rfi_date'  => 'nullable|date',
            'tgl_atp'          => 'nullable|date',
            'tgl_bast'         => 'nullable|date',
            'tgl_baut'         => 'nullable|date',
            'tgl_invoice'      => 'nullable|date',
            'status'           => 'required|string',
            'proses_status'    => 'nullable|string|max:50',
            'progress_percent' => 'nullable|numeric|between:0,100',
            'pic_user_id'      => 'nullable|exists:users,id',
            'catatan_proyek'   => 'nullable|string|max:1000',
        ]);

        $count = Project::count() + 1;
        $validated['project_code']     = 'PRJ-IMA-' . date('Y') . '-' . str_pad($count, 3, '0', STR_PAD_LEFT);
        $validated['site_id']          = strtoupper(trim($validated['site_id']));
        $validated['site_name']        = strtoupper(trim($validated['site_name']));
        $validated['kontraktor']       = 'PT. INDOJAR MULIA ABADI';
        $validated['pic_user_id']      = $validated['pic_user_id'] ?? $request->user()->id;
        $validated['progress_percent'] = $validated['progress_percent'] ?? 0.00;

        Project::create($validated);
        return redirect()->back()->with('success', 'Master proyek berhasil ditambahkan.');
    }

    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'site_id'          => 'required|string|max:100',
            'site_name'        => 'required|string|max:255',
            'pid'              => 'nullable|string|max:100',
            'site_id_dmt'      => 'nullable|string|max:100',
            'site_id_tenant'   => 'nullable|string|max:100',
            'area_id'          => 'nullable|exists:master_areas,id',
            'sow_id'           => 'nullable|exists:master_sows,id',
            'client_name'      => 'nullable|string|max:255',
            'konsultan'        => 'nullable|string|max:255',
            'no_po'            => 'nullable|string|max:100',
            'tgl_po'           => 'nullable|date',
            'spk_date'         => 'nullable|date',
            'kompensasi'       => 'nullable|string|max:255',
            'tipe_tower'       => 'nullable|string|max:100',
            'tinggi_tower'     => 'nullable|string|max:50',
            'alamat_site'      => 'nullable|string|max:500',
            'latitude'         => 'nullable|numeric|between:-90,90',
            'longitude'        => 'nullable|numeric|between:-180,180',
            'tgl_mos'          => 'nullable|date',
            'tgl_start'        => 'nullable|date',
            'tgl_done'         => 'nullable|date',
            'target_rfi_date'  => 'nullable|date',
            'tgl_atp'          => 'nullable|date',
            'tgl_bast'         => 'nullable|date',
            'tgl_baut'         => 'nullable|date',
            'tgl_invoice'      => 'nullable|date',
            'status'           => 'required|string',
            'proses_status'    => 'nullable|string|max:50',
            'progress_percent' => 'nullable|numeric|between:0,100',
            'pic_user_id'      => 'nullable|exists:users,id',
            'catatan_proyek'   => 'nullable|string|max:1000',
        ]);

        $validated['site_id']   = strtoupper(trim($validated['site_id']));
        $validated['site_name'] = strtoupper(trim($validated['site_name']));

        $project->update($validated);
        return redirect()->back()->with('success', 'Data proyek berhasil diperbarui.');
    }

    public function show(int $id): Response
    {
        $project = Project::with([
            'area',
            'sow',
            'picUser:id,name,email',
            'pekerjaans' => fn($q) => $q->with(['stage', 'picUser'])->orderBy('kode_pekerjaan', 'asc'),
            'issues'     => fn($q) => $q->with(['stage', 'user'])->latest(),
        ])->findOrFail($id);

        $stages = MasterStage::orderBy('urutan', 'asc')->get();

        return Inertia::render('Project/Show', [
            'project' => $project,
            'stages'  => $stages,
        ]);
    }

    public function destroy(int $id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return redirect()->back()->with('success', 'Site proyek berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate(['ids' => 'required|array']);
        Project::destroy($request->ids);
        return redirect()->back()->with('success', count($request->ids) . ' site proyek berhasil dihapus.');
    }

    public function reset(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Hanya Admin yang dapat mengosongkan data proyek.');
        }

        Pekerjaan::query()->delete();
        Project::query()->delete();

        return redirect()->back()->with('success', 'Seluruh master data proyek berhasil dikosongkan.');
    }

    public function export(Request $request)
    {
        $projects = Project::with(['area', 'sow', 'picUser'])->orderBy('id', 'asc')->get();
        $filename = 'Master_Proyek_Indojar_' . date('Ymd_His') . '.csv';

        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($projects) {
            $file = fopen('php://output', 'w');
            fputcsv($file, [
                'Kode Proyek',
                'PID / WBS',
                'Site ID',
                'Nama Site',
                'Site ID DMT',
                'Site ID Tenant',
                'Area',
                'Regional',
                'SOW',
                'No PO',
                'Tinggi Tower',
                'Tipe Tower',
                'Latitude',
                'Longitude',
                'Target RFI',
                'Status',
                'Progress (%)',
                'PIC',
            ]);

            foreach ($projects as $p) {
                fputcsv($file, [
                    $p->project_code,
                    $p->pid ?? '-',
                    $p->site_id,
                    $p->site_name,
                    $p->site_id_dmt ?? '-',
                    $p->site_id_tenant ?? '-',
                    $p->area->nama_area ?? '-',
                    $p->area->regional ?? '-',
                    $p->sow->nama_sow ?? '-',
                    $p->no_po ?? '-',
                    $p->tinggi_tower,
                    $p->tipe_tower,
                    $p->latitude ?? '-',
                    $p->longitude ?? '-',
                    $p->target_rfi_date ? date('Y-m-d', strtotime($p->target_rfi_date)) : '-',
                    $p->status,
                    $p->progress_percent . '%',
                    $p->picUser->name ?? '-',
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}