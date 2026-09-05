import React, { useMemo, useState } from 'react';
import Tabel from '@/components/Tabel';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { ExternalLink, Calendar, Image as ImageIcon, X } from 'lucide-react';

export default function CrudTablePekerjaan({
    dataList = [],
    selectedIds = [],
    onSelectAll,
    onSelectRow,
    onEditRow,
    getRowNumber,
    zoomLevel = 100
}) {
    const getItemId = (item) => item?.id;
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const getTahapBadge = (kode) => {
        const k = String(kode || '').toUpperCase();
        if (k.includes('PONDASI') || k.includes('CIVIL')) {
            return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
        }
        if (k.includes('ERECTION')) {
            return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
        }
        if (k.includes('CME') || k.includes('POWER')) {
            return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30';
        }
        if (k.includes('ATP') || k.includes('RFI')) {
            return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
        }
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30';
    };

    const columns = useMemo(() => [
        {
            key: 'site_info',
            label: 'SITE PROYEK',
            render: (item) => (
                <div className="flex flex-col max-w-[180px] leading-tight">
                    <Link
                        href={route('project.show', item.project?.id || item.project_id)}
                        className="font-mono font-black text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 w-fit"
                    >
                        <span>{item.project?.site_id || 'SITE'}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5" title={item.project?.site_name}>
                        {item.project?.site_name || '-'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                        {item.project?.area?.nama_area || ''} {item.project?.sow ? `• ${item.project.sow.nama_sow}` : ''}
                    </span>
                </div>
            )
        },
        {
            key: 'kode_wbs',
            label: 'KODE WBS',
            render: (item) => (
                <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    {item.kode_pekerjaan}
                </span>
            )
        },
        {
            key: 'tahap',
            label: 'TAHAP',
            render: (item) => {
                const namaTahap = item.stage?.nama_stage || item.kategori_tahap || 'PONDASI';
                return (
                    <Badge className={`text-[9px] font-bold px-2 py-0.5 border uppercase ${getTahapBadge(namaTahap)}`}>
                        {item.stage?.kode_stage || item.kategori_tahap || 'CIVIL'}
                    </Badge>
                );
            }
        },
        {
            key: 'uraian_pekerjaan',
            label: 'URAIAN ITEM PEKERJAAN',
            render: (item) => (
                <div className="flex flex-col max-w-[220px] sm:max-w-[260px] leading-snug">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {item.nama_pekerjaan}
                    </span>
                    {item.catatan && (
                        <span className="text-[10px] text-slate-400 truncate mt-0.5" title={item.catatan}>
                            {item.catatan}
                        </span>
                    )}
                </div>
            )
        },
        {
            key: 'bobot',
            label: 'BOBOT',
            render: (item) => (
                <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
                    {item.bobot}%
                </span>
            )
        },
        {
            key: 'progres_riil',
            label: 'PROGRES RIIL',
            render: (item) => {
                const prog = item.progress_percent || 0;
                return (
                    <div className="flex flex-col gap-1 min-w-[110px]">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                                {prog}%
                            </span>
                            <span className={`text-[9px] font-bold px-1 py-0.2 rounded ${
                                prog >= 100 
                                    ? 'bg-emerald-500/10 text-emerald-500' 
                                    : prog > 0 
                                    ? 'bg-blue-500/10 text-blue-500' 
                                    : 'bg-slate-500/10 text-slate-400'
                            }`}>
                                {item.status || (prog >= 100 ? 'COMPLETED' : prog > 0 ? 'IN_PROGRESS' : 'PLANNING')}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                    prog >= 100 ? 'bg-emerald-500' : 'bg-emerald-600 dark:bg-amber-400'
                                }`}
                                style={{ width: `${Math.min(100, prog)}%` }}
                            />
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'foto_bukti',
            label: 'FOTO BUKTI',
            render: (item) => {
                if (!item.foto) {
                    return (
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-3.5 h-3.5" />
                        </div>
                    );
                }
                return (
                    <button
                        type="button"
                        onClick={() => setPreviewPhoto({ url: item.foto, title: item.nama_pekerjaan })}
                        className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform cursor-pointer relative group shrink-0"
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
                );
            }
        },
        {
            key: 'tanggal_pic',
            label: 'TANGGAL & PIC',
            render: (item) => (
                <div className="flex flex-col text-xs leading-tight">
                    <div className="flex items-center gap-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.tanggal_pekerjaan ? String(item.tanggal_pekerjaan).split('T')[0] : '-'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                        {item.pic_user?.name || 'Admin Lapangan'}
                    </span>
                </div>
            )
        },
        {
            key: 'satuan',
            label: 'SATUAN',
            render: (item) => (
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                    {item.satuan || 'Lot'}
                </span>
            )
        }
    ], []);

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
                emptyMessage="Belum ada rincian item pekerjaan WBS."
            />

            {/* Modal Pratinjau Foto Cloudinary */}
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