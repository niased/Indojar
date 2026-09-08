// resources/js/Pages/Welcome/CtaWelcome.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function CtaWelcome({ t }) {
    return (
        <section
            className="
                relative
                overflow-hidden
                border-y
                border-[#d5ad59]/60
                bg-[#0b7544]
                text-white
            "
        >
            {/* Engineering Grid */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.045]
                    bg-[linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)]
                    bg-[size:64px_64px]
                "
            />

            {/* Architectural Line */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-full
                    w-px
                    -translate-x-1/2
                    bg-white/[0.045]
                "
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:py-28">
                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 bg-amber-300" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300 sm:text-xs">
                                {t?.cta?.eyebrow ||
                                    'MARI BANGUN INDONESIA YANG TERHUBUNG'}
                            </span>
                        </div>

                        <h2 className="mt-7 max-w-4xl font-heading text-3xl font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                            {t?.cta?.title ||
                                'Bersama Membangun Infrastruktur Telekomunikasi yang Andal.'}
                        </h2>

                        <div className="mt-7 h-px w-16 bg-[#d5ad59]" />

                        <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                            {t?.cta?.description ||
                                'Kami siap menjadi mitra dalam menghadirkan infrastruktur telekomunikasi yang berkualitas, aman, dan dapat diandalkan.'}
                        </p>
                    </div>

                    <div className="lg:pb-1">
                        <Link
                            href="/kontak"
                            className="
                                group
                                inline-flex
                                items-center
                                gap-5
                                border
                                border-[#d5ad59]
                                bg-[#031a14]
                                px-7
                                py-4
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-white
                                transition-all
                                duration-300
                                hover:bg-[#d5ad59]
                                hover:text-[#031a14]
                            "
                        >
                            <span>
                                {t?.cta?.button || 'Hubungi Kami'}
                            </span>

                            <ArrowRight
                                className="
                                    h-4
                                    w-4
                                    text-amber-300
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                    group-hover:text-[#031a14]
                                "
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}