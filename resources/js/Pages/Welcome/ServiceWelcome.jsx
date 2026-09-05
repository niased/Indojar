import React from 'react';
import {
    Building2,
    HardHat,
    Layers,
    Radio,
} from 'lucide-react';

export default function ServiceWelcome({ t }) {
    const services = [
        {
            title: 'Tower Construction / B2S SACME',
            description: t.services.s1Desc,
            icon: Building2,
            accent: 'emerald',
        },
        {
            title: 'Tower Strengthening',
            description: t.services.s2Desc,
            icon: HardHat,
            accent: 'amber',
        },
        {
            title: 'Colocation Works',
            description: t.services.s3Desc,
            icon: Layers,
            accent: 'blue',
        },
        {
            title: 'And Others',
            description:
                'Perbaikan umum infrastruktur menara, pemeliharaan site, penarikan kabel, dan perizinan teknis lapangan.',
            icon: Radio,
            accent: 'purple',
        },
    ];

    return (
        <section
            id="layanan"
            className="
                border-b
                border-slate-200
                px-6
                py-20
                sm:px-10
                lg:py-24
                dark:border-slate-800
            "
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="max-w-2xl">

                    <span className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-emerald-600
                        dark:text-emerald-400
                    ">
                        {t.services.tag}
                    </span>

                    <h2 className="
                        mt-4
                        font-heading
                        text-3xl
                        font-semibold
                        tracking-[-0.03em]
                        text-slate-900
                        dark:text-white
                        sm:text-4xl
                        lg:text-5xl
                    ">
                        {t.services.title}
                    </h2>

                </div>


                {/* Services */}
                <div className="
                    mt-12
                    grid
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-4
                ">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className="
                                    group
                                    flex
                                    min-h-[280px]
                                    flex-col
                                    justify-between
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-6
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-lg
                                    dark:border-slate-800
                                    dark:bg-slate-900/60
                                "
                            >
                                <div>

                                    <div className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-500/10
                                        text-emerald-600
                                        dark:text-emerald-400
                                    ">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="
                                        mt-6
                                        text-sm
                                        font-semibold
                                        leading-6
                                        text-slate-900
                                        dark:text-white
                                    ">
                                        {service.title}
                                    </h3>

                                    <p className="
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-slate-500
                                        dark:text-slate-400
                                    ">
                                        {service.description}
                                    </p>

                                </div>

                                <div className="
                                    mt-8
                                    h-px
                                    w-full
                                    bg-slate-100
                                    transition-colors
                                    group-hover:bg-emerald-400/50
                                    dark:bg-slate-800
                                " />
                            </article>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}