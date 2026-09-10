import React, { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { 
    Mail, 
    CheckCircle2, 
    XCircle, 
    Trash2, 
    ArrowUpDown, 
    X,
    Star,
    RotateCw
} from 'lucide-react';

export default function PanelEmailList({
    emailsList = [],
    selectedThread,
    onSelectThread,
    mode = 'inbox',
    onDeleteThread,
}) {
    const [statusFilter, setStatusFilter] = useState('ALL'); 
    const [sortOrder, setSortOrder] = useState('newest'); 
    const [selectedDate, setSelectedDate] = useState(''); 
    const [isRefreshing, setIsRefreshing] = useState(false);

    const cleanText = (str) => {
        if (!str) return '';
        return str.replace(/"/g, '').trim();
    };

    const formatSmartDate = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return '-';

            const now = new Date();
            const isToday = d.toDateString() === now.toDateString();

            if (isToday) {
                return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            }

            return d.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
            });
        } catch {
            return '-';
        }
    };

    // Fungsi Refresh Data Email via Inertia Reload
    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            preserveScroll: true,
            onFinish: () => setIsRefreshing(false),
        });
    };

    const threadedList = useMemo(() => {
        const map = new Map();

        emailsList.forEach((email) => {
            const normSubject = (email.subject || '')
                .replace(/^Re:\s*/i, '')
                .replace(/^Fwd:\s*/i, '')
                .trim()
                .toLowerCase();

            const senderKey = mode === 'inbox' 
                ? (email.from_email || '').toLowerCase()
                : (email.recipient || '').toLowerCase();

            const threadKey = `${senderKey}_${normSubject}`;

            if (!map.has(threadKey)) {
                map.set(threadKey, {
                    id: threadKey,
                    latestEmail: email,
                    emails: [email],
                    hasUnread: !email.is_read,
                    isStarred: !!email.is_starred,
                });
            } else {
                const thread = map.get(threadKey);
                thread.emails.push(email);
                if (!email.is_read) thread.hasUnread = true;
                if (email.is_starred) thread.isStarred = true;

                if (new Date(email.created_at) > new Date(thread.latestEmail.created_at)) {
                    thread.latestEmail = email;
                }
            }
        });

        return Array.from(map.values());
    }, [emailsList, mode]);

    const processedThreads = useMemo(() => {
        let list = [...threadedList];

        if (statusFilter === 'UNREAD') {
            list = list.filter((t) => t.hasUnread);
        } else if (statusFilter === 'READ') {
            list = list.filter((t) => !t.hasUnread);
        }

        if (selectedDate) {
            list = list.filter((t) => {
                if (!t.latestEmail.created_at) return false;
                const emailDate = new Date(t.latestEmail.created_at).toISOString().split('T')[0];
                return emailDate === selectedDate;
            });
        }

        list.sort((a, b) => {
            const dateA = new Date(a.latestEmail.created_at).getTime();
            const dateB = new Date(b.latestEmail.created_at).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return list;
    }, [threadedList, statusFilter, sortOrder, selectedDate]);

    const groupedThreads = useMemo(() => {
        const groups = {
            'Hari Ini': [],
            'Kemarin': [],
            'Minggu Ini': [],
            'Bulan Ini': [],
            'Lebih Lama': [],
        };

        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);

        const startOfWeek = new Date(startOfToday);
        startOfWeek.setDate(startOfWeek.getDate() - 7);

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        processedThreads.forEach((thread) => {
            const emailDate = new Date(thread.latestEmail.created_at);

            if (emailDate >= startOfToday) {
                groups['Hari Ini'].push(thread);
            } else if (emailDate >= startOfYesterday) {
                groups['Kemarin'].push(thread);
            } else if (emailDate >= startOfWeek) {
                groups['Minggu Ini'].push(thread);
            } else if (emailDate >= startOfMonth) {
                groups['Bulan Ini'].push(thread);
            } else {
                groups['Lebih Lama'].push(thread);
            }
        });

        return Object.entries(groups).filter(([_, items]) => items.length > 0);
    }, [processedThreads]);

    return (
        <div className={`${selectedThread && 'hidden md:block'} md:col-span-5 lg:col-span-4 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full`}>
            
            {/* SUB-HEADER TOOLBAR */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-md text-xs">
                    <button
                        type="button"
                        onClick={() => setStatusFilter('ALL')}
                        className={`px-2 py-0.5 rounded transition cursor-pointer font-semibold ${
                            statusFilter === 'ALL'
                                ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        Semua
                    </button>
                    {mode === 'inbox' && (
                        <button
                            type="button"
                            onClick={() => setStatusFilter('UNREAD')}
                            className={`px-2 py-0.5 rounded transition cursor-pointer font-semibold ${
                                statusFilter === 'UNREAD'
                                    ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-xs'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            Unread
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-1.5">
                    {/* INPUT KALENDER (Perbaikan Ikon Dark Mode via color-scheme:dark) */}
                    <div className="relative flex items-center">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="text-[11px] font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 outline-none focus:border-blue-500 cursor-pointer dark:[color-scheme:dark]"
                        />
                        {selectedDate && (
                            <button
                                type="button"
                                onClick={() => setSelectedDate('')}
                                className="ml-0.5 text-slate-400 hover:text-rose-500 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* TOMBOL REFRESH */}
                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 cursor-pointer transition"
                        title="Refresh Pesan"
                    >
                        <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
                    </button>

                    {/* TOMBOL SORTING */}
                    <button
                        type="button"
                        onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                        className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 cursor-pointer"
                        title={sortOrder === 'newest' ? 'Urutan: Terbaru' : 'Urutan: Terlama'}
                    >
                        <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* DAFTAR PERCAKAPAN */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/60 overflow-y-auto max-h-[610px] flex-1">
                {groupedThreads.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                        <Mail className="w-7 h-7 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                        <p>Tidak ada percakapan ditemukan.</p>
                    </div>
                ) : (
                    groupedThreads.map(([groupName, items]) => (
                        <div key={groupName}>
                            <div className="sticky top-0 bg-slate-100/90 dark:bg-slate-800/90 px-3 py-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-y border-slate-200/60 dark:border-slate-800 z-10 flex items-center justify-between">
                                <span>{groupName}</span>
                                <span className="font-mono text-[9px] opacity-75">{items.length}</span>
                            </div>

                            {items.map((thread) => {
                                const latest = thread.latestEmail;
                                const isSelected = selectedThread?.id === thread.id;
                                const isUnread = mode === 'inbox' && thread.hasUnread;
                                const isStarred = thread.isStarred;
                                const msgCount = thread.emails.length;

                                const senderName = cleanText(latest.sender_name);
                                const senderEmail = cleanText(latest.from_email);

                                return (
                                    <div
                                        key={thread.id}
                                        onClick={() => onSelectThread(thread)}
                                        className={`group p-3 transition cursor-pointer relative flex flex-col justify-between space-y-1 border-l-2 ${
                                            isSelected
                                                ? 'bg-blue-50/70 dark:bg-blue-950/40 border-l-blue-600'
                                                : isUnread
                                                ? 'bg-slate-50 dark:bg-slate-800/40 border-l-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                : 'bg-white dark:bg-slate-900 border-l-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                {isUnread && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                                )}
                                                
                                                {isStarred && (
                                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                                                )}

                                                <span className={`text-xs truncate ${isUnread ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>
                                                    {mode === 'inbox' ? (senderName || senderEmail) : latest.recipient}
                                                </span>
                                                {msgCount > 1 && (
                                                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-bold">
                                                        {msgCount}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0">
                                                <span className="group-hover:hidden text-[10px] font-mono text-slate-400">
                                                    {formatSmartDate(latest.created_at)}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDeleteThread && onDeleteThread(thread, e);
                                                    }}
                                                    className="hidden group-hover:flex p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                                                    title="Hapus Percakapan"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className={`text-xs truncate ${isUnread ? 'font-semibold text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {latest.subject || '(Tanpa Subjek)'}
                                        </div>

                                        {mode === 'inbox' ? (
                                            <p className="text-[11px] text-slate-400 line-clamp-1">
                                                {latest.text_body || 'Klik untuk membaca...'}
                                            </p>
                                        ) : (
                                            <div className="flex items-center gap-1 text-[10px] font-mono pt-0.5">
                                                {latest.status === 'sent' ? (
                                                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                                                        <CheckCircle2 className="w-3 h-3" /> Terkirim
                                                    </span>
                                                ) : (
                                                    <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-semibold">
                                                        <XCircle className="w-3 h-3" /> Gagal
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}