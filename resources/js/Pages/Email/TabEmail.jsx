import React, { useState, useMemo, useEffect } from 'react';
import Toolbar from '@/components/Toolbar';
import HybridDropdown from '@/components/HybridDropdown';
import CrudTable from './CrudTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Mail, 
    Search, 
    X, 
    ChevronLeft, 
    ChevronRight, 
    RotateCcw 
} from 'lucide-react';
import { useConfirm } from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function TabEmail({
    emails = [],
    type = 'outbox',
    filters = {},
    onOpenDetail,
    onDeleteRow,
}) {
    const confirm = useConfirm();

    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isProcessing, setIsProcessing] = useState(false);

    const [zoomLevel, setZoomLevel] = useState(100);
    const [selectedIds, setSelectedIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [perPageInput, setPerPageInput] = useState(10);

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 120));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
    const handleResetZoom = () => setZoomLevel(100);
    const handleFitZoom = () => setZoomLevel(75);

    const toggleSort = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

    const rawData = emails?.data || emails || [];

    const filteredList = useMemo(() => {
        let list = rawData.filter((item) => {
            const s = searchTerm.trim().toLowerCase();
            let matchesSearch = false;

            if (type === 'inbox') {
                matchesSearch = 
                    !s ||
                    (item.from_email && item.from_email.toLowerCase().includes(s)) ||
                    (item.sender_name && item.sender_name.toLowerCase().includes(s)) ||
                    (item.subject && item.subject.toLowerCase().includes(s));
            } else {
                matchesSearch = 
                    !s ||
                    (item.recipient && item.recipient.toLowerCase().includes(s)) ||
                    (item.subject && item.subject.toLowerCase().includes(s));
            }

            let matchesStatus = true;
            if (type === 'inbox') {
                matchesStatus = 
                    selectedStatus === 'ALL' ||
                    (selectedStatus === 'UNREAD' && !item.is_read) ||
                    (selectedStatus === 'READ' && item.is_read);
            } else {
                matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
            }

            return matchesSearch && matchesStatus;
        });

        list.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return list;
    }, [rawData, searchTerm, selectedStatus, sortOrder, type]);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedIds([]);
    }, [searchTerm, selectedStatus, sortOrder]);

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

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(paginatedData.map((item) => item.id).filter(Boolean));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) return;
        const deleteRouteName = type === 'inbox' ? 'emails.inbound.destroy' : 'emails.destroy';
        
        confirm({
            title: `Hapus Email Terpilih (${selectedIds.length})`,
            message: `Apakah kamu yakin ingin menghapus ${selectedIds.length} data terpilih?`,
            variant: 'danger',
            onConfirm: () => {
                setIsProcessing(true);
                selectedIds.forEach((id) => {
                    router.delete(route(deleteRouteName, id), { preserveScroll: true });
                });
                setSelectedIds([]);
                setIsProcessing(false);
            },
        });
    };

    const handleExportCSV = () => {
        const columns = type === 'inbox' 
            ? ['Pengirim', 'Email Pengirim', 'Subjek', 'Tujuan', 'Status', 'Waktu Terima']
            : ['Penerima', 'Subjek', 'Status', 'Waktu Kirim', 'Operator'];

        const rows = filteredList.map((item) => {
            if (type === 'inbox') {
                return [
                    `"${item.sender_name || 'Tanpa Nama'}"`,
                    `"${item.from_email}"`,
                    `"${(item.subject || '').replace(/"/g, '""')}"`,
                    `"${item.to_email}"`,
                    `"${item.is_read ? 'READ' : 'UNREAD'}"`,
                    `"${item.created_at}"`,
                ];
            }
            return [
                `"${item.recipient}"`,
                `"${(item.subject || '').replace(/"/g, '""')}"`,
                `"${item.status}"`,
                `"${item.created_at}"`,
                `"${item.user?.name || 'Sistem'}"`,
            ];
        });

        const csvContent = '\uFEFF' + [columns.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${type === 'inbox' ? 'Kotak_Masuk_Email' : 'Riwayat_Email_Outbox'}_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const statusOptions = type === 'inbox' 
        ? [
            { value: 'ALL', label: 'Semua Status' },
            { value: 'UNREAD', label: 'Belum Dibaca' },
            { value: 'READ', label: 'Sudah Dibaca' },
          ]
        : [
            { value: 'ALL', label: 'Semua Status' },
            { value: 'sent', label: 'Terkirim' },
            { value: 'failed', label: 'Gagal' },
          ];

    const unreadCount = type === 'inbox' ? rawData.filter((i) => !i.is_read).length : 0;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            {/* 1. TOOLBAR UTAMA */}
            <Toolbar
                sortOrder={sortOrder}
                onToggleSort={toggleSort}
                selectedCount={selectedIds.length}
                onDeleteSelected={handleDeleteSelected}
                onExport={handleExportCSV}
                isProcessing={isProcessing}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onResetZoom={handleResetZoom}
                onFitZoom={handleFitZoom}
                leftContent={
                    <div className="flex flex-nowrap items-center gap-2">
                        <HybridDropdown
                            value={selectedStatus}
                            options={statusOptions}
                            onChange={setSelectedStatus}
                            placeholder="Semua Status"
                            allowCustom={false}
                            className="!w-40 shrink-0"
                            inputClassName="font-semibold text-slate-700 dark:text-slate-300"
                        />
                    </div>
                }
            />

            {/* 2. SUB-HEADER TOOLBAR */}
            <div className="px-5 py-2.5 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Mail className={`w-4 h-4 ${type === 'inbox' ? 'text-blue-500' : 'text-emerald-500'}`} />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Total: {totalData} {type === 'inbox' ? 'Email Masuk' : 'Log Email'}
                    </span>
                    {type === 'inbox' && unreadCount > 0 && (
                        <Badge className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full ml-1">
                            {unreadCount} Belum Dibaca
                        </Badge>
                    )}
                    {(searchTerm || selectedStatus !== 'ALL') && (
                        <button
                            type="button"
                            onClick={() => { setSearchTerm(''); setSelectedStatus('ALL'); }}
                            className="flex items-center gap-1 text-[11px] text-rose-500 hover:underline cursor-pointer ml-2"
                        >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset Filter</span>
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={type === 'inbox' ? "Cari pengirim / subjek..." : "Cari penerima / subjek..."}
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
                </div>
            </div>

            {/* 3. TABEL DATA */}
            <div className="w-full overflow-x-auto relative border-b border-slate-200 dark:border-slate-800">
                <CrudTable
                    dataList={paginatedData}
                    selectedIds={selectedIds}
                    onSelectAll={handleSelectAll}
                    onSelectRow={handleSelectRow}
                    onOpenDetail={onOpenDetail}
                    onDeleteRow={onDeleteRow}
                    getRowNumber={getRowNumber}
                    zoomLevel={zoomLevel}
                    type={type}
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
                    Menampilkan <span className="font-semibold text-slate-700 dark:text-slate-300">{fromIndex}</span> –{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{toIndex}</span> dari{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{totalData}</span> {type === 'inbox' ? 'email' : 'log'}
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
                                key={`page-${type}-${pageNum}`}
                                type="button"
                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={`h-8 min-w-[32px] px-2 text-xs font-semibold dark:border-slate-800 cursor-pointer ${
                                    currentPage === pageNum
                                        ? type === 'inbox' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
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
    );
}