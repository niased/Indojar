// resources/js/Pages/Welcome/HeroAbout.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, Radio } from 'lucide-react';

export default function HeroAbout({ t }) {
    // 3 Foto Latar Belakang Menara & Konstruksi (Slideshow dengan kejernihan optimal)
    const heroImages = [
        'https://images.unsplash.com/photo-1544725176-7c40e5f71c2e?q=80&w=1920&auto=format&fit=crop', // Konstruksi Menara
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1920&auto=format&fit=crop', // Telekomunikasi
        'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1920&auto=format&fit=crop', // Engineering
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    return (
        <div>
            {/* LAPISAN 2: HERO SECTION (FULL WIDTH & FOTO LATAR BELAKANG JELAS) */}
            <section className="relative w-full pt-32 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden bg-slate-950">
                {/* Background Slideshow Foto dengan Opasitas Optimal (0.45 agar foto menara terlihat jelas) */}
                {heroImages.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                            idx === currentImageIndex ? 'opacity-45 scale-105' : 'opacity-0 scale-100'
                        }`}
                        style={{ backgroundImage: `url(${img})`, transition: 'opacity 1.2s ease-in-out, transform 7s ease-out' }}
                    />
                ))}

                {/* Gradient Overlay Bernuansa Hijau Tua Indojar & Emas */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-[#064e3b]/60 dark:from-[#031812] dark:via-[#031812]/90 dark:to-[#064e3b]/50 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        {/* Tulisan Slogan Building Connections */}
                        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-amber-400 bg-emerald-950/90 border border-amber-500/40 px-4 py-2 rounded-lg mb-6 backdrop-blur-md shadow-sm">
                            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                            <span>BUILDING CONNECTIONS FOR A STRONGER TOMORROW</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
                            PT INDOJAR MULIA ABADI
                        </h1>
                        <p className="text-lg sm:text-xl font-bold text-amber-400 mt-3 tracking-wide">
                            Your Trusted Partner in Telecommunication Infrastructure
                        </p>

                        <p className="mt-6 text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                            {t.hero.subtitle}
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <a
                                href="#tentang"
                                className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-900/50 border border-emerald-400/30 flex items-center gap-2 cursor-pointer"
                            >
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 text-amber-300" />
                            </a>
                            <a
                                href="#layanan"
                                className="px-7 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all backdrop-blur-md cursor-pointer"
                            >
                                Our Services
                            </a>
                        </div>
                    </div>

                    {/* Baris Statistik Tanpa Kotak AI */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-24 pt-10 border-t border-white/15">
                        <div className="space-y-1">
                            <div className="text-xs font-mono font-bold text-amber-400 tracking-wider">SINCE 2014</div>
                            <div className="text-base font-bold text-white">Supporting Mining Industry</div>
                            <div className="text-xs text-slate-300">Fondasi awal rekayasa teknik dan konstruksi.</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-mono font-bold text-emerald-400 tracking-wider">SINCE 2021</div>
                            <div className="text-base font-bold text-white">Telecommunication Expansion</div>
                            <div className="text-xs text-slate-300">Fokus penuh pembangunan & pemeliharaan menara.</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs font-mono font-bold text-sky-400 tracking-wider">RELIABLE TEAM</div>
                            <div className="text-base font-bold text-white">Experienced Professionals</div>
                            <div className="text-xs text-slate-300">Didukung puluhan tenaga ahli bersertifikasi K3.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LAPISAN 3: ABOUT US (Desain Profesional Hijau & Emas) */}
            <section id="tentang" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800/80">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-5">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                            {t.about.tag}
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            {t.about.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {t.about.p1}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {t.about.p2}
                        </p>
                    </div>

                    {/* Kotak Quote Hijau Tua dengan Aksen Emas */}
                    <div className="lg:col-span-5">
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#064e3b] to-[#042f24] text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
                            <p className="text-sm sm:text-base font-medium italic leading-relaxed text-emerald-100">
                                &ldquo;Supported by a reliable and experienced team, we have assisted dozens of companies in the construction, maintenance, and reparation of telecommunication towers and other additional equipment.&rdquo;
                            </p>
                            <div className="mt-6 pt-4 border-t border-emerald-600/50 flex items-center justify-between text-xs font-semibold text-amber-300">
                                <span>PT Indojar Mulia Abadi</span>
                                <span>Core Values</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}