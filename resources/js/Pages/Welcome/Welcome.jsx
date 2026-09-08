// resources/js/Pages/Welcome/Welcome.jsx

import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

import Navbar from './Navbar';
import HeroWelcome from './HeroWelcome';
import AboutWelcome from './AboutWelcome';
import ServiceShowCaseWelcome from './ServiceShowCaseWelcome';
import ProjectWelcome from './ProjectWelcome';
import CtaWelcome from './CtaWelcome';
import FooterWelcome from './FooterWelcome';

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
        id: {
            nav: {
                about: 'Tentang Kami',
                services: 'Layanan',
                projects: 'Proyek',
                contact: 'Kontak',
            },

            hero: {
                ctaProjects: 'Jelajahi Proyek',
                ctaContact: 'Hubungi Kami',
            },

            about: {
                tag: 'TENTANG KAMI',
                title:
                    'Dedikasi Membangun Infrastruktur Jaringan yang Andal',
                description:
                    'PT Indojar Mulia Abadi berdiri sejak 2014 dan memperluas kompetensinya ke sektor telekomunikasi pada tahun 2021. Kami menghadirkan layanan pembangunan, penguatan, dan pekerjaan pendukung infrastruktur telekomunikasi.',
                button: 'Selengkapnya Tentang Kami',

                historyStart: 'Awal Perusahaan',
                historyStartDesc:
                    'Memulai kegiatan usaha dengan mendukung industri pertambangan.',

                telecomStart: 'Ekspansi Telekomunikasi',
                telecomStartDesc:
                    'Memperluas kompetensi ke industri telekomunikasi seluler.',

                currentFocus: 'Fokus Infrastruktur',
                currentFocusDesc:
                    'Pembangunan, penguatan, dan pekerjaan pendukung infrastruktur telekomunikasi.',
            },

            projects: {
                tag: 'PORTOFOLIO PROYEK',
                title: 'Pekerjaan Nyata, di Berbagai Wilayah.',
                subtitle:
                    'Beberapa dokumentasi visual dari pekerjaan pembangunan dan penguatan infrastruktur telekomunikasi PT Indojar Mulia Abadi.',
                button: 'Lihat Semua Proyek',

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

            cta: {
                eyebrow: 'MARI BANGUN INDONESIA YANG TERHUBUNG',
                title:
                    'Bersama Membangun Infrastruktur Telekomunikasi yang Andal.',
                description:
                    'Kami siap menjadi mitra dalam menghadirkan infrastruktur telekomunikasi yang berkualitas, aman, dan dapat diandalkan.',
                button: 'Hubungi Kami',
            },
        },

        en: {
            nav: {
                about: 'About Us',
                services: 'Services',
                projects: 'Projects',
                contact: 'Contact',
            },

            hero: {
                ctaProjects: 'Explore Projects',
                ctaContact: 'Contact Us',
            },

            about: {
                tag: 'ABOUT US',
                title:
                    'Dedicated to Building Reliable Network Infrastructure',
                description:
                    'PT Indojar Mulia Abadi was established in 2014 and expanded its capabilities into the telecommunication sector in 2021. We deliver construction, strengthening, and supporting works for telecommunication infrastructure.',
                button: 'Learn More About Us',

                historyStart: 'Company Established',
                historyStartDesc:
                    'Started its business activities by supporting the mining industry.',

                telecomStart: 'Telecommunication Expansion',
                telecomStartDesc:
                    'Expanded its capabilities into the cellular telecommunication industry.',

                currentFocus: 'Infrastructure Focus',
                currentFocusDesc:
                    'Construction, strengthening, and supporting works for telecommunication infrastructure.',
            },

            projects: {
                tag: 'PROJECT PORTFOLIO',
                title: 'Real Work, Across Multiple Regions.',
                subtitle:
                    'A visual selection of telecommunication infrastructure construction and strengthening works delivered by PT Indojar Mulia Abadi.',
                button: 'View All Projects',

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

            cta: {
                eyebrow:
                    "LET'S BUILD A BETTER CONNECTED INDONESIA",
                title:
                    'Partner with Us for Reliable Telecommunication Solutions.',
                description:
                    'We are ready to become your partner in delivering reliable, safe, and high-quality telecommunication infrastructure.',
                button: 'Contact Us',
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
                MAIN
            ===================================================== */}
            <main className="relative overflow-hidden bg-[#061b14]">
                <div className="relative z-10">
                    {/* HERO */}
                    <HeroWelcome t={currentDict} />

                    {/* ABOUT - RINGKAS */}
                    <AboutWelcome t={currentDict} />

                    {/* SERVICES - RINGKAS */}
                    <ServiceShowCaseWelcome lang={lang} />

                    {/* PROJECTS - RINGKAS */}
                    <ProjectWelcome
                        t={{
                            ...currentDict,
                            lang,
                        }}
                    />

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