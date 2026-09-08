import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Mail, Phone } from 'lucide-react';

import Navbar from './Navbar';
import PageHero from './PageHero';
import ContactInfo from './Kontak/ContactInfo';
import ContactForm from './Kontak/ContactForm';
import FooterWelcome from './FooterWelcome';

export default function Contant({ auth }) {
    const [lang, setLang] = useState('id');

    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : false;
    });

    const toggleTheme = () => {
        setIsDark((value) => {
            const next = !value;

            if (typeof document !== 'undefined') {
                document.documentElement.classList.toggle('dark', next);
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', next ? 'dark' : 'light');
            }

            return next;
        });
    };

    const content = {
        id: {
            nav: {
                about: 'Tentang Kami',
                services: 'Layanan',
                projects: 'Proyek',
                clients: 'Klien',
                contact: 'Kontak',
            },

            hero: {
                eyebrow: 'HUBUNGI KAMI',
                title: 'Mari Bangun Solusi Infrastruktur Telekomunikasi Bersama.',
                description:
                    'Diskusikan kebutuhan pembangunan menara, strengthening, colocation, CME, maupun pekerjaan pendukung lainnya bersama tim PT Indojar Mulia Abadi.',
            },

            intro: {
                eyebrow: 'KONTAK & INFORMASI',
                title: 'Terhubung langsung dengan tim kami.',
                description:
                    'Untuk kebutuhan kerja sama, permintaan penawaran, konsultasi teknis, maupun pembahasan proyek, silakan gunakan informasi kontak berikut atau kirimkan pesan melalui formulir.',
            },

            office: {
                title: 'Kantor Pusat',
                address:
                    'DBS Bank Tower Lt. 28, Ciputra World One, Jl. Prof. Dr. Satrio Kav. 3-5, Jakarta 12940',
            },

            management: {
                title: 'Manajemen & Kontak Langsung',
                director: 'Direktur Utama',
                name: 'Edy Julianto',
            },

            email: {
                title: 'Email',
                main: 'info@indojar.com',
                secondary: 'edy_juls@yahoo.co.id',
            },

            phone: {
                title: 'Telepon',
                main: '021-29888318',
                secondary: '+62 816-896-973',
            },

            form: {
                eyebrow: 'KIRIM PESAN',
                title: 'Sampaikan kebutuhan proyek Anda.',
                description:
                    'Berikan informasi singkat mengenai kebutuhan atau rencana pekerjaan yang ingin didiskusikan dengan tim kami.',

                name: 'Nama Lengkap',
                company: 'Nama Perusahaan',
                email: 'Alamat Email',
                phone: 'Nomor Telepon',
                subject: 'Subjek',
                message: 'Pesan',

                subjectPlaceholder:
                    'Contoh: Permintaan Penawaran Proyek',

                messagePlaceholder:
                    'Tuliskan kebutuhan proyek, lokasi, lingkup pekerjaan, atau informasi lain yang ingin Anda diskusikan...',

                submit: 'Kirim Pertanyaan',
                sending: 'Membuka Email...',
                required: 'Wajib diisi',
            },

            note: {
                title: 'Untuk kebutuhan penawaran proyek',
                text:
                    'Sertakan informasi lokasi, jenis pekerjaan, spesifikasi awal, dan target pelaksanaan agar tim kami dapat memahami kebutuhan Anda dengan lebih baik.',
            },

            success: {
                title: 'Pertanyaan siap dikirim.',
                text:
                    'Aplikasi email Anda akan digunakan untuk melanjutkan pengiriman pesan kepada tim PT Indojar Mulia Abadi.',
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
                eyebrow: 'CONTACT US',
                title: 'Let’s Build Reliable Telecommunication Infrastructure Together.',
                description:
                    'Discuss your requirements for tower construction, strengthening, colocation, CME, or other supporting works with PT Indojar Mulia Abadi.',
            },

            intro: {
                eyebrow: 'CONTACT & INFORMATION',
                title: 'Connect directly with our team.',
                description:
                    'For partnerships, quotations, technical consultations, or project discussions, use the contact information below or send a message through the inquiry form.',
            },

            office: {
                title: 'Head Office',
                address:
                    'DBS Bank Tower 28th Fl, Ciputra World One, Jl. Prof. Dr. Satrio Kav. 3-5, Jakarta 12940',
            },

            management: {
                title: 'Management & Direct Inquiry',
                director: 'Managing Director',
                name: 'Edy Julianto',
            },

            email: {
                title: 'Email',
                main: 'info@indojar.com',
                secondary: 'edy_juls@yahoo.co.id',
            },

            phone: {
                title: 'Phone',
                main: '021-29888318',
                secondary: '+62 816-896-973',
            },

            form: {
                eyebrow: 'SEND AN INQUIRY',
                title: 'Tell us about your project.',
                description:
                    'Provide a brief overview of your requirements or project plans for our team to review.',

                name: 'Full Name',
                company: 'Company Name',
                email: 'Email Address',
                phone: 'Phone Number',
                subject: 'Subject',
                message: 'Message',

                subjectPlaceholder:
                    'Example: Project Quotation Request',

                messagePlaceholder:
                    'Describe your project requirements, location, scope of work, or any other information...',

                submit: 'Send Inquiry',
                sending: 'Opening Email...',
                required: 'Required',
            },

            note: {
                title: 'For project quotation requests',
                text:
                    'Include the project location, work type, initial specifications, and target schedule so our team can understand your requirements more clearly.',
            },

            success: {
                title: 'Your inquiry is ready to send.',
                text:
                    'Your email application will be used to continue sending the message to PT Indojar Mulia Abadi.',
            },
        },
    };

    const t = content[lang];

    return (
        <div
            className={`
                min-h-screen
                transition-colors
                duration-300
                ${
                    isDark
                        ? 'bg-[#031a14] text-white'
                        : 'bg-[#f7f6f1] text-[#10231c]'
                }
            `}
        >
            <Head
                title={
                    lang === 'id'
                        ? 'Kontak | PT Indojar Mulia Abadi'
                        : 'Contact | PT Indojar Mulia Abadi'
                }
            />

            <Navbar
                auth={auth}
                lang={lang}
                setLang={setLang}
                isDark={isDark}
                setIsDark={toggleTheme}
                t={t}
            />

            <main>
                {/* =====================================================
                    PAGE HERO
                ===================================================== */}
                <PageHero
                    eyebrow={t.hero.eyebrow}
                    title={t.hero.title}
                    current={lang === 'id' ? 'Kontak' : 'Contact'}
                />

                {/* =====================================================
                    CONTACT INFO
                ===================================================== */}
                <ContactInfo
                    t={t}
                    lang={lang}
                    isDark={isDark}
                />

                {/* =====================================================
                    CONTACT FORM
                ===================================================== */}
                <ContactForm
                    t={t}
                    lang={lang}
                    isDark={isDark}
                />
            </main>

            <FooterWelcome t={t} />

            {/* =====================================================
                MOBILE CONTACT BAR
            ===================================================== */}
            <div
                className="
                    fixed
                    bottom-4
                    left-4
                    right-4
                    z-40
                    grid
                    grid-cols-2
                    gap-px
                    overflow-hidden
                    border
                    border-white/10
                    bg-[#031a14]
                    shadow-[0_16px_40px_rgba(0,0,0,0.20)]
                    sm:hidden
                "
            >
                <a
                    href="mailto:info@indojar.com"
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-3
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-white/5
                    "
                >
                    <Mail className="h-4 w-4 text-[#d5ad59]" />
                    Email
                </a>

                <a
                    href="tel:02129888318"
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        border-l
                        border-white/10
                        px-4
                        py-3
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-white/5
                    "
                >
                    <Phone className="h-4 w-4 text-[#d5ad59]" />
                    {lang === 'id' ? 'Telepon' : 'Call'}
                </a>
            </div>
        </div>
    );
}