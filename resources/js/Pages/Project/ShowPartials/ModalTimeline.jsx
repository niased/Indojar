import React from 'react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ModalTimeline({
    isOpen,
    onClose,
    siteId,
    timelineData,
    setTimelineData,
    onSubmit,
    isProcessing,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Perbarui Milestone: ${siteId}`}
            onSubmit={onSubmit}
            submitLabel="Simpan Milestone"
            isProcessing={isProcessing}
        >
            <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px]">Tanggal PO</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_po}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_po: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[11px]">Material on Site (MoS)</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_mos}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_mos: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px]">Start Konstruksi</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_start}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_start: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[11px]">Fisik Selesai (Done)</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_done}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_done: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px] font-bold text-emerald-600">Target RFI</Label>
                        <Input
                            type="date"
                            value={timelineData.target_rfi_date}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, target_rfi_date: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer font-bold"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[11px]">Uji Terima (ATP)</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_atp}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_atp: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px]">BAST</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_bast}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_bast: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[11px]">BAUT</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_baut}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_baut: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[11px]">Invoice</Label>
                        <Input
                            type="date"
                            value={timelineData.tgl_invoice}
                            onChange={(e) => setTimelineData(prev => ({ ...prev, tgl_invoice: e.target.value }))}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}