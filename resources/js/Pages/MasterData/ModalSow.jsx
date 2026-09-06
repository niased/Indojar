import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock } from 'lucide-react';

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
        milestones: MASTER_MILESTONES_LIST.map((m) => m.key),
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                setData({
                    nama_sow: selectedItem.nama_sow || '',
                    keterangan: selectedItem.keterangan || '',
                    milestones: Array.isArray(selectedItem.milestones) && selectedItem.milestones.length > 0
                        ? selectedItem.milestones
                        : MASTER_MILESTONES_LIST.map((m) => m.key),
                });
            } else {
                setData({
                    nama_sow: '',
                    keterangan: '',
                    milestones: MASTER_MILESTONES_LIST.map((m) => m.key),
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
                <div className="space-y-1">
                    <Label className="font-bold">Nama SOW *</Label>
                    <Input
                        placeholder="Contoh: B2S SACME, COLO, STRENGTHENING"
                        value={data.nama_sow}
                        onChange={(e) => setData('nama_sow', e.target.value.toUpperCase())}
                        className="h-8 font-mono font-bold uppercase bg-white dark:bg-slate-950"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-bold">Keterangan Ruang Lingkup</Label>
                    <Input
                        placeholder="Contoh: Pembangunan Menara Baru (Greenfield / Rooftop)"
                        value={data.keterangan}
                        onChange={(e) => setData('keterangan', e.target.value)}
                        className="h-8 bg-white dark:bg-slate-950"
                    />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Pilih Milestone Tanggal yang Berlaku untuk SOW Ini:</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                        Milestone yang dicentang akan otomatis muncul di timeline proyek bersangkutan[cite: 2].
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {MASTER_MILESTONES_LIST.map((m) => {
                            const isChecked = (data.milestones || []).includes(m.key);
                            return (
                                <label
                                    key={m.key}
                                    onClick={() => toggleMilestone(m.key)}
                                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                                        isChecked
                                            ? 'border-blue-500/80 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200'
                                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {}}
                                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                                    />
                                    <span className="text-xs font-semibold">{m.label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Modal>
    );
}