// resources/js/Pages/Welcome.jsx

import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

import Navbar from './Welcome/Navbar';
import HeroWelcome from './Welcome/HeroWelcome';
import AboutWelcome from './Welcome/AboutWelcome';
import VisionMissionWelcome from './Welcome/VisionMissionWelcome';
import ServiceShowCaseWelcome from './Welcome/ServiceShowCaseWelcome';
import ProjectWelcome from './Welcome/ProjectWelcome';
import ClientWelcome from './Welcome/ClientWelcome';
import CtaWelcome from './Welcome/CtaWelcome';
import FooterWelcome from './Welcome/FooterWelcome';

export default function Welcome({ auth }) {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        const saved = localStorage.getItem('theme');

        return saved ? saved === 'dark' : true;
    });

    const [lang, setLang] = useState('id');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);

        localStorage.setItem(
            'theme',
            isDark ? 'dark' : 'light',
        );
    }, [isDark]);

    const t = {
        /* =========================================================
           INDONESIA
        ========================================================= */
        id: {
            nav: {
                about: 'Tentang Kami',
                services: 'Layanan',
                projects: 'Proyek',
                clients: 'Klien',
                contact: 'Kontak',
            },

            hero: {
                badge: 'Infrastruktur Telekomunikasi',
                title: 'PT INDOJAR MULIA ABADI',
                subtitle:
                    'Berdiri sejak 2014 dan berekspansi ke industri telekomunikasi sejak 2021. Kami menghadirkan standar mutu terbaik dalam pembangunan menara baru (B2S SACME), penguatan struktur menara (Strengthening), hingga colocation & mekanikal elektrikal.',
                ctaProjects: 'Eksplorasi Proyek',
                ctaContact: 'Hubungi Kami',
            },

            stats: {
                yearFounded: 'Tahun Berdiri',
                yearTelco: 'Fokus Infrastruktur Menara',
                sitesCompleted: 'Proyek Site Selesai',
                coverage: 'Cakupan Wilayah Proyek',
                coverageVal:
                    'Banten, Jabar, Riau & Sumbar',
            },

            about: {
                tag: 'TENTANG KAMI',
                title:
                    'Dedikasi Membangun Infrastruktur Jaringan yang Andal',
                p1:
                    'PT Indojar Mulia Abadi mengawali kiprahnya pada tahun 2014 di sektor pendukung industri pertambangan. Menjawab kebutuhan transformasi digital nasional, pada tahun 2021 perusahaan memperluas kompetensinya ke sektor telekomunikasi seluler.',
                p2:
                    'Melalui sinergi tenaga ahli bersertifikasi, kepatuhan ketat terhadap K3, serta koordinasi terpadu bersama konsultan pengawas, kami memastikan setiap site terbangun tepat mutu dan tepat waktu hingga serah terima berita acara.',
            },

            services: {
                tag: 'PRODUK & LAYANAN',
                title:
                    'Layanan Konstruksi Telekomunikasi Terpadu',
                s1Desc:
                    'Penyediaan layanan pembangunan menara telekomunikasi baru berdasarkan lokasi dan spesifikasi permintaan pelanggan.',
                s2Desc:
                    'Layanan instalasi perangkat tambahan dan penguatan struktur menara eksisting sesuai preferensi teknis.',
                s3Desc:
                    'Pekerjaan sipil penambahan penyedia layanan operator telekomunikasi pada menara yang dikelola klien.',
            },

            projects: {
                tag: 'OUR PROJECTS',
                title:
                    'Portofolio Proyek Telekomunikasi',
                subtitle:
                    'Rekam jejak pekerjaan pembangunan menara baru dan penguatan struktur yang telah dilaksanakan PT Indojar Mulia Abadi di berbagai wilayah Indonesia.',
                b2sTab: 'B2S SACME',
                strTab: 'Tower Strengthening',
                thSite: 'Nama Site',
                thCity: 'Kota / Kabupaten',
                thProvince: 'Provinsi',
                thScope: 'Lingkup Kerja',
                featured: 'Featured Projects',
                directory: 'Project Directory',
                completed: 'Completed Projects',
                location: 'Lokasi',
                category: 'Kategori',
            },

            clients: {
                tag: 'KLIEN KAMI',
                title:
                    'Dipercaya Operator & Penyedia Menara Nasional',
            },

            cta: {
                eyebrow:
                    'MARI BANGUN INDONESIA YANG TERHUBUNG',
                title:
                    'Bersama Membangun Infrastruktur Telekomunikasi yang Andal.',
                button: 'Hubungi Kami',
            },

            contact: {
                tag: 'CONTACT US',
                title:
                    'Mari Bersinergi Membangun Jaringan Masa Depan',
                officeHead: 'Kantor Pusat',
                officeAddr:
                    'DBS Bank Tower Lt. 28, Ciputra World One, Jl. Prof. Dr. Satrio Kav. 3-5, Jakarta 12940',
                mgmtHead: 'Kontak & Manajemen',
                director: 'Direktur Utama',
            },

            floating: {
                text: 'Portal Sistem',
                sub: 'Masuk Karyawan',
            },
        },

        /* =========================================================
           ENGLISH
        ========================================================= */
        en: {
            nav: {
                about: 'About Us',
                services: 'Services',
                projects: 'Projects',
                clients: 'Clients',
                contact: 'Contact',
            },

            hero: {
                badge: 'Telecommunication Infrastructure',
                title: 'PT INDOJAR MULIA ABADI',
                subtitle:
                    'Established in 2014 and expanded to the telecommunication industry in 2021. Delivering prime quality standards in new tower construction (B2S SACME), structural tower strengthening, and colocation electrical works.',
                ctaProjects: 'Explore Portfolio',
                ctaContact: 'Contact Us',
            },

            stats: {
                yearFounded: 'Established Year',
                yearTelco: 'Telecommunication Focus',
                sitesCompleted: 'Completed Sites',
                coverage: 'Operational Reach',
                coverageVal:
                    'Banten, West Java, Riau & West Sumatra',
            },

            about: {
                tag: 'ABOUT US',
                title:
                    'Dedicated to Building Resilient Network Infrastructure',
                p1:
                    'PT Indojar Mulia Abadi began its operations in 2014 serving the mining industry. In response to nationwide digital acceleration, in 2021 the company strategically expanded its core capabilities to the cellular telecommunication sector.',
                p2:
                    'Backed by certified field engineers, rigorous HSE standards, and seamless coordination with supervisory consultants, we ensure every site meets rigorous technical benchmarks from ground-breaking to handover acceptance.',
            },

            services: {
                tag: 'PRODUCTS & SERVICES',
                title:
                    'Integrated Telecommunication Construction',
                s1Desc:
                    'PT Indojar Mulia Abadi provides service for new towers construction based on the location and specifications of customer requests.',
                s2Desc:
                    'PT Indojar Mulia Abadi provides installation services for additional equipment and strengthening of existing towers.',
                s3Desc:
                    'PT Indojar Mulia Abadi provides civil works services for the addition of telecommunications operator providers.',
            },

            projects: {
                tag: 'OUR PROJECTS',
                title:
                    'Telecommunication Project Portfolio',
                subtitle:
                    'A selection of new tower construction and structural strengthening projects delivered by PT Indojar Mulia Abadi across multiple regions in Indonesia.',
                b2sTab: 'B2S SACME',
                strTab: 'Tower Strengthening',
                thSite: 'Site Name',
                thCity: 'City / Regency',
                thProvince: 'Province',
                thScope: 'Scope of Work',
                featured: 'Featured Projects',
                directory: 'Project Directory',
                completed: 'Completed Projects',
                location: 'Location',
                category: 'Category',
            },

            clients: {
                tag: 'OUR CLIENTS',
                title:
                    'Trusted by Partner Operators & Providers',
            },

            cta: {
                eyebrow:
                    "LET'S BUILD A BETTER CONNECTED INDONESIA",
                title:
                    'Partner with Us for Reliable Telecommunication Solutions.',
                button: 'Contact Us',
            },

            contact: {
                tag: 'CONTACT US',
                title:
                    'Connect with Our Engineering Team',
                officeHead: 'Headquarters',
                officeAddr:
                    'DBS Bank Tower 28th Fl, Ciputra World One, Jl. Prof. Dr. Satrio Kav. 3-5, Jakarta 12940',
                mgmtHead:
                    'Management & Direct Inquiry',
                director: 'Managing Director',
            },

            floating: {
                text: 'System Portal',
                sub: 'Employee Access',
            },
        },
    };

    const currentDict = t[lang];

    return (
        <div className="min-h-screen bg-[#061b14] text-white">
            <Head title="PT Indojar Mulia Abadi" />

            {/* =====================================================
                NAVBAR
            ===================================================== */}
            <Navbar
                auth={auth}
                lang={lang}
                setLang={setLang}
                isDark={isDark}
                setIsDark={setIsDark}
                t={currentDict}
            />

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}
            <main className="relative overflow-hidden bg-[#061b14]">

                {/* =================================================
                    GLOBAL BACKGROUND
                ================================================= */}
                <div
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    aria-hidden="true"
                >
                    {/* Engineering grid */}
                    <div
                        className="
                            absolute
                            inset-0
                            opacity-[0.025]
                            bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
                            bg-[size:72px_72px]
                        "
                    />

                    {/* Subtle green atmosphere */}
                    <div
                        className="
                            absolute
                            -left-56
                            top-[8%]
                            h-[520px]
                            w-[520px]
                            rounded-full
                            bg-emerald-500/10
                            blur-[130px]
                        "
                    />

                    <div
                        className="
                            absolute
                            -right-56
                            top-[38%]
                            h-[560px]
                            w-[560px]
                            rounded-full
                            bg-emerald-400/[0.07]
                            blur-[140px]
                        "
                    />

                    <div
                        className="
                            absolute
                            left-[45%]
                            top-[70%]
                            h-[420px]
                            w-[420px]
                            rounded-full
                            bg-amber-400/[0.035]
                            blur-[120px]
                        "
                    />
                </div>

                {/* =================================================
                    PAGE SECTIONS
                ================================================= */}
                <div className="relative z-10">

                    {/* HERO */}
                    <HeroWelcome t={currentDict} />

                    {/* ABOUT */}
                    <AboutWelcome t={currentDict} />

                    {/* VISION & MISSION */}
                    <VisionMissionWelcome lang={lang} />

                    {/* =================================================
                        SERVICES
                        HANYA SATU COMPONENT SERVICES
                    ================================================= */}
                    <ServiceShowCaseWelcome lang={lang} />

                    {/* =================================================
                        PROJECT PORTFOLIO
                        LANGSUNG SETELAH SERVICES
                    ================================================= */}
                    <ProjectWelcome t={currentDict} />

                    {/* CLIENTS */}
                    <ClientWelcome t={currentDict} />

                    {/* CTA */}
                    <CtaWelcome t={currentDict} />

                </div>
            </main>

            {/* =====================================================
                FOOTER
            ===================================================== */}
            <FooterWelcome
                auth={auth}
                t={currentDict}
            />
        </div>
    );
}