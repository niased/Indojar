// resources/js/Pages/Welcome/PageHero.jsx

import React from 'react';
import { Link } from '@inertiajs/react';

export default function PageHero({
    eyebrow,
    title,
    current,
}) {
    return (
        <section className="relative overflow-hidden bg-[#031a14] text-white">
            {/* =====================================================
                BACKGROUND GRID
            ===================================================== */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.035]
                    bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
                    bg-[size:72px_72px]
                "
            />

            {/* =====================================================
                DECORATIVE LINES
            ===================================================== */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[12%]
                    top-0
                    hidden
                    h-full
                    w-px
                    bg-[#d5ad59]/15
                    lg:block
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-[18%]
                    hidden
                    h-24
                    w-px
                    bg-[#d5ad59]/10
                    lg:block
                "
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-[300px]
                    max-w-7xl
                    flex-col
                    items-center
                    justify-center
                    px-6
                    pb-16
                    pt-32
                    text-center
                    sm:min-h-[330px]
                    sm:px-10
                    sm:pb-20
                    sm:pt-36
                    lg:min-h-[350px]
                    lg:px-16
                    lg:pb-24
                    lg:pt-40
                "
            >
                {/* EYEBROW */}
                <div className="flex items-center gap-3">
                    <span className="h-px w-9 bg-[#d5ad59]" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d5ad59]">
                        {eyebrow}
                    </span>

                    <span className="h-px w-9 bg-[#d5ad59]" />
                </div>

                {/* TITLE */}
                <h1
                    className="
                        mt-6
                        max-w-4xl
                        font-heading
                        text-4xl
                        font-semibold
                        leading-[0.98]
                        tracking-[-0.045em]
                        text-white
                        sm:text-5xl
                        lg:text-6xl
                    "
                >
                    {title}
                </h1>

                {/* BREADCRUMB */}
                <div
                    className="
                        mt-7
                        flex
                        items-center
                        justify-center
                        gap-3
                        text-xs
                    "
                >
                    <Link
                        href="/"
                        className="
                            text-white/45
                            transition-colors
                            duration-200
                            hover:text-[#d5ad59]
                        "
                    >
                        Home
                    </Link>

                    <span className="text-[#d5ad59]/60">
                        /
                    </span>

                    <span className="text-white/70">
                        {current}
                    </span>
                </div>
            </div>

            {/* =====================================================
                BOTTOM ACCENT
            ===================================================== */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                <div className="h-px bg-[#d5ad59]/20" />
            </div>
        </section>
    );
}