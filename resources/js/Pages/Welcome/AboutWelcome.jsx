// resources/js/Pages/Welcome/AboutWelcome.jsx

import React from 'react';

export default function AboutWelcome({ t }) {
    return (
        <section
            id="tentang"
            className="
                relative
                w-full
                overflow-hidden
                border-b
                border-white/[0.07]
                bg-transparent
            "
        >

            {/* =====================================================
                DESKTOP
            ===================================================== */}
            <div className="relative hidden lg:block">

                <div
                    className="
                        mx-auto
                        max-w-7xl
                        px-10
                        py-28
                    "
                >

                    {/* =================================================
                        TOP INTRO
                    ================================================= */}
                    <div
                        className="
                            grid
                            grid-cols-[0.9fr_1.1fr]
                            items-end
                            gap-20
                        "
                    >

                        {/* Label + Company */}
                        <div>

                            <div className="flex items-center gap-3">
                                <span className="h-px w-9 bg-amber-300" />

                                <span
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.22em]
                                        text-amber-300
                                    "
                                >
                                    {t.about.tag}
                                </span>
                            </div>


                            <h2
                                className="
                                    mt-7
                                    max-w-xl
                                    font-heading
                                    text-5xl
                                    font-bold
                                    uppercase
                                    leading-[0.92]
                                    tracking-[-0.045em]
                                    text-white
                                    xl:text-6xl
                                "
                            >
                                PT INDOJAR
                                <br />
                                <span className="text-white/35">
                                    MULIA ABADI
                                </span>
                            </h2>

                        </div>


                        {/* Intro description */}
                        <div
                            className="
                                max-w-2xl
                                border-l
                                border-[#d5ad59]/30
                                pl-8
                            "
                        >
                            <p
                                className="
                                    text-base
                                    leading-8
                                    text-white/70
                                    xl:text-lg
                                "
                            >
                                {t.about.title}
                            </p>
                        </div>

                    </div>


                    {/* =================================================
                        GOLD DIVIDER
                    ================================================= */}
                    <div className="my-20 flex items-center gap-5">

                        <span className="h-px flex-1 bg-white/[0.07]" />

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                border
                                border-[#d5ad59]
                                bg-[#061b14]
                            "
                        />

                        <span className="h-px w-20 bg-[#d5ad59]/40" />

                    </div>


                    {/* =================================================
                        COMPANY STORY
                    ================================================= */}
                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-16
                        "
                    >

                        {/* HISTORY */}
                        <article className="relative">

                            <div
                                className="
                                    absolute
                                    -left-5
                                    top-0
                                    h-full
                                    w-px
                                    bg-gradient-to-b
                                    from-[#d5ad59]/50
                                    via-[#d5ad59]/10
                                    to-transparent
                                "
                            />

                            <span
                                className="
                                    block
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-amber-300
                                "
                            >
                                Sejarah Perusahaan
                            </span>

                            <h3
                                className="
                                    mt-5
                                    font-heading
                                    text-2xl
                                    font-semibold
                                    tracking-[-0.025em]
                                    text-white
                                "
                            >
                                Berawal dari Pengalaman
                            </h3>

                            <p
                                className="
                                    mt-5
                                    max-w-xl
                                    text-sm
                                    leading-7
                                    text-white/60
                                "
                            >
                                PT. Indojar Mulia Abadi didirikan pada tahun
                                2014 dan menjalankan kegiatan usaha yang
                                mendukung industri pertambangan. Pada tahun
                                2021, perusahaan mulai mendukung industri
                                telekomunikasi.
                            </p>

                        </article>


                        {/* EXPERIENCE */}
                        <article className="relative">

                            <div
                                className="
                                    absolute
                                    -left-5
                                    top-0
                                    h-full
                                    w-px
                                    bg-gradient-to-b
                                    from-[#d5ad59]/50
                                    via-[#d5ad59]/10
                                    to-transparent
                                "
                            />

                            <span
                                className="
                                    block
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-amber-300
                                "
                            >
                                Pengalaman
                            </span>

                            <h3
                                className="
                                    mt-5
                                    font-heading
                                    text-2xl
                                    font-semibold
                                    tracking-[-0.025em]
                                    text-white
                                "
                            >
                                Kompetensi & Keandalan
                            </h3>

                            <p
                                className="
                                    mt-5
                                    max-w-xl
                                    text-sm
                                    leading-7
                                    text-white/60
                                "
                            >
                                Didukung oleh tim yang andal dan
                                berpengalaman, PT Indojar Mulia Abadi telah
                                membantu berbagai perusahaan dalam
                                pembangunan, pemeliharaan, dan perbaikan
                                menara telekomunikasi serta peralatan
                                pendukung lainnya.
                            </p>

                        </article>

                    </div>


                    {/* =================================================
                        BOTTOM META
                    ================================================= */}
                    <div
                        className="
                            mt-20
                            flex
                            items-center
                            justify-between
                            border-t
                            border-white/[0.07]
                            pt-6
                        "
                    >

                        <span
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-white/25
                            "
                        >
                            PT Indojar Mulia Abadi
                        </span>

                        <span
                            className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-white/25
                            "
                        >
                            Established 2014
                        </span>

                    </div>

                </div>
            </div>


            {/* =====================================================
                MOBILE / TABLET
            ===================================================== */}
            <div className="block lg:hidden">

                <div className="px-6 py-16 sm:px-10 sm:py-20">

                    {/* INTRO */}
                    <div>

                        <div className="flex items-center gap-3">

                            <span className="h-px w-8 bg-amber-300" />

                            <span
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-amber-300
                                "
                            >
                                {t.about.tag}
                            </span>

                        </div>


                        <h2
                            className="
                                mt-6
                                font-heading
                                text-4xl
                                font-bold
                                uppercase
                                leading-[0.92]
                                tracking-[-0.04em]
                                text-white
                                sm:text-5xl
                            "
                        >
                            PT INDOJAR
                            <br />

                            <span className="text-white/35">
                                MULIA ABADI
                            </span>
                        </h2>


                        <p
                            className="
                                mt-6
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/65
                                sm:text-base
                            "
                        >
                            {t.about.title}
                        </p>

                    </div>


                    {/* DIVIDER */}
                    <div className="my-14 flex items-center gap-4">

                        <span className="h-px flex-1 bg-white/[0.08]" />

                        <span className="h-2 w-2 rounded-full bg-[#d5ad59]" />

                        <span className="h-px w-10 bg-[#d5ad59]/40" />

                    </div>


                    {/* HISTORY */}
                    <article>

                        <span
                            className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-amber-300
                            "
                        >
                            Sejarah Perusahaan
                        </span>

                        <h3
                            className="
                                mt-4
                                font-heading
                                text-2xl
                                font-semibold
                                tracking-[-0.025em]
                                text-white
                            "
                        >
                            Berawal dari Pengalaman
                        </h3>

                        <p
                            className="
                                mt-4
                                text-sm
                                leading-7
                                text-white/65
                            "
                        >
                            PT. Indojar Mulia Abadi didirikan pada tahun
                            2014 dan menjalankan kegiatan usaha yang
                            mendukung industri pertambangan. Pada tahun
                            2021, perusahaan mulai mendukung industri
                            telekomunikasi.
                        </p>

                    </article>


                    {/* EXPERIENCE */}
                    <article className="mt-12">

                        <span
                            className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-amber-300
                            "
                        >
                            Pengalaman
                        </span>

                        <h3
                            className="
                                mt-4
                                font-heading
                                text-2xl
                                font-semibold
                                tracking-[-0.025em]
                                text-white
                            "
                        >
                            Kompetensi & Keandalan
                        </h3>

                        <p
                            className="
                                mt-4
                                text-sm
                                leading-7
                                text-white/65
                            "
                        >
                            Didukung oleh tim yang andal dan
                            berpengalaman, PT Indojar Mulia Abadi telah
                            membantu berbagai perusahaan dalam
                            pembangunan, pemeliharaan, dan perbaikan
                            menara telekomunikasi serta peralatan
                            pendukung lainnya.
                        </p>

                    </article>


                    {/* BOTTOM META */}
                    <div
                        className="
                            mt-14
                            flex
                            items-center
                            justify-between
                            border-t
                            border-white/[0.07]
                            pt-5
                        "
                    >

                        <span
                            className="
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-white/25
                            "
                        >
                            PT Indojar Mulia Abadi
                        </span>

                        <span
                            className="
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-white/25
                            "
                        >
                            2014
                        </span>

                    </div>

                </div>

            </div>

        </section>
    );
}