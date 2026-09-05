// resources/js/Pages/Welcome/ServiceShowCaseWelcome.jsx

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import img1 from '@/../images/b2s.jpg';
import img2 from '@/../images/ptindojar3.jpg';
import img3 from '@/../images/colo.jpg';

const images = [img1, img2, img3, img1];

const data = {
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
    const services = data[lang] || data.id;
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState('next');
    const [paused, setPaused] = useState(false);

    const total = services.length;
    const current = services[active];
    const prev = (active - 1 + total) % total;
    const next = (active + 1) % total;

    const goNext = () => {
        setDirection('next');
        setActive((value) => (value + 1) % total);
    };

    const goPrev = () => {
        setDirection('prev');
        setActive((value) => (value - 1 + total) % total);
    };

    const goTo = (index) => {
        if (index === active) return;
        setDirection(index > active ? 'next' : 'prev');
        setActive(index);
    };

    useEffect(() => {
        if (paused) return;

        const timer = setInterval(goNext, 7000);
        return () => clearInterval(timer);
    }, [paused]);

    return (
        <section
            id="service-showcase"
            className="relative overflow-hidden bg-[#071f16]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,120,65,0.18),transparent_60%)]" />

            <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

                <header className="mx-auto max-w-4xl text-center">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-xs">
                        {lang === 'id' ? 'Layanan Kami' : 'Our Services'}
                    </span>

                    <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                        {lang === 'id'
                            ? 'Produk & Layanan'
                            : 'Products & Services'}
                    </h2>

                    <div className="mx-auto mt-5 h-px w-20 bg-[#d5ad59]" />
                </header>

                <div className="relative mx-auto mt-12 max-w-[1320px] sm:mt-16">

                    <div className="absolute left-0 top-1/2 z-0 hidden h-[68%] w-[18%] -translate-y-1/2 overflow-hidden border border-white/10 bg-[#082f20] lg:block">
                        <img
                            src={images[prev]}
                            alt=""
                            className="h-full w-full object-cover opacity-25"
                        />
                        <div className="absolute inset-0 bg-[#03160e]/75" />
                    </div>

                    <div className="absolute right-0 top-1/2 z-0 hidden h-[68%] w-[18%] -translate-y-1/2 overflow-hidden border border-white/10 bg-[#082f20] lg:block">
                        <img
                            src={images[next]}
                            alt=""
                            className="h-full w-full object-cover opacity-25"
                        />
                        <div className="absolute inset-0 bg-[#03160e]/75" />
                    </div>

                    <div className="relative z-20 mx-auto max-w-[1050px]">

                        <div
                            key={active}
                            className={`
                                grid
                                min-h-[520px]
                                overflow-hidden
                                border
                                border-[#d5ad59]/50
                                bg-[#075d35]
                                shadow-[0_30px_80px_rgba(0,0,0,0.42)]
                                lg:grid-cols-[1.12fr_0.88fr]
                                ${
                                    direction === 'next'
                                        ? 'animate-page-next'
                                        : 'animate-page-prev'
                                }
                            `}
                        >
                            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[520px]">
                                <img
                                    src={images[active]}
                                    alt={current.title}
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#021b11]/80 via-transparent to-transparent" />

                                <span className="absolute bottom-6 left-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:left-8">
                                    {current.number} / 04
                                </span>
                            </div>

                            <div className="flex flex-col justify-between bg-[#075d35] p-7 sm:p-10 lg:p-12">

                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="h-px w-8 bg-amber-300" />

                                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                                            {lang === 'id'
                                                ? 'Produk & Layanan'
                                                : 'Products & Services'}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 max-w-xl font-heading text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                                        {current.title}
                                    </h3>

                                    <div className="mt-6 inline-flex w-fit border border-amber-300/70 bg-amber-300 px-5 py-2">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#075d35]">
                                            {current.subtitle}
                                        </span>
                                    </div>

                                    <div className="mt-7 h-px w-14 bg-amber-300" />

                                    <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                                        {current.description}
                                    </p>
                                </div>

                                <div className="mt-10 border-t border-white/10 pt-5">

                                    <div className="flex items-center justify-between gap-4">

                                        <div className="flex items-center">
                                            {services.map((service, index) => (
                                                <button
                                                    key={service.number}
                                                    type="button"
                                                    onClick={() => goTo(index)}
                                                    className={`
                                                        relative
                                                        flex
                                                        h-10
                                                        min-w-10
                                                        items-center
                                                        justify-center
                                                        border-b
                                                        px-2
                                                        text-[10px]
                                                        font-semibold
                                                        tracking-[0.08em]
                                                        transition
                                                        ${
                                                            active === index
                                                                ? 'border-amber-300 text-amber-300'
                                                                : 'border-transparent text-white/35 hover:text-white/70'
                                                        }
                                                    `}
                                                >
                                                    {service.number}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                onClick={goPrev}
                                                aria-label="Layanan sebelumnya"
                                                className="
                                                    flex h-10 w-10
                                                    items-center justify-center
                                                    border border-white/20
                                                    bg-[#082f20]
                                                    text-white/65
                                                    transition
                                                    hover:border-amber-300
                                                    hover:bg-amber-300
                                                    hover:text-[#075d35]
                                                "
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={goNext}
                                                aria-label="Layanan berikutnya"
                                                className="
                                                    flex h-10 w-10
                                                    items-center justify-center
                                                    border border-l-0 border-white/20
                                                    bg-[#082f20]
                                                    text-white/65
                                                    transition
                                                    hover:border-amber-300
                                                    hover:bg-amber-300
                                                    hover:text-[#075d35]
                                                "
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>

                                    </div>

                                    <div className="mt-5 h-px overflow-hidden bg-white/10">
                                        <div
                                            key={active}
                                            className="h-full origin-left bg-amber-300"
                                            style={{
                                                animation:
                                                    'serviceProgress 7s linear forwards',
                                                animationPlayState: paused
                                                    ? 'paused'
                                                    : 'running',
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <style>{`
                .animate-page-next {
                    animation: pageNext 850ms cubic-bezier(0.22, 0.8, 0.2, 1) both;
                    transform-origin: left center;
                    backface-visibility: hidden;
                }

                .animate-page-prev {
                    animation: pagePrev 850ms cubic-bezier(0.22, 0.8, 0.2, 1) both;
                    transform-origin: right center;
                    backface-visibility: hidden;
                }

                @keyframes pageNext {
                    from {
                        opacity: 0;
                        transform: perspective(1400px)
                            rotateY(-12deg)
                            translateX(24px)
                            scale(0.99);
                    }

                    to {
                        opacity: 1;
                        transform: perspective(1400px)
                            rotateY(0)
                            translateX(0)
                            scale(1);
                    }
                }

                @keyframes pagePrev {
                    from {
                        opacity: 0;
                        transform: perspective(1400px)
                            rotateY(12deg)
                            translateX(-24px)
                            scale(0.99);
                    }

                    to {
                        opacity: 1;
                        transform: perspective(1400px)
                            rotateY(0)
                            translateX(0)
                            scale(1);
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