import React, { useState, useMemo, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useConfirm } from '@/Layouts/AuthenticatedLayout';
import Toolbar from '@/components/Toolbar';
import CrudTable from './CrudTable';
import ModalSow from './ModalSow';
import ModalArea from './ModalArea';
import ModalStageTask from './ModalStageTask';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import HybridDropdown from '@/components/HybridDropdown';
import { 
    Plus, 
    Search, 
    X, 
    ChevronLeft, 
    ChevronRight,
    Briefcase,
    MapPin,
    ListOrdered,
    Layers,
    RotateCcw
} from 'lucide-react';

export default function TabMasterKamus({ areas = [], sows = [], stages = [] }) {
    const confirm = useConfirm();
    const { auth } = usePage().props;
    const canWrite = auth?.user?.role === 'admin' || auth?.user?.role === 'staff';

    const [mainTab, setMainTab] = useState('SOW'); // 'SOW' | 'AREA' | 'TASK' | 'STAGE'

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
    const [selectedSowFilter, setSelectedSowFilter] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('asc');
    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedIds, setSelectedIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [perPageInput, setPerPageInput] = useState(10);

    // State Modal Terpisah
    const [isModalSowOpen, setIsModalSowOpen] = useState(false);
    const [isModalAreaOpen, setIsModalAreaOpen] = useState(false);
    const [isModalStageTaskOpen, setIsModalStageTaskOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 120));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
    const handleResetZoom = () => setZoomLevel(100);
    const handleFitZoom = () => setZoomLevel(75);
    const toggleSort = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    const allTasks = useMemo(() => {
        const list = [];
        stages.forEach((st) => {
            (st.tasks || []).forEach((t) => {
                list.push({
                    ...t,
                    stage_nama: st.nama_stage,
                    stage_kode: st.kode_stage,
                    stage_urutan: st.urutan,
                });
            });
        });
        return list;
    }, [stages]);

    const filteredData = useMemo(() => {
        const s = searchTerm.trim().toLowerCase();

        if (mainTab === 'SOW') {
            let list = (sows || []).filter((item) => {
                if (!s) return true;
                return (
                    (item.nama_sow && item.nama_sow.toLowerCase().includes(s)) ||
                    (item.keterangan && item.keterangan.toLowerCase().includes(s))
                );
            });
            list.sort((a, b) => {
                const keyA = a.nama_sow || '';
                const keyB = b.nama_sow || '';
                return sortOrder === 'asc' ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
            });
            return list;
        }

        if (mainTab === 'AREA') {
            let list = (areas || []).filter((item) => {
                if (!s) return true;
                return (
                    (item.nama_area && item.nama_area.toLowerCase().includes(s)) ||
                    (item.regional && item.regional.toLowerCase().includes(s))
                );
            });
            list.sort((a, b) => {
                const keyA = a.nama_area || '';
                const keyB = b.nama_area || '';
                return sortOrder === 'asc' ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
            });
            return list;
        }

        if (mainTab === 'TASK') {
            let list = allTasks.filter((t) => {
                const matchesSearch =
                    !s ||
                    (t.nama_task && t.nama_task.toLowerCase().includes(s)) ||
                    (t.stage_nama && t.stage_nama.toLowerCase().includes(s)) ||
                    (t.satuan && t.satuan.toLowerCase().includes(s));

                const matchesStage = selectedStageFilter === 'ALL' || String(t.stage_id) === String(selectedStageFilter);
                const matchesSow = selectedSowFilter === 'ALL' || String(t.sow_id) === String(selectedSowFilter);

                return matchesSearch && matchesStage && matchesSow;
            });

            list.sort((a, b) => {
                if (sortOrder === 'asc') return (a.stage_urutan - b.stage_urutan) || (a.urutan - b.urutan);
                return (b.stage_urutan - a.stage_urutan) || (b.urutan - a.urutan);
            });
            return list;
        }

        let list = (stages || []).filter((st) => {
            if (!s) return true;
            return (
                (st.nama_stage && st.nama_stage.toLowerCase().includes(s)) ||
                (st.kode_stage && st.kode_stage.toLowerCase().includes(s))
            );
        });
        list.sort((a, b) => (sortOrder === 'asc' ? a.urutan - b.urutan : b.urutan - a.urutan));
        return list;
    }, [mainTab, sows, areas, allTasks, stages, searchTerm, selectedStageFilter, selectedSowFilter, sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedIds([]);
    }, [mainTab, searchTerm, selectedStageFilter, selectedSowFilter, sortOrder]);

    const totalData = filteredData.length;
    const totalPages = Math.ceil(totalData / perPage) || 1;
    const fromIndex = totalData > 0 ? (currentPage - 1) * perPage + 1 : 0;
    const toIndex = Math.min(currentPage * perPage, totalData);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredData.slice(start, start + perPage);
    }, [filteredData, currentPage, perPage]);

    const getRowNumber = (idx) => (currentPage - 1) * perPage + idx + 1;
    const getItemId = (item) => item?.id;

    const handlePerPageSubmit = () => {
        let val = parseInt(perPageInput, 10);
        if (isNaN(val) || val < 1) val = 10;
        else if (val > 100) val = 100;
        setPerPageInput(val);
        setPerPage(val);
        setCurrentPage(1);
    };

    const handleSelectAll = (checked) => {
        if (checked) setSelectedIds(paginatedData.map((item) => item.id));
        else setSelectedIds([]);
    };

    const handleSelectRow = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleExportCSV = () => {
        let headers = [];
        let rows = [];

        if (mainTab === 'SOW') {
            headers = ['No', 'Nama SOW', 'Keterangan', 'Milestone Aktif'];
            rows = filteredData.map((s, idx) => [idx + 1, `"${s.nama_sow || ''}"`, `"${(s.keterangan || '').replace(/"/g, '""')}"`, '']);
        } else if (mainTab === 'AREA') {
            headers = ['No', 'Nama Area', 'Regional / Provinsi'];
            rows = filteredData.map((a, idx) => [idx + 1, `"${a.nama_area || ''}"`, `"${a.regional || ''}"`]);
        } else if (mainTab === 'TASK') {
            headers = ['No', 'Tahapan', 'Nama Pekerjaan Fisik', 'Khusus SOW', 'Satuan', 'Bobot (%)'];
            rows = filteredData.map((t, idx) => [idx + 1, `"${t.stage_nama || ''}"`, `"${t.nama_task || ''}"`, `"${t.sow?.nama_sow || 'Semua'}"`, `"${t.satuan}"`, t.default_bobot]);
        } else {
            headers = ['No', 'Urutan', 'Kode Stage', 'Nama Tahapan', 'Jumlah Task'];
            rows = filteredData.map((st, idx) => [idx + 1, st.urutan, `"${st.kode_stage}"`, `"${st.nama_stage}"`, st.tasks?.length || 0]);
        }

        const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Kamus_${mainTab}_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenAdd = () => {
        setIsEditMode(false);
        setSelectedItem(null);
        if (mainTab === 'SOW') setIsModalSowOpen(true);
        else if (mainTab === 'AREA') setIsModalAreaOpen(true);
        else setIsModalStageTaskOpen(true);
    };

    const handleOpenEdit = (item) => {
        setIsEditMode(true);
        setSelectedItem(item);
        if (mainTab === 'SOW') setIsModalSowOpen(true);
        else if (mainTab === 'AREA') setIsModalAreaOpen(true);
        else setIsModalStageTaskOpen(true);
    };

    const handleDeleteRow = (item) => {
        let title = 'Data';
        let deleteUrl = '';

        if (mainTab === 'SOW') {
            title = `SOW ${item.nama_sow}`;
            deleteUrl = route('master-data.sow.destroy', item.id);
        } else if (mainTab === 'AREA') {
            title = `Area ${item.nama_area}`;
            deleteUrl = route('master-data.area.destroy', item.id);
        } else if (mainTab === 'TASK') {
            title = `Item WBS ${item.nama_task}`;
            deleteUrl = route('master-data.task.destroy', item.id);
        } else {
            title = `Tahapan ${item.nama_stage}`;
            deleteUrl = route('master-data.stage.destroy', item.id);
        }

        confirm({
            title: `Hapus ${title}`,
            message: `Apakah Anda yakin ingin menghapus ${title}?`,
            variant: 'danger',
            confirmText: 'Ya, Hapus',
            cancelText: 'Batal',
            onConfirm: () => {
                router.delete(deleteUrl, { preserveScroll: true });
            },
        });
    };

    const tabSubTitles = {
        SOW: 'Daftar Klasifikasi Scope of Work & Konfigurasi Milestone Timeline',
        AREA: 'Daftar Wilayah Operasional & Pemetaan Regional Lapangan',
        TASK: 'Daftar Template Item Pekerjaan Fisik WBS Acuan',
        STAGE: 'Daftar Urutan Fase & Tahapan Konstruksi Standar',
    };

    const isFiltered = searchTerm.trim() !== '' || selectedStageFilter !== 'ALL' || selectedSowFilter !== 'ALL';
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedStageFilter('ALL');
        setSelectedSowFilter('ALL');
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            <Toolbar
                sortOrder={sortOrder}
                onToggleSort={toggleSort}
                selectedCount={selectedIds.length}
                onExport={handleExportCSV}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetZoom={handleResetZoom}
                onFitZoom={handleFitZoom}
                leftContent={
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setMainTab('SOW')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    mainTab === 'SOW'
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                }`}
                            >
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>Master SOW</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setMainTab('AREA')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    mainTab === 'AREA'
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                }`}
                            >
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Area Operasional</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setMainTab('TASK')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    mainTab === 'TASK'
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                }`}
                            >
                                <ListOrdered className="w-3.5 h-3.5" />
                                <span>Template WBS</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setMainTab('STAGE')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    mainTab === 'STAGE'
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                }`}
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>Tahapan</span>
                            </button>
                        </div>

                        {mainTab === 'TASK' && (
                            <>
                                <HybridDropdown
                                    value={selectedStageFilter}
                                    options={[
                                        { value: 'ALL', label: 'Semua Tahapan' },
                                        ...stages.map((st) => ({
                                            value: String(st.id),
                                            label: st.nama_stage,
                                        })),
                                    ]}
                                    onChange={setSelectedStageFilter}
                                    placeholder="Semua Tahapan"
                                    searchPlaceholder="Cari tahapan..."
                                    allowCustom={false}
                                    className="!w-44 shrink-0"
                                    inputClassName="h-8 text-xs font-semibold"
                                />

                                <HybridDropdown
                                    value={selectedSowFilter}
                                    options={[
                                        { value: 'ALL', label: 'Semua SOW' },
                                        ...sows.map((s) => ({
                                            value: String(s.id),
                                            label: s.nama_sow,
                                        })),
                                    ]}
                                    onChange={setSelectedSowFilter}
                                    placeholder="Semua SOW"
                                    searchPlaceholder="Cari SOW..."
                                    allowCustom={false}
                                    className="!w-36 shrink-0"
                                    inputClassName="h-8 text-xs font-semibold"
                                />
                            </>
                        )}
                    </div>
                }
            />

            <div className="px-5 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {tabSubTitles[mainTab]} ({totalData} Data)
                    </span>
                    {isFiltered && (
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="flex items-center gap-1 text-[11px] text-rose-500 hover:underline cursor-pointer ml-2"
                        >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset Filter</span>
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <div className="relative w-full sm:w-60">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari data kamus..."
                            className="h-8 pl-8 pr-7 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {canWrite && (
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleOpenAdd}
                            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs shrink-0 cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                                {mainTab === 'SOW'
                                    ? 'Tambah SOW'
                                    : mainTab === 'AREA'
                                    ? 'Tambah Area'
                                    : 'Tambah Tahapan / WBS'}
                            </span>
                        </Button>
                    )}
                </div>
            </div>

            <div className="w-full overflow-x-auto relative border-b border-slate-200 dark:border-slate-800">
                <CrudTable
                    dataList={paginatedData}
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectRow={handleSelectRow}
                    onEditRow={canWrite ? handleOpenEdit : undefined}
                    onDeleteRow={canWrite ? handleDeleteRow : undefined}
                    getRowNumber={getRowNumber}
                    zoomLevel={zoomLevel}
                    mainTab={mainTab}
                />
            </div>

            {/* Pagination Footer */}
            <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <span>Tampilkan</span>
                    <Input
                        type="number"
                        min={1}
                        max={100}
                        value={perPageInput}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val !== '' && Number(val) > 100) setPerPageInput(100);
                            else setPerPageInput(val);
                        }}
                        onBlur={handlePerPageSubmit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handlePerPageSubmit();
                            }
                        }}
                        className="h-8 w-16 text-center text-xs font-bold bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span>data per halaman</span>
                </div>

                <div className="text-slate-500">
                    Menampilkan <span className="font-semibold text-slate-700 dark:text-slate-300">{fromIndex}</span> –{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{toIndex}</span> dari{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{totalData}</span> data
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className="h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                        .map((pageNum) => (
                            <Button
                                key={`page-kamus-${pageNum}`}
                                type="button"
                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={`h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 cursor-pointer ${
                                    currentPage === pageNum
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                {pageNum}
                            </Button>
                        ))}

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        className="h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            {/* Modals Terpisah */}
            <ModalSow
                isOpen={isModalSowOpen}
                onClose={() => {
                    setIsModalSowOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
            />

            <ModalArea
                isOpen={isModalAreaOpen}
                onClose={() => {
                    setIsModalAreaOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
            />

            <ModalStageTask
                isOpen={isModalStageTaskOpen}
                onClose={() => {
                    setIsModalStageTaskOpen(false);
                    setSelectedItem(null);
                }}
                stages={stages}
                sows={sows}
                stagesCount={stages.length}
            />
        </div>
    );
}