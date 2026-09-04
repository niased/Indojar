import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

import Navbar from './Welcome/Navbar';
import HeroWelcome from './Welcome/HeroWelcome';
import AboutWelcome from './Welcome/AboutWelcome';
import VisionMissionServices from './Welcome/VisionMissionServices';
import ProjectsCtaFooter from './Welcome/ProjectsCtaFooter';

export default function Welcome({ auth }) {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved ? saved === 'dark' : true;
        }

        return true;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const [lang, setLang] = useState('id');

    const t = {
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
                coverageVal: 'Banten, Jabar, Riau & Sumbar',
            },

            about: {
                tag: 'TENTANG KAMI',
                title: 'Dedikasi Membangun Infrastruktur Jaringan yang Andal',
                p1:
                    'PT Indojar Mulia Abadi mengawali kiprahnya pada tahun 2014 di sektor pendukung industri pertambangan. Menjawab kebutuhan transformasi digital nasional, pada tahun 2021 perusahaan memperluas kompetensinya ke sektor telekomunikasi seluler.',
                p2:
                    'Melalui sinergi tenaga ahli bersertifikasi, kepatuhan ketat terhadap K3, serta koordinasi terpadu bersama konsultan pengawas, kami memastikan setiap site terbangun tepat mutu dan tepat waktu hingga serah terima berita acara.',
                visionTitle: 'Our Vision',
                visionDesc:
                    'We believe that we are capable of becoming a leading company in the business of central telecommunication construction with the fast and excellence satisfactory service.',
                missionTitle: 'Our Mission',
                m1:
                    'Ensuring the quality of each product and providing services that meet customer expectations.',
                m2:
                    'Establishing and maintaining close relationships with customers.',
                m3:
                    'Improving skills and abilities of the team continuously to meet and maintain customer satisfaction.',
            },

            services: {
                tag: 'OUR PRODUCTS & SERVICES',
                title: 'Layanan Konstruksi Telekomunikasi Terpadu',
                s1Desc:
                    'Penyediaan layanan pembangunan menara telekomunikasi baru berdasarkan lokasi dan spesifikasi permintaan pelanggan.',
                s2Desc:
                    'Layanan instalasi perangkat tambahan dan penguatan struktur menara eksisting sesuai preferensi teknis.',
                s3Desc:
                    'Pekerjaan sipil penambahan penyedia layanan operator telekomunikasi pada menara yang dikelola klien.',
            },

            projects: {
                tag: 'OUR PROJECTS',
                title: 'Portofolio Pekerjaan yang Telah Selesai',
                subtitle:
                    'Rangkaian proyek menara dan CME yang berhasil diserahterimakan dengan standar uji terima konsultan pengawas.',
                b2sTab: 'Proyek B2S SACME (Menara Baru)',
                strTab: 'Proyek Tower Strengthening',
                thSite: 'Nama Lokasi / Site',
                thCity: 'Kota / Kabupaten',
                thProvince: 'Provinsi',
                thScope: 'Lingkup Kerja',
            },

            clients: {
                tag: 'OUR CLIENTS',
                title: 'Dipercaya Operator & Penyedia Menara Nasional',
            },

            contact: {
                tag: 'CONTACT US',
                title: 'Mari Bersinergi Membangun Jaringan Masa Depan',
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
                visionTitle: 'Our Vision',
                visionDesc:
                    'We believe that we are capable of becoming a leading company in the business of central telecommunication construction with the fast and excellence satisfactory service.',
                missionTitle: 'Our Mission',
                m1:
                    'Ensuring the quality of each product and providing services that meet customer expectations.',
                m2:
                    'Establishing and maintaining close relationships with customers.',
                m3:
                    'Improving skills and abilities of the team continuously to meet and maintain customer satisfaction.',
            },

            services: {
                tag: 'OUR PRODUCTS & SERVICES',
                title: 'Integrated Telecommunication Construction',
                s1Desc:
                    'PT Indojar Mulia Abadi provides service for new towers construction based on the location and specifications of customer requests.',
                s2Desc:
                    'PT Indojar Mulia Abadi provides installation services for additional equipment and strengthening of existing towers.',
                s3Desc:
                    'PT Indojar Mulia Abadi provides civil works services for the addition of telecommunications operator providers.',
            },

            projects: {
                tag: 'OUR PROJECTS',
                title: 'Selected Executed Projects',
                subtitle:
                    'Demonstrated execution capability across multiple provinces, fully verified by partner supervisory consultants.',
                b2sTab: 'B2S SACME Projects (New Towers)',
                strTab: 'Tower Strengthening Projects',
                thSite: 'Site Identifier / Name',
                thCity: 'City / Regency',
                thProvince: 'Province',
                thScope: 'Scope of Work',
            },

            clients: {
                tag: 'OUR CLIENTS',
                title: 'Trusted by Partner Operators & Providers',
            },

            contact: {
                tag: 'CONTACT US',
                title: 'Connect with Our Engineering Team',
                officeHead: 'Headquarters',
                officeAddr:
                    'DBS Bank Tower 28th Fl, Ciputra World One, Jl. Prof. Dr. Satrio Kav. 3-5, Jakarta 12940',
                mgmtHead: 'Management & Direct Inquiry',
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
        <div
            className="
                min-h-screen
                bg-slate-50
                text-slate-900
                transition-colors
                duration-300
                dark:bg-[#070c18]
                dark:text-slate-100
            "
        >
            <Head title="PT Indojar Mulia Abadi" />

            <Navbar
                auth={auth}
                lang={lang}
                setLang={setLang}
                isDark={isDark}
                setIsDark={setIsDark}
                t={currentDict}
            />

            {/* Lapisan 2: Hero */}
            <HeroWelcome />

            {/* Lapisan 3: About */}
            <AboutWelcome t={currentDict} />

            {/* Lapisan 4 & 5 */}
            <VisionMissionServices t={currentDict} />

            {/* Lapisan 6, 7 & 8 */}
            <ProjectsCtaFooter
                auth={auth}
                t={currentDict}
            />
        </div>
    );
}