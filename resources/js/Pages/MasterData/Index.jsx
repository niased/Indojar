import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TabMasterKamus from './TabMasterKamus';

export default function MasterDataIndex({ areas = [], sows = [], stages = [] }) {
    return (
        <AuthenticatedLayout header="Master Data Kamus">
            <Head title="Master Data Kamus - PT Indojar Mulia Abadi" />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Identitas Modul */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                            Kamus Standar Proyek Telekomunikasi
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Pusat konfigurasi referensi terpadu untuk klasifikasi SOW, wilayah operasional, tahapan konstruksi, dan template WBS acuan.
                        </p>
                    </div>
                </div>

                {/* Tab Kontainer Terpadu Ala Transaksi */}
                <TabMasterKamus
                    areas={areas}
                    sows={sows}
                    stages={stages}
                />
            </div>
        </AuthenticatedLayout>
    );
}