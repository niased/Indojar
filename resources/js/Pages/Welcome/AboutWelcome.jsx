// resources/js/Pages/Welcome/AboutWelcome.jsx

import React from 'react';
import aboutBackground from '@/../images/tentang.png';

export default function AboutWelcome({ t }) {
    return (
        <section
            id="tentang"
            className="w-full overflow-hidden bg-[#05652f]"
        >
            {/* =========================================================
                DESKTOP
            ========================================================= */}
            <div className="relative hidden lg:block">
                <div className="relative aspect-[16/9] w-full">

                    <img
                        src={aboutBackground}
                        alt="Tentang PT Indojar Mulia Abadi"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />

                    {/* COMPANY TITLE */}
                    <div
                        className="
                            absolute
                            left-[59.5%]
                            top-[27.5%]
                            w-[35%]
                            max-w-[560px]
                        "
                    >
                        <span
                            className="
                                block
                                text-[clamp(7px,0.58vw,11px)]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-[#075d35]
                            "
                        >
                            {t.about.tag}
                        </span>

                        <div className="mt-2 h-[2px] w-10 bg-[#c79b3b]" />

                        <h2
                            className="
                                mt-4
                                font-heading
                                text-[clamp(18px,2.65vw,46px)]
                                font-semibold
                                leading-[0.98]
                                tracking-[-0.035em]
                                text-[#075d35]
                            "
                        >
                            PT INDOJAR
                            <br />
                            MULIA ABADI
                        </h2>

                        <p
                            className="
                                mt-4
                                max-w-full
                                text-[clamp(8px,0.72vw,13px)]
                                leading-[1.5]
                                text-slate-600
                            "
                        >
                            {t.about.title}
                        </p>
                    </div>


                    {/* HISTORY */}
                    <div
                        className="
                            absolute
                            left-[5.4%]
                            top-[71%]
                            w-[41.5%]
                            max-w-[700px]
                        "
                    >
                        <span
                            className="
                                block
                                text-[clamp(7px,0.58vw,11px)]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-amber-300
                            "
                        >
                            Sejarah Perusahaan
                        </span>

                        <p
                            className="
                                mt-3
                                max-w-full
                                text-[clamp(10px,1.05vw,18px)]
                                font-normal
                                leading-[1.6]
                                text-white
                            "
                        >
                            PT. Indojar Mulia Abadi didirikan pada tahun
                            2014 dan menjalankan kegiatan usaha yang
                            mendukung industri pertambangan. Pada tahun
                            2021, perusahaan mulai mendukung industri
                            telekomunikasi.
                        </p>
                    </div>


                    {/* CENTER DIVIDER */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-[67%]
                            bottom-[7%]
                            w-px
                            -translate-x-1/2
                            bg-gradient-to-b
                            from-transparent
                            via-[#d5ad59]/75
                            to-transparent
                        "
                    >
                        <span
                            className="
                                absolute
                                left-1/2
                                top-0
                                h-2
                                w-2
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                border
                                border-[#d5ad59]
                                bg-[#05652f]
                            "
                        />

                        <span
                            className="
                                absolute
                                bottom-0
                                left-1/2
                                h-2
                                w-2
                                -translate-x-1/2
                                translate-y-1/2
                                rounded-full
                                border
                                border-[#d5ad59]
                                bg-[#05652f]
                            "
                        />
                    </div>


                    {/* EXPERIENCE */}
                    <div
                        className="
                            absolute
                            left-[54.5%]
                            top-[71%]
                            w-[40.5%]
                            max-w-[700px]
                        "
                    >
                        <span
                            className="
                                block
                                text-[clamp(7px,0.58vw,11px)]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-amber-300
                            "
                        >
                            Pengalaman
                        </span>

                        <p
                            className="
                                mt-3
                                max-w-full
                                text-[clamp(10px,1.05vw,18px)]
                                font-normal
                                leading-[1.6]
                                text-white
                            "
                        >
                            Didukung oleh tim yang andal dan berpengalaman,
                            PT Indojar Mulia Abadi telah membantu berbagai
                            perusahaan dalam pembangunan, pemeliharaan,
                            dan perbaikan menara telekomunikasi serta
                            peralatan pendukung lainnya.
                        </p>
                    </div>

                </div>
            </div>


            {/* =========================================================
                MOBILE / TABLET
                Background tentang.png TIDAK dipakai
            ========================================================= */}
            <div className="block lg:hidden">

                {/* COMPANY INTRO */}
                <div className="bg-[#f4f6f1] px-6 py-14 sm:px-10 sm:py-16">

                    <span
                        className="
                            block
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-[#075d35]
                        "
                    >
                        {t.about.tag}
                    </span>

                    <div className="mt-3 h-[2px] w-10 bg-[#c79b3b]" />

                    <h2
                        className="
                            mt-6
                            font-heading
                            text-3xl
                            font-semibold
                            leading-none
                            tracking-[-0.03em]
                            text-[#075d35]
                            sm:text-4xl
                        "
                    >
                        PT INDOJAR
                        <br />
                        MULIA ABADI
                    </h2>

                    <p
                        className="
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-7
                            text-slate-600
                            sm:text-[15px]
                        "
                    >
                        {t.about.title}
                    </p>
                </div>


                {/* COMPANY STORY */}
                <div className="bg-[#05652f] px-6 py-14 text-white sm:px-10 sm:py-16">

                    {/* HISTORY */}
                    <div className="max-w-3xl">

                        <span
                            className="
                                block
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-amber-300
                            "
                        >
                            Sejarah Perusahaan
                        </span>

                        <p
                            className="
                                mt-4
                                text-[15px]
                                leading-7
                                text-white/90
                            "
                        >
                            PT. Indojar Mulia Abadi didirikan pada tahun
                            2014 dan menjalankan kegiatan usaha yang
                            mendukung industri pertambangan. Pada tahun
                            2021, perusahaan mulai mendukung industri
                            telekomunikasi.
                        </p>
                    </div>


                    {/* MOBILE DIVIDER */}
                    <div className="my-12 flex items-center gap-4">

                        <span className="h-px flex-1 bg-[#d5ad59]/50" />

                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#d5ad59]" />

                        <span className="h-px flex-1 bg-[#d5ad59]/50" />

                    </div>


                    {/* EXPERIENCE */}
                    <div className="max-w-3xl">

                        <span
                            className="
                                block
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-amber-300
                            "
                        >
                            Pengalaman
                        </span>

                        <p
                            className="
                                mt-4
                                text-[15px]
                                leading-7
                                text-white/90
                            "
                        >
                            Didukung oleh tim yang andal dan berpengalaman,
                            PT Indojar Mulia Abadi telah membantu berbagai
                            perusahaan dalam pembangunan, pemeliharaan,
                            dan perbaikan menara telekomunikasi serta
                            peralatan pendukung lainnya.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}