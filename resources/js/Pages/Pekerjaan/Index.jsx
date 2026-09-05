import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TabPekerjaan from './MasterData/TabMasterData';

export default function PekerjaanIndex({ 
    pekerjaans, 
    projects = [], 
    stages = [], 
    filters = {} 
}) {
    return (
        <AuthenticatedLayout header="Master Pekerjaan (WBS)">
            <Head title="Katalog Rincian Pekerjaan WBS - PT Indojar Mulia Abadi" />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Judul */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Katalog Rincian Pekerjaan WBS Menara
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Pencatatan rincian tugas konstruksi fisik, bobot kontrak, realisasi progres riil, tanggal inspeksi, dan foto bukti Cloudinary.
                        </p>
                    </div>
                </div>

                {/* Komponen Tabel & Kontrol Tab Pekerjaan */}
                <TabPekerjaan 
                    pekerjaans={pekerjaans}
                    projects={projects}
                    stages={stages}
                    filters={filters}
                />
            </div>
        </AuthenticatedLayout>
    );
}