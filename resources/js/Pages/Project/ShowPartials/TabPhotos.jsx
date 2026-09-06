import React, { useState, useMemo } from 'react';
import { Camera, ArrowLeft, Image as ImageIcon, FolderOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TabPhotos({ photos = [], onPreviewPhoto }) {
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

    // Mengelompokkan foto otomatis berdasarkan tahapan konstruksi (stage)
    const groupedPhotos = useMemo(() => {
        const groups = {};
        
        photos.forEach((pek) => {
            const stageName = pek.stage?.nama_stage || pek.kategori_tahap || 'UMUM / LAINNYA';
            const stageCode = pek.stage?.kode_stage || 'GENERAL';
            const groupKey = `${stageCode}___${stageName}`;

            if (!groups[groupKey]) {
                groups[groupKey] = {
                    title: stageName,
                    code: stageCode,
                    urutan: pek.stage?.urutan || 99,
                    items: [],
                };
            }
            groups[groupKey].items.push(pek);
        });

        return Object.values(groups).sort((a, b) => a.urutan - b.urutan);
    }, [photos]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    if (photos.length === 0) {
        return (
            <div className="py-16 text-center text-slate-400 text-xs">
                <Camera className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                <p>Belum ada foto dokumentasi lapangan di Cloudinary untuk site ini.</p>
            </div>
        );
    }

    // TAMPILAN 2: Galeri Foto Per Kategori (Setelah Kategori Diklik)
    if (selectedCategory) {
        return (
            <div className="space-y-4">
                {/* Header Kategori Minimalis */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedCategory(null)}
                            className="h-8 w-8 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-300"
                            title="Kembali"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                {selectedCategory.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono">
                                {selectedCategory.items.length} Dokumentasi Foto
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grid Foto */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
                    {selectedCategory.items.map((pek) => (
                        <div
                            key={pek.id}
                            onClick={() => onPreviewPhoto({ 
                                url: pek.foto, 
                                title: `[${pek.kode_pekerjaan}] ${pek.nama_pekerjaan}` 
                            })}
                            className="group relative rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xs cursor-pointer hover:border-blue-500/60 transition-all"
                        >
                            <div className="h-36 w-full overflow-hidden bg-slate-950">
                                <img
                                    src={pek.foto}
                                    alt={pek.nama_pekerjaan}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-3 text-xs space-y-1">
                                <span className="font-mono font-bold text-[10px] text-blue-600 dark:text-blue-400 block">
                                    {pek.kode_pekerjaan}
                                </span>
                                <h5 className="font-bold text-slate-900 dark:text-white truncate" title={pek.nama_pekerjaan}>
                                    {pek.nama_pekerjaan}
                                </h5>
                                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100 dark:border-slate-800/80">
                                    <span>{formatDate(pek.tanggal_pekerjaan)}</span>
                                    <span>{pek.pic_user?.name || 'Waslap'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // TAMPILAN 1: Menu Utama Kotak Kategori Besar (Grid 2 Kolom + Caption & Ikon Galeri)
    return (
        <div className="space-y-3">
            {/* Caption Kategori Foto */}
            <div className="flex items-center gap-2 px-1">
                <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Kategori Dokumentasi Foto
                </h4>
            </div>

            {/* Grid Kotak Kategori */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {groupedPhotos.map((group) => (
                    <div
                        key={group.title}
                        onClick={() => setSelectedCategory(group)}
                        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-blue-500/80 dark:hover:border-blue-500/80 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
                    >
                        <div className="flex items-start justify-between">
                            {/* Ikon Galeri */}
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                            <Badge variant="outline" className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-0.5">
                                {group.items.length} Foto
                            </Badge>
                        </div>

                        <div className="space-y-1">
                            <h5 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {group.title}
                            </h5>
                            <p className="text-xs text-slate-400 font-medium">
                                Ketuk untuk melihat galeri dokumentasi
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}