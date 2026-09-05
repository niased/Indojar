import React, { useState, useEffect, useRef } from 'react';
import Toolbar from '@/components/Toolbar';
import HybridDropdown from '@/components/HybridDropdown';
import CrudTablePekerjaan from './CrudTable';
import ModalPekerjaan from './ModalPekerjaan';
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

export default function TabPekerjaan({
    pekerjaans,
    projects = [],
    stages = [],
    filters = {}
}) {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role || 'view';
    const canWrite = userRole === 'admin' || userRole === 'staff';
    const isAdmin = userRole === 'admin';
    const confirm = useConfirm();

    // State Filter & Pencarian
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [selectedProject, setSelectedProject] = useState(filters?.project_id || 'ALL');
    const [selectedStage, setSelectedStage] = useState(filters?.stage_id || 'ALL');
    const [sortOrder, setSortOrder] = useState(filters?.order || 'asc');
    const [perPage, setPerPage] = useState(filters?.per_page || 10);
    const [perPageInput, setPerPageInput] = useState(filters?.per_page || 10);
    const [isProcessing, setIsProcessing] = useState(false);

    // Zoom & Seleksi Baris
    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedIds, setSelectedIds] = useState([]);

    // State Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const dataList = pekerjaans?.data || [];

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
            fetchFilteredData(
                searchTerm,
                selectedProject,
                selectedStage,
                sortOrder,
                perPage,
                1
            );
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm, selectedProject, selectedStage]);

    const fetchFilteredData = (
        search,
        projectId,
        stageId,
        order,
        itemsPerPage,
        page = 1
    ) => {
        setSelectedIds([]);

        router.get(
            route('pekerjaan.index'),
            {
                search: search || undefined,
                project_id: projectId !== 'ALL' ? projectId : undefined,
                stage_id: stageId !== 'ALL' ? stageId : undefined,
                order,
                per_page: itemsPerPage,
                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onStart: () => setIsProcessing(true),
                onFinish: () => setIsProcessing(false),
            }
        );
    };

    const toggleSort = () => {
        const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';

        setSortOrder(nextOrder);

        fetchFilteredData(
            searchTerm,
            selectedProject,
            selectedStage,
            nextOrder,
            perPage,
            1
        );
    };

    const handlePerPageSubmit = () => {
        let val = parseInt(perPageInput, 10);

        if (isNaN(val) || val < 1) val = 10;
        else if (val > 100) val = 100;

        setPerPageInput(val);

        if (val !== perPage) {
            setPerPage(val);

            fetchFilteredData(
                searchTerm,
                selectedProject,
                selectedStage,
                sortOrder,
                val,
                1
            );
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
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleExport = () => {
        window.open(route('pekerjaan.export'), '_blank');
    };

    const handleDeleteSelected = () => {
        if (!isAdmin || selectedIds.length === 0) return;

        confirm({
            title: 'Hapus Item Pekerjaan',
            message: `Apakah kamu yakin ingin menghapus ${selectedIds.length} item pekerjaan terpilih? Foto Cloudinary terkait juga akan dihapus.`,
            variant: 'danger',
            confirmText: 'Ya, Hapus Semua',
            cancelText: 'Batal',
            onConfirm: () => {
                router.post(
                    route('pekerjaan.bulk-delete'),
                    { ids: selectedIds },
                    {
                        preserveScroll: true,
                        onStart: () => setIsProcessing(true),
                        onSuccess: () => setSelectedIds([]),
                        onFinish: () => setIsProcessing(false),
                    }
                );
            },
        });
    };

    const handleReset = () => {
        if (!isAdmin) return;

        confirm({
            title: 'Kosongkan Seluruh Pekerjaan WBS',
            message: 'Apakah kamu yakin ingin mengosongkan seluruh data item pekerjaan? Tindakan ini tidak dapat dibatalkan.',
            variant: 'danger',
            confirmText: 'Ya, Kosongkan Data',
            cancelText: 'Batal',
            onConfirm: () => {
                router.post(
                    route('pekerjaan.reset'),
                    {},
                    {
                        preserveScroll: true,
                        onStart: () => setIsProcessing(true),
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

    const getRowNumber = (index) => {
        if (!pekerjaans) return index + 1;

        const currentPage = pekerjaans.current_page || 1;
        const limit = pekerjaans.per_page || 10;

        return (currentPage - 1) * limit + index + 1;
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            {/* Toolbar Atas */}
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
                    <div className="flex flex-nowrap items-center gap-2">
                        <HybridDropdown
                            value={selectedProject}
                            options={[
                                { value: 'ALL', label: 'Semua Site Proyek' },
                                ...projects.map((p) => ({
                                    value: String(p.id),
                                    label: `${p.site_id} - ${p.site_name}`
                                }))
                            ]}
                            onChange={setSelectedProject}
                            placeholder="Semua Site Proyek"
                            searchPlaceholder="Cari site proyek..."
                            allowCustom={false}
                            className="!w-48 shrink-0"
                            inputClassName="font-semibold text-slate-700 dark:text-slate-300"
                        />

                        <HybridDropdown
                            value={selectedStage}
                            options={[
                                { value: 'ALL', label: 'Semua Tahap' },
                                ...stages.map((st) => ({
                                    value: String(st.id),
                                    label: st.nama_stage
                                }))
                            ]}
                            onChange={setSelectedStage}
                            placeholder="Semua Tahap"
                            searchPlaceholder="Cari tahap..."
                            allowCustom={false}
                            className="!w-40 shrink-0"
                            inputClassName="font-semibold text-slate-700 dark:text-slate-300"
                        />
                    </div>
                }
            />

            {/* Sub-Header: Search & Tombol Tambah */}
            <div className="px-5 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Total: {pekerjaans?.total || 0} Item Pekerjaan
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari Kode WBS / Pekerjaan / Site..."
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
                            className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs shrink-0 cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Pekerjaan</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Tabel Data Pekerjaan */}
            <div className="w-full overflow-x-auto relative border-b border-slate-200 dark:border-slate-800">
                <CrudTablePekerjaan
                    dataList={dataList}
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectRow={handleSelectRow}
                    onEditRow={canWrite ? handleOpenEdit : undefined}
                    getRowNumber={getRowNumber}
                    zoomLevel={zoomLevel}
                />
            </div>

            {/* Pagination Footer */}
            {pekerjaans && (
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

                                if (val !== '' && Number(val) > 100) {
                                    setPerPageInput(100);
                                } else {
                                    setPerPageInput(val);
                                }
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
                        Menampilkan{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {pekerjaans.from || 0}
                        </span>{' '}
                        –{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {pekerjaans.to || 0}
                        </span>{' '}
                        dari{' '}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {pekerjaans.total || 0}
                        </span>{' '}
                        data
                    </div>

                    <div className="flex items-center gap-1">
                        {pekerjaans.links?.map((link, idx) => {
                            let label = link.label;

                            if (
                                label.includes('Previous') ||
                                label.includes('&laquo;')
                            ) {
                                label = (
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                );
                            } else if (
                                label.includes('Next') ||
                                label.includes('&raquo;')
                            ) {
                                label = (
                                    <ChevronRight className="w-3.5 h-3.5" />
                                );
                            }

                            return (
                                <Button
                                    key={`page-pek-${idx}`}
                                    type="button"
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url || isProcessing}
                                    onClick={() =>
                                        link.url &&
                                        router.get(
                                            link.url,
                                            {},
                                            {
                                                preserveState: true,
                                                preserveScroll: true
                                            }
                                        )
                                    }
                                    className={`h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 ${
                                        link.active
                                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Modal Tambah / Edit Pekerjaan */}
            <ModalPekerjaan
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
                }}
                isEditMode={isEditMode}
                selectedItem={selectedItem}
                projects={projects}
                stages={stages}
            />
        </div>
    );
}