// resources/js/Pages/Welcome/ClientWelcome.jsx

import React from 'react';

export default function ClientWelcome({ t, lang = 'id' }) {
    const clients = [
        'MITRATEL',
        'TELKOMSEL',
        'XL AXIATA',
        'INDOSAT OOREDOO',
    ];

    const content = {
        id: {
            description:
                'Membangun hubungan kerja sama melalui kualitas pekerjaan, ketepatan pelaksanaan, dan komitmen terhadap kebutuhan proyek.',
            label: 'Mitra',
        },
        en: {
            description:
                'Building strong partnerships through quality execution, reliability, and commitment to project requirements.',
            label: 'Partner',
        },
    };

    const current = content[lang] || content.id;

    return (
        <section
            id="klien"
            className="border-y border-[#10231c]/10 bg-[#031a14] text-white"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-28">
                <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-amber-300" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
                                {t.clients.tag}
                            </span>
                        </div>

                        <h2 className="max-w-xl font-heading text-3xl font-semibold leading-[1] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                            {t.clients.title}
                        </h2>

                        <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
                            {current.description}
                        </p>
                    </div>

                    <div className="border-y border-white/10">
                        {clients.map((client, index) => (
                            <div
                                key={client}
                                className="group grid grid-cols-[52px_1fr_auto] items-center gap-5 border-b border-white/10 py-6 last:border-b-0 sm:grid-cols-[70px_1fr_auto] sm:py-7"
                            >
                                <span className="font-heading text-xs font-semibold tracking-[0.15em] text-white/25 transition-colors duration-300 group-hover:text-amber-300">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div>
                                    <span className="font-heading text-base font-semibold tracking-[-0.02em] text-white/70 transition-colors duration-300 group-hover:text-white sm:text-lg">
                                        {client}
                                    </span>

                                    <span className="mt-1 block text-[9px] uppercase tracking-[0.18em] text-white/30">
                                        {current.label}
                                    </span>
                                </div>

                                <span className="h-px w-8 bg-white/10 transition-all duration-300 group-hover:w-14 group-hover:bg-amber-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}