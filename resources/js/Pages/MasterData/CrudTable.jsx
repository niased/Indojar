import React, { useMemo } from 'react';
import Tabel from '@/components/Tabel';
import { MASTER_MILESTONES_LIST } from './ModalSow';

export default function CrudTable({
    dataList = [],
    selectedIds = [],
    onSelectAll,
    onSelectRow,
    onEditRow,
    onDeleteRow,
    getRowNumber,
    zoomLevel = 100,
    mainTab = 'SOW',
}) {
    const getItemId = (item) => item?.id;

    const columns = useMemo(() => {
        if (mainTab === 'SOW') {
            return [
                {
                    key: 'nama_sow',
                    label: 'NAMA SOW',
                    render: (item) => (
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            {item.nama_sow}
                        </span>
                    ),
                },
                {
                    key: 'keterangan',
                    label: 'RUANG LINGKUP / KETERANGAN',
                    render: (item) => (
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                            {item.keterangan || '-'}
                        </span>
                    ),
                },
                {
                    key: 'milestones',
                    label: 'MILESTONE TIMELINE AKTIF',
                    render: (item) => {
                        const activeKeys = Array.isArray(item.milestones) ? item.milestones : [];
                        if (activeKeys.length === 0) {
                            return <span className="text-[11px] text-slate-400 italic">Tidak ada milestone khusus</span>;
                        }
                        return (
                            <div className="flex flex-wrap items-center gap-1 max-w-xl py-1">
                                {activeKeys.map((key) => {
                                    const mDef = MASTER_MILESTONES_LIST.find((m) => m.key === key);
                                    return (
                                        <span
                                            key={key}
                                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                                        >
                                            {mDef?.label || key}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    },
                },
            ];
        }

        if (mainTab === 'AREA') {
            return [
                {
                    key: 'nama_area',
                    label: 'NAMA AREA OPERASIONAL',
                    render: (item) => (
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {item.nama_area}
                        </span>
                    ),
                },
                {
                    key: 'regional',
                    label: 'REGIONAL / PROVINSI',
                    render: (item) => (
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            {item.regional}
                        </span>
                    ),
                },
            ];
        }

        // mainTab === 'STAGE'
        return [
            {
                key: 'urutan',
                label: 'URUTAN FASE',
                render: (item) => (
                    <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs flex items-center justify-center border border-blue-500/20">
                        {String(item.urutan).padStart(2, '0')}
                    </span>
                ),
            },
            {
                key: 'kode_stage',
                label: 'KODE TAHAPAN',
                render: (item) => (
                    <span className="font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
                        [{item.kode_stage}]
                    </span>
                ),
            },
            {
                key: 'nama_stage',
                label: 'NAMA TAHAPAN KONSTRUKSI',
                render: (item) => (
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {item.nama_stage}
                    </span>
                ),
            },
        ];
    }, [mainTab]);

    return (
        <Tabel
            data={dataList}
            columns={columns}
            selectedIds={selectedIds}
            onSelectAll={onSelectAll}
            onSelectRow={onSelectRow}
            onEditRow={onEditRow}
            onDeleteRow={onDeleteRow}
            getItemId={getItemId}
            getRowNumber={getRowNumber}
            zoomLevel={zoomLevel}
            emptyMessage={`Belum ada data ${mainTab} yang terdaftar.`}
        />
    );
}