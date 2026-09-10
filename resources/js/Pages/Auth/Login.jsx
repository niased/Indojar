import React, { useState, useEffect } from 'react';
import InputError from '@/components/InputError';
import ApplicationLogo from '@/components/ApplicationLogo';
import LoginAnimation from '@/components/LoginAnimation';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
    Lock, 
    Mail, 
    Eye, 
    EyeOff,
    Wifi,
    BatteryCharging,
    Building2,
    HardHat,
    BarChart3,
    Database,
    Users,
    Volume2,
    Search,
    Image as ImageIcon,
    LayoutGrid
} from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
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

    // Rotasi wallpaper otomatis
    useEffect(() => {
        const bgTimer = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % 3);
        }, 7000);
        return () => clearInterval(bgTimer);
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    // Modul shortcut aplikasi
    const desktopApps = [
        { label: 'Master Proyek', icon: Building2, color: 'text-blue-400' },
        { label: 'Pekerjaan WBS', icon: HardHat, color: 'text-amber-400' },
        { label: 'Master Data', icon: Database, color: 'text-purple-400' },
        { label: 'Laporan Site', icon: BarChart3, color: 'text-emerald-400' },
        { label: 'Kotak Email', icon: Mail, color: 'text-sky-400' },
        { label: 'Kelola User', icon: Users, color: 'text-rose-400' },
    ];

    return (
        <div className="dark min-h-screen w-full bg-slate-950 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Login - PT Indojar Mulia Abadi" />

            <style>{`
                input::-ms-reveal,
                input::-ms-clear {
                    display: none !important;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* LIGHTING AMBIENT BACKGROUND */}
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
                {/* A. SCREEN FRAME */}
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
                            
                            {/* KOMPONEN ANIMASI (KOMPONEN DENGAN C KECIL) */}
                            <LoginAnimation bgIndex={bgIndex} />

                            {/* SHORTCUT DESKTOP ICONS (GRID STRICT 4 BARIS PER KOLOM) */}
                            <div className="hidden lg:grid grid-flow-col grid-rows-4 gap-x-5 gap-y-3 z-10 select-none absolute top-5 left-5 xl:left-7 py-1 no-scrollbar">
                                {desktopApps.map((app, i) => {
                                    const IconComp = app.icon;
                                    return (
                                        <div 
                                            key={i} 
                                            className="flex flex-col items-center gap-1 group cursor-pointer w-16"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md backdrop-blur-sm">
                                                <IconComp className={`w-5 h-5 ${app.color} group-hover:text-white transition-colors`} />
                                            </div>
                                            <span className="text-[10px] text-slate-300 font-medium group-hover:text-white text-center drop-shadow-md leading-tight">
                                                {app.label}
                                            </span>
                                        </div>
                                    );
                                })}
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
                                        title={`Ganti tema grafik ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* FORM LOGIN */}
                            <div className="relative z-10 w-full max-w-sm ml-auto my-auto py-2 pr-1 sm:pr-2">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
                                        Selamat Datang
                                    </h1>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Masuk dengan email dan password kamu untuk melanjutkan.
                                    </p>
                                </div>

                                {status && (
                                    <div className="mt-4 text-xs font-medium text-amber-300 bg-amber-950/60 p-3 rounded-xl border border-amber-800/80 backdrop-blur-sm">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-4 mt-5">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-xs font-medium text-slate-300">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                autoFocus
                                                placeholder="nama@indojar.com"
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="pl-10 h-10 text-xs rounded-xl bg-slate-900/90 border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="password" className="text-xs font-medium text-slate-300">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={data.password}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="pl-10 pr-10 h-10 text-xs rounded-xl bg-slate-900/90 border-slate-700/80 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors z-10 cursor-pointer p-0.5"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center justify-between pt-1">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="remember"
                                                checked={data.remember}
                                                onCheckedChange={(checked) => setData('remember', !!checked)}
                                                className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 cursor-pointer"
                                            />
                                            <Label htmlFor="remember" className="text-xs text-slate-300 cursor-pointer font-normal select-none">
                                                Ingat saya
                                            </Label>
                                        </div>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                                            >
                                                Lupa password?
                                            </Link>
                                        )}
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full h-10 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-[0.99] mt-2 cursor-pointer"
                                    >
                                        {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                                    </Button>
                                </form>

                                <div className="pt-4 border-t border-slate-800/80 mt-5">
                                    <p className="text-[11px] text-slate-400">
                                        Ada masalah saat login? Hubungi <span className="font-semibold text-slate-200">Administrator</span>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* WINDOWS BOTTOM TASKBAR */}
                        <div className="w-full h-10 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-4 flex items-center justify-between text-xs text-slate-300 select-none z-30">
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-xs transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer">
                                    <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Start</span>
                                </button>

                                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-400 text-[11px] w-36">
                                    <Search className="w-3 h-3 text-slate-500" />
                                    <span>Cari modul...</span>
                                </div>

                                <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Master Proyek">
                                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                                    </div>
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Pekerjaan WBS">
                                        <HardHat className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Master Data">
                                        <Database className="w-3.5 h-3.5 text-purple-400" />
                                    </div>
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Laporan Site">
                                        <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Kotak Email">
                                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                                    </div>
                                    <div className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Kelola User">
                                        <Users className="w-3.5 h-3.5 text-rose-400" />
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