import React from 'react';
import { Camera } from 'lucide-react';

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

    if (photos.length === 0) {
        return (
            <div className="p-12 text-center bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                <Camera className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                <p>Belum ada foto dokumentasi lapangan di Cloudinary untuk site ini.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((pek) => (
                <div 
                    key={pek.id}
                    onClick={() => onPreviewPhoto({ url: pek.foto, title: `[${pek.kode_pekerjaan}] ${pek.nama_pekerjaan}` })}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                    <div className="h-40 w-full overflow-hidden bg-slate-950">
                        <img 
                            src={pek.foto} 
                            alt={pek.nama_pekerjaan} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="p-3 text-xs space-y-1">
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {pek.stage?.nama_stage || pek.kategori_tahap || 'WBS'}
                        </span>
                        <h5 className="font-bold text-slate-900 dark:text-white truncate" title={pek.nama_pekerjaan}>
                            {pek.nama_pekerjaan}
                        </h5>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100 dark:border-slate-800">
                            <span>{formatDate(pek.tanggal_pekerjaan)}</span>
                            <span>{pek.pic_user?.name || 'Waslap'}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}