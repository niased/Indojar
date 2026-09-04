// resources/js/Pages/Welcome/HeroAbout.jsx

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import img1 from '@/../images/ptindojar.jpg';
import img2 from '@/../images/ptindojar2.jpg';
import img3 from '@/../images/ptindojar3.jpg';

const heroImages = [img1, img2, img3];

export default function HeroAbout({ t }) {
    const [current, setCurrent] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    useEffect(() => {
        if (paused) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 7000);

        return () => clearInterval(timer);
    }, [paused]);

    return (
        <div>
            <section
                id="home"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="relative min-h-[92vh] overflow-hidden bg-[#031a14] lg:min-h-[calc(100vh-80px)]"
            >
                {/* Background */}
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt="Telecommunication tower PT Indojar Mulia Abadi"
                            className={`
                                absolute inset-0 h-full w-full object-cover
                                transition-all duration-[2000ms]
                                ${index === current
                                    ? 'scale-100 opacity-100'
                                    : 'scale-[1.03] opacity-0'}
                            `}
                        />
                    ))}

                    <div className="absolute inset-0 bg-[#031a14]/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#02140f]/95 via-[#03271c]/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#031a14]/80 to-transparent" />
                </div>

                {/* Subtle grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.012]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex min-h-[92vh] items-center lg:min-h-[calc(100vh-80px)]">
                    <div className="w-full px-6 sm:px-10 lg:pl-[7.5vw] lg:pr-24">
                        <div className="max-w-[650px]">

                            {/* Eyebrow */}
                            <div
                                className={`
                                    mb-6 flex items-center gap-4
                                    transition-all duration-700
                                    ${loaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-4 opacity-0'}
                                `}
                            >
                                <span className="h-px w-10 bg-amber-400" />

                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300 sm:text-xs">
                                    Telecommunication Infrastructure
                                </span>
                            </div>

                            {/* Title */}
                            <h1
                                className={`
                                    transition-all duration-1000
                                    ${loaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-8 opacity-0'}
                                `}
                            >
                                <span className="block text-[3rem] font-extrabold leading-[.9] tracking-[-.045em] text-white sm:text-[4.3rem] lg:text-[5rem]">
                                    PT INDOJAR
                                </span>

                                <span className="mt-2 block text-[3rem] font-extrabold leading-[.9] tracking-[-.05em] text-emerald-400 sm:text-[4.3rem] lg:text-[5rem]">
                                    MULIA ABADI
                                </span>
                            </h1>

                            {/* Tagline */}
                            <p
                                className={`
                                    mt-7 max-w-[590px]
                                    text-lg font-semibold leading-relaxed text-white
                                    transition-all duration-700 delay-150
                                    sm:text-xl lg:text-[1.35rem]
                                    ${loaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-5 opacity-0'}
                                `}
                            >
                                Your Trusted Partner in{' '}
                                <span className="text-amber-300">
                                    Telecommunication Infrastructure.
                                </span>
                            </p>

                            {/* Description */}
                            <p
                                className={`
                                    mt-4 max-w-[570px]
                                    text-[13px] leading-6 text-white/65
                                    transition-all duration-700 delay-300
                                    sm:text-sm sm:leading-7
                                    ${loaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-5 opacity-0'}
                                `}
                            >
                                Established in 2014, PT Indojar Mulia Abadi
                                expanded its support to the telecommunication
                                industry in 2021, delivering reliable tower
                                construction, maintenance, strengthening,
                                and related infrastructure services.
                            </p>

                            {/* CTA */}
                            <div
                                className={`
                                    mt-8 flex flex-wrap gap-3
                                    transition-all duration-700 delay-500
                                    ${loaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-5 opacity-0'}
                                `}
                            >
                                <a
                                    href="#tentang"
                                    className="group inline-flex items-center gap-4 rounded-full bg-emerald-500 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400 sm:px-7 sm:text-sm"
                                >
                                    {t.hero.ctaProjects || 'Eksplorasi Proyek'}

                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </a>

                                <a
                                    href="#layanan"
                                    className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.04] px-6 py-3.5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/50 hover:bg-white/[0.08] sm:px-7 sm:text-sm"
                                >
                                    Our Services

                                    <ArrowRight className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>

                            {/* Highlights */}
                            <div
                                className={`
                                    mt-11 max-w-[720px]
                                    border-y border-white/[0.13] py-4
                                    transition-all duration-700 delay-700
                                    ${loaded
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-5 opacity-0'}
                                `}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-3">

                                    <Highlight
                                        label="Since 2014"
                                        text="Established Company"
                                        color="text-amber-300"
                                    />

                                    <Highlight
                                        label="Since 2021"
                                        text="Telecommunication"
                                        color="text-emerald-300"
                                        border
                                    />

                                    <Highlight
                                        label="Experience"
                                        text="Reliable & Experienced Team"
                                        color="text-white/45"
                                        last
                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Slide navigation */}
                <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 lg:flex">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrent(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className="group flex items-center gap-3"
                        >
                            <span
                                className={`
                                    text-[9px] font-semibold tracking-widest
                                    transition-colors
                                    ${index === current
                                        ? 'text-white'
                                        : 'text-white/30 group-hover:text-white/70'}
                                `}
                            >
                                0{index + 1}
                            </span>

                            <span
                                className={`
                                    transition-all duration-500
                                    ${index === current
                                        ? 'h-9 w-[2px] bg-amber-400'
                                        : 'h-4 w-px bg-white/20'}
                                `}
                            />
                        </button>
                    ))}
                </div>

                {/* Progress */}
                <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-white/[0.08]">
                    <div
                        key={current}
                        className="h-full bg-amber-400"
                        style={{
                            animation: 'heroProgress 7s linear forwards',
                        }}
                    />
                </div>

                <style>{`
                    @keyframes heroProgress {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                `}</style>
            </section>

            {/* About */}
            <section
                id="tentang"
                className="mx-auto max-w-7xl border-b border-slate-200 px-6 py-24 sm:px-10 dark:border-slate-800/80"
            >
                <div className="grid items-center gap-12 lg:grid-cols-12">

                    <div className="space-y-5 lg:col-span-7">
                        <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            {t.about.tag}
                        </span>

                        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            {t.about.title}
                        </h2>

                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                            {t.about.p1}
                        </p>

                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                            {t.about.p2}
                        </p>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#064e3b] to-[#042f24] p-8 text-white shadow-xl">
                            <p className="text-sm font-medium italic leading-relaxed text-emerald-100 sm:text-base">
                                &ldquo;Supported by a reliable and experienced team,
                                we have assisted dozens of companies in the construction,
                                maintenance, and reparation of telecommunication towers
                                and other additional equipment.&rdquo;
                            </p>

                            <div className="mt-6 flex justify-between border-t border-emerald-600/50 pt-4 text-xs font-semibold text-amber-300">
                                <span>PT Indojar Mulia Abadi</span>
                                <span>Our Experience</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

function Highlight({ label, text, color, border, last }) {
    return (
        <div
            className={`
                py-2
                ${border ? 'border-b border-white/10 sm:border-b-0 sm:border-r sm:px-5' : ''}
                ${last ? 'sm:pl-5' : ''}
                ${!border && !last ? 'sm:border-r sm:pr-5' : ''}
            `}
        >
            <span className={`block text-[9px] font-bold uppercase tracking-[0.24em] ${color}`}>
                {label}
            </span>

            <span className="mt-1 block text-xs font-semibold text-white sm:text-sm">
                {text}
            </span>
        </div>
    );
}