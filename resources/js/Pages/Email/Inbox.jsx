import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AuthenticatedLayout, { useConfirm } from '@/Layouts/AuthenticatedLayout';
import TabEmail from './TabEmail';
import Modal from '@/components/Modal';
import HybridDropdown from '@/components/HybridDropdown';
import { Inbox as InboxIcon, Send, Trash2, Reply, Clock, User } from 'lucide-react';

export default function EmailInbox({ auth, inboundEmails, filters }) {
    const confirm = useConfirm();
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isReplyMode, setIsReplyMode] = useState(false);

    const senderOptions = [
        { label: 'Admin Utama (admin@indojar.com)', value: 'admin@indojar.com' },
        { label: 'Informasi General (info@indojar.com)', value: 'info@indojar.com' },
        { label: 'Layanan & Support (support@indojar.com)', value: 'support@indojar.com' },
        { label: 'Project Management (project@indojar.com)', value: 'project@indojar.com' },
    ];

    const replyForm = useForm({
        sender: 'admin@indojar.com',
        recipient: '',
        subject: '',
        body: '',
    });

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

    const handleOpenDetail = (emailItem) => {
        setSelectedEmail(emailItem);
        setIsDetailOpen(true);
        setIsReplyMode(false);

        if (!emailItem.is_read) {
            router.patch(route('emails.inbound.read', emailItem.id), {}, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const handleStartReply = () => {
        if (!selectedEmail) return;
        replyForm.setData({
            sender: selectedEmail.to_email || 'admin@indojar.com',
            recipient: selectedEmail.from_email,
            subject: selectedEmail.subject?.startsWith('Re:') ? selectedEmail.subject : `Re: ${selectedEmail.subject || ''}`,
            body: `\n\n-------------------------\nPada ${formatDate(selectedEmail.created_at)}, ${selectedEmail.sender_name || selectedEmail.from_email} menulis:\n> ${selectedEmail.text_body || 'Pesan HTML'}`,
        });
        setIsReplyMode(true);
    };

    const handleSendReply = (e) => {
        e.preventDefault();
        replyForm.post(route('emails.send'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsReplyMode(false);
                setIsDetailOpen(false);
                replyForm.reset();
            },
        });
    };

    const handleDeleteInbound = (id, e) => {
        e?.stopPropagation();
        confirm({
            title: 'Hapus Email Masuk',
            message: 'Apakah Anda yakin ingin menghapus email masuk ini?',
            variant: 'danger',
            onConfirm: () => {
                router.delete(route('emails.inbound.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        if (selectedEmail?.id === id) setIsDetailOpen(false);
                    }
                });
            },
        });
    };

    return (
        <AuthenticatedLayout header="Kotak Masuk Email">
            <Head title="Kotak Masuk (Inbox) - PT Indojar Mulia Abadi" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <InboxIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                            Kotak Masuk Email (@indojar.com)
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Pantau pesan masuk pelanggan dan kirim balasan langsung via Resend
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={route('emails.index')}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition flex items-center gap-2 cursor-pointer"
                        >
                            <Send className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Riwayat Email Terkirim</span>
                        </Link>
                    </div>
                </div>

                {/* Komponen Tabel Utama */}
                <TabEmail
                    emails={inboundEmails}
                    type="inbox"
                    filters={filters}
                    onOpenDetail={handleOpenDetail}
                    onDeleteRow={handleDeleteInbound}
                />
            </div>

            {/* Modal Detail & Balas Email */}
            {selectedEmail && (
                <Modal
                    isOpen={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    maxWidth="sm:max-w-2xl"
                    title={isReplyMode ? `Balas Pesan: ${selectedEmail.subject || ''}` : `Detail Email: ${selectedEmail.subject || ''}`}
                    onSubmit={isReplyMode ? handleSendReply : undefined}
                    submitLabel={isReplyMode ? (replyForm.processing ? 'Mengirim...' : 'Kirim Balasan') : undefined}
                    isProcessing={replyForm.processing}
                >
                    <div className="space-y-4 text-xs">
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-500" />
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {selectedEmail.sender_name || 'Tanpa Nama'}
                                    </span>
                                    <span className="font-mono text-blue-600 dark:text-blue-400">
                                        &lt;{selectedEmail.from_email}&gt;
                                    </span>
                                </div>
                                <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(selectedEmail.created_at)}
                                </span>
                            </div>
                            <div className="text-slate-500 dark:text-slate-400">
                                Ditujukan ke: <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{selectedEmail.to_email}</span>
                            </div>
                        </div>

                        {!isReplyMode ? (
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-[180px] max-h-[350px] overflow-y-auto font-sans leading-relaxed text-slate-800 dark:text-slate-200">
                                    {selectedEmail.html_body ? (
                                        <div dangerouslySetInnerHTML={{ __html: selectedEmail.html_body }} />
                                    ) : (
                                        <p className="whitespace-pre-wrap">{selectedEmail.text_body || 'Tidak ada isi pesan.'}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteInbound(selectedEmail.id)}
                                        className="px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition font-semibold flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Hapus</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleStartReply}
                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition font-bold flex items-center gap-1.5 shadow-md shadow-emerald-900/20 cursor-pointer uppercase tracking-wider text-[11px]"
                                    >
                                        <Reply className="w-3.5 h-3.5" />
                                        <span>Balas Email Ini</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSendReply} className="space-y-3 pt-2">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        BALAS SEBAGAI (PENGIRIM)
                                    </label>
                                    <HybridDropdown
                                        value={replyForm.data.sender}
                                        options={senderOptions}
                                        onChange={(val) => replyForm.setData('sender', val)}
                                        allowCustom={false}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        PENERIMA BALASAN
                                    </label>
                                    <input
                                        type="email"
                                        readOnly
                                        value={replyForm.data.recipient}
                                        className="w-full text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 p-2.5 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        SUBJEK BALASAN
                                    </label>
                                    <input
                                        type="text"
                                        value={replyForm.data.subject}
                                        onChange={(e) => replyForm.setData('subject', e.target.value)}
                                        className="w-full text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        ISI BALASAN
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={replyForm.data.body}
                                        onChange={(e) => replyForm.setData('body', e.target.value)}
                                        className="w-full text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => setIsReplyMode(false)}
                                        className="px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition font-semibold cursor-pointer"
                                    >
                                        Batal Balas
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </Modal>
            )}

        </AuthenticatedLayout>
    );
}