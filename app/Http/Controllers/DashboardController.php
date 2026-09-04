<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedWilayah = $request->input('gudang_id');
        $selectedKondisi = $request->input('kondisi');

        $query = Project::query();

        if ($selectedWilayah && $selectedWilayah !== 'ALL') {
            $query->where('wilayah', $selectedWilayah);
        }

        if ($selectedKondisi && $selectedKondisi !== 'ALL') {
            if ($selectedKondisi === 'Baru') {
                $query->whereIn('status', ['PLANNING', 'PONDASI']);
            } elseif ($selectedKondisi === 'Bekas') {
                $query->whereIn('status', ['ERECTION', 'CME']);
            } elseif ($selectedKondisi === 'Rusak') {
                $query->whereIn('status', ['RFI', 'ATP', 'COMPLETED']);
            }
        }

        $allProjects = $query->get();

        // 1. KPI Utama Proyek
        $totalSite     = $allProjects->count();
        $totalPondasi  = $allProjects->where('status', 'PONDASI')->count();
        $totalErection = $allProjects->where('status', 'ERECTION')->count();
        $totalCME      = $allProjects->where('status', 'CME')->count();
        $totalRFI_ATP  = $allProjects->whereIn('status', ['RFI', 'ATP', 'COMPLETED'])->count();

        $kpi = [
            'totalBarang'       => $totalSite,
            'totalBarangMasuk'  => $totalPondasi,
            'totalTransfer'     => $totalErection,
            'totalBarangKeluar' => $totalCME,
            'totalNilaiAset'    => $totalRFI_ATP,
        ];

        // 2. Donut Distribusi Tahapan
        $donutPenerimaan = [
            'Pondasi'       => $totalPondasi,
            'Erection'      => $totalErection,
            'CME'           => $totalCME,
            'RFI / ATP'     => $allProjects->whereIn('status', ['RFI', 'ATP'])->count(),
            'Selesai 100%'  => $allProjects->where('status', 'COMPLETED')->count(),
        ];

        // 3. PEMETAAN 12 BULAN LENGKAP (Januari s/d Desember)
        $monthNames = [
            1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr',
            5 => 'Mei', 6 => 'Jun', 7 => 'Jul', 8 => 'Ags',
            9 => 'Sep', 10 => 'Okt', 11 => 'Nov', 12 => 'Des'
        ];
        $fullMonthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        $currentYear = (int) date('Y');
        $chartData = [];
        $kondisiChartData = [];

        for ($m = 1; $m <= 12; $m++) {
            // Ambil proyek berdasarkan bulan SPK atau created_at
            $mProjects = $allProjects->filter(function ($p) use ($m, $currentYear) {
                $tgl = $p->spk_date ?? $p->created_at;
                if (!$tgl) return false;
                $c = Carbon::parse($tgl);
                return (int)$c->format('n') === $m && (int)$c->format('Y') === $currentYear;
            });

            $mPondasi  = $mProjects->where('status', 'PONDASI')->count();
            $mErection = $mProjects->where('status', 'ERECTION')->count();
            $mRfiAtp   = $mProjects->whereIn('status', ['RFI', 'ATP', 'COMPLETED'])->count();
            $mTotal    = $mProjects->count();

            $chartData[] = [
                'name'     => $monthNames[$m],
                'fullName' => "{$fullMonthNames[$m]} {$currentYear}",
                'MASUK'    => $mPondasi,
                'TRANSFER' => $mErection,
                'KELUAR'   => $mRfiAtp,
                'total'    => $mTotal,
            ];

            // Hitung persentase untuk Grafik Line
            $pctPondasi  = $mTotal > 0 ? round(($mPondasi / $mTotal) * 100, 1) : 0;
            $pctErection = $mTotal > 0 ? round(($mErection / $mTotal) * 100, 1) : 0;
            $pctRfiAtp   = $mTotal > 0 ? round(($mRfiAtp / $mTotal) * 100, 1) : 0;

            $kondisiChartData[] = [
                'name'      => $monthNames[$m],
                'fullMonth' => "{$fullMonthNames[$m]} {$currentYear}",
                'Baru'      => $mPondasi,
                'pctBaru'   => $pctPondasi,
                'Bekas'     => $mErection,
                'pctBekas'  => $pctErection,
                'Rusak'     => $mRfiAtp,
                'pctRusak'  => $pctRfiAtp,
            ];
        }

        // 4. Data Peta Sebaran Site
        $mapData = $allProjects->whereNotNull('lat_long')->map(function ($p) {
            $parts = preg_split('/[\s,;\/]+/', trim($p->lat_long ?? ''));
            if (count($parts) < 2) return null;
            return [
                'id'          => $p->id,
                'kode_gudang' => $p->site_id,
                'nama_gudang' => $p->site_name,
                'lokasi'      => "{$p->tipe_tower} {$p->tinggi_tower} - {$p->wilayah}",
                'latitude'    => (float) str_replace(',', '.', $parts[0]),
                'longitude'   => (float) str_replace(',', '.', $parts[1]),
                'total_qty'   => (float) $p->progress_percent,
                'status'      => 'ACTIVE',
            ];
        })->filter()->values();

        // 5. Riwayat Proyek Terkini
        $recentTransactions = $allProjects->take(10)->map(function ($p) {
            return [
                'id'           => $p->id,
                'no_transaksi' => $p->project_code,
                'tanggal'      => $p->spk_date ? $p->spk_date->format('d M Y') : $p->created_at->format('d M Y'),
                'sub_jenis'    => $p->status,
                'pihak_asal'   => "{$p->site_id} - {$p->site_name}",
                'pic_user'     => ['name' => $p->picUser?->name ?? 'Tim Indojar'],
            ];
        });

        // Opsi Wilayah
        $wilayahOptions = Project::whereNotNull('wilayah')
            ->distinct()
            ->pluck('wilayah')
            ->map(fn($w) => ['id' => $w, 'nama_gudang' => $w, 'kode_gudang' => $w])
            ->values();

        return Inertia::render('Dashboard/Index', [
            'kpi'                => $kpi,
            'filters'            => [
                'gudang_id' => $selectedWilayah ?? 'ALL',
                'kondisi'   => $selectedKondisi ?? 'ALL',
            ],
            'options'            => [
                'gudangs' => $wilayahOptions,
            ],
            'donutPenerimaan'    => $donutPenerimaan,
            'chartData'          => $chartData,
            'kondisiChartData'   => $kondisiChartData,
            'mapData'            => $mapData,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}