<?php

namespace App\Http\Controllers;

use App\Models\MasterArea;
use App\Models\MasterSow;
use App\Models\MasterStage;
use App\Models\MasterTask;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MasterDataController extends Controller
{
    public function index(): Response
    {
        $areas  = MasterArea::orderBy('nama_area', 'asc')->get();
        $sows   = MasterSow::orderBy('nama_sow', 'asc')->get();
        $stages = MasterStage::with(['tasks.sow'])->orderBy('urutan', 'asc')->get();

        return Inertia::render('MasterData/Index', [
            'areas'  => $areas,
            'sows'   => $sows,
            'stages' => $stages,
        ]);
    }

    // --- AREA & REGIONAL ---
    public function storeArea(Request $request)
    {
        $validated = $request->validate([
            'nama_area' => 'required|string|max:50',
            'regional'  => 'required|string|max:100',
        ]);

        MasterArea::create($validated);
        return redirect()->back()->with('success', 'Master Area berhasil ditambahkan.');
    }

    public function destroyArea(int $id)
    {
        MasterArea::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Master Area berhasil dihapus.');
    }

    // --- SOW (Scope of Work) ---
    public function storeSow(Request $request)
    {
        $validated = $request->validate([
            'nama_sow'   => 'required|string|max:50|unique:master_sows,nama_sow',
            'keterangan' => 'nullable|string|max:255',
        ]);

        MasterSow::create($validated);
        return redirect()->back()->with('success', 'Master SOW berhasil ditambahkan.');
    }

    public function destroySow(int $id)
    {
        MasterSow::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Master SOW berhasil dihapus.');
    }

    // --- TAHAPAN (Milestone) ---
    public function storeStage(Request $request)
    {
        $validated = $request->validate([
            'kode_stage' => 'required|string|max:30|unique:master_stages,kode_stage',
            'nama_stage' => 'required|string|max:100',
            'urutan'     => 'required|integer|min:1',
        ]);

        $validated['kode_stage'] = strtoupper(trim($validated['kode_stage']));
        MasterStage::create($validated);
        return redirect()->back()->with('success', 'Master Tahapan berhasil ditambahkan.');
    }

    public function destroyStage(int $id)
    {
        MasterStage::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Master Tahapan berhasil dihapus.');
    }

    // --- TEMPLATE TASK / WBS ACUAN ---
    public function storeTask(Request $request)
    {
        $validated = $request->validate([
            'stage_id'      => 'required|exists:master_stages,id',
            'sow_id'        => 'nullable|exists:master_sows,id',
            'nama_task'     => 'required|string|max:255',
            'satuan'        => 'required|string|max:30',
            'default_bobot' => 'required|numeric|between:0,100',
            'urutan'        => 'nullable|integer',
        ]);

        MasterTask::create($validated);
        return redirect()->back()->with('success', 'Template Pekerjaan berhasil ditambahkan.');
    }

    public function destroyTask(int $id)
    {
        MasterTask::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Template Pekerjaan berhasil dihapus.');
    }
}