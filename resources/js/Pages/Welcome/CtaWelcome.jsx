// resources/js/Pages/Welcome/CtaWelcome.jsx

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CtaWelcome({ t }) {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
            <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#064e3b] p-10 text-white shadow-2xl sm:p-14 md:flex-row">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent)]" />

                <div className="relative z-10 max-w-xl">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-amber-300">
                        Mari Bangun Indonesia yang Terhubung
                    </span>

                    <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
                        Bersama Membangun Infrastruktur Telekomunikasi yang Andal.
                    </h2>
                </div>

                <div className="relative z-10 shrink-0">
                    <a
                        href="#kontak"
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-slate-900"
                    >
                        <span>{t.contact.tag === 'CONTACT US' ? 'Hubungi Kami' : 'Hubungi Kami'}</span>
                        <ArrowRight className="h-4 w-4 text-amber-400" />
                    </a>
                </div>
            </div>
        </section>
    );
}