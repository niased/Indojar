import React from 'react';
import { Link } from '@inertiajs/react';
import { Inbox as InboxIcon, Send } from 'lucide-react';

export default function PanelFolder({ mode, unreadCount = 0 }) {
    return (
        <div className="hidden lg:block md:col-span-2 p-2.5 space-y-4 bg-slate-50/80 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800 h-full select-none">
            <div>
                <div className="px-2.5 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Folder Email
                </div>

                <nav className="space-y-0.5">
                    {/* KOTAK MASUK */}
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

                    {/* TERKIRIM */}
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
        </div>
    );
}