import React from 'react';
import { Edit3, Clock } from 'lucide-react';

export default function ProjectSidebar({
    project,
    stageBreakdown = [],
    onOpenTimeline,
}) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return '-';
            return d.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        } catch {
            return '-';
        }
    };

    const progressTotal = Number(project?.progress_percent || 0);

    const allMilestones = [
        { key: 'tgl_po', label: 'Surat Pesanan (PO)', date: project?.tgl_po },
        { key: 'tgl_mos', label: 'Material on Site (MoS)', date: project?.tgl_mos },
        { key: 'tgl_start', label: 'Start Konstruksi', date: project?.tgl_start },
        { key: 'tgl_done', label: 'Fisik Selesai (Done)', date: project?.tgl_done },
        { key: 'target_rfi_date', label: 'Target RFI', date: project?.target_rfi_date, isHighlight: true },
        { key: 'tgl_atp', label: 'ATP Bersama', date: project?.tgl_atp },
        { key: 'tgl_bast', label: 'BAST Resmi', date: project?.tgl_bast },
        { key: 'tgl_baut', label: 'BAUT', date: project?.tgl_baut },
        { key: 'tgl_invoice', label: 'Pengajuan Invoice', date: project?.tgl_invoice },
    ];

    const activeMilestoneKeys = Array.isArray(project?.sow?.milestones) && project.sow.milestones.length > 0
        ? project.sow.milestones
        : allMilestones.map(m => m.key);

    const filteredMilestones = allMilestones.filter(m => activeMilestoneKeys.includes(m.key));

    const getAreaName = () => {
        if (project?.area && typeof project.area === 'object') return project.area.nama_area || '-';
        if (project?.regional && typeof project.regional === 'object') return project.regional.nama_regional || '-';
        if (typeof project?.area === 'string' && project.area) return project.area;
        if (typeof project?.regional === 'string' && project.regional) return project.regional;
        return '-';
    };

    const getOperatorName = () => {
        if (project?.operator && typeof project.operator === 'object') return project.operator.nama_operator || '-';
        return project?.client_name || project?.customer || 'Telkomsel / Mitratel';
    };

    const getPicName = () => {
        if (project?.picUser && typeof project.picUser === 'object') return project.picUser.name || 'Waslap Lapangan';
        if (typeof project?.pic_waslap === 'string' && project.pic_waslap) return project.pic_waslap;
        return 'Waslap Lapangan';
    };

    const specItems = [
        { 
            label: 'Tinggi Menara', 
            value: project?.tinggi_tower ? `${project.tinggi_tower} M` : (project?.tower_height ? `${project.tower_height} M` : '-') 
        },
        { 
            label: 'Tipe Menara', 
            value: typeof project?.tipe_menara === 'string' ? project.tipe_menara : (project?.tower_type || 'SST 4 LEGS') 
        },
        { 
            label: 'Nomor PO / SPK', 
            value: typeof project?.nomor_po === 'string' ? project.nomor_po : (project?.po_number || '-') 
        },
        { 
            label: 'Klien / Operator', 
            value: getOperatorName() 
        },
        { 
            label: 'Area Operasional', 
            value: getAreaName() 
        },
        { 
            label: 'PIC Waslap', 
            value: getPicName() 
        },
    ];

    return (
        <div className="space-y-4">
            {/* KARTU 1: OVERVIEW CAPAIAN PROYEK & SPESIFIKASI */}
            <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        <span>Akumulasi Capaian Proyek</span>
                        {project?.target_rfi_date && (
                            <span>Target RFI: {formatDate(project.target_rfi_date)}</span>
                        )}
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                            {progressTotal.toFixed(1)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${
                                progressTotal >= 100
                                    ? 'bg-emerald-500'
                                    : 'bg-gradient-to-r from-blue-600 to-amber-400'
                            }`}
                            style={{ width: `${Math.min(100, progressTotal)}%` }}
                        />
                    </div>
                </div>

                {/* Progres Per Tahapan Lengkap dengan Bobotnya */}
                {stageBreakdown.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Progres per Tahapan Konstruksi
                        </span>
                        <div className="space-y-2.5">
                            {stageBreakdown.map((stage) => (
                                <div key={stage.id || stage.name} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {stage.name}{' '}
                                            <span className="text-[10px] text-slate-400 font-mono font-normal">
                                                (Bobot: {stage.totalBobot}%)
                                            </span>
                                        </span>
                                        <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                                            {stage.progressPercent}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 dark:bg-amber-400 rounded-full transition-all duration-300"
                                            style={{ width: `${stage.progressPercent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                    {specItems.map((spec) => (
                        <div key={spec.label} className="flex items-center justify-between py-1">
                            <span className="text-slate-400 font-medium">{spec.label}</span>
                            <span 
                                className="font-semibold text-slate-800 dark:text-slate-200 text-right truncate max-w-[180px]"
                                title={String(spec.value)}
                            >
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* KARTU 2: TIMELINE MILESTONE */}
            <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                            Timeline Milestone ({project?.sow?.nama_sow || 'SOW'})
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onOpenTimeline}
                        className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors"
                    >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                    </button>
                </div>

                <div className="space-y-2.5 text-xs">
                    {filteredMilestones.map((item) => {
                        const hasDate = Boolean(item.date);
                        return (
                            <div key={item.key} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            hasDate ? 'bg-emerald-500 ring-2 ring-emerald-500/20' : 'bg-slate-300 dark:bg-slate-700'
                                        }`}
                                    />
                                    <span className={item.isHighlight ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>
                                        {item.label}
                                    </span>
                                </div>
                                <span className={`font-mono text-[11px] ${hasDate ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                                    {formatDate(item.date)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}