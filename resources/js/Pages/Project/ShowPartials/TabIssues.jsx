import React, { useState, useMemo } from 'react';
import { AlertTriangle, ArrowLeft, CheckCircle2, FolderKanban, ExternalLink, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TabIssues({ issues = [], onPreviewPhoto }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [localPreview, setLocalPreview] = useState(null);

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

    // Kelompokkan isu otomatis berdasarkan kategori / tahapan
    const groupedIssues = useMemo(() => {
        const groups = {};

        issues.forEach((issue) => {
            const categoryName = issue.kategori || 'UMUM / LAINNYA';
            if (!groups[categoryName]) {
                groups[categoryName] = {
                    title: categoryName,
                    items: [],
                };
            }
            groups[categoryName].items.push(issue);
        });

        return Object.values(groups);
    }, [issues]);

    const handleOpenPhoto = (url, title) => {
        if (onPreviewPhoto) {
            onPreviewPhoto({ url, title });
        } else {
            setLocalPreview({ url, title });
        }
    };

    if (issues.length === 0) {
        return (
            <div className="py-16 text-center text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                <p>Tidak ada kendala aktif yang dilaporkan pada site ini.</p>
            </div>
        );
    }

    // TAMPILAN 2: Rincian Foto & Isu dalam Kategori Terpilih
    if (selectedCategory) {
        return (
            <div className="space-y-4">
                {/* Header Navigasi Minimalis */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedCategory(null)}
                            className="h-8 w-8 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-300"
                            title="Kembali ke Kategori"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                {selectedCategory.title}
                            </h4>
                            <span className="text-[10px] text-rose-500 dark:text-rose-400 font-mono">
                                {selectedCategory.items.length} Kendala Dilaporkan
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grid Foto & Kartu Isu Lapangan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-200">
                    {selectedCategory.items.map((issue) => (
                        <div
                            key={issue.id}
                            className="group relative rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xs flex flex-col justify-between hover:border-rose-500/60 transition-all"
                        >
                            {/* Area Foto Kendala */}
                            {issue.foto ? (
                                <div 
                                    onClick={() => handleOpenPhoto(issue.foto, issue.judul_isu)}
                                    className="h-36 w-full overflow-hidden bg-slate-950 cursor-pointer relative"
                                >
                                    <img
                                        src={issue.foto}
                                        alt={issue.judul_isu}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                        <ExternalLink className="w-3 h-3" />
                                    </div>
                                </div>
                            ) : (
                                <div className="h-28 w-full bg-slate-100 dark:bg-slate-800/40 flex items-center justify-center text-slate-400">
                                    <AlertTriangle className="w-6 h-6 opacity-30 text-rose-500" />
                                </div>
                            )}

                            {/* Deskripsi & Keterangan */}
                            <div className="p-3 text-xs space-y-1.5 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="font-mono font-bold text-[10px] text-rose-600 dark:text-rose-400 block">
                                        {issue.kode_pekerjaan || 'KENDALA'}
                                    </span>
                                    <h5 className="font-bold text-slate-900 dark:text-white truncate" title={issue.nama_pekerjaan || issue.judul_isu}>
                                        {issue.nama_pekerjaan || issue.judul_isu}
                                    </h5>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                                        {issue.deskripsi}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                    <span>{formatDate(issue.tanggal_terjadi)}</span>
                                    <span>{issue.pic_user?.name || 'Waslap'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // TAMPILAN 1: Menu Kotak Kategori Grid
    return (
        <div className="space-y-3">
            {/* Caption Header */}
            <div className="flex items-center gap-2 px-1">
                <FolderKanban className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Kategori Kendala Lapangan
                </h4>
            </div>

            {/* Grid Kotak Kategori Kendala */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {groupedIssues.map((group) => (
                    <div
                        key={group.title}
                        onClick={() => setSelectedCategory(group)}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-rose-500/80 dark:hover:border-rose-500/80 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
                    >
                        <div className="flex items-start justify-between">
                            <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />

                            <Badge variant="outline" className="text-xs font-mono font-bold bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 px-2.5 py-0.5">
                                {group.items.length} Kendala
                            </Badge>
                        </div>

                        <div className="space-y-1">
                            <h5 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                {group.title}
                            </h5>
                            <p className="text-xs text-slate-400 font-medium">
                                Ketuk untuk melihat foto & rincian kendala
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fallback Lightbox Modal */}
            {localPreview && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setLocalPreview(null)}
                >
                    <div
                        className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-3 border-b border-slate-800">
                            <h4 className="text-xs font-bold text-white truncate max-w-md">
                                {localPreview.title}
                            </h4>
                            <div className="flex items-center gap-2">
                                <a
                                    href={localPreview.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                                >
                                    <span>Buka Ukuran Asli</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setLocalPreview(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-2 flex justify-center bg-slate-950 rounded-xl overflow-hidden">
                            <img
                                src={localPreview.url}
                                alt={localPreview.title}
                                className="max-h-[70vh] object-contain rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}