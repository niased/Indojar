// resources/js/Pages/Welcome/ProjectWelcome.jsx

import React, { useState } from 'react';

import img1 from '@/../images/b2s.jpg';
import img2 from '@/../images/ptindojar3.jpg';
import img3 from '@/../images/colo.jpg';

const projectImages = [img1, img2, img3, img1, img2, img3, img1, img2];

export default function ProjectWelcome({ t }) {
    const [activeTab, setActiveTab] = useState('b2s');
    const [activeProject, setActiveProject] = useState(0);

    const b2sList = [
        { site: 'Panguragan Kulon', city: 'Cirebon', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Cilangkap', city: 'Depok', province: 'Jawa Barat', scope: 'Monopole 30M SACME' },
        { site: 'Ciomas Kota Baru', city: 'Bogor', province: 'Jawa Barat', scope: 'SST 42M B2S SACME' },
        { site: 'Katulampa', city: 'Bogor', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Batujajar', city: 'Bandung', province: 'Jawa Barat', scope: 'SST 42M B2S SACME' },
        { site: 'Bahagia Babelan', city: 'Bekasi', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Sukadanau Cikarang', city: 'Bekasi', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Bengle Majalaya', city: 'Karawang', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
    ];

    const strList = [
        { site: 'Kawali Linggapura', city: 'Ciamis', province: 'Jawa Barat', scope: 'Re-Bracing & Member' },
        { site: 'Cipaku Selamanik', city: 'Ciamis', province: 'Jawa Barat', scope: 'Strengthening Leg 1-4' },
        { site: 'Curug Serang', city: 'Serang', province: 'Banten', scope: 'Member Replacement' },
        { site: 'Raya Kresek', city: 'Tangerang', province: 'Banten', scope: 'Strengthening SST' },
        { site: 'Mayor Oking Citeureup', city: 'Bogor', province: 'Jawa Barat', scope: 'Antenna Mount Support' },
        { site: 'Rorotan', city: 'Jakarta Utara', province: 'DKI Jakarta', scope: 'Strengthening & CME' },
        { site: 'Dumai Harbor', city: 'Dumai', province: 'Riau Mainland', scope: 'Tower Strengthening' },
        { site: 'Tabek Patah', city: 'Tanah Datar', province: 'Sumatera Barat', scope: 'Tower Strengthening' },
    ];

    const projectList = activeTab === 'b2s' ? b2sList : strList;
    const current = projectList[activeProject % projectList.length];

    const changeTab = (tab) => {
        setActiveTab(tab);
        setActiveProject(0);
    };

    const selectProject = (index) => {
        setActiveProject(index);
    };

    return (
        <section
            id="portofolio"
            className="relative overflow-hidden border-b border-[#d5ad59]/20 bg-[#061b14] py-20 sm:py-24"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                    `,
                    backgroundSize: '72px 72px',
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <header className="mb-12 max-w-3xl">
                    <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300 sm:text-xs">
                        {t.projects.tag}
                    </span>

                    <h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                        {t.projects.title}
                    </h2>

                    <div className="mt-5 h-px w-16 bg-[#d5ad59]" />

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                        {t.projects.subtitle}
                    </p>
                </header>

                <div className="mb-8 flex border-b border-white/10">
                    <button
                        type="button"
                        onClick={() => changeTab('b2s')}
                        className={`border-b-2 px-1 pb-4 mr-8 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                            activeTab === 'b2s'
                                ? 'border-amber-300 text-amber-300'
                                : 'border-transparent text-white/35 hover:text-white/70'
                        }`}
                    >
                        {t.projects.b2sTab}
                    </button>

                    <button
                        type="button"
                        onClick={() => changeTab('str')}
                        className={`border-b-2 px-1 pb-4 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                            activeTab === 'str'
                                ? 'border-amber-300 text-amber-300'
                                : 'border-transparent text-white/35 hover:text-white/70'
                        }`}
                    >
                        {t.projects.strTab}
                    </button>
                </div>

                <div
                    key={`${activeTab}-${activeProject}`}
                    className="project-reveal grid border border-[#d5ad59]/50 bg-[#0a3524] lg:grid-cols-[1.35fr_0.65fr]"
                >
                    <div className="relative min-h-[360px] overflow-hidden bg-[#08291d] sm:min-h-[480px] lg:min-h-[570px]">
                        <img
                            src={projectImages[activeProject % projectImages.length]}
                            alt={current.site}
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#03160e]/50 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                                {String(activeProject + 1).padStart(2, '0')} /{' '}
                                {String(projectList.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between bg-[#075d35] p-7 sm:p-10 lg:p-12">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-amber-300" />

                                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                                    {activeTab === 'b2s'
                                        ? 'B2S SACME'
                                        : 'Tower Strengthening'}
                                </span>
                            </div>

                            <h3 className="mt-7 font-heading text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                                {current.site}
                            </h3>

                            <p className="mt-4 text-sm font-medium uppercase tracking-[0.08em] text-white/55">
                                {current.city} · {current.province}
                            </p>

                            <div className="mt-7 h-px w-14 bg-amber-300" />

                            <p className="mt-6 text-sm leading-7 text-white/75 sm:text-base">
                                {current.scope}
                            </p>
                        </div>

                        <div className="mt-10 border-t border-white/10 pt-5">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <span className="block text-[9px] uppercase tracking-[0.18em] text-white/40">
                                        Project Location
                                    </span>

                                    <span className="mt-1 block text-sm font-semibold text-white">
                                        {current.city}, {current.province}
                                    </span>
                                </div>

                                <span className="text-4xl font-bold tracking-tight text-white/10">
                                    {String(activeProject + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                    {projectList.map((item, index) => (
                        <button
                            key={`${activeTab}-${item.site}`}
                            type="button"
                            onClick={() => selectProject(index)}
                            className={`group relative overflow-hidden border text-left transition-all duration-300 ${
                                activeProject === index
                                    ? 'border-amber-300'
                                    : 'border-white/10 hover:border-white/30'
                            }`}
                        >
                            <div className="relative h-20 overflow-hidden sm:h-24">
                                <img
                                    src={projectImages[index % projectImages.length]}
                                    alt={item.site}
                                    className={`h-full w-full object-cover transition duration-500 ${
                                        activeProject === index
                                            ? 'scale-100 opacity-100'
                                            : 'scale-105 opacity-35 group-hover:opacity-65'
                                    }`}
                                />

                                <div className="absolute inset-0 bg-[#03160e]/35" />

                                <span
                                    className={`absolute bottom-2 left-2 text-[9px] font-bold tracking-[0.12em] ${
                                        activeProject === index
                                            ? 'text-amber-300'
                                            : 'text-white/50'
                                    }`}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <div className="min-h-10 bg-[#08291d] px-2 py-2">
                                <span className="block truncate text-[9px] font-medium text-white/60">
                                    {item.site}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-20">
                    <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-4">
                        <div>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                                Project Directory
                            </span>

                            <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                                {activeTab === 'b2s'
                                    ? t.projects.b2sTab
                                    : t.projects.strTab}
                            </h3>
                        </div>

                        <span className="text-xs text-white/35">
                            {projectList.length} Projects
                        </span>
                    </div>

                    <div className="overflow-x-auto border border-white/10">
                        <table className="w-full min-w-[700px] text-left">
                            <thead className="border-b border-white/10 bg-[#0a2b1e] text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
                                <tr>
                                    <th className="px-5 py-4">No</th>
                                    <th className="px-5 py-4">
                                        {t.projects.thSite}
                                    </th>
                                    <th className="px-5 py-4">
                                        {t.projects.thCity}
                                    </th>
                                    <th className="px-5 py-4">
                                        {t.projects.thProvince}
                                    </th>
                                    <th className="px-5 py-4 text-right">
                                        {t.projects.thScope}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {projectList.map((item, index) => (
                                    <tr
                                        key={`directory-${activeTab}-${item.site}`}
                                        onClick={() => selectProject(index)}
                                        className={`cursor-pointer border-b border-white/[0.06] transition-colors last:border-0 ${
                                            activeProject === index
                                                ? 'bg-[#0d4930]'
                                                : 'hover:bg-white/[0.025]'
                                        }`}
                                    >
                                        <td className="px-5 py-4 font-mono text-xs text-white/30">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>

                                        <td className="px-5 py-4 text-xs font-semibold text-white sm:text-sm">
                                            {item.site}
                                        </td>

                                        <td className="px-5 py-4 text-xs text-white/60 sm:text-sm">
                                            {item.city}
                                        </td>

                                        <td className="px-5 py-4 text-xs text-white/45 sm:text-sm">
                                            {item.province}
                                        </td>

                                        <td className="px-5 py-4 text-right text-[10px] font-medium uppercase tracking-[0.06em] text-amber-300/80 sm:text-xs">
                                            {item.scope}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
                .project-reveal {
                    animation: projectReveal 650ms cubic-bezier(.22,.8,.2,1) both;
                }

                @keyframes projectReveal {
                    from {
                        opacity: 0;
                        transform: translateY(14px) scale(.985);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .project-reveal {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
}