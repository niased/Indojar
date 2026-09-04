// resources/js/Pages/Welcome/AboutWelcome.jsx

import React from 'react';

export default function AboutWelcome({ t }) {
    return (
        <section
            id="tentang"
            className="
                mx-auto
                max-w-7xl
                border-b
                border-slate-200
                px-6
                py-24
                sm:px-10
                dark:border-slate-800
            "
        >
            <div className="grid items-center gap-12 lg:grid-cols-12">

                {/* About Text */}
                <div className="lg:col-span-7">

                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-widest
                            text-emerald-600
                            dark:text-emerald-400
                        "
                    >
                        {t.about.tag}
                    </span>

                    <h2
                        className="
                            mt-4
                            font-heading
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            dark:text-white
                            sm:text-4xl
                        "
                    >
                        {t.about.title}
                    </h2>

                    <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {t.about.p1}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {t.about.p2}
                    </p>

                </div>

                {/* Company Statement */}
                <div className="lg:col-span-5">

                    <div className="
                        rounded-3xl
                        border
                        border-emerald-900/20
                        bg-[#064e3b]
                        p-8
                        text-white
                        shadow-lg
                    ">
                        <p className="
                            text-sm
                            italic
                            leading-7
                            text-emerald-100
                        ">
                            &ldquo;Supported by a reliable and experienced team,
                            we have assisted dozens of companies in the construction,
                            maintenance, and reparation of telecommunication towers
                            and other additional equipment.&rdquo;
                        </p>

                        <div className="
                            mt-6
                            border-t
                            border-white/15
                            pt-4
                            text-xs
                            font-semibold
                            text-amber-300
                        ">
                            PT Indojar Mulia Abadi
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}