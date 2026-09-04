import React, { useMemo } from 'react';
import Tabel from '@/components/Tabel';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { ExternalLink, MapPin } from 'lucide-react';

export default function CrudTable({
    dataList = [],
    selectedIds = [],
    onSelectAll,
    onSelectRow,
    onEditRow,
    getRowNumber,
    zoomLevel = 100
}) {
    const getItemId = (item) => item?.id;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PLANNING':
                return 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/20';
            case 'PONDASI':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'ERECTION':
                return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
            case 'CME':
                return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
            case 'RFI':
            case 'ATP':
                return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'COMPLETED':
                return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    const columns = useMemo(() => [
        {
            key: 'project_code',
            label: 'Kode Proyek',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                        {item.project_code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                        {item.pid || '-'}
                    </span>
                </div>
            )
        },
        {
            key: 'site_id',
            label: 'Site ID',
            render: (item) => (
                <span className="font-mono font-extrabold text-xs text-slate-900 dark:text-white">
                    {item.site_id}
                </span>
            )
        },
        {
            key: 'site_name',
            label: 'Nama Site',
            render: (item) => (
                <div 
                    className="max-w-[180px] sm:max-w-[220px] whitespace-normal break-words text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug"
                    title={item.site_name || '-'}
                >
                    <div>{item.site_name || '-'}</div>
                    {item.lat_long && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-normal mt-0.5">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{item.lat_long}</span>
                        </div>
                    )}
                </div>
            )
        },
        {
            key: 'spesifikasi',
            label: 'Tipe & Tinggi Menara',
            render: (item) => (
                <div className="max-w-[150px] whitespace-normal break-words text-xs text-slate-800 dark:text-slate-200 leading-snug">
                    <div className="font-medium">{item.tipe_tower || 'SST 4 LEGS'}</div>
                    <span className="text-[10px] text-slate-400 font-bold">{item.tinggi_tower || '52M'}</span>
                </div>
            )
        },
        {
            key: 'wilayah',
            label: 'Wilayah & Klien',
            render: (item) => (
                <div className="max-w-[150px] whitespace-normal break-words text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    <div className="font-semibold">{item.wilayah || '-'}</div>
                    <span className="text-[10px] text-slate-400">{item.client_name || 'Telkomsel / Mitratel'}</span>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Tahap & Progress',
            render: (item) => (
                <div className="flex flex-col gap-1 min-w-[110px]">
                    <div className="flex items-center justify-between">
                        <Badge className={`text-[10px] font-bold px-1.5 py-0.5 border ${getStatusBadge(item.status)}`}>
                            {item.status}
                        </Badge>
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            {item.progress_percent || 0}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                            className="bg-blue-600 dark:bg-amber-400 h-full rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, item.progress_percent || 0)}%` }}
                        />
                    </div>
                </div>
            )
        },
        {
            key: 'target_rfi_date',
            label: 'Target RFI',
            render: (item) => (
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {item.target_rfi_date ? new Date(item.target_rfi_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                </span>
            )
        },
        {
            key: 'detail_link',
            label: 'Detail',
            render: (item) => (
                <Link
                    href={`/project/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline py-1"
                    title="Lihat Rincian Site & Progres Lapangan"
                >
                    <span>Lihat Detail</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                </Link>
            )
        }
    ], []);

    return (
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
            emptyMessage="Belum ada data master proyek & site."
        />
    );
}