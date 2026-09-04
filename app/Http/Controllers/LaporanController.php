<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LaporanController extends Controller
{
    public function index(Request $request): Response
    {
        $status  = $request->input('status', 'ALL');
        $wilayah = $request->input('wilayah', 'ALL');
        $search  = $request->input('search', '');

        $query = Project::with(['picUser', 'progresses'])->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('site_id', 'like', "%{$search}%")
                  ->orWhere('site_name', 'like', "%{$search}%")
                  ->orWhere('pid', 'like', "%{$search}%");
            });
        }

        if ($status && $status !== 'ALL') {
            $query->where('status', $status);
        }

        if ($wilayah && $wilayah !== 'ALL') {
            $query->where('wilayah', $wilayah);
        }

        return Inertia::render('Laporan/Index', [
            'laporanProyek' => $query->get(),
            'filters' => [
                'status'  => $status,
                'wilayah' => $wilayah,
                'search'  => $search,
            ],
            'wilayahList' => Project::whereNotNull('wilayah')->distinct()->pluck('wilayah')->values(),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $status  = $request->input('status', 'ALL');
        $wilayah = $request->input('wilayah', 'ALL');

        $query = Project::with(['picUser'])->orderBy('site_id', 'asc');

        if ($status && $status !== 'ALL') {
            $query->where('status', $status);
        }

        if ($wilayah && $wilayah !== 'ALL') {
            $query->where('wilayah', $wilayah);
        }

        $projects = $query->get();
        $fileName = 'Laporan_Proyek_Indojar_' . date('Y-m-d_His') . '.csv';

        $headers = [
            'Content-Type'        => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$fileName}\"",
            'Pragma'              => 'no-cache',
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Expires'             => '0',
        ];

        $columns = [
            'Kode Proyek',
            'PID / WBS',
            'Site ID',
            'Nama Site',
            'Client / Operator',
            'Konsultan Pengawas',
            'Tipe Menara',
            'Tinggi Menara',
            'Wilayah',
            'Tahap Status',
            'Progress Bobot (%)',
            'PIC Lapangan',
            'Target RFI',
        ];

        $callback = function () use ($projects, $columns) {
            $file = fopen('php://output', 'w');
            fputs($file, "\xEF\xBB\xBF");
            fputcsv($file, $columns, ';');

            foreach ($projects as $p) {
                fputcsv($file, [
                    $p->project_code,
                    $p->pid ?? '-',
                    $p->site_id,
                    $p->site_name,
                    $p->client_name ?? 'Telkomsel / Mitratel',
                    $p->konsultan ?? '-',
                    $p->tipe_tower ?? '-',
                    $p->tinggi_tower ?? '-',
                    $p->wilayah ?? '-',
                    $p->status,
                    $p->progress_percent . '%',
                    $p->picUser?->name ?? 'Tim Operasional',
                    $p->target_rfi_date ? date('Y-m-d', strtotime($p->target_rfi_date)) : '-',
                ], ';');
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}