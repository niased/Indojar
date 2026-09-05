// resources/js/Pages/Welcome/FooterWelcome.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Phone, Mail, Lock, ArrowRight } from 'lucide-react';

export default function FooterWelcome({ auth, t }) {
    return (
        <>
            {/* CLIENTS */}
            <section
                id="klien"
                className="mx-auto max-w-7xl border-b border-slate-200 px-6 py-16 text-center dark:border-slate-800/80 sm:px-10"
            >
                <span className="mb-6 block text-xs font-bold uppercase tracking-widest text-slate-400">
                    {t.clients.tag} &bull; {t.clients.title}
                </span>

                <div className="flex flex-wrap items-center justify-center gap-10 text-xs font-bold opacity-75 transition-all duration-300 hover:opacity-100 sm:gap-16">
                    <span className="text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                        MITRATEL
                    </span>

                    <span className="text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                        TELKOMSEL
                    </span>

                    <span className="text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                        XL AXIATA
                    </span>

                    <span className="text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                        INDOSAT OOREDOO
                    </span>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                id="kontak"
                className="border-t border-slate-800 bg-slate-950 px-6 py-12 text-xs text-slate-400 sm:px-10"
            >
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">

                    <div>
                        <div className="mb-3 flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                                IMA
                            </div>

                            <span className="text-sm font-bold text-white">
                                PT INDOJAR MULIA ABADI
                            </span>
                        </div>

                        <p className="leading-relaxed">
                            General Contractor, Telecommunication & Civil Engineering Infrastructure.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-bold text-white">
                            {t.contact.officeHead}
                        </h4>

                        <p className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                            <span>{t.contact.officeAddr}</span>
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-bold text-white">
                            {t.contact.mgmtHead}
                        </h4>

                        <p>
                            <strong>{t.contact.director}:</strong> Edy Julianto
                        </p>

                        <p className="mt-1 flex items-center gap-2">
                            <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                            <span>
                                edy_juls@yahoo.co.id &bull; info@indojar.com
                            </span>
                        </p>

                        <p className="mt-1 flex items-center gap-2">
                            <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                            <span>
                                021-29888318 &bull; +62 816-896-973
                            </span>
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-slate-500 sm:flex-row">
                    <span>
                        &copy; {new Date().getFullYear()} PT Indojar Mulia Abadi. All rights reserved.
                    </span>

                    <span>
                        DBS Bank Tower 28/F, Ciputra World One, Jakarta
                    </span>
                </div>
            </footer>

            {/* FLOATING PORTAL */}
            <div className="fixed bottom-6 right-6 z-50">
                <Link
                    href={auth?.user ? '/dashboard' : '/login'}
                    className="group flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-[#064e3b] to-emerald-600 px-5 py-3.5 text-white shadow-2xl shadow-emerald-950/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:from-[#08634c] hover:to-emerald-500 active:scale-95"
                >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white transition-transform group-hover:rotate-12">
                        <Lock className="h-4 w-4 text-amber-300" />
                    </div>

                    <div className="flex flex-col pr-1 text-left">
                        <span className="text-xs font-bold leading-none tracking-tight">
                            {auth?.user ? 'Ke Dashboard' : t.floating.text}
                        </span>

                        <span className="mt-0.5 text-[10px] font-medium text-emerald-200">
                            {auth?.user ? 'Sistem Aktif' : t.floating.sub}
                        </span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-white/80 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </>
    );
}