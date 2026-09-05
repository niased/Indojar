import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function TabIssues({ issues = [] }) {
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

    if (issues.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-900/70 p-10 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                <p>Tidak ada kendala aktif yang dilaporkan pada site ini.</p>
            </div>
        );
    }

    return (
        <div className="space-y-2.5">
            {issues.map((issue) => (
                <div 
                    key={issue.id} 
                    className="bg-white dark:bg-slate-900/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                            <span className="font-bold text-slate-900 dark:text-white">{issue.judul_isu}</span>
                            <Badge className="text-[9px] font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20 uppercase">
                                {issue.severity}
                            </Badge>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">{formatDate(issue.tanggal_terjadi)}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{issue.deskripsi}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400 font-mono">
                        <span>Kategori: {issue.kategori}</span>
                        <span>Status: <strong>{issue.status}</strong></span>
                    </div>
                </div>
            ))}
        </div>
    );
}