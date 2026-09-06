import React from 'react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const FIELD_DEFINITIONS = [
    { key: 'tgl_po', label: 'Tanggal Surat Pesanan (PO)' },
    { key: 'tgl_mos', label: 'Material on Site (MoS)' },
    { key: 'tgl_start', label: 'Start Konstruksi' },
    { key: 'tgl_done', label: 'Fisik Selesai (Done)' },
    { key: 'target_rfi_date', label: 'Target RFI', isHighlight: true },
    { key: 'tgl_atp', label: 'Uji Terima (ATP Bersama)' },
    { key: 'tgl_bast', label: 'BAST Resmi' },
    { key: 'tgl_baut', label: 'BAUT' },
    { key: 'tgl_invoice', label: 'Pengajuan Invoice' },
];

export default function ModalTimeline({
    isOpen,
    onClose,
    siteId,
    sow,
    timelineData,
    setTimelineData,
    onSubmit,
    isProcessing,
}) {
    // Tentukan field apa saja yang aktif berdasarkan SOW
    const activeKeys = Array.isArray(sow?.milestones) && sow.milestones.length > 0
        ? sow.milestones
        : FIELD_DEFINITIONS.map(f => f.key);

    const activeFields = FIELD_DEFINITIONS.filter(f => activeKeys.includes(f.key));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Perbarui Milestone: ${siteId} (${sow?.nama_sow || 'SOW'})`}
            onSubmit={onSubmit}
            submitLabel="Simpan Milestone"
            isProcessing={isProcessing}
        >
            <div className="space-y-4 text-xs">
                <p className="text-[11px] text-slate-400">
                    Menampilkan tahapan tanggal yang terdaftar pada SOW <strong>{sow?.nama_sow || 'B2S'}</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeFields.map((field) => (
                        <div key={field.key} className="space-y-1">
                            <Label className={`text-[11px] ${field.isHighlight ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>
                                {field.label}
                            </Label>
                            <Input
                                type="date"
                                value={timelineData[field.key] || ''}
                                onChange={(e) => setTimelineData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                className={`h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer ${field.isHighlight ? 'font-bold border-emerald-500/50' : ''}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}