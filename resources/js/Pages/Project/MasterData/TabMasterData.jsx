import React, { useState, useEffect, useRef, useMemo } from 'react';
import Toolbar from '@/components/Toolbar';
import CrudTable from './CrudTable';
import ModalProject from './ModalProject';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Plus, 
    Search, 
    X, 
    ChevronLeft, 
    ChevronRight 
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { useConfirm } from '@/Layouts/AuthenticatedLayout';

export default function TabMasterData({
    projects,
    existingOptions = {},
    filters = {}
}) {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'view';
    const canWrite = userRole === 'admin' || userRole === 'staff';
    const isAdmin = userRole === 'admin';
    const confirm = useConfirm();

    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [sortOrder, setSortOrder] = useState(filters?.order || 'desc');
    const [perPage, setPerPage] = useState(filters?.per_page || 10);
    const [perPageInput, setPerPageInput] = useState(filters?.per_page || 10);
    const [isProcessing, setIsProcessing] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedIds, setSelectedIds] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const dataList = projects?.data || [];

    // Opsi dinamis gabungan dari Database + Data Tabel yang tampil
    const resolvedExistingOptions = useMemo(() => {
        const tipes = new Set(existingOptions?.tipeTowerList || []);
        const tinggis = new Set(existingOptions?.tinggiTowerList || []);
        const wilayahs = new Set(existingOptions?.wilayahList || []);
        const clients = new Set(existingOptions?.clientList || []);
        const konsultans = new Set(existingOptions?.konsultanList || []);

        dataList.forEach((item) => {
            if (item.tipe_tower) tipes.add(item.tipe_tower);
            if (item.tinggi_tower) tinggis.add(item.tinggi_tower);
            if (item.wilayah) wilayahs.add(item.wilayah);
            if (item.client_name) clients.add(item.client_name);
            if (item.konsultan) konsultans.add(item.konsultan);
        });

        return {
            tipeTowerList: Array.from(tipes).filter(Boolean),
            tinggiTowerList: Array.from(tinggis).filter(Boolean),
            wilayahList: Array.from(wilayahs).filter(Boolean),
            clientList: Array.from(clients).filter(Boolean),
            konsultanList: Array.from(konsultans).filter(Boolean),
        };
    }, [existingOptions, dataList]);

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 120));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
    const handleResetZoom = () => setZoomLevel(100);
    const handleFitZoom = () => setZoomLevel(75);

    const isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        const timer = setTimeout(() => {
            fetchFilteredData(searchTerm, sortOrder, perPage, 1);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchFilteredData = (search, order, itemsPerPage, page = 1) => {
        setSelectedIds([]);
        router.get(
            '/project',
            {
                search: search || undefined,
                order: order,
                per_page: itemsPerPage,
                page
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onStart: () => setIsProcessing(true),
                onFinish: () => setIsProcessing(false)
            }
        );
    };

    const toggleSort = () => {
        const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(nextOrder);
        fetchFilteredData(searchTerm, nextOrder, perPage, 1);
    };

    const handlePerPageSubmit = () => {
        let val = parseInt(perPageInput, 10);
        if (isNaN(val) || val < 1) val = 10;
        else if (val > 100) val = 100;
        setPerPageInput(val);
        if (val !== perPage) {
            setPerPage(val);
            fetchFilteredData(searchTerm, sortOrder, val, 1);
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            const allIds = dataList.map((item) => item.id).filter(Boolean);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleExport = () => {
        window.open(`/laporan/export`, '_blank');
    };

    const handleDeleteSelected = () => {
        if (!isAdmin || selectedIds.length === 0) return;
        confirm({
            title: 'Hapus Master Proyek Terpilih',
            message: `Apakah Anda yakin ingin MENGHAPUS ${selectedIds.length} site proyek terpilih beserta seluruh data lapangannya?`,
            variant: 'danger',
            confirmText: 'Ya, Hapus',
            cancelText: 'Batal',
            onConfirm: () => {
                router.post('/project/bulk-delete', { ids: selectedIds }, {
                    preserveScroll: true,
                    onStart: () => setIsProcessing(true),
                    onSuccess: () => setSelectedIds([]),
                    onFinish: () => setIsProcessing(false)
                });
            }
        });
    };

    const handleReset = () => {
        if (!isAdmin) return;
        confirm({
            title: 'Kosongkan Seluruh Master Proyek',
            message: 'Apakah Anda yakin ingin MENGOSONGKAN SELURUH data proyek & site? Tindakan ini tidak dapat dibatalkan.',
            variant: 'danger',
            confirmText: 'Ya, Kosongkan',
            cancelText: 'Batal',
            onConfirm: () => {
                router.post('/project/reset', {}, {
                    preserveScroll: true,
                    onStart: () => setIsProcessing(true),
                    onSuccess: () => setSelectedIds([]),
                    onFinish: () => setIsProcessing(false)
                });
            }
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

    const getRowNumber = (index) => {
        if (!projects) return index + 1;
        const currentPage = projects.current_page || 1;
        const limit = projects.per_page || 10;
        return (currentPage - 1) * limit + index + 1;
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            {/* 1. Toolbar Atas */}
            <Toolbar
                sortOrder={sortOrder}
                onToggleSort={toggleSort}
                selectedCount={selectedIds.length}
                onDeleteSelected={isAdmin ? handleDeleteSelected : undefined}
                onReset={isAdmin ? handleReset : undefined}
                onExport={handleExport}
                isProcessing={isProcessing}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetZoom={handleResetZoom}
                onFitZoom={handleFitZoom}
                leftContent={
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Total Site Menara: <span className="font-bold text-slate-900 dark:text-white">{projects?.total ?? dataList.length}</span>
                    </div>
                }
            />

            {/* 2. Sub-Header */}
            <div className="px-5 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Daftar Proyek Tower & CME (PT Indojar Mulia Abadi)
                </span>
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <div className="relative w-full sm:w-56">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari Site ID, Site Name..."
                            disabled={isProcessing}
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
                            <span>Tambah Site Baru</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* 3. Tabel Data Proyek */}
            <div className="w-full overflow-x-auto relative border-b border-slate-200 dark:border-slate-800">
                <CrudTable
                    dataList={dataList}
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectRow={handleSelectRow}
                    onEditRow={canWrite ? handleOpenEdit : undefined}
                    getRowNumber={getRowNumber}
                    zoomLevel={zoomLevel}
                />
            </div>

            {/* 4. Pagination Footer */}
            {projects && (
                <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2">
                        <span>Tampilkan</span>
                        <Input
                            type="number"
                            min={1}
                            max={100}
                            value={perPageInput}
                            disabled={isProcessing}
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
                        Menampilkan <span className="font-semibold text-slate-700 dark:text-slate-300">{projects.from || 0}</span> - <span className="font-semibold text-slate-700 dark:text-slate-300">{projects.to || 0}</span> dari <span className="font-semibold text-slate-700 dark:text-slate-300">{projects.total || 0}</span> data
                    </div>

                    <div className="flex items-center gap-1">
                        {projects.links?.map((link, idx) => {
                            let label = link.label;
                            if (label.includes('Previous') || label.includes('&laquo;')) label = <ChevronLeft className="w-3.5 h-3.5" />;
                            else if (label.includes('Next') || label.includes('&raquo;')) label = <ChevronRight className="w-3.5 h-3.5" />;
                            return (
                                <Button
                                    key={`page-${idx}`}
                                    type="button"
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url || isProcessing}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                    className={`h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 ${
                                        link.active ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 5. Modal Master Proyek */}
            <ModalProject
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
                existingOptions={resolvedExistingOptions}
            />
        </div>
    );
}