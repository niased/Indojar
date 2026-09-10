import React, { useState, useEffect } from 'react';
import ApplicationLogo from '@/components/ApplicationLogo';
import LoginAnimation from '@/components/LoginAnimation';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { 
    Wifi, 
    BatteryCharging, 
    Mail, 
    Users, 
    Radio, 
    Volume2, 
    Search, 
    Image as ImageIcon, 
    LayoutGrid,
    ArrowLeft
} from 'lucide-react';

export default function ForgotPassword() {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [bgIndex, setBgIndex] = useState(0);

    // Jam & tanggal real-time
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
            setCurrentDate(now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Pergantian wallpaper animasi otomatis
    useEffect(() => {
        const bgTimer = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % 3);
        }, 7000);
        return () => clearInterval(bgTimer);
    }, []);

    return (
        <div className="dark min-h-screen w-full bg-slate-950 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Lupa Password - System Telecommunication" />

            {/* AMBIENT LIGHTING BACKGROUND */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none animate-pulse duration-[5000ms]" />
            <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

            {/* 1. TOP HEADER */}
            <header className="w-full max-w-4xl mx-auto flex items-center justify-start z-30 mb-2 sm:mb-4">
                <Link 
                    href="/" 
                    className="flex items-center gap-3 transition-transform duration-200 hover:scale-105 cursor-pointer select-none"
                    title="Kembali ke Halaman Utama"
                >
                    <ApplicationLogo 
                        className="h-9 sm:h-10 w-auto" 
                        textClassName="text-white"
                        showTextOnMobile={true}
                    />
                </Link>
            </header>

            {/* 2. LAPTOP MOCKUP CONTAINER */}
            <div className="w-full max-w-4xl relative z-10 my-auto">
                {/* A. SCREEN FRAME (BEZEL) */}
                <div className="bg-slate-900 border border-slate-700/80 rounded-t-2xl p-2.5 sm:p-3.5 shadow-2xl relative z-20">
                    {/* Webcam Notch */}
                    <div className="flex justify-center items-center pb-2 pt-0.5">
                        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                            <div className="w-2 h-2 rounded-full bg-slate-800" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                    </div>

                    {/* B. INNER DISPLAY */}
                    <div className="relative w-full min-h-[480px] sm:min-h-[520px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex flex-col justify-between">
                        {/* WORKSPACE */}
                        <div className="relative flex-1 py-6 px-6 sm:px-10 md:px-12 flex items-center justify-between overflow-hidden">
                            
                            {/* ANIMASI VEKTOR LATAR BELAKANG */}
                            <LoginAnimation bgIndex={bgIndex} />

                            {/* SHORTCUT DESKTOP ICONS (PERSIS HALAMAN LOGIN) */}
                            <div className="hidden lg:flex flex-col gap-4 z-10 select-none absolute top-6 left-6 xl:left-8">
                                <div className="flex flex-col items-center gap-1 group cursor-pointer w-16">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-sky-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md backdrop-blur-sm">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-slate-300 font-medium group-hover:text-white text-center drop-shadow-md">Kotak Email</span>
                                </div>

                                <div className="flex flex-col items-center gap-1 group cursor-pointer w-16">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-rose-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md backdrop-blur-sm">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-slate-300 font-medium group-hover:text-white text-center drop-shadow-md">Kelola User</span>
                                </div>

                                <div className="flex flex-col items-center gap-1 group cursor-pointer w-16">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md backdrop-blur-sm">
                                        <Radio className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-slate-300 font-medium group-hover:text-white text-center drop-shadow-md">Kelola Site</span>
                                </div>
                            </div>

                            {/* WALLPAPER SWITCHER */}
                            <div className="absolute top-5 right-6 sm:right-8 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800 shadow-lg">
                                <ImageIcon className="w-3 h-3 text-slate-400 mr-1" />
                                {[0, 1, 2].map((idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setBgIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                            bgIndex === idx 
                                                ? (idx === 0 ? 'bg-blue-500 w-4' : idx === 1 ? 'bg-emerald-400 w-4' : 'bg-sky-400 w-4')
                                                : 'bg-slate-700 hover:bg-slate-500'
                                        }`}
                                        title={`Ganti grafik tema ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* INFORMASI LUPA PASSWORD */}
                            <div className="relative z-10 w-full max-w-sm ml-auto my-auto py-2 pr-1 sm:pr-2">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
                                        Lupa Password?
                                    </h1>
                                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                        Silakan hubungi Administrator PT Indojar Mulia Abadi untuk melakukan reset password akun Anda.
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <Link href={route('login')} className="block w-full">
                                        <Button 
                                            type="button" 
                                            className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            <span>Kembali ke Halaman Login</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* WINDOWS BOTTOM TASKBAR (PERSIS HALAMAN LOGIN) */}
                        <div className="w-full h-10 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-4 flex items-center justify-between text-xs text-slate-300 select-none z-30">
                            <div className="flex items-center gap-2">
                                <Link href={route('login')}>
                                    <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer">
                                        <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Start</span>
                                    </button>
                                </Link>

                                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-400 text-[11px] w-36">
                                    <Search className="w-3 h-3 text-slate-500" />
                                    <span>Cari aplikasi...</span>
                                </div>

                                <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Kotak Email">
                                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                                    </div>
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Kelola User">
                                        <Users className="w-3.5 h-3.5 text-rose-400" />
                                    </div>
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Kelola Site">
                                        <Radio className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                </div>
                            </div>

                            {/* SYSTEM TRAY KANAN */}
                            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                                <Wifi className="w-3.5 h-3.5 text-slate-300" />
                                <Volume2 className="w-3.5 h-3.5 text-slate-300" />
                                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                                
                                <div className="flex flex-col items-end text-[10px] leading-tight text-slate-200 border-l border-slate-800 pl-2.5">
                                    <span className="font-semibold">{currentTime || '12:00'}</span>
                                    <span className="text-slate-500 text-[9px]">{currentDate || '10/09/2026'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* C. LAPTOP HINGE */}
                <div className="w-[96%] mx-auto h-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-x border-slate-700/60 relative z-20" />

                {/* D. LAPTOP BASE DECK */}
                <div className="relative z-10 -mt-0.5">
                    <div className="w-[108%] -ml-[4%] h-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-md border-t border-slate-500/60 shadow-md relative z-20 flex items-start justify-center">
                        <div className="w-24 h-1.5 bg-slate-950 rounded-b-md border-x border-b border-slate-700/70" />
                    </div>
                    <div 
                        className="w-[114%] -ml-[7%] h-20 bg-gradient-to-b from-black/40 via-black/15 to-transparent blur-md relative z-0 -mt-1 pointer-events-none opacity-40"
                        style={{
                            clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)'
                        }}
                    />
                </div>
            </div>

            {/* 3. FOOTER */}
            <footer className="w-full text-center py-2 text-[11px] text-slate-600 font-medium relative z-10">
                &copy; {new Date().getFullYear()} PT Indojar Mulia Abadi. All rights reserved.
            </footer>
        </div>
    );
}