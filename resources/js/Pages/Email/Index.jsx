import React, { useState, useMemo } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout, { useConfirm } from '@/Layouts/AuthenticatedLayout';
import HybridDropdown from '@/components/HybridDropdown';
import Tabel from '@/components/Tabel';
import { Badge } from '@/components/ui/badge';
import { 
    Mail, 
    Send, 
    Trash2, 
    Search, 
    CheckCircle2, 
    XCircle, 
    History, 
    X, 
    ChevronLeft, 
    ChevronRight 
} from 'lucide-react';

export default function EmailIndex({ auth, emailLogs, filters }) {
    const confirm = useConfirm();
    const [search, setSearch] = useState(filters.search || '');

    // Pilihan email pengirim resmi domain @indojar.com
    const senderOptions = [
        { label: 'Admin Utama (admin@indojar.com)', value: 'admin@indojar.com' },
        { label: 'Informasi General (finance@indojar.com)', value: 'finance@indojar.com' },
        { label: 'Layanan & Support (support@indojar.com)', value: 'support@indojar.com' },
        { label: 'Project Management (project@indojar.com)', value: 'project@indojar.com' },
        { label: 'Ikhsan (Ikhsan@indojar.com)', value: 'ikhsan@indojar.com' },
        { label: 'Aripraba (Aripraba@indojar.com)', value: 'aripraba@indojar.com' },
    ];

    // Tambahkan email user login jika berdomain @indojar.com
    if (auth?.user?.email && auth.user.email.endsWith('@indojar.com')) {
        if (!senderOptions.some((opt) => opt.value === auth.user.email)) {
            senderOptions.push({
                label: `Email Akun Saya (${auth.user.email})`,
                value: auth.user.email,
            });
        }
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        sender: 'admin@indojar.com',
        recipient: '',
        subject: '',
        body: '',
    });

    const handleSend = (e) => {
        e.preventDefault();
        post(route('emails.send'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        confirm({
            title: 'Hapus Riwayat Email',
            message: 'Apakah Anda yakin ingin menghapus catatan riwayat email ini?',
            variant: 'danger',
            onConfirm: () => router.delete(route('emails.destroy', id)),
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('emails.index'), { search }, { preserveState: true });
    };

    // Style Kolom Tabel Identik dengan Master Data (CrudTable.jsx)
    const columns = useMemo(() => [
        {
            key: 'recipient',
            label: 'PENERIMA',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                        {item.recipient}
                    </span>
                </div>
            ),
        },
        {
            key: 'subject',
            label: 'SUBJEK EMAIL',
            render: (item) => (
                <div className="flex flex-col max-w-[220px] leading-tight">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={item.subject}>
                        {item.subject}
                    </span>
                </div>
            ),
        },
        {
            key: 'user',
            label: 'PENGIRIM',
            render: (item) => (
                <div className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {item.user?.name || 'Sistem'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {item.sender || 'admin@indojar.com'}
                    </span>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'STATUS',
            render: (item) => (
                item.status === 'sent' ? (
                    <Badge className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>SENT</span>
                    </Badge>
                ) : (
                    <Badge className="text-[10px] font-mono font-bold px-2 py-0.5 bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 gap-1" title={item.error_message}>
                        <XCircle className="w-3 h-3" />
                        <span>FAILED</span>
                    </Badge>
                )
            ),
        },
        {
            key: 'action',
            label: 'AKSI',
            className: 'text-center w-16',
            render: (item) => (
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Catatan"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ], []);

    const tableData = emailLogs?.data || emailLogs || [];

    return (
        <AuthenticatedLayout header="Kelola Email">
            <Head title="Kelola Email - PT Indojar Mulia Abadi" />

            {/* Container Utama tanpa overflow internal */}
            <div className="w-full space-y-6">
                
                {/* Header Judul Halaman */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <Mail className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                        Manajemen Email Official (@indojar.com)
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Kirim email transaksi dan pantau riwayat pengiriman via Resend API
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* Panel 1: Form Tulis Email */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 space-y-4">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <Send className="w-4 h-4 text-emerald-500" /> Tulis Email Baru
                        </h2>

                        <form onSubmit={handleSend} className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    KIRIM SEBAGAI (PENGIRIM)
                                </label>
                                <HybridDropdown
                                    value={data.sender}
                                    options={senderOptions}
                                    onChange={(value) => setData('sender', value)}
                                    placeholder="Pilih Email Pengirim..."
                                    searchPlaceholder="Cari email..."
                                    allowCustom={false}
                                />
                                {errors.sender && <p className="text-rose-500 text-xs mt-1">{errors.sender}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    EMAIL TUJUAN
                                </label>
                                <input
                                    type="email"
                                    value={data.recipient}
                                    onChange={(e) => setData('recipient', e.target.value)}
                                    placeholder="client@company.com"
                                    className="w-full text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                                />
                                {errors.recipient && <p className="text-rose-500 text-xs mt-1">{errors.recipient}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    SUBJEK
                                </label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="Update Laporan Proyek Site Subang"
                                    className="w-full text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                                />
                                {errors.subject && <p className="text-rose-500 text-xs mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                    PESAN EMAIL
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                    placeholder="Tuliskan isi pesan atau informasi proyek di sini..."
                                    className="w-full text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition"
                                />
                                {errors.body && <p className="text-rose-500 text-xs mt-1">{errors.body}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                            >
                                <Send className="w-4 h-4" />
                                {processing ? 'Mengirim...' : 'Kirim Email'}
                            </button>
                        </form>
                    </div>

                    {/* Panel 2: Card Master Data Table (TabMasterData.jsx Style) */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
                        
                        {/* Sub-Header Toolbar (Hitungan Data & Search) */}
                        <div className="px-5 py-3 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <History className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Total: {emailLogs?.total || tableData.length} Riwayat Email
                                </span>
                            </div>

                            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <div className="relative w-full sm:w-64">
                                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari penerima / subjek..."
                                        className="h-8 w-full pl-8 pr-7 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                    />
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearch('');
                                                router.get(route('emails.index'), {}, { preserveState: true });
                                            }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                                <button 
                                    type="submit" 
                                    className="h-8 px-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer text-slate-700 dark:text-slate-200 transition shrink-0"
                                >
                                    Cari
                                </button>
                            </form>
                        </div>

                        {/* Tabel Data Master */}
                        <div className="w-full overflow-x-auto relative border-b border-slate-200 dark:border-slate-800">
                            <Tabel
                                data={tableData}
                                columns={columns}
                                getItemId={(item) => item.id}
                                emptyMessage="Belum ada data riwayat pengiriman email."
                            />
                        </div>

                        {/* Pagination Footer */}
                        {emailLogs?.links && (
                            <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="text-slate-500">
                                    Menampilkan{' '}
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                                        {emailLogs.from || 0}
                                    </span>{' '}
                                    –{' '}
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                                        {emailLogs.to || 0}
                                    </span>{' '}
                                    dari{' '}
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                                        {emailLogs.total || tableData.length}
                                    </span>{' '}
                                    data
                                </div>

                                <div className="flex items-center gap-1">
                                    {emailLogs.links.map((link, idx) => {
                                        let label = link.label;

                                        if (label.includes('Previous') || label.includes('&laquo;')) {
                                            label = <ChevronLeft className="w-3.5 h-3.5" />;
                                        } else if (label.includes('Next') || label.includes('&raquo;')) {
                                            label = <ChevronRight className="w-3.5 h-3.5" />;
                                        }

                                        return (
                                            <button
                                                key={`page-${idx}`}
                                                type="button"
                                                disabled={!link.url}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(
                                                        link.url,
                                                        {},
                                                        { preserveState: true, preserveScroll: true }
                                                    )
                                                }
                                                className={`h-8 min-w-[32px] px-2 text-xs font-semibold rounded-lg border dark:border-slate-800 transition ${
                                                    link.active
                                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600'
                                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200'
                                                } ${!link.url ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}