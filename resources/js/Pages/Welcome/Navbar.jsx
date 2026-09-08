// resources/js/Pages/Welcome/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import ApplicationLogo from '@/components/ApplicationLogo';

export default function Navbar({ lang, setLang, t }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: t.nav.about, href: '/tentang-kami' },
        { label: t.nav.services, href: '/layanan' },
        { label: t.nav.projects, href: '/proyek' },
        { label: t.nav.contact, href: '/kontak' },
    ];

    const isActive = (href) => {
        if (href === '/') {
            return url === '/';
        }

        return url.startsWith(href);
    };

    const closeMobile = () => {
        setMobileOpen(false);
    };

    return (
        <header
            className={`
                fixed inset-x-0 top-0 z-50
                transition-all duration-500
                ${
                    scrolled
                        ? 'border-b border-white/10 bg-[#031a14]/95 backdrop-blur-xl'
                        : 'border-transparent bg-[#031a14]/10'
                }
            `}
        >
            <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMobile}
                    className="
                        relative
                        z-10
                        shrink-0
                        transition-transform
                        duration-300
                        hover:scale-[0.98]
                    "
                >
                    <ApplicationLogo variant="navbar" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    relative
                                    py-2
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.16em]
                                    transition-colors
                                    duration-300
                                    ${
                                        active
                                            ? 'text-white'
                                            : 'text-white/65 hover:text-white'
                                    }
                                    after:absolute
                                    after:bottom-0
                                    after:left-0
                                    after:h-px
                                    after:bg-[#d5ad59]
                                    after:transition-all
                                    ${
                                        active
                                            ? 'after:w-full'
                                            : 'after:w-0 hover:after:w-full'
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Controls */}
                <div className="hidden items-center gap-5 lg:flex">
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
                                            ? 'text-[#d5ad59]'
                                            : 'text-white/40 hover:text-white/80'
                                    }
                                `}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
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
                        transition-colors
                        hover:border-white/40
                        hover:bg-white/5
                        lg:hidden
                    "
                    aria-label="Toggle navigation"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`
                    overflow-hidden
                    border-t
                    border-white/10
                    bg-[#031a14]/98
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    lg:hidden
                    ${
                        mobileOpen
                            ? 'max-h-[520px] opacity-100'
                            : 'max-h-0 opacity-0'
                    }
                `}
            >
                <nav className="flex flex-col px-6 py-5">
                    {navItems.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobile}
                                className={`
                                    border-b
                                    border-white/10
                                    py-4
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.15em]
                                    transition-colors
                                    ${
                                        active
                                            ? 'text-[#d5ad59]'
                                            : 'text-white/70 hover:text-white'
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="flex gap-4 pt-5">
                        <button
                            type="button"
                            onClick={() => setLang('id')}
                            className={`
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-widest
                                ${
                                    lang === 'id'
                                        ? 'text-[#d5ad59]'
                                        : 'text-white/40 hover:text-white/70'
                                }
                            `}
                        >
                            ID
                        </button>

                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            className={`
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-widest
                                ${
                                    lang === 'en'
                                        ? 'text-[#d5ad59]'
                                        : 'text-white/40 hover:text-white/70'
                                }
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