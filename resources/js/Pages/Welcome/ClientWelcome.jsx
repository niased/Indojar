// resources/js/Pages/Welcome/ClientWelcome.jsx

import React from 'react';

export default function ClientWelcome({ t }) {
    const clients = [
        'MITRATEL',
        'TELKOMSEL',
        'XL AXIATA',
        'INDOSAT OOREDOO',
    ];

    return (
        <section
            id="klien"
            className="relative overflow-hidden border-t border-white/10"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">
                    {/* =================================================
                        INTRO
                    ================================================= */}
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-amber-400" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
                                {t.clients.tag}
                            </span>
                        </div>

                        <h2 className="font-heading max-w-xl text-3xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                            {t.clients.title}
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
                            {t.clients.tag === 'OUR CLIENTS'
                                ? 'Membangun hubungan kerja sama melalui kualitas pekerjaan, ketepatan pelaksanaan, dan komitmen terhadap kebutuhan proyek.'
                                : 'Membangun hubungan kerja sama melalui kualitas pekerjaan, ketepatan pelaksanaan, dan komitmen terhadap kebutuhan proyek.'}
                        </p>
                    </div>

                    {/* =================================================
                        CLIENT LIST
                    ================================================= */}
                    <div className="border-y border-white/10">
                        {clients.map((client, index) => (
                            <div
                                key={client}
                                className="group grid grid-cols-[52px_1fr_auto] items-center gap-5 border-b border-white/10 py-6 last:border-b-0 sm:grid-cols-[70px_1fr_auto] sm:py-7"
                            >
                                <span className="font-heading text-xs font-semibold tracking-[0.15em] text-white/20 transition-colors duration-300 group-hover:text-amber-300">
                                    {String(index + 1).padStart(
                                        2,
                                        '0',
                                    )}
                                </span>

                                <span className="font-heading text-base font-semibold tracking-[-0.02em] text-white/65 transition-colors duration-300 group-hover:text-white sm:text-lg">
                                    {client}
                                </span>

                                <span className="h-px w-8 bg-white/10 transition-all duration-300 group-hover:w-14 group-hover:bg-amber-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}