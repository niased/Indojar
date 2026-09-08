import React from 'react';
import {
    ArrowRight,
    CheckCircle2,
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';

export default function ContactInfo({ t, lang, isDark }) {
    return (
        <>
            {/* =====================================================
                CONTACT INTRO
            ===================================================== */}
            <section
                className={`
                    border-b
                    ${
                        isDark
                            ? 'border-white/10 bg-[#f7f6f1] text-[#10231c]'
                            : 'border-[#d9dfda] bg-white text-[#10231c]'
                    }
                `}
            >
                <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
                    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="h-px w-10 bg-[#d5ad59]" />

                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0b7544]/70">
                                    {t.intro.eyebrow}
                                </span>
                            </div>

                            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                                {t.intro.title}
                            </h2>
                        </div>

                        <p className="max-w-2xl text-base leading-7 text-[#10231c]/60 lg:justify-self-end">
                            {t.intro.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* =====================================================
                CONTACT DETAILS
            ===================================================== */}
            <section
                className={`
                    border-b
                    ${
                        isDark
                            ? 'border-white/10 bg-[#06452e]'
                            : 'border-[#d9dfda] bg-[#eaf4ee]'
                    }
                `}
            >
                <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
                    <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
                        {/* OFFICE */}
                        <div className="bg-[#075d35] p-7 sm:p-8">
                            <div className="flex h-11 w-11 items-center justify-center border border-white/20 text-[#d5ad59]">
                                <MapPin className="h-5 w-5" />
                            </div>

                            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                                {t.office.title}
                            </p>

                            <p className="mt-3 text-sm leading-6 text-white/75">
                                {t.office.address}
                            </p>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=DBS+Bank+Tower+Ciputra+World+One+Jakarta"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#d5ad59] transition hover:text-white"
                            >
                                {lang === 'id'
                                    ? 'Lihat Lokasi'
                                    : 'View Location'}

                                <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                        </div>

                        {/* MANAGEMENT */}
                        <div className="bg-[#075d35] p-7 sm:p-8">
                            <div className="flex h-11 w-11 items-center justify-center border border-white/20 text-[#d5ad59]">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>

                            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                                {t.management.title}
                            </p>

                            <p className="mt-3 text-lg font-semibold text-white">
                                {t.management.name}
                            </p>

                            <p className="mt-1 text-sm text-white/55">
                                {t.management.director}
                            </p>
                        </div>

                        {/* EMAIL */}
                        <div className="bg-[#075d35] p-7 sm:p-8">
                            <div className="flex h-11 w-11 items-center justify-center border border-white/20 text-[#d5ad59]">
                                <Mail className="h-5 w-5" />
                            </div>

                            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                                {t.email.title}
                            </p>

                            <a
                                href={`mailto:${t.email.main}`}
                                className="mt-3 block text-sm text-white/80 transition hover:text-[#d5ad59]"
                            >
                                {t.email.main}
                            </a>

                            <a
                                href={`mailto:${t.email.secondary}`}
                                className="mt-2 block text-sm text-white/45 transition hover:text-[#d5ad59]"
                            >
                                {t.email.secondary}
                            </a>
                        </div>

                        {/* PHONE */}
                        <div className="bg-[#075d35] p-7 sm:p-8">
                            <div className="flex h-11 w-11 items-center justify-center border border-white/20 text-[#d5ad59]">
                                <Phone className="h-5 w-5" />
                            </div>

                            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                                {t.phone.title}
                            </p>

                            <a
                                href="tel:02129888318"
                                className="mt-3 block text-sm text-white/80 transition hover:text-[#d5ad59]"
                            >
                                {t.phone.main}
                            </a>

                            <a
                                href="tel:+62816896973"
                                className="mt-2 block text-sm text-white/45 transition hover:text-[#d5ad59]"
                            >
                                {t.phone.secondary}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}