// resources/js/Pages/Welcome/ServiceShowCaseWelcome.jsx

import React from 'react';
import { ArrowRight, Building2, Cable, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from '@inertiajs/react';

const serviceImages = [
    '@/../images/b2s.jpg',
    '@/../images/ptindojar3.jpg',
    '@/../images/colo.jpg',
    '@/../images/ptindojar.jpg',
];

const services = {
    id: [
        {
            number: '01',
            title: 'Tower Construction',
            subtitle: 'B2S SACME',
            description:
                'Pembangunan menara telekomunikasi baru berdasarkan lokasi dan kebutuhan teknis pelanggan.',
            icon: Building2,
        },
        {
            number: '02',
            title: 'Tower Strengthening',
            subtitle: 'Structural Improvement',
            description:
                'Penguatan struktur dan instalasi tambahan pada menara eksisting sesuai kebutuhan teknis.',
            icon: ShieldCheck,
        },
        {
            number: '03',
            title: 'Colocation',
            subtitle: 'Operator Integration',
            description:
                'Pekerjaan sipil dan teknis untuk penambahan operator atau perangkat telekomunikasi.',
            icon: Cable,
        },
        {
            number: '04',
            title: 'And Others',
            subtitle: 'Supporting Works',
            description:
                'Pekerjaan pemeliharaan, perbaikan infrastruktur, dan kebutuhan teknis pendukung lainnya.',
            icon: Wrench,
        },
    ],

    en: [
        {
            number: '01',
            title: 'Tower Construction',
            subtitle: 'B2S SACME',
            description:
                'Construction of new telecommunication towers based on location and customer requirements.',
            icon: Building2,
        },
        {
            number: '02',
            title: 'Tower Strengthening',
            subtitle: 'Structural Improvement',
            description:
                'Structural strengthening and additional installation for existing towers.',
            icon: ShieldCheck,
        },
        {
            number: '03',
            title: 'Colocation',
            subtitle: 'Operator Integration',
            description:
                'Civil and technical works for adding operators or equipment to existing towers.',
            icon: Cable,
        },
        {
            number: '04',
            title: 'And Others',
            subtitle: 'Supporting Works',
            description:
                'Maintenance, infrastructure repair, and other supporting technical works.',
            icon: Wrench,
        },
    ],
};

const images = serviceImages.map((path) => path);

export default function ServiceShowCaseWelcome({ lang = 'id' }) {
    const items = services[lang] || services.id;

    return (
        <section
            id="layanan"
            className="relative overflow-hidden border-b border-[#10231c]/10 bg-[#eaf4ee]"
        >
            <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
                    {/* LEFT */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-[#d5ad59]" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087a48]">
                                {lang === 'id'
                                    ? 'LAYANAN KAMI'
                                    : 'OUR SERVICES'}
                            </span>
                        </div>

                        <h2 className="mt-5 max-w-md font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#10231c] sm:text-5xl lg:text-6xl">
                            {lang === 'id'
                                ? 'Apa yang Kami Kerjakan?'
                                : 'What Do We Do?'}
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-7 text-[#10231c]/60 sm:text-base">
                            {lang === 'id'
                                ? 'Kami mengerjakan berbagai kebutuhan pembangunan dan penguatan infrastruktur telekomunikasi dengan pendekatan yang terintegrasi.'
                                : 'We deliver integrated construction and strengthening solutions for telecommunication infrastructure.'}
                        </p>

                        <Link
                            href="/layanan"
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
                                transition
                                hover:border-[#087a48]
                            "
                        >
                            <span>
                                {lang === 'id'
                                    ? 'Lihat Semua Layanan'
                                    : 'View All Services'}
                            </span>

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                        {items.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.number}
                                    className="
                                        group
                                        relative
                                        border-t
                                        border-[#10231c]/12
                                        py-7
                                        sm:py-8
                                    "
                                >
                                    <div className="flex items-start justify-between gap-5">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#087a48]/25 text-[#087a48] transition duration-300 group-hover:border-[#d5ad59] group-hover:text-[#d5ad59]">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#10231c]/25">
                                            {item.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em] text-[#10231c] sm:text-xl">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#087a48]/65">
                                        {item.subtitle}
                                    </p>

                                    <p className="mt-4 max-w-sm text-xs leading-6 text-[#10231c]/55 sm:text-sm">
                                        {item.description}
                                    </p>

                                    <div className="mt-5 h-px w-8 bg-[#d5ad59] transition-all duration-300 group-hover:w-14" />
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}