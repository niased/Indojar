// resources/js/Pages/Welcome/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import ApplicationLogo from '@/components/ApplicationLogo';

export default function Navbar({ lang, setLang, isDark, setIsDark, t }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: t.nav.about, href: '#tentang' },
        { label: t.nav.services, href: '#layanan' },
        { label: t.nav.projects, href: '#portofolio' },
        { label: t.nav.clients, href: '#klien' },
        { label: t.nav.contact, href: '#kontak' },
    ];

    return (
        <header
            className={`
                fixed inset-x-0 top-0 z-50
                transition-all duration-500
                ${scrolled
                    ? 'bg-[#031a14]/85 backdrop-blur-xl border-b border-white/10'
                    : 'bg-transparent border-transparent'}
            `}
        >
            <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 lg:px-10">

                {/* Logo */}
                <Link
                    href="/"
                    className="relative z-10 shrink-0 transition-transform duration-300 hover:scale-[0.98]"
                >
                    <ApplicationLogo />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="
                                relative
                                py-2
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-white/70
                                transition-colors
                                duration-300
                                hover:text-white
                                after:absolute
                                after:bottom-0
                                after:left-0
                                after:h-px
                                after:w-0
                                after:bg-amber-400
                                after:transition-all
                                hover:after:w-full
                            "
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Right Controls */}
                <div className="hidden items-center gap-3 lg:flex">

                    {/* Language */}
                    <div className="flex items-center gap-1 border-l border-white/15 pl-5">
                        {['id', 'en'].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setLang(item)}
                                className={`
                                    px-2
                                    py-1
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-widest
                                    transition-colors
                                    ${
                                        lang === item
                                            ? 'text-amber-300'
                                            : 'text-white/40 hover:text-white/80'
                                    }
                                `}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Contact */}
                    <a
                        href="#kontak"
                        className="
                            ml-3
                            border
                            border-white/20
                            px-5
                            py-2.5
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-white
                            transition-all
                            duration-300
                            hover:border-amber-300/60
                            hover:bg-white/5
                        "
                    >
                        Contact
                    </a>

                </div>

                {/* Mobile Button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="
                        relative
                        z-10
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        border
                        border-white/20
                        text-white
                        lg:hidden
                    "
                    aria-label="Toggle navigation"
                >
                    {mobileOpen
                        ? <X className="h-5 w-5" />
                        : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`
                    overflow-hidden
                    border-t
                    border-white/10
                    bg-[#031a14]/95
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    lg:hidden
                    ${mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <nav className="flex flex-col px-6 py-5">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="
                                border-b
                                border-white/10
                                py-4
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.15em]
                                text-white/70
                                transition-colors
                                hover:text-white
                            "
                        >
                            {item.label}
                        </a>
                    ))}

                    <div className="flex gap-4 pt-5">
                        <button
                            type="button"
                            onClick={() => setLang('id')}
                            className={`
                                text-[10px] font-bold uppercase tracking-widest
                                ${lang === 'id' ? 'text-amber-300' : 'text-white/40'}
                            `}
                        >
                            ID
                        </button>

                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            className={`
                                text-[10px] font-bold uppercase tracking-widest
                                ${lang === 'en' ? 'text-amber-300' : 'text-white/40'}
                            `}
                        >
                            EN
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}