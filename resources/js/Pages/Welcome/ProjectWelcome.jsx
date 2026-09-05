// resources/js/Pages/Welcome/ProjectWelcome.jsx

import React, { useState } from 'react';

export default function ProjectWelcome({ t }) {
    const [activeTab, setActiveTab] = useState('b2s');

    const b2sList = [
        {
            site: 'Panguragan Kulon',
            city: 'Cirebon',
            province: 'Jawa Barat',
            scope: 'SST 52M B2S SACME',
        },
        {
            site: 'Cilangkap',
            city: 'Depok',
            province: 'Jawa Barat',
            scope: 'Monopole 30M SACME',
        },
        {
            site: 'Ciomas Kota Baru',
            city: 'Bogor',
            province: 'Jawa Barat',
            scope: 'SST 42M B2S SACME',
        },
        {
            site: 'Katulampa',
            city: 'Bogor',
            province: 'Jawa Barat',
            scope: 'SST 52M B2S SACME',
        },
        {
            site: 'Batujajar',
            city: 'Bandung',
            province: 'Jawa Barat',
            scope: 'SST 42M B2S SACME',
        },
        {
            site: 'Bahagia Babelan',
            city: 'Bekasi',
            province: 'Jawa Barat',
            scope: 'SST 52M B2S SACME',
        },
        {
            site: 'Sukadanau Cikarang',
            city: 'Bekasi',
            province: 'Jawa Barat',
            scope: 'SST 52M B2S SACME',
        },
        {
            site: 'Bengle Majalaya',
            city: 'Karawang',
            province: 'Jawa Barat',
            scope: 'SST 52M B2S SACME',
        },
    ];

    const strList = [
        {
            site: 'Kawali Linggapura',
            city: 'Ciamis',
            province: 'Jawa Barat',
            scope: 'Re-Bracing & Member',
        },
        {
            site: 'Cipaku Selamanik',
            city: 'Ciamis',
            province: 'Jawa Barat',
            scope: 'Strengthening Leg 1-4',
        },
        {
            site: 'Curug Serang',
            city: 'Serang',
            province: 'Banten',
            scope: 'Member Replacement',
        },
        {
            site: 'Raya Kresek',
            city: 'Tangerang',
            province: 'Banten',
            scope: 'Strengthening SST',
        },
        {
            site: 'Mayor Oking Citeureup',
            city: 'Bogor',
            province: 'Jawa Barat',
            scope: 'Antenna Mount Support',
        },
        {
            site: 'Rorotan',
            city: 'Jakarta Utara',
            province: 'DKI Jakarta',
            scope: 'Strengthening & CME',
        },
        {
            site: 'Dumai Harbor',
            city: 'Dumai',
            province: 'Riau Mainland',
            scope: 'Tower Strengthening',
        },
        {
            site: 'Tabek Patah',
            city: 'Tanah Datar',
            province: 'Sumatera Barat',
            scope: 'Tower Strengthening',
        },
    ];

    const projectList = activeTab === 'b2s' ? b2sList : strList;

    return (
        <section
            id="portofolio"
            className="mx-auto max-w-7xl border-b border-slate-200 px-6 py-24 dark:border-slate-800/80 sm:px-10"
        >
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        {t.projects.tag}
                    </span>

                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        {t.projects.title}
                    </h2>

                    <p className="mt-1 max-w-xl text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                        {t.projects.subtitle}
                    </p>
                </div>

                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-200/70 p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900">
                    <button
                        type="button"
                        onClick={() => setActiveTab('b2s')}
                        className={`cursor-pointer rounded-lg px-4 py-2 transition-all ${
                            activeTab === 'b2s'
                                ? 'bg-white font-bold text-slate-900 shadow-xs dark:bg-slate-800 dark:text-white'
                                : 'text-slate-500'
                        }`}
                    >
                        {t.projects.b2sTab}
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('str')}
                        className={`cursor-pointer rounded-lg px-4 py-2 transition-all ${
                            activeTab === 'str'
                                ? 'bg-white font-bold text-slate-900 shadow-xs dark:bg-slate-800 dark:text-white'
                                : 'text-slate-500'
                        }`}
                    >
                        {t.projects.strTab}
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-slate-200 bg-slate-100/80 font-semibold uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4">No</th>
                                <th className="px-6 py-4">
                                    {t.projects.thSite}
                                </th>
                                <th className="px-6 py-4">
                                    {t.projects.thCity}
                                </th>
                                <th className="px-6 py-4">
                                    {t.projects.thProvince}
                                </th>
                                <th className="px-6 py-4 text-right">
                                    {t.projects.thScope}
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            {projectList.map((item, index) => (
                                <tr
                                    key={`${activeTab}-${item.site}`}
                                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/30"
                                >
                                    <td className="px-6 py-3.5 font-mono text-slate-400">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-white">
                                        {item.site}
                                    </td>

                                    <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300">
                                        {item.city}
                                    </td>

                                    <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400">
                                        {item.province}
                                    </td>

                                    <td className="px-6 py-3.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">
                                        {item.scope}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}