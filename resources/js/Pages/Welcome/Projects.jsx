// resources/js/Pages/Welcome/Projects.jsx

import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, MapPin } from 'lucide-react';

import Navbar from './Navbar';
import PageHero from './PageHero';
import FooterWelcome from './FooterWelcome';

import b2sImage from '@/../images/b2s.jpg';
import towerImage from '@/../images/ptindojar3.jpg';
import coloImage from '@/../images/colo.jpg';

const projectImages = [
    b2sImage,
    towerImage,
    coloImage,
    b2sImage,
    towerImage,
    coloImage,
    b2sImage,
    towerImage,
];

export default function Projects() {
    const [lang, setLang] = useState('id');
    const [activeTab, setActiveTab] = useState('b2s');
    const [activeProject, setActiveProject] = useState(0);

    const content = {
        id: {
            nav: {
                about: 'Tentang Kami',
                services: 'Layanan',
                projects: 'Proyek',
                contact: 'Kontak',
            },

            hero: {
                eyebrow: 'PORTOFOLIO PROYEK',
                title:
                    'Pekerjaan Nyata, di Berbagai Wilayah Indonesia.',
            },

            labels: {
                b2s: 'B2S SACME',
                strengthening: 'Tower Strengthening',
                scope: 'Lingkup Kerja',
                projectDirectory: 'Project Directory',
                selected: 'Project Terpilih',
                location: 'Lokasi',
                category: 'Kategori',
            },

            b2sList: [
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
            ],

            strengtheningList: [
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
            ],
        },

        en: {
            nav: {
                about: 'About Us',
                services: 'Services',
                projects: 'Projects',
                contact: 'Contact',
            },

            hero: {
                eyebrow: 'PROJECT PORTFOLIO',
                title:
                    'Real Work, Across Multiple Regions in Indonesia.',
            },

            labels: {
                b2s: 'B2S SACME',
                strengthening: 'Tower Strengthening',
                scope: 'Scope of Work',
                projectDirectory: 'Project Directory',
                selected: 'Selected Project',
                location: 'Location',
                category: 'Category',
            },

            b2sList: [
                {
                    site: 'Panguragan Kulon',
                    city: 'Cirebon',
                    province: 'West Java',
                    scope: 'SST 52M B2S SACME',
                },
                {
                    site: 'Cilangkap',
                    city: 'Depok',
                    province: 'West Java',
                    scope: 'Monopole 30M SACME',
                },
                {
                    site: 'Ciomas Kota Baru',
                    city: 'Bogor',
                    province: 'West Java',
                    scope: 'SST 42M B2S SACME',
                },
                {
                    site: 'Katulampa',
                    city: 'Bogor',
                    province: 'West Java',
                    scope: 'SST 52M B2S SACME',
                },
                {
                    site: 'Batujajar',
                    city: 'Bandung',
                    province: 'West Java',
                    scope: 'SST 42M B2S SACME',
                },
                {
                    site: 'Bahagia Babelan',
                    city: 'Bekasi',
                    province: 'West Java',
                    scope: 'SST 52M B2S SACME',
                },
                {
                    site: 'Sukadanau Cikarang',
                    city: 'Bekasi',
                    province: 'West Java',
                    scope: 'SST 52M B2S SACME',
                },
                {
                    site: 'Bengle Majalaya',
                    city: 'Karawang',
                    province: 'West Java',
                    scope: 'SST 52M B2S SACME',
                },
            ],

            strengtheningList: [
                {
                    site: 'Kawali Linggapura',
                    city: 'Ciamis',
                    province: 'West Java',
                    scope: 'Re-Bracing & Member',
                },
                {
                    site: 'Cipaku Selamanik',
                    city: 'Ciamis',
                    province: 'West Java',
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
                    province: 'West Java',
                    scope: 'Antenna Mount Support',
                },
                {
                    site: 'Rorotan',
                    city: 'North Jakarta',
                    province: 'Jakarta',
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
                    province: 'West Sumatra',
                    scope: 'Tower Strengthening',
                },
            ],
        },
    };

    const current = content[lang];

    const projectList =
        activeTab === 'b2s'
            ? current.b2sList
            : current.strengtheningList;

    const selectedProject =
        projectList[activeProject % projectList.length];

    const changeTab = (tab) => {
        setActiveTab(tab);
        setActiveProject(0);
    };

    const changeProject = (direction) => {
        setActiveProject(
            (value) =>
                (value + direction + projectList.length) %
                projectList.length,
        );
    };

    return (
        <div className="min-h-screen bg-[#f7f6f1] text-[#10231c]">
            <Head
                title={
                    lang === 'id'
                        ? 'Proyek | PT Indojar Mulia Abadi'
                        : 'Projects | PT Indojar Mulia Abadi'
                }
            />

            {/* =====================================================
                NAVBAR
            ===================================================== */}
            <Navbar
                lang={lang}
                setLang={setLang}
                t={current}
            />

            <main>
                {/* =====================================================
                    PAGE HERO
                ===================================================== */}
                <PageHero
                    eyebrow={current.hero.eyebrow}
                    title={current.hero.title}
                    current={
                        lang === 'id'
                            ? 'Proyek'
                            : 'Projects'
                    }
                />

                {/* =====================================================
                    FEATURED PROJECT
                ===================================================== */}
                <section className="bg-[#eaf4ee]">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-9 bg-[#087a48]" />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#087a48]">
                                        {current.labels.selected}
                                    </span>
                                </div>

                                <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-[#10231c] sm:text-4xl lg:text-5xl">
                                    {selectedProject.site}
                                </h2>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => changeProject(-1)}
                                    className="
                                        border
                                        border-[#10231c]/15
                                        px-5
                                        py-3
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.12em]
                                        text-[#10231c]
                                        transition
                                        hover:border-[#087a48]
                                        hover:text-[#087a48]
                                    "
                                >
                                    {lang === 'id' ? 'Sebelumnya' : 'Previous'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeProject(1)}
                                    className="
                                        border
                                        border-[#087a48]
                                        bg-[#087a48]
                                        px-5
                                        py-3
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.12em]
                                        text-white
                                        transition
                                        hover:bg-[#075e39]
                                    "
                                >
                                    {lang === 'id' ? 'Berikutnya' : 'Next'}
                                </button>
                            </div>
                        </div>

                        <div className="grid overflow-hidden border border-[#10231c]/10 bg-[#fffdf8] lg:grid-cols-[1.25fr_0.75fr]">
                            <div className="relative min-h-[380px] bg-[#031a14] lg:min-h-[560px]">
                                <img
                                    src={
                                        projectImages[
                                            activeProject %
                                                projectImages.length
                                        ]
                                    }
                                    alt={selectedProject.site}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#031a14]/75 via-transparent to-transparent" />

                                <div className="absolute bottom-7 left-7 sm:bottom-9 sm:left-9">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d5ad59]">
                                        {selectedProject.scope}
                                    </span>

                                    <h3 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                                        {selectedProject.site}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between px-7 py-9 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                                <div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9a762d]">
                                        {current.labels.location}
                                    </span>

                                    <div className="mt-4 flex items-start gap-3">
                                        <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#087a48]" />

                                        <div>
                                            <p className="font-heading text-xl font-semibold text-[#10231c]">
                                                {selectedProject.city}
                                            </p>

                                            <p className="mt-1 text-sm text-[#617169]">
                                                {selectedProject.province}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 border-t border-[#10231c]/10 pt-8">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9a762d]">
                                        {current.labels.category}
                                    </span>

                                    <p className="mt-4 text-sm leading-7 text-[#52645b]">
                                        {selectedProject.scope}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    PROJECT DIRECTORY
                ===================================================== */}
                <section className="bg-[#fffdf8]">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                        <div className="flex flex-col gap-8 border-b border-[#10231c]/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-9 bg-[#d5ad59]" />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a762d]">
                                        {current.labels.projectDirectory}
                                    </span>
                                </div>

                                <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-[#10231c] sm:text-4xl">
                                    {activeTab === 'b2s'
                                        ? current.labels.b2s
                                        : current.labels.strengthening}
                                </h2>
                            </div>

                            <div className="flex border-b border-[#10231c]/10">
                                <button
                                    type="button"
                                    onClick={() => changeTab('b2s')}
                                    className={`
                                        border-b-2
                                        px-1
                                        pb-4
                                        pr-8
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.14em]
                                        transition
                                        ${
                                            activeTab === 'b2s'
                                                ? 'border-[#087a48] text-[#087a48]'
                                                : 'border-transparent text-[#8b9992] hover:text-[#10231c]'
                                        }
                                    `}
                                >
                                    {current.labels.b2s}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeTab('strengthening')}
                                    className={`
                                        border-b-2
                                        px-1
                                        pb-4
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.14em]
                                        transition
                                        ${
                                            activeTab === 'strengthening'
                                                ? 'border-[#087a48] text-[#087a48]'
                                                : 'border-transparent text-[#8b9992] hover:text-[#10231c]'
                                        }
                                    `}
                                >
                                    {current.labels.strengthening}
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden border-y border-[#10231c]/10">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left">
                                    <thead className="border-b border-[#10231c]/10 bg-[#eaf4ee]">
                                        <tr>
                                            <th className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#77867e]">
                                                No
                                            </th>

                                            <th className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#77867e]">
                                                {lang === 'id'
                                                    ? 'Nama Site'
                                                    : 'Site Name'}
                                            </th>

                                            <th className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#77867e]">
                                                {lang === 'id'
                                                    ? 'Kota / Kabupaten'
                                                    : 'City / Regency'}
                                            </th>

                                            <th className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#77867e]">
                                                {lang === 'id'
                                                    ? 'Provinsi'
                                                    : 'Province'}
                                            </th>

                                            <th className="px-5 py-4 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#77867e]">
                                                {current.labels.scope}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {projectList.map((project, index) => (
                                            <tr
                                                key={project.site}
                                                onClick={() =>
                                                    setActiveProject(index)
                                                }
                                                className="
                                                    group
                                                    cursor-pointer
                                                    border-b
                                                    border-[#10231c]/10
                                                    transition-colors
                                                    last:border-b-0
                                                    hover:bg-[#eaf4ee]/55
                                                "
                                            >
                                                <td className="px-5 py-5 font-heading text-sm font-semibold text-[#9a762d]">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </td>

                                                <td className="px-5 py-5 font-heading text-sm font-semibold text-[#10231c]">
                                                    {project.site}
                                                </td>

                                                <td className="px-5 py-5 text-sm text-[#617169]">
                                                    {project.city}
                                                </td>

                                                <td className="px-5 py-5 text-sm text-[#617169]">
                                                    {project.province}
                                                </td>

                                                <td className="px-5 py-5 text-right text-sm font-medium text-[#087a48]">
                                                    {project.scope}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* =====================================================
                FOOTER
            ===================================================== */}
            <FooterWelcome
                t={{
                    contact: {
                        director:
                            lang === 'id'
                                ? 'Direktur Utama'
                                : 'Managing Director',
                    },
                }}
            />
        </div>
    );
}