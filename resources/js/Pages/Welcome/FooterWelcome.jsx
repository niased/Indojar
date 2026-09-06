// resources/js/Pages/Welcome/FooterWelcome.jsx

import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

export default function FooterWelcome({ t }) {
    const year = new Date().getFullYear();

    return (
        <footer id="kontak" className="border-t border-white/10 bg-[#06100c] text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
                    <div className="max-w-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center border border-amber-300/60 bg-[#075d35] text-xs font-bold text-amber-300">
                                IMA
                            </div>

                            <div>
                                <p className="text-sm font-bold tracking-wide">
                                    PT INDOJAR
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                                    Mulia Abadi
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 text-sm leading-7 text-white/50">
                            General Contractor, Telecommunication & Civil
                            Engineering Infrastructure.
                        </p>

                        <a
                            href="#kontak"
                            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-amber-300 transition-colors hover:text-white"
                        >
                            Hubungi Kami
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                            Perusahaan
                        </h3>

                        <nav className="mt-5 flex flex-col gap-3 text-sm text-white/50">
                            <a href="#about" className="transition hover:text-white">
                                Tentang Kami
                            </a>
                            <a href="#services" className="transition hover:text-white">
                                Layanan
                            </a>
                            <a href="#portofolio" className="transition hover:text-white">
                                Proyek
                            </a>
                            <a href="#kontak" className="transition hover:text-white">
                                Kontak
                            </a>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                            Layanan
                        </h3>

                        <nav className="mt-5 flex flex-col gap-3 text-sm text-white/50">
                            <span>Tower Construction</span>
                            <span>Tower Strengthening</span>
                            <span>Colocation</span>
                            <span>Civil & CME Works</span>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                            Kontak
                        </h3>

                        <div className="mt-5 space-y-4 text-sm text-white/50">
                            <p className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                                <span>
                                    DBS Bank Tower Lt. 28,
                                    <br />
                                    Ciputra World One,
                                    <br />
                                    Jakarta 12940
                                </span>
                            </p>

                            <p className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0 text-amber-300" />
                                <span>info@indojar.com</span>
                            </p>

                            <p className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0 text-amber-300" />
                                <span>021-29888318</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-14 border-t border-white/10 pt-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                Kantor Pusat
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-white/50">
                                Jl. Prof. Dr. Satrio Kav. 3-5,
                                <br />
                                Jakarta Selatan, DKI Jakarta
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                Manajemen
                            </h3>

                            <p className="mt-3 text-sm text-white/50">
                                {t?.contact?.director || 'Direktur Utama'}
                                <span className="mx-2 text-white/20">/</span>
                                Edy Julianto
                            </p>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                Fokus Infrastruktur
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-white/50">
                                Telecommunication Tower,
                                <br />
                                Civil Engineering & CME
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {year} PT Indojar Mulia Abadi. All rights reserved.
                    </span>

                    <span>
                        Jakarta, Indonesia
                    </span>
                </div>
            </div>
        </footer>
    );
}