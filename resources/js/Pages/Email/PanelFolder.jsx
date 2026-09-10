import React from 'react';
import { Link } from '@inertiajs/react';
import { Inbox as InboxIcon, Send, Mail, Check } from 'lucide-react';

export default function PanelFolder({ 
    mode, 
    unreadCount = 0, 
    selectedAccount = 'ALL', 
    onSelectAccount 
}) {
    const accountList = [
        { label: 'Semua Akun', sublabel: 'Semua alamat email', value: 'ALL' },
        { label: 'Admin Utama', sublabel: 'admin@indojar.com', value: 'admin@indojar.com' },
        { label: 'Finance', sublabel: 'finance@indojar.com', value: 'finance@indojar.com' },
        { label: 'Layanan & Support', sublabel: 'support@indojar.com', value: 'support@indojar.com' },
        { label: 'Project Management', sublabel: 'project@indojar.com', value: 'project@indojar.com' },
        { label: 'AriPraba', sublabel: 'aripraba@indojar.com', value: 'aripraba@indojar.com' },
        { label: 'Ikhsan', sublabel: 'ikhsan@indojar.com', value: 'ikhsan@indojar.com' },
    ];

    return (
        <div className="hidden lg:block md:col-span-2 p-2.5 space-y-5 bg-slate-50/80 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800 h-full select-none">
            {/* SECTION 1: FOLDER UTAMA */}
            <div>
                <div className="px-2.5 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Folder Email
                </div>

                <nav className="space-y-0.5">
                    <Link
                        href={route('emails.inbox')}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                            mode === 'inbox'
                                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold shadow-2xs border border-slate-200/80 dark:border-slate-700/80'
                                : 'text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <InboxIcon className={`w-4 h-4 shrink-0 ${mode === 'inbox' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                            <span>Kotak Masuk</span>
                        </div>

                        {unreadCount > 0 && (
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-md ${
                                mode === 'inbox'
                                    ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                                {unreadCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        href={route('emails.index')}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                            mode === 'outbox'
                                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold shadow-2xs border border-slate-200/80 dark:border-slate-700/80'
                                : 'text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                    >
                        <div className="flex items-center gap-2.5">
                            <Send className={`w-4 h-4 shrink-0 ${mode === 'outbox' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                            <span>Terkirim</span>
                        </div>
                    </Link>
                </nav>
            </div>

            {/* SECTION 2: FILTER AKUN / ALIAS EMAIL */}
            <div>
                <div className="px-2.5 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Akun Email
                </div>

                <div className="space-y-1">
                    {accountList.map((acc) => {
                        const isActive = selectedAccount === acc.value;

                        return (
                            <button
                                key={acc.value}
                                type="button"
                                onClick={() => onSelectAccount && onSelectAccount(acc.value)}
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                                    isActive
                                        ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                                        : 'text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200/40 dark:hover:bg-slate-800/40'
                                }`}
                            >
                                <div className="flex items-start gap-2.5 min-w-0 text-left">
                                    <Mail className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                                    <div className="flex flex-col min-w-0">
                                        <span className="truncate leading-tight text-xs font-semibold">
                                            {acc.label}
                                        </span>
                                        <span className={`text-[8px] font-mono truncate leading-tight mt-0.5 ${
                                            isActive 
                                                ? 'text-blue-600 dark:text-blue-400' 
                                                : 'text-slate-400 dark:text-slate-500'
                                        }`}>
                                            {acc.sublabel}
                                        </span>
                                    </div>
                                </div>

                                {isActive && (
                                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ml-1" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}