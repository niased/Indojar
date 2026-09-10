import React from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout, { useConfirm } from '@/Layouts/AuthenticatedLayout';
import EmailSplitView from './EmailSplitView';

export default function EmailInbox({ auth, inboundEmails, filters }) {
    // PERBAIKAN: Gunakan destructuring { confirm }
    const confirmHook = useConfirm();
    const confirm = typeof confirmHook === 'function' ? confirmHook : confirmHook?.confirm;

    // Handler hapus email masuk dengan konfirmasi aman
    const handleDeleteInbound = (id, e) => {
        e?.stopPropagation();

        const doDelete = () => {
            router.delete(route('emails.inbound.destroy', id), {
                preserveScroll: true,
                preserveState: true,
            });
        };

        if (typeof confirm === 'function') {
            confirm({
                title: 'Hapus Email Masuk',
                message: 'Apakah Anda yakin ingin menghapus email masuk ini?',
                variant: 'danger',
                onConfirm: doDelete,
            });
        } else if (window.confirm('Apakah Anda yakin ingin menghapus email masuk ini?')) {
            doDelete();
        }
    };

    // Handler pencarian
    const handleSearch = (searchVal) => {
        router.get(
            route('emails.inbox'), 
            { search: searchVal }, 
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AuthenticatedLayout header="Kotak Masuk Email">
            <Head title="Kotak Masuk (Inbox) - PT Indojar Mulia Abadi" />

            <div className="space-y-6 max-w-7xl mx-auto">
                <EmailSplitView
                    dataEmails={inboundEmails}
                    filters={filters}
                    mode="inbox"
                    onDeleteRow={handleDeleteInbound}
                    onSearch={handleSearch}
                />
            </div>
        </AuthenticatedLayout>
    );
}