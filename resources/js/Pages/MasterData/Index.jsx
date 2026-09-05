import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout, { useConfirm } from '@/Layouts/AuthenticatedLayout';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Layers, 
    MapPin, 
    Briefcase, 
    ListOrdered, 
    Plus, 
    Trash2, 
    CheckCircle2, 
    ArrowRight 
} from 'lucide-react';

export default function MasterDataIndex({ areas = [], sows = [], stages = [] }) {
    const confirm = useConfirm();
    const [activeTab, setActiveTab] = useState('area'); // 'area' | 'sow' | 'stage'

    // State Modal
    const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
    const [isSowModalOpen, setIsSowModalOpen] = useState(false);
    const [isStageModalOpen, setIsStageModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [selectedStageForTask, setSelectedStageForTask] = useState(null);

    // Form Hooks
    const areaForm = useForm({ nama_area: '', regional: '' });
    const sowForm = useForm({ nama_sow: '', keterangan: '' });
    const stageForm = useForm({ kode_stage: '', nama_stage: '', urutan: stages.length + 1 });
    const taskForm = useForm({
        stage_id: '',
        sow_id: '',
        nama_task: '',
        satuan: 'Lot',
        default_bobot: 5.0,
        urutan: 1,
    });

    // Handlers Simpan
    const handleAreaSubmit = (e) => {
        e.preventDefault();
        areaForm.post(route('master-data.area.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsAreaModalOpen(false);
                areaForm.reset();
            },
        });
    };

    const handleSowSubmit = (e) => {
        e.preventDefault();
        sowForm.post(route('master-data.sow.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsSowModalOpen(false);
                sowForm.reset();
            },
        });
    };

    const handleStageSubmit = (e) => {
        e.preventDefault();
        stageForm.post(route('master-data.stage.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsStageModalOpen(false);
                stageForm.reset();
            },
        });
    };

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        taskForm.post(route('master-data.task.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsTaskModalOpen(false);
                taskForm.reset();
            },
        });
    };

    // Handlers Hapus
    const handleDelete = (title, url) => {
        confirm({
            title: `Hapus ${title}`,
            message: `Apakah kamu yakin ingin menghapus data ${title.toLowerCase()} ini? Data proyek atau pekerjaan yang terhubung mungkin akan terdampak.`,
            variant: 'danger',
            confirmText: 'Ya, Hapus',
            cancelText: 'Batal',
            onConfirm: () => {
                router.delete(url, { preserveScroll: true });
            },
        });
    };

    const openAddTaskModal = (stage) => {
        setSelectedStageForTask(stage);
        taskForm.setData({
            stage_id: stage.id,
            sow_id: sows[0]?.id ? String(sows[0].id) : '',
            nama_task: '',
            satuan: 'Lot',
            default_bobot: 5.0,
            urutan: (stage.tasks?.length || 0) + 1,
        });
        setIsTaskModalOpen(true);
    };

    return (
        <AuthenticatedLayout header="Master Data Kamus">
            <Head title="Master Data Kamus - PT Indojar Mulia Abadi" />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Keterangan */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                            Kamus Standar Proyek Telekomunikasi
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Kelola referensi terpadu untuk Area operasional, klasifikasi SOW, dan tahapan pekerjaan konstruksi menara.
                        </p>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 dark:bg-slate-900/80 rounded-2xl border border-slate-300 dark:border-slate-800 w-fit">
                    <button
                        type="button"
                        onClick={() => setActiveTab('area')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'area'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Area & Regional ({areas.length})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('sow')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'sow'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Scope of Work / SOW ({sows.length})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('stage')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'stage'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                        <ListOrdered className="w-3.5 h-3.5" />
                        <span>Tahapan & Template WBS ({stages.length})</span>
                    </button>
                </div>

                {/* ========================================================================= */}
                {/* 1. TABEL AREA & REGIONAL                                                  */}
                {/* ========================================================================= */}
                {activeTab === 'area' && (
                    <div className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Daftar Wilayah Operasional</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Pemetaan area kerja tim lapangan PT Indojar.</p>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => setIsAreaModalOpen(true)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 cursor-pointer shadow-xs"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Tambah Area</span>
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-3.5 w-16">No</th>
                                        <th className="px-6 py-3.5">Nama Area</th>
                                        <th className="px-6 py-3.5">Regional / Provinsi</th>
                                        <th className="px-6 py-3.5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                                    {areas.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                                Belum ada data Area. Silakan klik tombol "Tambah Area".
                                            </td>
                                        </tr>
                                    ) : (
                                        areas.map((a, idx) => (
                                            <tr key={a.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                                <td className="px-6 py-3 text-slate-400 font-mono">{idx + 1}</td>
                                                <td className="px-6 py-3 font-bold text-slate-900 dark:text-white">{a.nama_area}</td>
                                                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{a.regional}</td>
                                                <td className="px-6 py-3 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete('Area', route('master-data.area.destroy', a.id))}
                                                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                                        title="Hapus Area"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 2. TABEL SCOPE OF WORK (SOW)                                             */}
                {/* ========================================================================= */}
                {activeTab === 'sow' && (
                    <div className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Daftar Scope of Work (SOW)</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Klasifikasi kontrak pengerjaan menara telekomunikasi.</p>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => setIsSowModalOpen(true)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 cursor-pointer shadow-xs"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Tambah SOW</span>
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-3.5 w-16">No</th>
                                        <th className="px-6 py-3.5">Kode / Nama SOW</th>
                                        <th className="px-6 py-3.5">Keterangan / Ruang Lingkup</th>
                                        <th className="px-6 py-3.5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                                    {sows.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                                Belum ada data SOW. Silakan klik tombol "Tambah SOW".
                                            </td>
                                        </tr>
                                    ) : (
                                        sows.map((s, idx) => (
                                            <tr key={s.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                                <td className="px-6 py-3 text-slate-400 font-mono">{idx + 1}</td>
                                                <td className="px-6 py-3">
                                                    <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                        {s.nama_sow}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{s.keterangan || '-'}</td>
                                                <td className="px-6 py-3 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete('SOW', route('master-data.sow.destroy', s.id))}
                                                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                                        title="Hapus SOW"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 3. TAHAPAN & TEMPLATE WBS                                                 */}
                {/* ========================================================================= */}
                {activeTab === 'stage' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Tahapan Konstruksi & Template WBS</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Struktur fase pengerjaan beserta rincian tugas acuan.</p>
                            </div>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => setIsStageModalOpen(true)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 cursor-pointer shadow-xs"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Tambah Tahapan</span>
                            </Button>
                        </div>

                        {stages.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900/70 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                                Belum ada tahapan konstruksi. Klik tombol "Tambah Tahapan" untuk membuat tahapan baru.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {stages.map((st) => (
                                    <div
                                        key={st.id}
                                        className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3"
                                    >
                                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                                                    {st.urutan}
                                                </span>
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{st.nama_stage}</h3>
                                                <Badge variant="outline" className="font-mono text-[10px] text-slate-400">
                                                    {st.kode_stage}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openAddTaskModal(st)}
                                                    className="h-7 text-[11px] gap-1 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 cursor-pointer"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                    <span>Tambah Item WBS</span>
                                                </Button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete('Tahapan', route('master-data.stage.destroy', st.id))}
                                                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                                                    title="Hapus Tahapan"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Daftar Task WBS di Tahapan Ini */}
                                        <div className="space-y-1.5">
                                            {!st.tasks || st.tasks.length === 0 ? (
                                                <p className="text-[11px] text-slate-400 italic py-2">
                                                    Belum ada rincian tugas WBS di tahapan ini.
                                                </p>
                                            ) : (
                                                st.tasks.map((t) => (
                                                    <div
                                                        key={t.id}
                                                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 text-xs"
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                                                {t.nama_task}
                                                            </span>
                                                            {t.sow && (
                                                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                                    {t.sow.nama_sow}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-4 font-mono text-[11px]">
                                                            <span className="text-slate-400">Satuan: {t.satuan}</span>
                                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                                Bobot: {t.default_bobot}%
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete('Item Pekerjaan', route('master-data.task.destroy', t.id))}
                                                                className="text-slate-400 hover:text-rose-500 cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ========================================================================= */}
            {/* MODAL FORM TAMBAH AREA                                                    */}
            {/* ========================================================================= */}
            <Modal
                isOpen={isAreaModalOpen}
                onClose={() => setIsAreaModalOpen(false)}
                title="Tambah Master Area Operasional"
                onSubmit={handleAreaSubmit}
                submitLabel="Simpan Area"
                isProcessing={areaForm.processing}
            >
                <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                        <Label>Nama Area *</Label>
                        <Input
                            placeholder="Contoh: AREA 1, AREA 2"
                            value={areaForm.data.nama_area}
                            onChange={(e) => areaForm.setData('nama_area', e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Regional / Provinsi *</Label>
                        <Input
                            placeholder="Contoh: Jawa Barat, Banten, Jabodetabek"
                            value={areaForm.data.regional}
                            onChange={(e) => areaForm.setData('regional', e.target.value)}
                            required
                        />
                    </div>
                </div>
            </Modal>

            {/* ========================================================================= */}
            {/* MODAL FORM TAMBAH SOW                                                     */}
            {/* ========================================================================= */}
            <Modal
                isOpen={isSowModalOpen}
                onClose={() => setIsSowModalOpen(false)}
                title="Tambah Scope of Work (SOW)"
                onSubmit={handleSowSubmit}
                submitLabel="Simpan SOW"
                isProcessing={sowForm.processing}
            >
                <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                        <Label>Nama SOW *</Label>
                        <Input
                            placeholder="Contoh: B2S, COLO, CME ONLY"
                            value={sowForm.data.nama_sow}
                            onChange={(e) => sowForm.setData('nama_sow', e.target.value.toUpperCase())}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Keterangan Ruang Lingkup</Label>
                        <Input
                            placeholder="Contoh: Bangun Menara Baru dari nol"
                            value={sowForm.data.keterangan}
                            onChange={(e) => sowForm.setData('keterangan', e.target.value)}
                        />
                    </div>
                </div>
            </Modal>

            {/* ========================================================================= */}
            {/* MODAL FORM TAMBAH TAHAPAN                                                 */}
            {/* ========================================================================= */}
            <Modal
                isOpen={isStageModalOpen}
                onClose={() => setIsStageModalOpen(false)}
                title="Tambah Tahapan Konstruksi"
                onSubmit={handleStageSubmit}
                submitLabel="Simpan Tahapan"
                isProcessing={stageForm.processing}
            >
                <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>Kode Stage *</Label>
                            <Input
                                placeholder="Contoh: CIVIL, CME"
                                value={stageForm.data.kode_stage}
                                onChange={(e) => stageForm.setData('kode_stage', e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Urutan Tahap *</Label>
                            <Input
                                type="number"
                                min={1}
                                value={stageForm.data.urutan}
                                onChange={(e) => stageForm.setData('urutan', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Tahapan *</Label>
                        <Input
                            placeholder="Contoh: 2. Pekerjaan Pondasi & Sipil"
                            value={stageForm.data.nama_stage}
                            onChange={(e) => stageForm.setData('nama_stage', e.target.value)}
                            required
                        />
                    </div>
                </div>
            </Modal>

            {/* ========================================================================= */}
            {/* MODAL FORM TAMBAH ITEM TASK WBS                                          */}
            {/* ========================================================================= */}
            <Modal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                title={`Tambah Item WBS ke: ${selectedStageForTask?.nama_stage || ''}`}
                onSubmit={handleTaskSubmit}
                submitLabel="Simpan Item WBS"
                isProcessing={taskForm.processing}
            >
                <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                        <Label>Nama Pekerjaan Fisik *</Label>
                        <Input
                            placeholder="Contoh: Pengecoran Beton K-300 & Slump Test"
                            value={taskForm.data.nama_task}
                            onChange={(e) => taskForm.setData('nama_task', e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>Khusus SOW</Label>
                            <select
                                value={taskForm.data.sow_id}
                                onChange={(e) => taskForm.setData('sow_id', e.target.value)}
                                className="w-full h-9 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium"
                            >
                                <option value="">Semua SOW</option>
                                {sows.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nama_sow}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <Label>Satuan *</Label>
                            <Input
                                placeholder="Lot, M3, Kg, Titik"
                                value={taskForm.data.satuan}
                                onChange={(e) => taskForm.setData('satuan', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>Bobot Acuan (%) *</Label>
                            <Input
                                type="number"
                                step="0.1"
                                min={0}
                                max={100}
                                value={taskForm.data.default_bobot}
                                onChange={(e) => taskForm.setData('default_bobot', e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Urutan</Label>
                            <Input
                                type="number"
                                min={1}
                                value={taskForm.data.urutan}
                                onChange={(e) => taskForm.setData('urutan', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}