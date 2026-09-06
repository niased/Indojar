import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Briefcase, Clock, CheckSquare, Square } from 'lucide-react';

export const MASTER_MILESTONES_LIST = [
    { key: 'tgl_po', label: 'Surat Pesanan (PO)' },
    { key: 'tgl_mos', label: 'Material on Site (MoS)' },
    { key: 'tgl_start', label: 'Start Konstruksi / Pengerjaan' },
    { key: 'tgl_done', label: 'Fisik Selesai (Done)' },
    { key: 'target_rfi_date', label: 'Target RFI' },
    { key: 'tgl_atp', label: 'ATP Bersama' },
    { key: 'tgl_bast', label: 'BAST Resmi' },
    { key: 'tgl_baut', label: 'BAUT' },
    { key: 'tgl_invoice', label: 'Pengajuan Invoice' },
];

export default function ModalSow({
    isOpen,
    onClose,
    isEditMode = false,
    selectedItem = null,
}) {
    const { data, setData, post, put, processing, reset } = useForm({
        nama_sow: '',
        keterangan: '',
        milestones: [],
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                setData({
                    nama_sow: selectedItem.nama_sow || '',
                    keterangan: selectedItem.keterangan || '',
                    milestones: Array.isArray(selectedItem.milestones) ? selectedItem.milestones : [],
                });
            } else {
                setData({
                    nama_sow: '',
                    keterangan: '',
                    milestones: [],
                });
            }
        } else {
            reset();
        }
    }, [isOpen, isEditMode, selectedItem]);

    const toggleMilestone = (key) => {
        const current = data.milestones || [];
        if (current.includes(key)) {
            setData('milestones', current.filter((k) => k !== key));
        } else {
            setData('milestones', [...current, key]);
        }
    };

    const handleSelectAll = () => {
        setData('milestones', MASTER_MILESTONES_LIST.map((m) => m.key));
    };

    const handleClearAll = () => {
        setData('milestones', []);
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (isEditMode && selectedItem) {
            put(route('master-data.sow.update', selectedItem.id), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            post(route('master-data.sow.store'), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? `Edit Konfigurasi SOW: ${selectedItem?.nama_sow || ''}` : 'Tambah Scope of Work (SOW)'}
            onSubmit={handleSubmit}
            submitLabel={isEditMode ? 'Simpan Perubahan' : 'Simpan SOW'}
            isProcessing={processing}
        >
            <div className="space-y-4 text-xs">
                {/* Banner Konteks */}
                <Alert className="bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 p-2.5 rounded-xl flex items-start gap-2 shadow-xs">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <AlertDescription className="text-xs leading-relaxed">
                        Klasifikasi SOW menentukan alur kerja kontrak dan menyaring milestone tanggal proyek secara dinamis.
                    </AlertDescription>
                </Alert>

                {/* Kontainer Form Input */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3.5">
                    <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            Nama SOW *
                        </Label>
                        <Input
                            placeholder="Contoh: B2S SACME, COLO, STRENGTHENING"
                            value={data.nama_sow}
                            onChange={(e) => setData('nama_sow', e.target.value.toUpperCase())}
                            className="h-8 text-xs font-mono font-bold uppercase bg-white dark:bg-slate-900"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            Keterangan Ruang Lingkup
                        </Label>
                        <Input
                            placeholder="Uraian ringkas ruang lingkup pekerjaan..."
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                            className="h-8 text-xs bg-white dark:bg-slate-900 font-medium"
                        />
                    </div>

                    {/* Pemilihan Milestone Dinamis */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/80">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold text-[11px]">
                                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                <span>Pilih Milestone Tanggal yang Aktif:</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px]">
                                <button
                                    type="button"
                                    onClick={handleSelectAll}
                                    className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                                >
                                    Pilih Semua
                                </button>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    className="text-slate-500 hover:underline cursor-pointer"
                                >
                                    Kosongkan
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {MASTER_MILESTONES_LIST.map((m) => {
                                const isChecked = (data.milestones || []).includes(m.key);
                                return (
                                    <div
                                        key={m.key}
                                        onClick={() => toggleMilestone(m.key)}
                                        className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-all select-none ${
                                            isChecked
                                                ? 'border-blue-500/80 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 shadow-xs'
                                                : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                        }`}
                                    >
                                        {isChecked ? (
                                            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                        ) : (
                                            <Square className="w-4 h-4 text-slate-400 shrink-0" />
                                        )}
                                        <span className="text-[11px] font-semibold">{m.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}