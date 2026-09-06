// resources/js/Pages/Welcome/CtaWelcome.jsx

import React from 'react';
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
                px-0
                py-0
            "
        >
            {/* =====================================================
                BACKGROUND DETAIL
            ===================================================== */}

            {/* Subtle engineering grid */}
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

            {/* Soft architectural line */}
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

            {/* =====================================================
                CTA CONTENT
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    max-w-6xl
                    flex-col
                    items-center
                    px-6
                    py-20
                    text-center
                    sm:px-10
                    sm:py-24
                    lg:py-28
                "
            >
                {/* Eyebrow */}
                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-4
                    "
                >
                    <span className="h-px w-10 bg-amber-300" />

                    <span
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.24em]
                            text-amber-300
                            sm:text-xs
                        "
                    >
                        {t?.cta?.eyebrow ||
                            'MARI BANGUN INDONESIA YANG TERHUBUNG'}
                    </span>

                    <span className="h-px w-10 bg-amber-300" />
                </div>

                {/* Heading */}
                <h2
                    className="
                        mt-7
                        max-w-4xl
                        font-heading
                        text-3xl
                        font-extrabold
                        leading-[1.05]
                        tracking-[-0.045em]
                        text-white
                        sm:text-5xl
                        lg:text-6xl
                    "
                >
                    {t?.cta?.title ||
                        'Bersama Membangun Infrastruktur Telekomunikasi yang Andal.'}
                </h2>

                {/* Small divider */}
                <div
                    className="
                        mt-8
                        h-px
                        w-16
                        bg-[#d5ad59]
                    "
                />

                {/* Supporting text */}
                <p
                    className="
                        mt-7
                        max-w-2xl
                        text-sm
                        leading-7
                        text-white/75
                        sm:text-base
                    "
                >
                    {t?.cta?.description ||
                        'Kami siap menjadi mitra dalam menghadirkan infrastruktur telekomunikasi yang berkualitas, aman, dan dapat diandalkan.'}
                </p>

                {/* Button */}
                <a
                    href="#kontak"
                    className="
                        group
                        mt-10
                        inline-flex
                        items-center
                        justify-center
                        gap-4
                        border
                        border-[#d5ad59]
                        bg-[#061b14]
                        px-8
                        py-4
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        text-white
                        transition-all
                        duration-300
                        hover:bg-[#d5ad59]
                        hover:text-[#061b14]
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
                            group-hover:text-[#061b14]
                        "
                    />
                </a>
            </div>
        </section>
    );
}