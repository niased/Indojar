// resources/js/Pages/Welcome/VisionMissionWelcome.jsx

import React from 'react';
import visionImage from '@/../images/ptindojar3.jpg';

export default function VisionMissionWelcome({ lang = 'id' }) {
    const isIndonesia = lang === 'id';

    const content = {
        eyebrow: isIndonesia ? 'ARAH & KOMITMEN' : 'DIRECTION & COMMITMENT',

        title: isIndonesia
            ? 'Visi & Misi'
            : 'Vision & Mission',

        intro: isIndonesia
            ? 'Menjadi bagian dari pembangunan infrastruktur telekomunikasi yang andal melalui kualitas, pelayanan, dan pengembangan tim yang berkelanjutan.'
            : 'Contributing to reliable telecommunication infrastructure through quality, service excellence, and continuous team development.',

        visionLabel: isIndonesia ? 'Visi' : 'Vision',

        vision: isIndonesia
            ? 'Kami berkomitmen untuk menjadi perusahaan terkemuka dalam bidang pembangunan infrastruktur telekomunikasi dengan pelayanan yang cepat, berkualitas, dan memberikan kepuasan kepada pelanggan.'
            : 'We are committed to becoming a leading company in telecommunication infrastructure construction by providing fast, high-quality service and delivering customer satisfaction.',

        missionLabel: isIndonesia ? 'Misi' : 'Mission',

        missions: isIndonesia
            ? [
                'Memastikan kualitas setiap produk dan memberikan layanan yang sesuai dengan harapan pelanggan.',
                'Membangun dan menjaga hubungan yang erat dengan pelanggan.',
                'Meningkatkan keterampilan dan kemampuan tim secara berkelanjutan untuk memenuhi dan mempertahankan kepuasan pelanggan.',
            ]
            : [
                'Ensuring the quality of each product and providing services that meet customer expectations.',
                'Establishing and maintaining close relationships with customers.',
                'Improving skills and abilities of the team continuously to meet and maintain customer satisfaction.',
            ],
    };

    return (
        <section
            id="visi-misi"
            className="relative w-full overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-28">
                {/* =====================================================
                    HEADER
                ===================================================== */}
                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-amber-400" />

                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">
                                {content.eyebrow}
                            </span>
                        </div>

                        <h2 className="font-heading max-w-lg text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                            {content.title}
                        </h2>
                    </div>

                    <div className="flex items-end">
                        <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                            {content.intro}
                        </p>
                    </div>
                </div>

                {/* =====================================================
                    MAIN CONTENT
                ===================================================== */}
                <div className="mt-16 grid gap-0 border-t border-white/10 lg:mt-20 lg:grid-cols-[1fr_0.92fr]">
                    {/* =================================================
                        VISION + MISSION
                    ================================================= */}
                    <div className="border-b border-white/10 lg:border-b-0 lg:border-r lg:pr-14">
                        {/* Vision */}
                        <div className="py-10 sm:py-12">
                            <div className="mb-6 flex items-center gap-4">
                                <span className="font-heading text-xs font-semibold tracking-[0.2em] text-amber-300">
                                    01
                                </span>

                                <span className="h-px w-8 bg-emerald-400/70" />

                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    {content.visionLabel}
                                </span>
                            </div>

                            <p className="max-w-2xl text-xl font-medium leading-[1.5] tracking-[-0.02em] text-white sm:text-2xl lg:text-[27px] lg:leading-[1.45]">
                                {content.vision}
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="border-t border-white/10 py-10 sm:py-12">
                            <div className="mb-8 flex items-center gap-4">
                                <span className="font-heading text-xs font-semibold tracking-[0.2em] text-amber-300">
                                    02
                                </span>

                                <span className="h-px w-8 bg-emerald-400/70" />

                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                                    {content.missionLabel}
                                </span>
                            </div>

                            <div className="divide-y divide-white/10">
                                {content.missions.map((mission, index) => (
                                    <div
                                        key={mission}
                                        className="grid grid-cols-[42px_1fr] gap-5 py-5 first:pt-0 last:pb-0 sm:grid-cols-[52px_1fr] sm:gap-6"
                                    >
                                        <span className="pt-1 font-heading text-xs font-semibold tracking-[0.15em] text-white/30">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <p className="max-w-xl text-sm leading-7 text-white/65 sm:text-[15px] sm:leading-7">
                                            {mission}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        IMAGE
                    ================================================= */}
                    <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px] lg:pl-14">
                        <div className="relative h-full min-h-[420px] overflow-hidden sm:min-h-[500px] lg:min-h-[620px]">
                            <img
                                src={visionImage}
                                alt={
                                    isIndonesia
                                        ? 'Infrastruktur telekomunikasi PT Indojar Mulia Abadi'
                                        : 'Telecommunication infrastructure PT Indojar Mulia Abadi'
                                }
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    object-center
                                    transition-transform
                                    duration-700
                                    hover:scale-[1.025]
                                "
                            />

                            {/* Image edge / editorial accent */}
                            <div className="absolute inset-y-0 left-0 w-px bg-amber-300/70" />

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#061b14]/80 via-[#061b14]/20 to-transparent px-6 pb-6 pt-20 sm:px-8 sm:pb-8">
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-8 bg-amber-300" />

                                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                                        PT Indojar Mulia Abadi
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}