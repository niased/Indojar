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
            case 'COMPLETED':
                return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
            case 'ON_PROGRESS':
                return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
            case 'ISSUE':
                return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';
            default:
                return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
        }
    };

    const columns = useMemo(() => [
        {
            key: 'project_code',
            label: 'KODE & PID',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                        {item.project_code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                        PID: {item.pid || '-'}
                    </span>
                </div>
            )
        },
        {
            key: 'site_identity',
            label: 'SITE MENARA',
            render: (item) => (
                <div className="flex flex-col max-w-[200px] leading-tight">
                    <span className="font-mono font-extrabold text-xs text-slate-900 dark:text-white">
                        {item.site_id}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate mt-0.5" title={item.site_name}>
                        {item.site_name}
                    </span>
                    {(item.site_id_dmt || item.site_id_tenant) && (
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                            DMT: {item.site_id_dmt || '-'} | Tenant: {item.site_id_tenant || '-'}
                        </span>
                    )}
                </div>
            )
        },
        {
            key: 'area_sow',
            label: 'AREA & SOW',
            render: (item) => (
                <div className="flex flex-col gap-1 items-start">
                    <Badge variant="outline" className="text-[10px] font-mono font-bold px-1.5 py-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                        {item.sow?.nama_sow || 'B2S'}
                    </Badge>
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {item.area?.nama_area || '-'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                        {item.area?.regional || '-'}
                    </span>
                </div>
            )
        },
        {
            key: 'spesifikasi',
            label: 'TOWER & KONTRAK',
            render: (item) => (
                <div className="flex flex-col text-xs leading-tight">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.tipe_tower} ({item.tinggi_tower})
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        PO: {item.no_po || '-'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                        {item.client_name}
                    </span>
                </div>
            )
        },
        {
            key: 'lokasi_maps',
            label: 'LOKASI GPS',
            render: (item) => {
                const hasCoordinates = item.latitude !== null && item.longitude !== null;
                return (
                    <div className="flex flex-col max-w-[160px]">
                        {hasCoordinates ? (
                            <a
                                href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
                                title="Buka Koordinat di Google Maps"
                            >
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span>{item.latitude?.toFixed(4)}, {item.longitude?.toFixed(4)}</span>
                            </a>
                        ) : (
                            <span className="text-slate-400 text-xs font-mono">-</span>
                        )}
                        <span className="text-[10px] text-slate-400 truncate mt-0.5" title={item.alamat_site}>
                            {item.alamat_site || 'Alamat belum diisi'}
                        </span>
                    </div>
                );
            }
        },
        {
            key: 'progress_status',
            label: 'PROGRES FISIK',
            render: (item) => (
                <div className="flex flex-col gap-1 min-w-[120px]">
                    <div className="flex items-center justify-between">
                        <Badge className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 border ${getStatusBadge(item.status)}`}>
                            {item.status}
                        </Badge>
                        <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                            {item.progress_percent || 0}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${
                                (item.progress_percent || 0) >= 100 
                                    ? 'bg-emerald-500' 
                                    : 'bg-emerald-600 dark:bg-amber-400'
                            }`}
                            style={{ width: `${Math.min(100, item.progress_percent || 0)}%` }}
                        />
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium">
                        PIC: {item.pic_user?.name || 'Belum ditugaskan'}
                    </span>
                </div>
            )
        },
        {
            key: 'target_rfi',
            label: 'TARGET RFI',
            render: (item) => (
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {item.target_rfi_date 
                        ? new Date(item.target_rfi_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) 
                        : '-'}
                </span>
            )
        },
        {
            key: 'aksi_detail',
            label: 'RINCIAN',
            render: (item) => (
                <Link
                    href={route('project.show', item.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                    title="Buka Lembar Kerja Site"
                >
                    <span>Detail</span>
                    <ExternalLink className="w-3 h-3" />
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
            emptyMessage="Belum ada data master proyek & site telekomunikasi."
        />
    );
}