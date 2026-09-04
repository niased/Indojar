// resources/js/Pages/Welcome/HeroAbout.jsx

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import img1 from '@/../images/ptindojar.jpg';
import img2 from '@/../images/ptindojar2.jpg';
import img3 from '@/../images/ptindojar3.jpg';

const heroImages = [img1, img2, img3];

const highlights = [
    {
        label: 'Sejak 2014',
        text: 'Perusahaan Berdiri',
        color: 'text-amber-300',
    },
    {
        label: 'Sejak 2021',
        text: 'Industri Telekomunikasi',
        color: 'text-emerald-300',
    },
    {
        label: 'Pengalaman',
        text: 'Tim Andal & Berpengalaman',
        color: 'text-white/45',
    },
];

export default function HeroAbout({ t }) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 7000);

        return () => clearInterval(timer);
    }, [paused]);

    return (
        <div>
            {/* HERO */}
            <section
                id="home"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="relative min-h-screen overflow-hidden bg-[#031a14]"
            >
                {/* Background */}
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <img
                            key={image}
                            src={image}
                            alt="Menara telekomunikasi PT Indojar Mulia Abadi"
                            className={`
                                absolute inset-0 h-full w-full object-cover
                                transition-all duration-[2200ms] ease-out
                                ${
                                    index === current
                                        ? 'scale-100 opacity-100'
                                        : 'scale-[1.02] opacity-0'
                                }
                            `}
                        />
                    ))}

                    <div className="absolute inset-0 bg-[#031a14]/10" />

                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-r
                            from-[#02140f]/92
                            via-[#03271c]/48
                            to-transparent
                        "
                    />

                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-[#031a14]/70
                            via-transparent
                            to-[#031a14]/10
                        "
                    />
                </div>

                {/* Main Content */}
                <div
                    className="
                        relative z-10 flex min-h-screen items-center
                        px-6 sm:px-10 lg:px-[8vw]
                    "
                >
                    <div className="max-w-[660px]">

                        {/* Section Label */}
                        <div className="mb-7 flex items-center gap-3 animate-[heroFade_.8s_ease-out_both]">
                            <span className="h-px w-10 bg-amber-400" />

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-amber-300
                                    sm:text-[11px]
                                "
                            >
                                Infrastruktur Telekomunikasi
                            </span>
                        </div>

                        {/* Company Name */}
                        <h1
                            className="
                                font-heading
                                animate-[heroFade_1s_.08s_ease-out_both]
                            "
                        >
                            <span
                                className="
                                    block
                                    text-[3.2rem]
                                    font-semibold
                                    leading-[0.94]
                                    tracking-[-0.035em]
                                    text-white
                                    sm:text-[4.3rem]
                                    lg:text-[5.1rem]
                                "
                            >
                                PT INDOJAR
                            </span>

                            <span
                                className="
                                    mt-1
                                    block
                                    text-[3.2rem]
                                    font-semibold
                                    leading-[0.94]
                                    tracking-[-0.035em]
                                    text-emerald-300
                                    sm:text-[4.3rem]
                                    lg:text-[5.1rem]
                                "
                            >
                                MULIA ABADI
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            className="
                                mt-8
                                max-w-[560px]
                                text-[14px]
                                leading-7
                                text-white/68
                                animate-[heroFade_1s_.2s_ease-out_both]
                                sm:text-[15px]
                            "
                        >
                            Berdiri sejak 2014, PT Indojar Mulia Abadi
                            memperluas dukungannya ke industri telekomunikasi
                            pada tahun 2021.
                        </p>

                        {/* CTA */}
                        <div
                            className="
                                mt-8
                                flex flex-wrap gap-3
                                animate-[heroFade_1s_.32s_ease-out_both]
                            "
                        >
                            <a
                                href="#portofolio"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-4
                                    bg-emerald-500
                                    px-6
                                    py-3.5
                                    text-xs
                                    font-semibold
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-emerald-400
                                    sm:text-sm
                                "
                            >
                                Jelajahi Proyek

                                <ArrowRight
                                    className="
                                        h-4
                                        w-4
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            </a>

                            <a
                                href="#layanan"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    gap-3
                                    border
                                    border-white/25
                                    bg-white/[0.03]
                                    px-6
                                    py-3.5
                                    text-xs
                                    font-semibold
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:border-amber-300/50
                                    hover:bg-white/[0.06]
                                    sm:text-sm
                                "
                            >
                                Layanan Kami

                                <ArrowRight
                                    className="
                                        h-4
                                        w-4
                                        text-amber-300
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            </a>
                        </div>

                        {/* Highlights */}
                        <div
                            className="
                                mt-11
                                max-w-[700px]
                                border-y
                                border-white/[0.12]
                                py-4
                                animate-[heroFade_1s_.45s_ease-out_both]
                            "
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3">
                                {highlights.map((item, index) => (
                                    <div
                                        key={item.label}
                                        className={`
                                            py-2
                                            ${
                                                index < highlights.length - 1
                                                    ? 'border-b border-white/10 sm:border-b-0 sm:border-r'
                                                    : ''
                                            }
                                            ${
                                                index === 0
                                                    ? 'sm:pr-5'
                                                    : 'sm:px-5'
                                            }
                                            ${
                                                index === highlights.length - 1
                                                    ? 'sm:pl-5'
                                                    : ''
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                                block
                                                text-[8px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.12em]
                                                ${item.color}
                                            `}
                                        >
                                            {item.label}
                                        </span>

                                        <span
                                            className="
                                                mt-1
                                                block
                                                text-[13px]
                                                font-medium
                                                text-white/90
                                                sm:text-sm
                                            "
                                        >
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Navigation */}
                <div
                    className="
                        absolute
                        right-7
                        top-1/2
                        z-20
                        hidden
                        -translate-y-1/2
                        flex-col
                        gap-6
                        lg:flex
                    "
                >
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrent(index)}
                            aria-label={`Slide ${index + 1}`}
                            className="group flex items-center gap-3"
                        >
                            <span
                                className={`
                                    text-[9px]
                                    font-semibold
                                    tracking-widest
                                    transition-colors
                                    ${
                                        current === index
                                            ? 'text-white'
                                            : 'text-white/25 group-hover:text-white/60'
                                    }
                                `}
                            >
                                0{index + 1}
                            </span>

                            <span
                                className={`
                                    block
                                    transition-all
                                    duration-500
                                    ${
                                        current === index
                                            ? 'h-9 w-[2px] bg-amber-400'
                                            : 'h-4 w-px bg-white/20'
                                    }
                                `}
                            />
                        </button>
                    ))}
                </div>

                {/* Progress */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/[0.08]">
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

                    @keyframes heroFade {
                        from {
                            opacity: 0;
                            transform: translateY(14px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </section>

            {/* ABOUT */}
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

                    <div className="lg:col-span-5">
                        <div className="rounded-3xl bg-[#064e3b] p-8 text-white">
                            <p className="text-sm italic leading-7 text-emerald-100">
                                &ldquo;Supported by a reliable and experienced team,
                                we have assisted dozens of companies in the construction,
                                maintenance, and reparation of telecommunication towers
                                and other additional equipment.&rdquo;
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}