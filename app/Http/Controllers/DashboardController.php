<?php

namespace App\Http\Controllers;

use App\Models\MasterArea;
use App\Models\MasterSow;
use App\Models\Project;
use App\Models\ProjectIssue;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedArea = $request->input('area_id');
        $selectedSow  = $request->input('sow_id');

        $query = Project::with(['area', 'sow', 'picUser']);

        if ($selectedArea && $selectedArea !== 'ALL') {
            $query->where('area_id', $selectedArea);
        }

        if ($selectedSow && $selectedSow !== 'ALL') {
            $query->where('sow_id', $selectedSow);
        }

        $allProjects = $query->get();

        // 1. KPI Proyek Menara Indojar
        $totalSite      = $allProjects->count();
        $totalCompleted = $allProjects->where('progress_percent', '>=', 100)->count();
        $totalProgress  = $allProjects->where('progress_percent', '>', 0)->where('progress_percent', '<', 100)->count();
        $totalPlanning  = $allProjects->where('progress_percent', 0)->count();
        $totalIssues    = ProjectIssue::where('status', 'OPEN')->count();

        $kpi = [
            'totalSite'      => $totalSite,
            'totalCompleted' => $totalCompleted,
            'totalProgress'  => $totalProgress,
            'totalPlanning'  => $totalPlanning,
            'totalIssues'    => $totalIssues,
        ];

        // 2. Donut Distribusi SOW (B2S, COLO, dll.)
        $sowDistribution = [];
        $sows = MasterSow::all();
        foreach ($sows as $sow) {
            $sowDistribution[$sow->nama_sow] = $allProjects->where('sow_id', $sow->id)->count();
        }

        // 3. Peta Sebaran Menara (Latitude & Longitude Riil)
        $mapData = $allProjects->whereNotNull('latitude')->whereNotNull('longitude')->map(function ($p) {
            return [
                'id'          => $p->id,
                'project_code'=> $p->project_code,
                'site_id'     => $p->site_id,
                'site_name'   => $p->site_name,
                'area'        => $p->area->nama_area ?? 'Umum',
                'sow'         => $p->sow->nama_sow ?? 'B2S',
                'latitude'    => (float) $p->latitude,
                'longitude'   => (float) $p->longitude,
                'progress'    => (float) $p->progress_percent,
                'status'      => $p->status,
                'pic'         => $p->picUser->name ?? 'Tim Indojar',
            ];
        })->values();

        // 4. Riwayat Proyek Terkini
        $recentProjects = $allProjects->take(10)->map(function ($p) {
            return [
                'id'           => $p->id,
                'project_code' => $p->project_code,
                'site_id'      => $p->site_id,
                'site_name'    => $p->site_name,
                'sow'          => $p->sow->nama_sow ?? '-',
                'area'         => $p->area->nama_area ?? '-',
                'progress'     => $p->progress_percent,
                'status'       => $p->status,
                'pic'          => $p->picUser->name ?? 'Tim Indojar',
            ];
        });

        $areas = MasterArea::orderBy('nama_area', 'asc')->get();

        return Inertia::render('Dashboard/Index', [
            'kpi'             => $kpi,
            'sowDistribution' => $sowDistribution,
            'mapData'         => $mapData,
            'recentProjects'  => $recentProjects,
            'areas'           => $areas,
            'sows'            => $sows,
            'filters'         => [
                'area_id' => $selectedArea ?? 'ALL',
                'sow_id'  => $selectedSow ?? 'ALL',
            ],
        ]);
    }
}