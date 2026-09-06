import React, { useState, useMemo, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useConfirm } from '@/Layouts/AuthenticatedLayout';
import Toolbar from '@/components/Toolbar';
import CrudTable from './CrudTable';
import ModalSow from './ModalSow';
import ModalArea from './ModalArea';
import ModalStage from './ModalStage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
    Plus, 
    Search, 
    X, 
    ChevronLeft, 
    ChevronRight,
    Briefcase,
    MapPin,
    Layers,
    RotateCcw
} from 'lucide-react';

export default function TabMasterKamus({ areas = [], sows = [], stages = [] }) {
    const confirm = useConfirm();
    const { auth } = usePage().props;
    const canWrite = auth?.user?.role === 'admin' || auth?.user?.role === 'staff';

    // 3 Kategori Murni
    const [mainTab, setMainTab] = useState('SOW'); // 'SOW' | 'AREA' | 'STAGE'
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [perPageInput, setPerPageInput] = useState(10);
    const [isProcessing, setIsProcessing] = useState(false);

    // State Modal
    const [isModalSowOpen, setIsModalSowOpen] = useState(false);
    const [isModalAreaOpen, setIsModalAreaOpen] = useState(false);
    const [isModalStageOpen, setIsModalStageOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 120));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
    const handleResetZoom = () => setZoomLevel(100);
    const handleFitZoom = () => setZoomLevel(75);
    const toggleSort = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    const filteredData = useMemo(() => {
        const s = searchTerm.trim().toLowerCase();
        if (mainTab === 'SOW') {
            let list = (sows || []).filter((item) => {
                if (!s) return true;
                return (
                    item.nama_sow?.toLowerCase().includes(s) ||
                    item.keterangan?.toLowerCase().includes(s)
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
                    item.nama_area?.toLowerCase().includes(s) ||
                    item.regional?.toLowerCase().includes(s)
                );
            });
            list.sort((a, b) => {
                const keyA = a.nama_area || '';
                const keyB = b.nama_area || '';
                return sortOrder === 'asc' ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
            });
            return list;
        }

        // mainTab === 'STAGE'
        let list = (stages || []).filter((item) => {
            if (!s) return true;
            return (
                item.nama_stage?.toLowerCase().includes(s) ||
                item.kode_stage?.toLowerCase().includes(s)
            );
        });
        list.sort((a, b) => (sortOrder === 'asc' ? a.urutan - b.urutan : b.urutan - a.urutan));
        return list;
    }, [mainTab, sows, areas, stages, searchTerm, sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedIds([]);
    }, [mainTab, searchTerm, sortOrder]);

    const totalData = filteredData.length;
    const totalPages = Math.ceil(totalData / perPage) || 1;
    const fromIndex = totalData > 0 ? (currentPage - 1) * perPage + 1 : 0;
    const toIndex = Math.min(currentPage * perPage, totalData);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredData.slice(start, start + perPage);
    }, [filteredData, currentPage, perPage]);

    const getRowNumber = (idx) => (currentPage - 1) * perPage + idx + 1;

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

    // Hapus massal via Checkbox
    const handleDeleteSelected = () => {
        if (!canWrite || selectedIds.length === 0) return;
        const labels = {
            SOW: 'Master SOW',
            AREA: 'Master Area',
            STAGE: 'Master Tahapan',
        };
        const routes = {
            SOW: route('master-data.sow.bulk-delete'),
            AREA: route('master-data.area.bulk-delete'),
            STAGE: route('master-data.stage.bulk-delete'),
        };

        const currentLabel = labels[mainTab];
        const targetRoute = routes[mainTab];

        confirm({
            title: `Hapus ${selectedIds.length} ${currentLabel} Terpilih`,
            message: `Apakah kamu yakin ingin menghapus ${selectedIds.length} data ${currentLabel} yang telah dicentang? Tindakan ini tidak dapat dibatalkan.`,
            variant: 'danger',
            confirmText: 'Ya, Hapus Terpilih',
            cancelText: 'Batal',
            onConfirm: () => {
                setIsProcessing(true);
                router.post(
                    targetRoute,
                    { ids: selectedIds },
                    {
                        preserveScroll: true,
                        onSuccess: () => setSelectedIds([]),
                        onFinish: () => setIsProcessing(false),
                    }
                );
            },
        });
    };

    const handleExportCSV = () => {
        let headers = [];
        let rows = [];
        if (mainTab === 'SOW') {
            headers = ['No', 'Nama SOW', 'Keterangan'];
            rows = filteredData.map((s, idx) => [idx + 1, `"${s.nama_sow || ''}"`, `"${(s.keterangan || '').replace(/"/g, '""')}"`]);
        } else if (mainTab === 'AREA') {
            headers = ['No', 'Nama Area', 'Regional / Provinsi'];
            rows = filteredData.map((a, idx) => [idx + 1, `"${a.nama_area || ''}"`, `"${a.regional || ''}"`]);
        } else {
            headers = ['No', 'Urutan', 'Kode Tahapan', 'Nama Tahapan'];
            rows = filteredData.map((st, idx) => [idx + 1, st.urutan, `"${st.kode_stage}"`, `"${st.nama_stage}"`]);
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
        else setIsModalStageOpen(true);
    };

    const handleOpenEdit = (item) => {
        setIsEditMode(true);
        setSelectedItem(item);
        if (mainTab === 'SOW') setIsModalSowOpen(true);
        else if (mainTab === 'AREA') setIsModalAreaOpen(true);
        else setIsModalStageOpen(true);
    };

    const handleDeleteRow = (item) => {
        let title = '';
        let deleteUrl = '';
        if (mainTab === 'SOW') {
            title = `SOW ${item.nama_sow}`;
            deleteUrl = route('master-data.sow.destroy', item.id);
        } else if (mainTab === 'AREA') {
            title = `Area ${item.nama_area}`;
            deleteUrl = route('master-data.area.destroy', item.id);
        } else {
            title = `Tahapan ${item.nama_stage}`;
            deleteUrl = route('master-data.stage.destroy', item.id);
        }

        confirm({
            title: `Hapus ${title}`,
            message: `Apakah kamu yakin ingin menghapus ${title}?`,
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
        STAGE: 'Daftar Urutan Fase & Tahapan Konstruksi Standar Proyek',
    };

    const tabButtons = [
        { key: 'SOW', label: 'Master SOW', icon: Briefcase, count: sows.length },
        { key: 'AREA', label: 'Area Operasional', icon: MapPin, count: areas.length },
        { key: 'STAGE', label: 'Tahapan Konstruksi', icon: Layers, count: stages.length },
    ];

    return (
        <div className="space-y-4">
            {/* 1. TAB NAVIGASI DI LUAR TABEL */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/50 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 w-fit max-w-full overflow-x-auto shadow-xs">
                {tabButtons.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = mainTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => {
                                setMainTab(tab.key);
                                setSearchTerm('');
                                setSelectedIds([]);
                            }}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                                isActive
                                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                            }`}
                        >
                            <IconComponent className="w-3.5 h-3.5" />
                            <span>{tab.label}</span>
                            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono leading-none ${
                                isActive 
                                    ? 'bg-blue-700/80 text-white' 
                                    : 'bg-slate-300/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* 2. TABEL DATA KAMUS STANDAR */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
                <Toolbar
                    sortOrder={sortOrder}
                    onToggleSort={toggleSort}
                    selectedCount={selectedIds.length}
                    onDeleteSelected={canWrite ? handleDeleteSelected : undefined}
                    onExport={handleExportCSV}
                    isProcessing={isProcessing}
                    zoomLevel={zoomLevel}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                    onResetZoom={handleResetZoom}
                    onFitZoom={handleFitZoom}
                />

                <div className="px-5 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            {tabSubTitles[mainTab]} ({totalData} Data)
                        </span>
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="flex items-center gap-1 text-[11px] text-rose-500 hover:underline cursor-pointer ml-2"
                            >
                                <RotateCcw className="w-3 h-3" />
                                <span>Reset Cari</span>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                        <div className="relative w-full sm:w-60">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={`Cari data ${mainTab}...`}
                                className="h-8 pl-8 pr-7 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                                        : 'Tambah Tahapan'}
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
                            disabled={currentPage <= 1 || isProcessing}
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            className="h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                            .map((pageNum) => (
                                <Button
                                    key={`page-${pageNum}`}
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
                            disabled={currentPage >= totalPages || isProcessing}
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            className="h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                            <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal SOW */}
            <ModalSow
                isOpen={isModalSowOpen}
                onClose={() => {
                    setIsModalSowOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
            />

            {/* Modal Area */}
            <ModalArea
                isOpen={isModalAreaOpen}
                onClose={() => {
                    setIsModalAreaOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
            />

            {/* Modal Stage (Tahapan) */}
            <ModalStage
                isOpen={isModalStageOpen}
                onClose={() => {
                    setIsModalStageOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
                stagesCount={stages.length}
            />
        </div>
    );
}