import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AuthenticatedLayout, { useConfirm } from '@/Layouts/AuthenticatedLayout';
import TabEmail from './TabEmail';
import Modal from '@/components/Modal';
import HybridDropdown from '@/components/HybridDropdown';
import { Send, Inbox as InboxIcon, Plus, Trash2, Clock, User } from 'lucide-react';

export default function EmailIndex({ auth, emailLogs, filters }) {
    const confirm = useConfirm();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const senderOptions = [
        { label: 'Admin Utama (admin@indojar.com)', value: 'admin@indojar.com' },
        { label: 'Informasi General (info@indojar.com)', value: 'info@indojar.com' },
        { label: 'Layanan & Support (support@indojar.com)', value: 'support@indojar.com' },
        { label: 'Project Management (project@indojar.com)', value: 'project@indojar.com' },
    ];

    const sendForm = useForm({
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

    const handleSendEmail = (e) => {
        e.preventDefault();
        sendForm.post(route('emails.send'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                sendForm.reset();
            },
        });
    };

    const handleDeleteLog = (id, e) => {
        e?.stopPropagation();
        confirm({
            title: 'Hapus Riwayat Email',
            message: 'Apakah Anda yakin ingin menghapus catatan riwayat pengiriman email ini?',
            variant: 'danger',
            onConfirm: () => {
                router.delete(route('emails.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        if (selectedLog?.id === id) setIsDetailOpen(false);
                    }
                });
            },
        });
    };

    return (
        <AuthenticatedLayout header="Riwayat Email Terkirim">
            <Head title="Riwayat Email Terkirim - PT Indojar Mulia Abadi" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <Send className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                            Riwayat Email Terkirim (Outbox)
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Kelola pengiriman pesan dan log transaksi email resmi perusahaan
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={route('emails.inbox')}
                            className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-semibold text-blue-600 dark:text-blue-400 rounded-xl border border-blue-200 dark:border-blue-800 transition flex items-center gap-2 cursor-pointer"
                        >
                            <InboxIcon className="w-3.5 h-3.5" />
                            <span>Kotak Masuk (Inbox)</span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(true)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-900/20 transition flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Kirim Email Baru</span>
                        </button>
                    </div>
                </div>

                {/* Komponen Tabel Utama */}
                <TabEmail
                    emails={emailLogs}
                    type="outbox"
                    filters={filters}
                    onOpenDetail={(log) => { setSelectedLog(log); setIsDetailOpen(true); }}
                    onDeleteRow={handleDeleteLog}
                />
            </div>

            {/* Modal Form Kirim Email Baru */}
            <Modal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                maxWidth="sm:max-w-xl"
                title="Kirim Email Baru"
                onSubmit={handleSendEmail}
                submitLabel={sendForm.processing ? 'Mengirim...' : 'Kirim Email'}
                isProcessing={sendForm.processing}
            >
                <form onSubmit={handleSendEmail} className="space-y-3 text-xs">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            KIRIM SEBAGAI (PENGIRIM)
                        </label>
                        <HybridDropdown
                            value={sendForm.data.sender}
                            options={senderOptions}
                            onChange={(val) => sendForm.setData('sender', val)}
                            allowCustom={false}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            EMAIL PENERIMA
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="contoh: klien@perusahaan.com"
                            value={sendForm.data.recipient}
                            onChange={(e) => sendForm.setData('recipient', e.target.value)}
                            className="w-full text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            SUBJEK EMAIL
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Subjek email..."
                            value={sendForm.data.subject}
                            onChange={(e) => sendForm.setData('subject', e.target.value)}
                            className="w-full text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            ISI PESAN EMAIL
                        </label>
                        <textarea
                            rows={6}
                            required
                            placeholder="Tulis pesan lengkap di sini..."
                            value={sendForm.data.body}
                            onChange={(e) => sendForm.setData('body', e.target.value)}
                            className="w-full text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                        />
                    </div>
                </form>
            </Modal>

            {/* Modal Detail Log Pesan */}
            {selectedLog && (
                <Modal
                    isOpen={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    maxWidth="sm:max-w-xl"
                    title={`Detail Log: ${selectedLog.subject}`}
                >
                    <div className="space-y-4 text-xs">
                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-emerald-500" />
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        Penerima: {selectedLog.recipient}
                                    </span>
                                </div>
                                <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatDate(selectedLog.created_at)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 pt-1">
                                <span>Pengirim (Operator): <strong className="text-slate-700 dark:text-slate-300">{selectedLog.user?.name || 'Sistem'}</strong></span>
                                {selectedLog.resend_id && (
                                    <span className="font-mono text-[10px] text-slate-400">ID: {selectedLog.resend_id}</span>
                                )}
                            </div>
                        </div>

                        {selectedLog.error_message && (
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-xs font-mono">
                                <strong>Penyebab Gagal:</strong> {selectedLog.error_message}
                            </div>
                        )}

                        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 min-h-[150px] max-h-[300px] overflow-y-auto font-sans leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                            {selectedLog.body}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <button
                                type="button"
                                onClick={() => handleDeleteLog(selectedLog.id)}
                                className="px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Hapus Log Ini</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}