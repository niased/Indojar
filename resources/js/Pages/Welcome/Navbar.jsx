import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/components/ApplicationLogo';
import { Sun, Moon, ArrowRight } from 'lucide-react';

export default function Navbar({ auth, lang, setLang, isDark, setIsDark, t }) {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#070c18]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
                <Link href="/" className="focus:outline-none transition-transform active:scale-95">
                    <ApplicationLogo />
                </Link>

                <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <a href="#tentang" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.about}</a>
                    <a href="#layanan" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.services}</a>
                    <a href="#portofolio" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.projects}</a>
                    <a href="#klien" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.clients}</a>
                    <a href="#kontak" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.contact}</a>
                </nav>

                <div className="flex items-center gap-3">
                    {/* Switcher Bahasa ID / EN */}
                    <div className="flex items-center rounded-xl p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
                        <button
                            type="button"
                            onClick={() => setLang('id')}
                            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                lang === 'id' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500'
                            }`}
                        >
                            ID
                        </button>
                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                lang === 'en' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500'
                            }`}
                        >
                            EN
                        </button>
                    </div>

                    {/* Switcher Tema Terang / Gelap */}
                    <button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 cursor-pointer"
                        title="Ganti Tema"
                    >
                        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                    </button>
                </div>
            </div>
        </header>
    );
}