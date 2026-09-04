import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TabMasterData from './MasterData/TabMasterData';

export default function ProjectIndex({ projects, existingOptions = {}, filters = {} }) {
    return (
        <AuthenticatedLayout header="Master Proyek">
            <Head title="Master Data Proyek - PT Indojar Mulia Abadi" />
            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Bersih Tanpa Icon */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Master Data Proyek & Site Menara
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Kelola data master site, kode proyek, spesifikasi struktur menara, koordinat GPS, dan target RFI.
                        </p>
                    </div>
                </div>

                {/* Komponen Tabel & Toolbar Master Data */}
                <TabMasterData 
                    projects={projects}
                    existingOptions={existingOptions}
                    filters={filters}
                />
            </div>
        </AuthenticatedLayout>
    );
}