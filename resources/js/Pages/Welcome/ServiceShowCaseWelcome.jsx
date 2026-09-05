// resources/js/Pages/Welcome/ServiceShowCaseWelcome.jsx

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import img1 from '@/../images/b2s.jpg';
import img2 from '@/../images/ptindojar3.jpg';
import img3 from '@/../images/colo.jpg';

const images = [img1, img2, img3, img1];

const services = {
    id: [
        {
            number: '01',
            title: 'Tower Construction',
            subtitle: 'B2S SACME',
            description:
                'Pembangunan menara telekomunikasi baru berdasarkan lokasi, kebutuhan teknis, dan spesifikasi yang ditetapkan pelanggan.',
        },
        {
            number: '02',
            title: 'Tower Strengthening',
            subtitle: 'Penguatan Struktur Menara',
            description:
                'Pekerjaan penguatan struktur dan instalasi perangkat tambahan pada menara eksisting sesuai kebutuhan teknis lapangan.',
        },
        {
            number: '03',
            title: 'Colocation',
            subtitle: 'Integrasi Operator',
            description:
                'Pekerjaan sipil dan teknis untuk penambahan perangkat atau operator telekomunikasi pada menara yang dikelola pelanggan.',
        },
        {
            number: '04',
            title: 'And Others',
            subtitle: 'Pekerjaan Pendukung',
            description:
                'Pekerjaan pendukung lainnya meliputi pemeliharaan site, perbaikan infrastruktur, penarikan kabel, dan kebutuhan teknis lapangan.',
        },
    ],
    en: [
        {
            number: '01',
            title: 'Tower Construction',
            subtitle: 'B2S SACME',
            description:
                'Construction of new telecommunication towers based on location, technical requirements, and customer specifications.',
        },
        {
            number: '02',
            title: 'Tower Strengthening',
            subtitle: 'Structural Improvement',
            description:
                'Structural strengthening and additional equipment installation for existing towers according to technical requirements.',
        },
        {
            number: '03',
            title: 'Colocation',
            subtitle: 'Operator Integration',
            description:
                'Civil and technical works for adding telecommunications operators or equipment to existing managed towers.',
        },
        {
            number: '04',
            title: 'And Others',
            subtitle: 'Supporting Works',
            description:
                'Supporting works including site maintenance, infrastructure repair, cable installation, and other technical field requirements.',
        },
    ],
};

export default function ServiceShowCaseWelcome({ lang = 'id' }) {
    const items = services[lang] || services.id;

    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const current = items[active];

    const next = () => {
        setActive((value) => (value + 1) % items.length);
    };

    const previous = () => {
        setActive((value) => (value - 1 + items.length) % items.length);
    };

    const selectService = (index) => {
        setActive(index);
    };

    useEffect(() => {
        if (paused) {
            return;
        }

        const timer = setInterval(next, 7000);

        return () => clearInterval(timer);
    }, [paused]);

    return (
        <section
            id="service-showcase"
            className="relative overflow-hidden bg-[#061b14]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(11,122,67,0.18),transparent_52%)]" />

            <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

                <header className="mx-auto max-w-4xl text-center">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-xs">
                        {lang === 'id' ? 'Layanan Kami' : 'Our Services'}
                    </span>

                    <h2 className="mt-4 font-heading text-4xl font-bold uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                        {lang === 'id'
                            ? 'Produk & Layanan'
                            : 'Products & Services'}
                    </h2>

                    <div className="mx-auto mt-5 h-px w-20 bg-[#d5ad59]" />
                </header>

                <div className="mx-auto mt-14 max-w-[1320px] sm:mt-16">

                    <div className="grid items-start gap-7 lg:grid-cols-[180px_1fr]">

                        {/* Thumbnail */}
                        <div className="hidden flex-col gap-4 lg:flex">
                            {items.map((item, index) => {
                                const activeThumbnail = active === index;

                                return (
                                    <button
                                        key={item.number}
                                        type="button"
                                        onClick={() => selectService(index)}
                                        aria-label={`Lihat layanan ${item.number}`}
                                        className={
                                            'group relative overflow-hidden border transition-all duration-500 ' +
                                            (activeThumbnail
                                                ? 'border-[#d5ad59] opacity-100'
                                                : 'border-white/10 opacity-40 hover:border-white/30 hover:opacity-75')
                                        }
                                    >
                                        <img
                                            src={images[index]}
                                            alt={item.title}
                                            className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="flex items-center justify-between bg-[#082f20] px-3 py-2">
                                            <span
                                                className={
                                                    activeThumbnail
                                                        ? 'text-[10px] font-semibold tracking-[0.12em] text-amber-300'
                                                        : 'text-[10px] font-semibold tracking-[0.12em] text-white/40'
                                                }
                                            >
                                                {item.number}
                                            </span>

                                            <span className="truncate pl-2 text-[9px] font-medium text-white/55">
                                                {item.title}
                                            </span>
                                        </div>

                                        {activeThumbnail && (
                                            <span className="absolute left-0 top-0 h-full w-[3px] bg-amber-300" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Main showcase */}
                        <div
                            key={active}
                            className="service-rise"
                        >
                            {/* Foto utama */}
                            <div className="overflow-hidden border border-[#d5ad59]/60 bg-[#0a3524] shadow-[0_30px_90px_rgba(0,0,0,.4)]">
                                <img
                                    src={images[active]}
                                    alt={current.title}
                                    className="block h-[340px] w-full object-cover sm:h-[480px] lg:h-[610px]"
                                />
                            </div>

                            {/* Informasi */}
                            <div className="border-x border-b border-[#d5ad59]/60 bg-[#075d35] px-6 py-7 sm:px-9 sm:py-8 lg:px-10 lg:py-9">

                                <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

                                    <div className="max-w-3xl">
                                        <div className="flex items-center gap-3">
                                            <span className="h-px w-8 bg-amber-300" />

                                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                                                {lang === 'id'
                                                    ? 'Produk & Layanan'
                                                    : 'Products & Services'}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-4">
                                            <h3 className="font-heading text-3xl font-bold leading-none tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                                                {current.title}
                                            </h3>

                                            <span className="border border-amber-300/60 bg-amber-300 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-[#075d35]">
                                                {current.subtitle}
                                            </span>
                                        </div>

                                        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
                                            {current.description}
                                        </p>
                                    </div>

                                    {/* Navigasi */}
                                    <div className="flex shrink-0 items-center justify-between gap-5 border-t border-white/10 pt-5 lg:min-w-[250px] lg:border-t-0 lg:pt-0">

                                        <div className="flex items-center">
                                            {items.map((item, index) => {
                                                const activeNumber = active === index;

                                                return (
                                                    <button
                                                        key={item.number}
                                                        type="button"
                                                        onClick={() => selectService(index)}
                                                        className={
                                                            'flex h-10 min-w-10 items-center justify-center border-b px-2 text-[10px] font-semibold tracking-[0.08em] transition ' +
                                                            (activeNumber
                                                                ? 'border-amber-300 text-amber-300'
                                                                : 'border-transparent text-white/30 hover:text-white/70')
                                                        }
                                                    >
                                                        {item.number}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                onClick={previous}
                                                aria-label="Layanan sebelumnya"
                                                className="flex h-10 w-10 items-center justify-center border border-white/15 bg-[#082f20] text-white/60 transition hover:border-amber-300 hover:bg-amber-300 hover:text-[#075d35]"
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={next}
                                                aria-label="Layanan berikutnya"
                                                className="flex h-10 w-10 items-center justify-center border border-l-0 border-white/15 bg-[#082f20] text-white/60 transition hover:border-amber-300 hover:bg-amber-300 hover:text-[#075d35]"
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>

                                    </div>
                                </div>

                                <div className="mt-6 h-px overflow-hidden bg-white/10">
                                    <div
                                        key={active}
                                        className="service-progress h-full origin-left bg-amber-300"
                                    />
                                </div>
                            </div>

                            {/* Mobile thumbnails */}
                            <div className="mt-4 grid grid-cols-4 gap-2 lg:hidden">
                                {items.map((item, index) => (
                                    <button
                                        key={item.number}
                                        type="button"
                                        onClick={() => selectService(index)}
                                        aria-label={`Lihat layanan ${item.number}`}
                                        className={
                                            'overflow-hidden border transition ' +
                                            (active === index
                                                ? 'border-amber-300'
                                                : 'border-white/10 opacity-45')
                                        }
                                    >
                                        <img
                                            src={images[index]}
                                            alt={item.title}
                                            className="aspect-video w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .service-rise {
                    animation: serviceRise 600ms cubic-bezier(.22,.8,.2,1) both;
                }

                .service-progress {
                    animation: serviceProgress 7s linear forwards;
                }

                @keyframes serviceRise {
                    from {
                        opacity: 0;
                        transform: translateY(18px) scale(.99);
                        filter: blur(2px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                }

                @keyframes serviceProgress {
                    from {
                        transform: scaleX(0);
                    }

                    to {
                        transform: scaleX(1);
                    }
                }
            `}</style>
        </section>
    );
}