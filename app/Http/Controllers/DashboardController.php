<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectPhoto;
use App\Models\ProjectProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        // 1. KPI UTAMA PROYEK PT INDOJAR MULIA ABADI
        $totalProjects    = Project::count();
        $inProgress       = Project::whereNotIn('status', ['COMPLETED', 'PLANNING'])->count();
        $completedProjects = Project::where('status', 'COMPLETED')->count();

        // 2. BREAKDOWN STATUS PEKERJAAN LAPANGAN
        $countPondasi   = Project::where('status', 'PONDASI')->count();
        $countErection  = Project::where('status', 'ERECTION')->count();
        $countCME       = Project::where('status', 'CME')->count();
        $countRFI_ATP   = Project::whereIn('status', ['RFI', 'ATP'])->count();

        // 3. SEBARAN TITIK PETA PROYEK (GIS MAP)
        $mapPoints = Project::whereNotNull('lat_long')->get()->map(function ($p) {
            $parts = preg_split('/[\s,;\/]+/', trim($p->lat_long ?? ''));
            if (count($parts) < 2) return null;
            return [
                'id'        => $p->id,
                'site_id'   => $p->site_id,
                'site_name' => $p->site_name,
                'tipe'      => "{$p->tipe_tower} {$p->tinggi_tower}",
                'wilayah'   => $p->wilayah ?? '-',
                'status'    => $p->status,
                'progress'  => (float) $p->progress_percent,
                'latitude'  => (float) str_replace(',', '.', $parts[0]),
                'longitude' => (float) str_replace(',', '.', $parts[1]),
            ];
        })->filter()->values();

        // 4. DAFTAR PROYEK TERBARU & FOTO PEKERJAAN TERAKHIR
        $recentProjects = Project::with('picUser')
            ->latest()
            ->take(6)
            ->get();

        $recentPhotos = ProjectPhoto::with('project')
            ->latest('tanggal_foto')
            ->take(6)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'company' => [
                'name'    => 'PT Indojar Mulia Abadi',
                'tagline' => 'General Contractor, Telecommunication & Civil Engineering',
            ],
            'kpi' => [
                'totalProjects'     => $totalProjects,
                'inProgress'        => $inProgress,
                'completedProjects' => $completedProjects,
                'countPondasi'      => $countPondasi,
                'countErection'     => $countErection,
                'countCME'          => $countCME,
                'countRFI_ATP'      => $countRFI_ATP,
            ],
            'mapPoints'      => $mapPoints,
            'recentProjects' => $recentProjects,
            'recentPhotos'   => $recentPhotos,
        ]);
    }
}