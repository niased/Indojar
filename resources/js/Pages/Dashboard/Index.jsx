import React, { useState, useRef, useMemo } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HybridDropdown from '@/components/HybridDropdown';
import { 
    Briefcase, 
    Layers, 
    Filter, 
    Image as ImageIcon, 
    Loader2, 
    RotateCcw 
} from 'lucide-react';
import { toPng } from 'html-to-image';

import Statistik from './Statistik';
import GrafikTransaksi from './GrafikTransaksi';
import Peta from './Peta';
import TabelAktivitas from './TabelAktivitas';

export default function DashboardIndex({ 
    kpi = {}, 
    filters = {}, 
    sowDistribution = {}, 
    mapData = [], 
    chartData = [], 
    kondisiChartData = [], 
    recentProjects = [],
    areas = [],
    sows = []
}) {
    const { auth } = usePage().props;
    const [isExporting, setIsExporting] = useState(false);
    const dashboardRef = useRef(null);

    const currentArea = String(filters.area_id || 'ALL');
    const currentSow = String(filters.sow_id || 'ALL');
    const currentStatus = String(filters.status || 'ALL');

    const handleFilterChange = (key, value) => {
        router.get(
            route('dashboard'),
            {
                ...filters,
                [key]: value !== 'ALL' ? value : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleResetAllFilters = () => {
        router.get(
            route('dashboard'),
            {},
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const isFiltered = currentArea !== 'ALL' || currentSow !== 'ALL' || currentStatus !== 'ALL';

    const handleDownloadDashboardImage = async () => {
        if (!dashboardRef.current) return;
        setIsExporting(true);
        const isDarkMode = document.documentElement.classList.contains('dark');
        try {
            const dataUrl = await toPng(dashboardRef.current, {
                cacheBust: true,
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: isDarkMode ? '#05130e' : '#f8fafc',
            });
            const link = document.createElement('a');
            link.download = `Dashboard_Proyek_Indojar_${new Date().toISOString().slice(0, 10)}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Gagal mendownload gambar dashboard:", err);
            alert("Terjadi kesalahan saat memproses gambar.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <AuthenticatedLayout header="Dashboard Proyek">
            <Head title="Dashboard Proyek & Site - PT Indojar Mulia Abadi" />
            <style>{`
                .capture-area *::-webkit-scrollbar {
                    display: none !important;
                    width: 0 !important;
                    height: 0 !important;
                    background: transparent !important;
                }
                .capture-area * {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}</style>

            <div className="space-y-5 max-w-7xl mx-auto">
                {/* 1. Header Title & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Dashboard Proyek & Site Tower
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Pusat kendali dan monitoring progres konstruksi menara, pondasi sipil, erection, CME, dan sebaran site lapangan.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('project.index')}>
                            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer">
                                <Briefcase className="w-4 h-4" />
                                <span>Master Proyek</span>
                            </button>
                        </Link>
                        <Link href={route('laporan.index')}>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-[#07241a] dark:text-slate-200 dark:hover:bg-[#0b3325] border border-emerald-800/40 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer">
                                <Layers className="w-4 h-4" />
                                <span>Laporan Rekapitulasi</span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* 2. Filter Bar & Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900/50 p-4 border border-slate-200 dark:border-slate-800/80 rounded-xl shadow-sm">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider pr-1">
                            <Filter className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                            <span>Filter Dashboard</span>
                        </div>
                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
                        
                        {/* Filter Area */}
                        <div className="w-full sm:w-44">
                            <HybridDropdown
                                value={currentArea}
                                options={[
                                    { value: 'ALL', label: 'Semua Area' },
                                    ...areas.map((a) => ({
                                        value: String(a.id),
                                        label: a.nama_area,
                                        subLabel: a.regional
                                    }))
                                ]}
                                onChange={(val) => handleFilterChange('area_id', val)}
                                placeholder="Semua Area"
                                searchPlaceholder="Cari Area..."
                                allowCustom={false}
                                inputClassName="h-9 text-xs font-semibold bg-slate-50 dark:bg-slate-950/50"
                            />
                        </div>

                        {/* Filter SOW */}
                        <div className="w-full sm:w-40">
                            <HybridDropdown
                                value={currentSow}
                                options={[
                                    { value: 'ALL', label: 'Semua SOW' },
                                    ...sows.map((s) => ({
                                        value: String(s.id),
                                        label: s.nama_sow
                                    }))
                                ]}
                                onChange={(val) => handleFilterChange('sow_id', val)}
                                placeholder="Semua SOW"
                                searchPlaceholder="Cari SOW..."
                                allowCustom={false}
                                inputClassName="h-9 text-xs font-semibold bg-slate-50 dark:bg-slate-950/50"
                            />
                        </div>

                        {/* Filter Status */}
                        <div className="w-full sm:w-40">
                            <HybridDropdown
                                value={currentStatus}
                                options={[
                                    { value: 'ALL', label: 'Semua Status' },
                                    { value: 'PLANNING', label: 'PLANNING' },
                                    { value: 'ON_PROGRESS', label: 'ON_PROGRESS' },
                                    { value: 'ISSUE', label: 'ISSUE' },
                                    { value: 'COMPLETED', label: 'COMPLETED' },
                                ]}
                                onChange={(val) => handleFilterChange('status', val)}
                                placeholder="Semua Status"
                                searchPlaceholder="Cari Status..."
                                allowCustom={false}
                                inputClassName="h-9 text-xs font-semibold bg-slate-50 dark:bg-slate-950/50"
                            />
                        </div>

                        {isFiltered && (
                            <button
                                type="button"
                                onClick={handleResetAllFilters}
                                className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reset Filter</span>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                            onClick={handleDownloadDashboardImage}
                            disabled={isExporting}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Memproses Gambar...</span>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="w-4 h-4" />
                                    <span>Download Dashboard (PNG)</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* 3. Area Capture Dashboard */}
                <div ref={dashboardRef} className="capture-area space-y-5 p-5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-900 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-3">
                        <div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                                Ringkasan Operasional Konstruksi Menara
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                PT Indojar Mulia Abadi &bull; Telecommunication Infrastructure Management
                            </p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                            Tanggal: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    </div>

                    {/* Status Cards (Statistik) */}
                    <Statistik kpi={kpi} />

                    {/* Grafik Distribusi & Tren Bulanan */}
                    <GrafikTransaksi 
                        chartData={chartData} 
                        kondisiChartData={kondisiChartData} 
                        sowDistribution={sowDistribution} 
                    />

                    {/* Peta Sebaran Lokasi Menara */}
                    <Peta mapData={mapData} />

                    {/* Tabel Aktivitas Proyek Terkini */}
                    <TabelAktivitas recentProjects={recentProjects} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}