<?php

namespace App\Http\Controllers;

use App\Models\MasterArea;
use App\Models\MasterSow;
use App\Models\MasterStage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class MasterDataController extends Controller
{
    public function index(): Response
    {
        $this->ensureColumnsExist();

        $areas  = MasterArea::orderBy('nama_area', 'asc')->get();
        $sows   = MasterSow::orderBy('nama_sow', 'asc')->get();
        $stages = MasterStage::orderBy('urutan', 'asc')->get();

        return Inertia::render('MasterData/Index', [
            'areas'  => $areas,
            'sows'   => $sows,
            'stages' => $stages,
        ]);
    }

    private function ensureColumnsExist(): void
    {
        try {
            if (Schema::hasTable('master_sows') && !Schema::hasColumn('master_sows', 'milestones')) {
                DB::statement("ALTER TABLE master_sows ADD COLUMN milestones JSON NULL");
            }
        } catch (\Throwable $e) {
            Log::warning('Check column master_sows: ' . $e->getMessage());
        }
    }

    // --- AREA & REGIONAL ---
    public function storeArea(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama_area' => 'required|string|max:50',
            'regional'  => 'required|string|max:100',
        ]);

        MasterArea::create($validated);

        return redirect()->back()->with('success', 'Master Area berhasil ditambahkan.');
    }

    public function destroyArea(int $id): RedirectResponse
    {
        MasterArea::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Master Area berhasil dihapus.');
    }

    public function bulkDeleteArea(Request $request): RedirectResponse
    {
        $request->validate(['ids' => 'required|array']);
        MasterArea::whereIn('id', $request->ids)->delete();

        return redirect()->back()->with('success', count($request->ids) . ' Master Area berhasil dihapus.');
    }

    // --- SOW (Scope of Work) & Dynamic Timeline Milestones ---
    public function storeSow(Request $request): RedirectResponse
    {
        $this->ensureColumnsExist();

        $validated = $request->validate([
            'nama_sow'   => 'required|string|max:50|unique:master_sows,nama_sow',
            'keterangan' => 'nullable|string|max:255',
            'milestones' => 'nullable|array',
        ]);

        $validated['milestones'] = $validated['milestones'] ?? [];
        MasterSow::create($validated);

        return redirect()->back()->with('success', 'Master SOW berhasil ditambahkan.');
    }

    public function updateSow(Request $request, int $id): RedirectResponse
    {
        $this->ensureColumnsExist();

        $sow = MasterSow::findOrFail($id);
        $validated = $request->validate([
            'nama_sow'   => 'required|string|max:50|unique:master_sows,nama_sow,' . $sow->id,
            'keterangan' => 'nullable|string|max:255',
            'milestones' => 'nullable|array',
        ]);

        $validated['milestones'] = $validated['milestones'] ?? [];
        $sow->update($validated);

        return redirect()->back()->with('success', 'Konfigurasi SOW berhasil diperbarui.');
    }

    public function destroySow(int $id): RedirectResponse
    {
        MasterSow::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Master SOW berhasil dihapus.');
    }

    public function bulkDeleteSow(Request $request): RedirectResponse
    {
        $request->validate(['ids' => 'required|array']);
        MasterSow::whereIn('id', $request->ids)->delete();

        return redirect()->back()->with('success', count($request->ids) . ' Master SOW berhasil dihapus.');
    }

    // --- TAHAPAN (Stage / Fase Konstruksi) ---
    public function storeStage(Request $request): RedirectResponse
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

    public function updateStage(Request $request, int $id): RedirectResponse
    {
        $stage = MasterStage::findOrFail($id);
        $validated = $request->validate([
            'kode_stage' => 'required|string|max:30|unique:master_stages,kode_stage,' . $stage->id,
            'nama_stage' => 'required|string|max:100',
            'urutan'     => 'required|integer|min:1',
        ]);

        $validated['kode_stage'] = strtoupper(trim($validated['kode_stage']));
        $stage->update($validated);

        return redirect()->back()->with('success', 'Master Tahapan berhasil diperbarui.');
    }

    public function destroyStage(int $id): RedirectResponse
    {
        MasterStage::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Master Tahapan berhasil dihapus.');
    }

    public function bulkDeleteStage(Request $request): RedirectResponse
    {
        $request->validate(['ids' => 'required|array']);
        MasterStage::whereIn('id', $request->ids)->delete();

        return redirect()->back()->with('success', count($request->ids) . ' Master Tahapan berhasil dihapus.');
    }
}