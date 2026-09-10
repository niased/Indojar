import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout, { useConfirm } from '@/Layouts/AuthenticatedLayout';
import EmailSplitView from './EmailSplitView';
import Modal from '@/components/Modal';
import HybridDropdown from '@/components/HybridDropdown';

export default function EmailIndex({ auth, emailLogs, filters }) {
    const confirm = useConfirm();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

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
                });
            },
        });
    };

    const handleSearch = (searchVal) => {
        router.get(route('emails.index'), { search: searchVal }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header="Riwayat Email Terkirim">
            <Head title="Riwayat Email Terkirim - PT Indojar Mulia Abadi" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <EmailSplitView
                    dataEmails={emailLogs}
                    filters={filters}
                    mode="outbox"
                    onDeleteRow={handleDeleteLog}
                    onSearch={handleSearch}
                    onOpenCreateModal={() => setIsCreateOpen(true)}
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
        </AuthenticatedLayout>
    );
}