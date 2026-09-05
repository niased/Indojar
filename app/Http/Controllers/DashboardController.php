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
        $selectedArea   = $request->input('area_id');
        $selectedSow    = $request->input('sow_id');
        $selectedStatus = $request->input('status');

        $query = Project::with(['area', 'sow', 'picUser']);

        if ($selectedArea && $selectedArea !== 'ALL') {
            $query->where('area_id', $selectedArea);
        }

        if ($selectedSow && $selectedSow !== 'ALL') {
            $query->where('sow_id', $selectedSow);
        }

        if ($selectedStatus && $selectedStatus !== 'ALL') {
            $query->where('status', $selectedStatus);
        }

        $allProjects = $query->get();

        // 1. KPI Metrik Proyek Menara
        $totalSite      = $allProjects->count();
        $totalCompleted = $allProjects->where('progress_percent', '>=', 100)->count();
        $totalProgress  = $allProjects->where('progress_percent', '>', 0)->where('progress_percent', '<', 100)->count();
        $totalPlanning  = $allProjects->where('progress_percent', '<=', 0)->count();
        $totalIssues    = ProjectIssue::where('status', 'OPEN')->count();

        $kpi = [
            'totalSite'      => $totalSite,
            'totalPlanning'  => $totalPlanning,
            'totalProgress'  => $totalProgress,
            'totalCompleted' => $totalCompleted,
            'totalIssues'    => $totalIssues,
        ];

        // 2. Distribusi Donut SOW (B2S, COLO, CME, STRENGTHENING)
        $sows = MasterSow::all();
        $sowDistribution = [];
        foreach ($sows as $s) {
            $sowDistribution[$s->nama_sow] = $allProjects->where('sow_id', $s->id)->count();
        }

        // 3. Tren 12 Bulan (Grafik Batang & Line Chart)
        $monthNames = [
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
            5 => 'Mei', 6 => 'Jun', 7 => 'Jul', 8 => 'Ags',
            9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des',
        ];
        $fullMonthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
        ];

        $currentYear = (int) date('Y');
        $chartData = [];
        $kondisiChartData = [];

        for ($m = 1; $m <= 12; $m++) {
            $mProjects = $allProjects->filter(function ($p) use ($m, $currentYear) {
                $tgl = $p->spk_date ?? $p->created_at;
                if (!$tgl) return false;
                $c = Carbon::parse($tgl);
                return (int) $c->format('n') === $m && (int) $c->format('Y') === $currentYear;
            });

            $mPondasi   = $mProjects->filter(fn($p) => $p->progress_percent > 0 && $p->progress_percent < 40)->count();
            $mErection  = $mProjects->filter(fn($p) => $p->progress_percent >= 40 && $p->progress_percent < 100)->count();
            $mCompleted = $mProjects->where('progress_percent', '>=', 100)->count();
            $mTotal     = $mProjects->count();

            $chartData[] = [
                'name'     => $monthNames[$m],
                'fullName' => "{$fullMonthNames[$m]} {$currentYear}",
                'MASUK'    => $mPondasi,
                'TRANSFER' => $mErection,
                'KELUAR'   => $mCompleted,
                'total'    => $mTotal,
            ];

            $pctPondasi   = $mTotal > 0 ? round(($mPondasi / $mTotal) * 100, 1) : 0;
            $pctErection  = $mTotal > 0 ? round(($mErection / $mTotal) * 100, 1) : 0;
            $pctCompleted = $mTotal > 0 ? round(($mCompleted / $mTotal) * 100, 1) : 0;

            $kondisiChartData[] = [
                'name'      => $monthNames[$m],
                'fullMonth' => "{$fullMonthNames[$m]} {$currentYear}",
                'Baru'      => $mPondasi,
                'pctBaru'   => $pctPondasi,
                'Bekas'     => $mErection,
                'pctBekas'  => $pctErection,
                'Rusak'     => $mCompleted,
                'pctRusak'  => $pctCompleted,
            ];
        }

        // 4. Data Peta Sebaran Menara (Membaca Latitude & Longitude)
        $mapData = $allProjects->whereNotNull('latitude')->whereNotNull('longitude')->map(function ($p) {
            return [
                'id'          => $p->id,
                'kode_gudang' => $p->site_id,
                'nama_gudang' => $p->site_name,
                'lokasi'      => ($p->tipe_tower ?? 'SST') . ' ' . ($p->tinggi_tower ?? '') . ' - ' . ($p->area->nama_area ?? 'Umum'),
                'latitude'    => (float) $p->latitude,
                'longitude'   => (float) $p->longitude,
                'total_qty'   => (float) $p->progress_percent,
                'status'      => 'ACTIVE',
                'sow'         => $p->sow->nama_sow ?? 'B2S',
                'pic'         => $p->picUser->name ?? 'Tim Indojar',
            ];
        })->values();

        // 5. Riwayat 10 Proyek Terkini
        $recentProjects = $allProjects->take(10)->map(function ($p) {
            return [
                'id'           => $p->id,
                'no_transaksi' => $p->project_code,
                'tanggal'      => $p->spk_date ? Carbon::parse($p->spk_date)->format('d M Y') : $p->created_at->format('d M Y'),
                'sub_jenis'    => $p->status,
                'pihak_asal'   => "{$p->site_id} - {$p->site_name}",
                'pic_user'     => ['name' => $p->picUser->name ?? 'Tim Waslap'],
                'progress'     => $p->progress_percent,
                'sow'          => $p->sow->nama_sow ?? '-',
                'area'         => $p->area->nama_area ?? '-',
            ];
        });

        $areas = MasterArea::orderBy('nama_area', 'asc')->get();

        return Inertia::render('Dashboard/Index', [
            'kpi'              => $kpi,
            'sowDistribution'  => $sowDistribution,
            'chartData'        => $chartData,
            'kondisiChartData' => $kondisiChartData,
            'mapData'          => $mapData,
            'recentProjects'   => $recentProjects,
            'areas'            => $areas,
            'sows'             => $sows,
            'filters'          => [
                'area_id' => $selectedArea ?? 'ALL',
                'sow_id'  => $selectedSow ?? 'ALL',
                'status'  => $selectedStatus ?? 'ALL',
            ],
        ]);
    }
}