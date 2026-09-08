// resources/js/Pages/Welcome/Services.jsx

import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';

import Navbar from './Navbar';
import PageHero from './PageHero';
import FooterWelcome from './FooterWelcome';

import b2sImage from '@/../images/b2s.jpg';
import towerImage from '@/../images/ptindojar3.jpg';
import coloImage from '@/../images/colo.jpg';

export default function Services() {
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
                eyebrow: 'LAYANAN KAMI',
                title:
                    'Solusi Infrastruktur Telekomunikasi yang Terintegrasi.',
            },

            services: [
                {
                    number: '01',
                    title: 'Tower Construction',
                    subtitle: 'B2S SACME',
                    description:
                        'Pembangunan menara telekomunikasi baru berdasarkan lokasi, kebutuhan teknis, dan spesifikasi yang ditetapkan pelanggan.',
                    image: b2sImage,
                    details: [
                        'Pembangunan menara telekomunikasi baru',
                        'Pelaksanaan berdasarkan lokasi dan spesifikasi pelanggan',
                        'Koordinasi pekerjaan lapangan dan kebutuhan teknis',
                    ],
                },
                {
                    number: '02',
                    title: 'Tower Strengthening',
                    subtitle: 'Penguatan Struktur Menara',
                    description:
                        'Pekerjaan penguatan struktur dan instalasi perangkat tambahan pada menara eksisting sesuai kebutuhan teknis lapangan.',
                    image: towerImage,
                    details: [
                        'Penguatan struktur menara eksisting',
                        'Penggantian atau penambahan member struktur',
                        'Pekerjaan berdasarkan kebutuhan teknis lapangan',
                    ],
                },
                {
                    number: '03',
                    title: 'Colocation',
                    subtitle: 'Integrasi Operator',
                    description:
                        'Pekerjaan sipil dan teknis untuk penambahan perangkat atau operator telekomunikasi pada menara yang dikelola pelanggan.',
                    image: coloImage,
                    details: [
                        'Penambahan perangkat telekomunikasi',
                        'Persiapan kebutuhan pekerjaan colocation',
                        'Pekerjaan sipil dan teknis pendukung',
                    ],
                },
                {
                    number: '04',
                    title: 'And Others',
                    subtitle: 'Pekerjaan Pendukung',
                    description:
                        'Pekerjaan pendukung lainnya meliputi pemeliharaan site, perbaikan infrastruktur, penarikan kabel, dan kebutuhan teknis lapangan.',
                    image: towerImage,
                    details: [
                        'Pemeliharaan dan perbaikan site',
                        'Pekerjaan infrastruktur pendukung',
                        'Kebutuhan teknis lapangan lainnya',
                    ],
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
                eyebrow: 'OUR SERVICES',
                title:
                    'Integrated Telecommunication Infrastructure Solutions.',
            },

            services: [
                {
                    number: '01',
                    title: 'Tower Construction',
                    subtitle: 'B2S SACME',
                    description:
                        'Construction of new telecommunication towers based on location, technical requirements, and customer specifications.',
                    image: b2sImage,
                    details: [
                        'New telecommunication tower construction',
                        'Execution based on location and customer specifications',
                        'Field coordination and technical requirements',
                    ],
                },
                {
                    number: '02',
                    title: 'Tower Strengthening',
                    subtitle: 'Structural Improvement',
                    description:
                        'Structural strengthening and additional equipment installation for existing towers according to technical requirements.',
                    image: towerImage,
                    details: [
                        'Structural strengthening of existing towers',
                        'Member replacement or structural additions',
                        'Execution based on field technical requirements',
                    ],
                },
                {
                    number: '03',
                    title: 'Colocation',
                    subtitle: 'Operator Integration',
                    description:
                        'Civil and technical works for adding telecommunications operators or equipment to existing managed towers.',
                    image: coloImage,
                    details: [
                        'Telecommunication equipment additions',
                        'Colocation preparation works',
                        'Supporting civil and technical works',
                    ],
                },
                {
                    number: '04',
                    title: 'And Others',
                    subtitle: 'Supporting Works',
                    description:
                        'Supporting works including site maintenance, infrastructure repair, cable installation, and other technical field requirements.',
                    image: towerImage,
                    details: [
                        'Site maintenance and repair',
                        'Supporting infrastructure works',
                        'Other technical field requirements',
                    ],
                },
            ],
        },
    };

    const current = content[lang];

    return (
        <div className="min-h-screen bg-[#f7f6f1] text-[#10231c]">
            <Head
                title={
                    lang === 'id'
                        ? 'Layanan | PT Indojar Mulia Abadi'
                        : 'Services | PT Indojar Mulia Abadi'
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
                            ? 'Layanan'
                            : 'Services'
                    }
                />

                {/* =====================================================
                    SERVICES
                ===================================================== */}
                <section className="bg-[#eaf4ee]">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
                        {current.services.map((service, index) => (
                            <article
                                key={service.number}
                                className={`
                                    grid
                                    gap-0
                                    ${
                                        index !== 0
                                            ? 'border-t border-[#10231c]/10'
                                            : ''
                                    }
                                    lg:grid-cols-[0.9fr_1.1fr]
                                `}
                            >
                                {/* =================================================
                                    IMAGE
                                ================================================= */}
                                <div className="relative overflow-hidden bg-[#031a14]">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="
                                            h-full
                                            min-h-[320px]
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            hover:scale-[1.025]
                                        "
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#031a14]/75 via-transparent to-transparent" />

                                    <div className="absolute bottom-6 left-6 flex items-center gap-3 sm:bottom-8 sm:left-8">
                                        <span className="font-heading text-sm font-semibold tracking-[0.14em] text-[#d5ad59]">
                                            {service.number}
                                        </span>

                                        <span className="h-px w-8 bg-[#d5ad59]/70" />

                                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
                                            PT INDOJAR
                                        </span>
                                    </div>
                                </div>

                                {/* =================================================
                                    CONTENT
                                ================================================= */}
                                <div className="flex flex-col justify-between bg-[#fffdf8] px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="h-px w-8 bg-[#087a48]" />

                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087a48]">
                                                {service.subtitle}
                                            </span>
                                        </div>

                                        <h2 className="mt-5 font-heading text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#10231c] sm:text-4xl lg:text-5xl">
                                            {service.title}
                                        </h2>

                                        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#52645b] sm:text-base sm:leading-8">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="mt-10 border-t border-[#10231c]/10 pt-7">
                                        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a762d]">
                                            {lang === 'id'
                                                ? 'Ruang Lingkup'
                                                : 'Scope of Work'}
                                        </p>

                                        <div className="space-y-4">
                                            {service.details.map((detail) => (
                                                <div
                                                    key={detail}
                                                    className="flex items-start gap-3"
                                                >
                                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087a48]" />

                                                    <span className="text-sm leading-6 text-[#52645b]">
                                                        {detail}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* =====================================================
                    BOTTOM NAVIGATION
                ===================================================== */}
                <section className="bg-[#f7f6f1]">
                    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
                        <div className="flex flex-col gap-5 border-t border-[#10231c]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9a762d]">
                                    PT Indojar Mulia Abadi
                                </span>

                                <p className="mt-2 text-sm text-[#617169]">
                                    {lang === 'id'
                                        ? 'Lihat pekerjaan yang telah kami kerjakan.'
                                        : 'Explore the projects we have delivered.'}
                                </p>
                            </div>

                            <Link
                                href="/proyek"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-3
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.12em]
                                    text-[#087a48]
                                "
                            >
                                <span>
                                    {lang === 'id'
                                        ? 'Lihat Proyek'
                                        : 'View Projects'}
                                </span>

                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
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