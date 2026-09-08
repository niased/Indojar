// resources/js/Pages/Welcome/AboutWelcome.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

export default function AboutWelcome({ t }) {
    return (
        <section
            id="tentang"
            className="
                relative
                overflow-hidden
                border-b
                border-white/[0.08]
                bg-[#f7f6f1]
                text-[#10231c]
            "
        >
            <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
                    {/* LEFT */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-[#d5ad59]" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087a48]">
                                {t.about.tag}
                            </span>
                        </div>

                        <h2 className="mt-5 max-w-xl font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                            PT INDOJAR
                            <br />
                            <span className="text-[#10231c]/35">
                                MULIA ABADI
                            </span>
                        </h2>
                    </div>

                    {/* RIGHT */}
                    <div className="max-w-2xl lg:justify-self-end">
                        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl lg:text-4xl">
                            {t.about.title}
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-[#10231c]/60 sm:text-base sm:leading-8">
                            {t.about.description}
                        </p>

                        <Link
                            href="/tentang-kami"
                            className="
                                group
                                mt-7
                                inline-flex
                                items-center
                                gap-3
                                border-b
                                border-[#10231c]/20
                                pb-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-[#087a48]
                                transition-colors
                                duration-300
                                hover:border-[#087a48]
                                hover:text-[#075d35]
                            "
                        >
                            <span>{t.about.button}</span>

                            <ArrowUpRight
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-0.5
                                    group-hover:-translate-y-0.5
                                "
                            />
                        </Link>
                    </div>
                </div>

                {/* =====================================================
                    COMPANY HIGHLIGHTS
                ===================================================== */}
                <div className="mt-14 border-y border-[#10231c]/10">
                    <div className="grid sm:grid-cols-3">
                        {/* 2014 */}
                        <div className="border-b border-[#10231c]/10 px-1 py-6 sm:border-b-0 sm:border-r sm:pr-8">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#087a48]">
                                2014
                            </span>

                            <span className="mt-2 block text-sm font-semibold text-[#10231c]">
                                {t.about.historyStart ||
                                    'Awal Perusahaan'}
                            </span>

                            <p className="mt-2 text-xs leading-6 text-[#10231c]/50">
                                {t.about.historyStartDesc ||
                                    'Memulai kegiatan usaha dengan mendukung industri pertambangan.'}
                            </p>
                        </div>

                        {/* 2021 */}
                        <div className="border-b border-[#10231c]/10 px-1 py-6 sm:border-b-0 sm:border-r sm:px-8">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#d5ad59]">
                                2021
                            </span>

                            <span className="mt-2 block text-sm font-semibold text-[#10231c]">
                                {t.about.telecomStart ||
                                    'Ekspansi Telekomunikasi'}
                            </span>

                            <p className="mt-2 text-xs leading-6 text-[#10231c]/50">
                                {t.about.telecomStartDesc ||
                                    'Memperluas kompetensi ke industri telekomunikasi seluler.'}
                            </p>
                        </div>

                        {/* NOW */}
                        <div className="px-1 py-6 sm:pl-8">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#087a48]">
                                TODAY
                            </span>

                            <span className="mt-2 block text-sm font-semibold text-[#10231c]">
                                {t.about.currentFocus ||
                                    'Fokus Infrastruktur'}
                            </span>

                            <p className="mt-2 text-xs leading-6 text-[#10231c]/50">
                                {t.about.currentFocusDesc ||
                                    'Pembangunan, penguatan, dan pekerjaan pendukung infrastruktur telekomunikasi.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    BOTTOM META
                ===================================================== */}
                <div className="mt-8 flex flex-col gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#10231c]/30 sm:flex-row sm:items-center sm:justify-between">
                    <span>General Contractor</span>

                    <span>
                        Telecommunication · Civil Engineering · CME
                    </span>
                </div>
            </div>
        </section>
    );
}