import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Milestone, MapPin, Calendar } from 'lucide-react';

export default function ProjectSidebar({ project, stageBreakdown = [], onOpenTimeline }) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return '-';
            return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch {
            return '-';
        }
    };

    const timelineMilestones = [
        { key: 'tgl_po', label: 'Surat Pesanan (PO)', date: project.tgl_po },
        { key: 'tgl_mos', label: 'Material on Site (MoS)', date: project.tgl_mos },
        { key: 'tgl_start', label: 'Start Konstruksi', date: project.tgl_start },
        { key: 'tgl_done', label: 'Fisik Selesai (Done)', date: project.tgl_done },
        { key: 'target_rfi_date', label: 'Target RFI', date: project.target_rfi_date },
        { key: 'tgl_atp', label: 'ATP Bersama', date: project.tgl_atp },
        { key: 'tgl_bast', label: 'BAST Resmi', date: project.tgl_bast },
    ];

    return (
        <div className="space-y-4">
            {/* Card 1: Spesifikasi & Progres Site */}
            <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Akumulasi Capaian Proyek
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                        <span className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                            {project.progress_percent || 0}%
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                            Target RFI: {formatDate(project.target_rfi_date)}
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-2">
                        <div 
                            className={`h-full rounded-full transition-all duration-700 ${
                                (project.progress_percent || 0) >= 100 ? 'bg-emerald-500' : 'bg-emerald-600 dark:bg-amber-400'
                            }`}
                            style={{ width: `${Math.min(100, project.progress_percent || 0)}%` }}
                        />
                    </div>
                </div>

                {/* Progres per Tahapan Mini Bars */}
                {stageBreakdown.length > 0 && (
                    <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Progres per Tahapan Konstruksi
                        </span>
                        {stageBreakdown.map((st) => (
                            <div key={st.name} className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[170px]">{st.name}</span>
                                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">{st.progressPercent}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-emerald-600 dark:bg-amber-400 h-full rounded-full" 
                                        style={{ width: `${st.progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Spesifikasi Teknis */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Tinggi Menara</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{project.tinggi_tower}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Tipe Menara</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{project.tipe_tower}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Nomor PO / SPK</span>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{project.no_po || '-'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Klien / Operator</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{project.client_name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Area Operasional</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                            {project.area?.nama_area || '-'} ({project.area?.regional || '-'})
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">PIC Waslap</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{project.pic_user?.name || 'Belum ditugaskan'}</span>
                    </div>
                </div>

                {project.latitude && project.longitude && (
                    <div className="pt-2">
                        <a
                            href={`https://www.google.com/maps?q=${project.latitude},${project.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 text-xs font-bold hover:bg-blue-100 transition-colors"
                        >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Buka Google Maps</span>
                        </a>
                    </div>
                )}
            </div>

            {/* Card 2: Timeline Milestone (Di bawah sidebar utama) */}
            <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                        <Milestone className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            Timeline Milestone
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onOpenTimeline}
                        className="text-[11px] font-bold text-emerald-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                        Edit
                    </button>
                </div>

                <div className="space-y-2.5 text-xs">
                    {timelineMilestones.map((m) => {
                        const isPassed = Boolean(m.date);
                        return (
                            <div key={m.key} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${isPassed ? 'bg-emerald-500 ring-2 ring-emerald-500/20' : 'bg-slate-300 dark:bg-slate-700'}`} />
                                    <span className={`truncate text-xs ${isPassed ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-400'}`}>
                                        {m.label}
                                    </span>
                                </div>
                                <span className={`font-mono text-[11px] ${isPassed ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
                                    {formatDate(m.date)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}