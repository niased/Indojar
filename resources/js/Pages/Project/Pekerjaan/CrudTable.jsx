import React, { useMemo, useState } from 'react';
import Tabel from '@/components/Tabel';
import { Badge } from '@/components/ui/badge';
import { Calendar, Image as ImageIcon, ExternalLink, X } from 'lucide-react';

export default function CrudTablePekerjaan({
    dataList = [],
    selectedIds = [],
    onSelectAll,
    onSelectRow,
    onEditRow,
    getRowNumber,
    zoomLevel = 100,
}) {
    const getItemId = (item) => item?.id;
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const getTahapBadge = (kode) => {
        const k = String(kode || '').toUpperCase();
        if (k.includes('PONDASI') || k.includes('CIVIL')) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
        if (k.includes('ERECTION')) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
        if (k.includes('CME') || k.includes('POWER')) return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
        if (k.includes('ATP') || k.includes('RFI')) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    };

    const formatDateTime = (dateStr, timestamp) => {
        const target = timestamp || dateStr;
        if (!target) return '-';
        try {
            const d = new Date(target);
            if (isNaN(d.getTime())) return '-';
            return d.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return '-';
        }
    };

    const columns = useMemo(
        () => [
            {
                key: 'kode_pekerjaan',
                label: 'Kode WBS',
                render: (item) => (
                    <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                        {item.kode_pekerjaan}
                    </span>
                ),
            },
            {
                key: 'tahap',
                label: 'Tahapan Konstruksi',
                render: (item) => {
                    const namaTahap = item.stage?.nama_stage || item.kategori_tahap || 'PONDASI';
                    return (
                        <Badge className={`text-[10px] font-bold px-2 py-0.5 border uppercase ${getTahapBadge(namaTahap)}`}>
                            {item.stage?.kode_stage || item.kategori_tahap || 'CIVIL'}
                        </Badge>
                    );
                },
            },
            {
                key: 'nama_pekerjaan',
                label: 'Uraian Laporan Pekerjaan Fisik',
                render: (item) => (
                    <div className="max-w-[320px] sm:max-w-[420px] whitespace-normal break-words text-xs text-slate-700 dark:text-slate-300 leading-relaxed py-1">
                        <span className="font-semibold text-slate-900 dark:text-white block">
                            {item.nama_pekerjaan}
                        </span>
                        {item.catatan && (
                            <span className="text-[11px] text-slate-400 block mt-0.5" title={item.catatan}>
                                {item.catatan}
                            </span>
                        )}
                    </div>
                ),
            },
            {
                key: 'satuan',
                label: 'Satuan',
                render: (item) => (
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {item.satuan || 'Lot'}
                    </span>
                ),
            },
            {
                key: 'foto_bukti',
                label: 'Eviden Foto',
                render: (item) => {
                    const isIssue = String(item.tipe_foto || '').toUpperCase() === 'ISSUE';

                    return (
                        <div className="flex flex-col items-center gap-1 py-1">
                            {item.foto ? (
                                <button
                                    type="button"
                                    onClick={() => setPreviewPhoto({ url: item.foto, title: item.nama_pekerjaan })}
                                    className={`w-9 h-9 rounded-lg overflow-hidden border ${
                                        isIssue 
                                            ? 'border-rose-500/60 ring-1 ring-rose-500/30' 
                                            : 'border-slate-200 dark:border-slate-700'
                                    } hover:scale-105 transition-transform cursor-pointer relative group shrink-0`}
                                >
                                    <img
                                        src={item.foto}
                                        alt={item.nama_pekerjaan}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                        <ExternalLink className="w-3 h-3" />
                                    </div>
                                </button>
                            ) : (
                                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                                    <ImageIcon className="w-4 h-4 opacity-40" />
                                </div>
                            )}

                            <span className={`text-[9px] font-mono font-black uppercase tracking-wider ${
                                isIssue 
                                    ? 'text-rose-500 dark:text-rose-400' 
                                    : 'text-blue-500 dark:text-blue-400'
                            }`}>
                                {isIssue ? 'Issue' : 'Eviden'}
                            </span>
                        </div>
                    );
                },
            },
            {
                key: 'tanggal_pic',
                label: 'Waktu Lapor & PIC',
                render: (item) => (
                    <div className="flex flex-col text-xs leading-tight">
                        <div className="flex items-center gap-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                            <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{formatDateTime(item.tanggal_pekerjaan, item.created_at)}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                            {item.pic_user?.name || 'Waslap Lapangan'}
                        </span>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <>
            <Tabel
                data={dataList}
                columns={columns}
                selectedIds={selectedIds}
                onSelectAll={onSelectAll}
                onSelectRow={onSelectRow}
                onEditRow={onEditRow}
                getItemId={getItemId}
                getRowNumber={getRowNumber}
                zoomLevel={zoomLevel}
                emptyMessage="Belum ada laporan pekerjaan fisik pada site ini."
            />

            {previewPhoto && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
                    onClick={() => setPreviewPhoto(null)}
                >
                    <div
                        className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-3 border-b border-slate-800">
                            <h4 className="text-xs font-bold text-white truncate max-w-md">
                                {previewPhoto.title}
                            </h4>
                            <div className="flex items-center gap-2">
                                <a
                                    href={previewPhoto.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                                >
                                    <span>Buka Ukuran Penuh</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setPreviewPhoto(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-2 flex justify-center bg-slate-950 rounded-xl overflow-hidden">
                            <img
                                src={previewPhoto.url}
                                alt={previewPhoto.title}
                                className="max-h-[70vh] object-contain rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}