import React, { useState, useMemo, useEffect } from 'react';
import Toolbar from '@/components/Toolbar';
import HybridDropdown from '@/components/HybridDropdown';
import CrudTablePekerjaan from '@/Pages/Project/Pekerjaan/CrudTable';
import ModalPekerjaan from '@/Pages/Project/Pekerjaan/ModalPekerjaan';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Plus,
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { useConfirm } from '@/Layouts/AuthenticatedLayout';

export default function TabWbs({
    project,
    pekerjaans = [],
    stages = [],
}) {
    // 1. Hak Akses & Konfirmasi
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'view';
    const canWrite = userRole === 'admin' || userRole === 'staff';
    const isAdmin = userRole === 'admin';
    const confirm = useConfirm();

    // 2. Filter & Sort State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStage, setSelectedStage] = useState('ALL');
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isProcessing, setIsProcessing] = useState(false);

    // 3. Zoom & Seleksi Checkbox Baris
    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedIds, setSelectedIds] = useState([]);

    // 4. Paginasi Client-Side
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [perPageInput, setPerPageInput] = useState(10);

    // 5. State Modal Form Tambah/Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Zoom Handlers
    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 120));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
    const handleResetZoom = () => setZoomLevel(100);
    const handleFitZoom = () => setZoomLevel(75);

    const toggleSort = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    // Filter & Sort Data Pekerjaan Site Ini
    const filteredList = useMemo(() => {
        let list = (pekerjaans || []).filter((p) => {
            const s = searchTerm.trim().toLowerCase();
            const matchesSearch =
                !s ||
                (p.kode_pekerjaan && p.kode_pekerjaan.toLowerCase().includes(s)) ||
                (p.nama_pekerjaan && p.nama_pekerjaan.toLowerCase().includes(s)) ||
                (p.catatan && p.catatan.toLowerCase().includes(s)) ||
                (p.stage?.nama_stage && p.stage.nama_stage.toLowerCase().includes(s));

            const matchesStage = selectedStage === 'ALL' || String(p.stage_id) === String(selectedStage);
            const matchesStatus =
                selectedStatus === 'ALL' ||
                String(p.status).toUpperCase() === String(selectedStatus).toUpperCase();

            return matchesSearch && matchesStage && matchesStatus;
        });

        list.sort((a, b) => {
            const codeA = a.kode_pekerjaan || '';
            const codeB = b.kode_pekerjaan || '';
            return sortOrder === 'asc'
                ? codeA.localeCompare(codeB, undefined, { numeric: true })
                : codeB.localeCompare(codeA, undefined, { numeric: true });
        });

        return list;
    }, [pekerjaans, searchTerm, selectedStage, selectedStatus, sortOrder]);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedIds([]);
    }, [searchTerm, selectedStage, selectedStatus, sortOrder]);

    // Data Paginasi
    const totalData = filteredList.length;
    const totalPages = Math.ceil(totalData / perPage) || 1;
    const fromIndex = totalData > 0 ? (currentPage - 1) * perPage + 1 : 0;
    const toIndex = Math.min(currentPage * perPage, totalData);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredList.slice(start, start + perPage);
    }, [filteredList, currentPage, perPage]);

    const getRowNumber = (index) => (currentPage - 1) * perPage + index + 1;

    const handlePerPageSubmit = () => {
        let val = parseInt(perPageInput, 10);
        if (isNaN(val) || val < 1) val = 10;
        else if (val > 100) val = 100;
        setPerPageInput(val);
        setPerPage(val);
        setCurrentPage(1);
    };

    // Checkbox Baris
    const handleSelectAll = (checked) => {
        if (checked) {
            const ids = paginatedData.map((item) => item.id).filter(Boolean);
            setSelectedIds(ids);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Ekspor CSV
    const handleExportCSV = () => {
        const columns = [
            'Site ID',
            'Nama Site',
            'Kode WBS',
            'Tahapan',
            'Nama Pekerjaan',
            'Satuan',
            'Bobot (%)',
            'Progress Riil (%)',
            'Status',
            'Tanggal Pengerjaan',
            'PIC Waslap',
            'Catatan',
        ];

        const rows = filteredList.map((p) => [
            `"${project?.site_id || '-'}"`,
            `"${project?.site_name || '-'}"`,
            `"${p.kode_pekerjaan || '-'}"`,
            `"${p.stage?.nama_stage || p.kategori_tahap || '-'}"`,
            `"${(p.nama_pekerjaan || '').replace(/"/g, '""')}"`,
            `"${p.satuan || 'Lot'}"`,
            p.bobot ?? 0,
            p.progress_percent ?? 0,
            `"${p.status || '-'}"`,
            `"${p.tanggal_pekerjaan ? String(p.tanggal_pekerjaan).split('T')[0] : '-'}"`,
            `"${p.pic_user?.name || '-'}"`,
            `"${(p.catatan || '').replace(/"/g, '""')}"`,
        ]);

        const csvContent = '\uFEFF' + [columns.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `WBS_${project?.site_id || 'PROYEK'}_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Hapus Baris Terpilih (Bulk Delete)
    const handleDeleteSelected = () => {
        if (!isAdmin || selectedIds.length === 0) return;
        confirm({
            title: 'Hapus Item Pekerjaan Terpilih',
            message: `Apakah Anda yakin ingin menghapus ${selectedIds.length} item pekerjaan WBS terpilih? Foto Cloudinary terkait juga akan dihapus dan akumulasi progres site akan disinkronkan kembali.`,
            variant: 'danger',
            confirmText: 'Ya, Hapus Terpilih',
            cancelText: 'Batal',
            onConfirm: () => {
                setIsProcessing(true);
                router.post(
                    route('pekerjaan.bulk-delete'),
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

    // Kosongkan Seluruh WBS Site Ini
    const handleReset = () => {
        if (!isAdmin) return;
        const allItemIds = (pekerjaans || []).map((p) => p.id).filter(Boolean);
        if (allItemIds.length === 0) return;

        confirm({
            title: 'Kosongkan Seluruh WBS Site Ini',
            message: `Apakah Anda yakin ingin MENGOSONGKAN SELURUH (${allItemIds.length}) rincian pekerjaan WBS untuk site ${project?.site_id || ''}? Tindakan ini tidak dapat dibatalkan.`,
            variant: 'danger',
            confirmText: 'Ya, Kosongkan WBS',
            cancelText: 'Batal',
            onConfirm: () => {
                setIsProcessing(true);
                router.post(
                    route('pekerjaan.bulk-delete'),
                    { ids: allItemIds },
                    {
                        preserveScroll: true,
                        onSuccess: () => setSelectedIds([]),
                        onFinish: () => setIsProcessing(false),
                    }
                );
            },
        });
    };

    const handleOpenAdd = () => {
        setIsEditMode(false);
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (item) => {
        setIsEditMode(true);
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const isFiltered = searchTerm.trim() !== '' || selectedStage !== 'ALL' || selectedStatus !== 'ALL';
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedStage('ALL');
        setSelectedStatus('ALL');
    };

    return (
        <div className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            {/* 1. TOOLBAR ATAS */}
            <Toolbar
                sortOrder={sortOrder}
                onToggleSort={toggleSort}
                selectedCount={selectedIds.length}
                onDeleteSelected={isAdmin ? handleDeleteSelected : undefined}
                onReset={isAdmin ? handleReset : undefined}
                onExport={handleExportCSV}
                isProcessing={isProcessing}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetZoom={handleResetZoom}
                onFitZoom={handleFitZoom}
                leftContent={
                    <div className="flex flex-nowrap items-center gap-2">
                        {/* Filter Tahapan */}
                        <HybridDropdown
                            value={selectedStage}
                            options={[
                                { value: 'ALL', label: 'Semua Tahapan' },
                                ...stages.map((st) => ({
                                    value: String(st.id),
                                    label: st.nama_stage,
                                })),
                            ]}
                            onChange={setSelectedStage}
                            placeholder="Semua Tahapan"
                            searchPlaceholder="Cari tahapan..."
                            allowCustom={false}
                            className="!w-44 shrink-0"
                            inputClassName="h-8 text-xs font-semibold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        />

                        {/* Filter Status */}
                        <HybridDropdown
                            value={selectedStatus}
                            options={[
                                { value: 'ALL', label: 'Semua Status' },
                                { value: 'PLANNING', label: 'PLANNING' },
                                { value: 'IN_PROGRESS', label: 'IN_PROGRESS' },
                                { value: 'COMPLETED', label: 'COMPLETED' },
                            ]}
                            onChange={setSelectedStatus}
                            placeholder="Semua Status"
                            searchPlaceholder="Cari status..."
                            allowCustom={false}
                            className="!w-36 shrink-0"
                            inputClassName="h-8 text-xs font-semibold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        />
                    </div>
                }
            />

            {/* 2. SUB-HEADER */}
            <div className="px-5 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Total: {totalData} Rincian WBS
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
                            placeholder="Cari kode WBS / pekerjaan..."
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
                            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs shadow-blue-600/20 shrink-0 cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Data Baru</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* 3. TABEL DATA */}
            <div className="w-full overflow-x-auto relative border-b border-slate-200 dark:border-slate-800">
                <CrudTablePekerjaan
                    dataList={paginatedData}
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectRow={handleSelectRow}
                    onEditRow={canWrite ? handleOpenEdit : undefined}
                    getRowNumber={getRowNumber}
                    zoomLevel={zoomLevel}
                />
            </div>

            {/* 4. PAGINATION FOOTER */}
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
                    Menampilkan <span className="font-semibold text-slate-700 dark:text-slate-300">{fromIndex}</span> -{' '}
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
                                key={`page-wbs-${pageNum}`}
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

            {/* 5. MODAL FORM PEKERJAAN (Otomatis terikat ke project ini) */}
            <ModalPekerjaan
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
                project={project}
                stages={stages}
            />
        </div>
    );
}