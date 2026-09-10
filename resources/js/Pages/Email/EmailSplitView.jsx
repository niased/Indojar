import React, { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import PanelFolder from './PanelFolder';
import PanelEmailList from './PanelEmailList';
import PanelEmailDetail from './PanelEmailDetail';
import { Inbox as InboxIcon, Send, Search, X, Plus } from 'lucide-react';

export default function EmailSplitView({
    dataEmails,
    filters,
    onDeleteRow,
    onSearch,
    mode = 'inbox',
    onOpenCreateModal
}) {
    const emailsList = dataEmails?.data || [];
    
    const [selectedThread, setSelectedThread] = useState(null);
    const [isReplyMode, setIsReplyMode] = useState(false);
    const [isForwardMode, setIsForwardMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    const replyForm = useForm({
        sender: 'admin@indojar.com',
        recipient: '',
        subject: '',
        body: '',
    });

    const senderOptions = [
        { label: 'Admin Utama (admin@indojar.com)', value: 'admin@indojar.com' },
        { label: 'Informasi General (info@indojar.com)', value: 'info@indojar.com' },
        { label: 'Layanan & Support (support@indojar.com)', value: 'support@indojar.com' },
        { label: 'Project Management (project@indojar.com)', value: 'project@indojar.com' },
    ];

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return '-';
            return d.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return '-';
        }
    };

    useEffect(() => {
        if (!selectedThread) return;

        const currentThreadKey = selectedThread.id;
        
        const remainingEmails = emailsList.filter((email) => {
            const normSubject = (email.subject || '').replace(/^Re:\s*/i, '').replace(/^Fwd:\s*/i, '').trim().toLowerCase();
            const senderKey = mode === 'inbox' ? (email.from_email || '').toLowerCase() : (email.recipient || '').toLowerCase();
            return `${senderKey}_${normSubject}` === currentThreadKey;
        });

        if (remainingEmails.length === 0) {
            setSelectedThread(null);
        } else {
            setSelectedThread((prev) => ({
                ...prev,
                emails: remainingEmails,
                latestEmail: remainingEmails[remainingEmails.length - 1] || remainingEmails[0],
            }));
        }
    }, [dataEmails]);

    const handleSelectThread = (thread) => {
        setSelectedThread(thread);
        setIsReplyMode(false);
        setIsForwardMode(false);

        if (mode === 'inbox' && thread) {
            thread.emails.forEach((emailItem) => {
                if (!emailItem.is_read) {
                    emailItem.is_read = true;
                    router.patch(`/emails/inbound/${emailItem.id}/read`, {}, {
                        preserveScroll: true,
                        preserveState: true,
                    });
                }
            });
            thread.hasUnread = false;
        }
    };

    // TOGGLE FAVORIT (BINTANG)
    const handleToggleFavorite = (emailId) => {
        if (!emailId) return;
        router.patch(route('emails.inbound.favorite', emailId), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // BLOKIR PENGIRIM
    const handleBlockSender = (senderEmail) => {
        if (!senderEmail) return;
        if (window.confirm(`Apakah Anda yakin ingin memblokir dan menghapus semua pesan dari ${senderEmail}?`)) {
            router.post(route('emails.inbound.block'), { email: senderEmail }, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const handleStartReply = () => {
        if (!selectedThread?.latestEmail) return;
        const latest = selectedThread.latestEmail;

        replyForm.setData({
            sender: latest.to_email || 'admin@indojar.com',
            recipient: latest.from_email,
            subject: latest.subject?.startsWith('Re:') ? latest.subject : `Re: ${latest.subject || ''}`,
            body: '',
        });
        setIsForwardMode(false);
        setIsReplyMode(true);
    };

    const handleStartForward = (emailItem) => {
        const targetEmail = emailItem || selectedThread?.latestEmail;
        if (!targetEmail) return;

        replyForm.setData({
            sender: targetEmail.to_email || 'admin@indojar.com',
            recipient: '', 
            subject: targetEmail.subject?.startsWith('Fwd:') ? targetEmail.subject : `Fwd: ${targetEmail.subject || ''}`,
            body: `\n\n---------- Pesan yang Diteruskan ----------\nDari: ${targetEmail.sender_name || targetEmail.from_email} <${targetEmail.from_email}>\nTanggal: ${formatDate(targetEmail.created_at)}\nSubjek: ${targetEmail.subject || ''}\nKepada: ${targetEmail.to_email || ''}\n\n${targetEmail.text_body || ''}`,
        });
        setIsForwardMode(true);
        setIsReplyMode(true);
    };

    const handleSendReply = (e) => {
        e.preventDefault();
        replyForm.post(route('emails.send'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsReplyMode(false);
                setIsForwardMode(false);
                replyForm.reset();
            },
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchTerm);
    };

    const unreadCount = mode === 'inbox' ? emailsList.filter((e) => !e.is_read).length : 0;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden min-h-[680px] flex flex-col">
            
            {/* TOOLBAR ATAS */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center gap-2">
                        {mode === 'inbox' ? (
                            <InboxIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                            <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        )}
                        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                            {mode === 'inbox' ? 'Kotak Masuk' : 'Riwayat Terkirim'}
                        </h2>
                    </div>

                    {mode === 'outbox' && (
                        <button
                            type="button"
                            onClick={onOpenCreateModal}
                            className="sm:hidden px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Kirim</span>
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={mode === 'inbox' ? "Cari pengirim, subjek..." : "Cari penerima, subjek..."}
                            className="w-full pl-8 pr-8 py-1.5 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm('');
                                    if (onSearch) onSearch('');
                                }}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </form>

                    {mode === 'outbox' && (
                        <button
                            type="button"
                            onClick={onOpenCreateModal}
                            className="hidden sm:flex px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Kirim Email Baru</span>
                        </button>
                    )}
                </div>
            </div>

            {/* AREA UTAMA 3 PANEL */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                <PanelFolder mode={mode} unreadCount={unreadCount} />

                <PanelEmailList
                    emailsList={emailsList}
                    selectedThread={selectedThread}
                    onSelectThread={handleSelectThread}
                    mode={mode}
                    onDeleteThread={(thread, e) => {
                        if (onDeleteRow && thread.latestEmail) {
                            onDeleteRow(thread.latestEmail.id, e);
                        }
                    }}
                />

                <PanelEmailDetail
                    selectedThread={selectedThread}
                    onDeselectThread={() => setSelectedThread(null)}
                    mode={mode}
                    onDeleteEmail={onDeleteRow}
                    isReplyMode={isReplyMode}
                    isForwardMode={isForwardMode}
                    setIsReplyMode={setIsReplyMode}
                    handleStartReply={handleStartReply}
                    handleStartForward={handleStartForward}
                    handleSendReply={handleSendReply}
                    handleToggleFavorite={handleToggleFavorite}
                    handleBlockSender={handleBlockSender}
                    replyForm={replyForm}
                    senderOptions={senderOptions}
                    formatDate={formatDate}
                />
            </div>
        </div>
    );
}