// resources/js/Pages/Welcome/About.jsx

import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

import Navbar from './Navbar';
import PageHero from './PageHero';
import VisionMissionWelcome from './VisionMissionWelcome';
import ClientWelcome from './ClientWelcome';
import FooterWelcome from './FooterWelcome';

export default function About() {
    const [lang, setLang] = useState('id');

    const content = {
        id: {
            nav: {
                about: 'Tentang Kami',
                services: 'Layanan',
                projects: 'Proyek',
                contact: 'Kontak',
            },

            hero: {
                eyebrow: 'TENTANG KAMI',
                title:
                    'Membangun Infrastruktur dengan Pengalaman dan Keandalan.',
            },

            profile: {
                eyebrow: 'PROFIL PERUSAHAAN',
                title:
                    'Dedikasi untuk pekerjaan yang tepat mutu dan tepat waktu.',
                p1:
                    'PT Indojar Mulia Abadi didirikan pada tahun 2014 dan mengawali kegiatan usahanya dengan mendukung industri pertambangan. Seiring berkembangnya kebutuhan infrastruktur digital nasional, perusahaan memperluas kompetensinya ke sektor telekomunikasi pada tahun 2021.',
                p2:
                    'Dengan dukungan tenaga ahli yang berpengalaman, koordinasi lapangan yang terpadu, serta perhatian terhadap kualitas dan keselamatan kerja, kami mengerjakan berbagai kebutuhan pembangunan dan penguatan infrastruktur telekomunikasi.',
            },

            history: {
                eyebrow: 'PERJALANAN',
                title:
                    'Dari pengalaman menuju kompetensi yang lebih luas.',
                items: [
                    {
                        year: '2014',
                        title: 'Awal Perusahaan',
                        text:
                            'PT Indojar Mulia Abadi didirikan dan mulai menjalankan kegiatan usaha yang mendukung industri pertambangan.',
                    },
                    {
                        year: '2021',
                        title: 'Ekspansi Telekomunikasi',
                        text:
                            'Perusahaan memperluas kompetensi ke industri telekomunikasi seluler dan mulai mengembangkan layanan pembangunan infrastruktur menara.',
                    },
                    {
                        year: 'Saat Ini',
                        title: 'Membangun Infrastruktur Andal',
                        text:
                            'Fokus perusahaan terus berkembang pada pembangunan, penguatan, dan pekerjaan pendukung infrastruktur telekomunikasi.',
                    },
                ],
            },

            values: {
                eyebrow: 'KOMITMEN KAMI',
                title:
                    'Prinsip kerja yang menjadi bagian dari setiap proyek.',
                items: [
                    {
                        number: '01',
                        title: 'Kualitas',
                        text:
                            'Memastikan pekerjaan memenuhi kebutuhan teknis dan standar yang telah ditetapkan.',
                    },
                    {
                        number: '02',
                        title: 'Keselamatan',
                        text:
                            'Menempatkan keselamatan kerja sebagai bagian penting dalam setiap proses pelaksanaan proyek.',
                    },
                    {
                        number: '03',
                        title: 'Ketepatan',
                        text:
                            'Menjaga koordinasi dan pelaksanaan agar pekerjaan dapat diselesaikan sesuai target.',
                    },
                ],
            },
        },

        en: {
            nav: {
                about: 'About Us',
                services: 'Services',
                projects: 'Projects',
                contact: 'Contact',
            },

            hero: {
                eyebrow: 'ABOUT US',
                title:
                    'Building Infrastructure with Experience and Reliability.',
            },

            profile: {
                eyebrow: 'COMPANY PROFILE',
                title:
                    'Dedicated to quality and timely execution.',
                p1:
                    'PT Indojar Mulia Abadi was established in 2014 and initially supported the mining industry. As the demand for national digital infrastructure continued to grow, the company expanded its capabilities into the telecommunication sector in 2021.',
                p2:
                    'Supported by experienced professionals, coordinated field operations, and a strong focus on quality and safety, we deliver construction and structural strengthening works for telecommunication infrastructure.',
            },

            history: {
                eyebrow: 'OUR JOURNEY',
                title:
                    'From experience to broader capabilities.',
                items: [
                    {
                        year: '2014',
                        title: 'Company Established',
                        text:
                            'PT Indojar Mulia Abadi was established and began supporting business activities within the mining industry.',
                    },
                    {
                        year: '2021',
                        title: 'Telecommunication Expansion',
                        text:
                            'The company expanded its capabilities into cellular telecommunications and began developing telecommunication tower infrastructure services.',
                    },
                    {
                        year: 'Today',
                        title: 'Building Reliable Infrastructure',
                        text:
                            'The company continues to focus on construction, strengthening, and supporting works for telecommunication infrastructure.',
                    },
                ],
            },

            values: {
                eyebrow: 'OUR COMMITMENT',
                title:
                    'Principles that guide every project.',
                items: [
                    {
                        number: '01',
                        title: 'Quality',
                        text:
                            'Ensuring every work meets technical requirements and defined project standards.',
                    },
                    {
                        number: '02',
                        title: 'Safety',
                        text:
                            'Making workplace safety an essential part of every project execution process.',
                    },
                    {
                        number: '03',
                        title: 'Precision',
                        text:
                            'Maintaining coordination and execution to keep projects aligned with their targets.',
                    },
                ],
            },
        },
    };

    const current = content[lang];

    const clientText = {
        id: {
            tag: 'KLIEN KAMI',
            title: 'Dipercaya Operator & Penyedia Menara Nasional',
        },
        en: {
            tag: 'OUR CLIENTS',
            title: 'Trusted by Partner Operators & Providers',
        },
    };

    const clientDict = {
        clients: clientText[lang],
    };

    return (
        <div className="min-h-screen bg-[#f7f6f1] text-[#10231c]">
            <Head
                title={
                    lang === 'id'
                        ? 'Tentang Kami | PT Indojar Mulia Abadi'
                        : 'About Us | PT Indojar Mulia Abadi'
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
                            ? 'Tentang Kami'
                            : 'About Us'
                    }
                />

                {/* =====================================================
                    PROFILE
                ===================================================== */}
                <section className="bg-[#f7f6f1]">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-9 bg-[#087a48]" />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#087a48]">
                                        {current.profile.eyebrow}
                                    </span>
                                </div>

                                <h2 className="mt-6 max-w-lg font-heading text-3xl font-semibold leading-[1] tracking-[-0.04em] text-[#10231c] sm:text-4xl lg:text-5xl">
                                    {current.profile.title}
                                </h2>
                            </div>

                            <div className="space-y-7 text-sm leading-8 text-[#4c5d55] sm:text-base">
                                <p>{current.profile.p1}</p>
                                <p>{current.profile.p2}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    HISTORY
                ===================================================== */}
                <section className="border-y border-[#10231c]/10 bg-[#eaf4ee]">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                        <div className="mb-14 max-w-3xl">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-9 bg-[#087a48]" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#087a48]">
                                    {current.history.eyebrow}
                                </span>
                            </div>

                            <h2 className="mt-6 font-heading text-3xl font-semibold leading-[1] tracking-[-0.04em] text-[#10231c] sm:text-4xl lg:text-5xl">
                                {current.history.title}
                            </h2>
                        </div>

                        <div className="border-t border-[#10231c]/15">
                            {current.history.items.map((item) => (
                                <article
                                    key={item.year}
                                    className="grid gap-5 border-b border-[#10231c]/15 py-8 md:grid-cols-[140px_0.8fr_1.2fr] md:items-start md:gap-10"
                                >
                                    <span className="font-heading text-lg font-semibold tracking-[-0.02em] text-[#087a48]">
                                        {item.year}
                                    </span>

                                    <h3 className="font-heading text-xl font-semibold tracking-[-0.025em] text-[#10231c] sm:text-2xl">
                                        {item.title}
                                    </h3>

                                    <p className="max-w-2xl text-sm leading-7 text-[#4c5d55] sm:text-base">
                                        {item.text}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    VISION & MISSION
                ===================================================== */}
                <VisionMissionWelcome lang={lang} />

                {/* =====================================================
                    VALUES
                ===================================================== */}
                <section className="bg-[#fffdf8]">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-9 bg-[#d5ad59]" />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a762d]">
                                        {current.values.eyebrow}
                                    </span>
                                </div>

                                <h2 className="mt-6 max-w-md font-heading text-3xl font-semibold leading-[1] tracking-[-0.04em] text-[#10231c] sm:text-4xl lg:text-5xl">
                                    {current.values.title}
                                </h2>
                            </div>

                            <div className="border-t border-[#10231c]/10">
                                {current.values.items.map((item) => (
                                    <article
                                        key={item.number}
                                        className="grid gap-5 border-b border-[#10231c]/10 py-8 sm:grid-cols-[60px_0.7fr_1.3fr] sm:items-start sm:gap-8"
                                    >
                                        <span className="font-heading text-sm font-semibold tracking-[0.12em] text-[#9a762d]">
                                            {item.number}
                                        </span>

                                        <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-[#10231c]">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm leading-7 text-[#5a6962]">
                                            {item.text}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    CLIENTS
                ===================================================== */}
                <ClientWelcome
                    t={clientDict}
                    lang={lang}
                />
            </main>

            <FooterWelcome
                t={current}
            />
        </div>
    );
}