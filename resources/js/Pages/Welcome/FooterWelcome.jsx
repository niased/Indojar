// resources/js/Pages/Welcome/FooterWelcome.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

export default function FooterWelcome({ t }) {
    const year = new Date().getFullYear();

    const navigation = [
        {
            label: 'Tentang Kami',
            href: '/tentang-kami',
        },
        {
            label: 'Layanan',
            href: '/layanan',
        },
        {
            label: 'Proyek',
            href: '/proyek',
        },
        {
            label: 'Kontak',
            href: '/kontak',
        },
    ];

    const services = [
        'Tower Construction',
        'Tower Strengthening',
        'Colocation',
        'Civil & CME Works',
    ];

    return (
        <footer
            id="kontak"
            className="border-t border-white/10 bg-[#06100c] text-white"
        >
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
                    {/* Company */}
                    <div className="max-w-sm">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center border border-amber-300/60 bg-[#075d35] text-xs font-bold text-amber-300 transition-colors duration-300 group-hover:border-amber-300 group-hover:bg-[#087a48]">
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
                        </Link>

                        <p className="mt-6 text-sm leading-7 text-white/50">
                            General Contractor, Telecommunication & Civil
                            Engineering Infrastructure.
                        </p>

                        <Link
                            href="/kontak"
                            className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold text-amber-300 transition-colors hover:text-white"
                        >
                            Hubungi Kami
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                            Perusahaan
                        </h3>

                        <nav className="mt-5 flex flex-col gap-3 text-sm text-white/50">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="transition-colors hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                            Layanan
                        </h3>

                        <nav className="mt-5 flex flex-col gap-3 text-sm text-white/50">
                            {services.map((service) => (
                                <span key={service}>{service}</span>
                            ))}
                        </nav>

                        <Link
                            href="/layanan"
                            className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-amber-300"
                        >
                            Lihat semua layanan
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    {/* Contact */}
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
                                    Jl. Prof. Dr. Satrio Kav. 3-5,
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

                        <Link
                            href="/kontak"
                            className="mt-6 inline-flex items-center gap-2 border-b border-amber-300/40 pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-300 transition-colors hover:border-amber-300 hover:text-white"
                        >
                            Detail Kontak
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>

                {/* Secondary Information */}
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
                                <span className="mx-2 text-white/20">
                                    /
                                </span>
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

                {/* Bottom */}
                <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {year} PT Indojar Mulia Abadi. All rights reserved.
                    </span>

                    <Link
                        href="/"
                        className="transition-colors hover:text-white/60"
                    >
                        Jakarta, Indonesia
                    </Link>
                </div>
            </div>
        </footer>
    );
}