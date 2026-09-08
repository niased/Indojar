import React, { useMemo } from 'react';
import Tabel from '@/components/Tabel';
import { Badge } from '@/components/ui/badge';
import { 
    CheckCircle2, 
    XCircle, 
    Mail, 
    MailOpen 
} from 'lucide-react';

export default function CrudTable({
    dataList = [],
    selectedIds = [],
    onSelectAll,
    onSelectRow,
    onOpenDetail,
    getRowNumber,
    zoomLevel = 100,
    type = 'outbox', // 'outbox' | 'inbox'
}) {
    const getItemId = (item) => item?.id;

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

    // Kolom Riwayat Email Terkirim (Outbox) - Kolom AKSI kanan dihapus
    const outboxColumns = useMemo(() => [
        {
            key: 'recipient',
            label: 'PENERIMA EMAIL',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                        {item.recipient}
                    </span>
                    <span className="text-[10px] text-slate-400">
                        Dikirim oleh: {item.user?.name || 'Sistem'}
                    </span>
                </div>
            ),
        },
        {
            key: 'subject',
            label: 'SUBJEK EMAIL',
            render: (item) => (
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[280px] truncate block" title={item.subject}>
                    {item.subject}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'STATUS',
            render: (item) => (
                item.status === 'sent' ? (
                    <Badge className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>TERKIRIM</span>
                    </Badge>
                ) : (
                    <Badge className="text-[10px] font-mono font-bold px-2 py-0.5 bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 gap-1">
                        <XCircle className="w-3 h-3" />
                        <span>GAGAL</span>
                    </Badge>
                )
            ),
        },
        {
            key: 'created_at',
            label: 'WAKTU KIRIM',
            render: (item) => (
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {formatDate(item.created_at)}
                </span>
            ),
        },
    ], []);

    // Kolom Kotak Masuk (Inbox) - Kolom AKSI kanan dihapus
    const inboxColumns = useMemo(() => [
        {
            key: 'sender',
            label: 'PENGIRIM',
            render: (item) => (
                <div className="flex flex-col">
                    <span className={`text-xs font-bold ${!item.is_read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                        {item.sender_name || 'Tanpa Nama'}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                        {item.from_email}
                    </span>
                </div>
            ),
        },
        {
            key: 'subject',
            label: 'SUBJEK EMAIL',
            render: (item) => (
                <div className="flex flex-col max-w-[280px]">
                    <span className={`text-xs truncate ${!item.is_read ? 'font-black text-slate-900 dark:text-white' : 'font-semibold text-slate-600 dark:text-slate-400'}`} title={item.subject}>
                        {item.subject || '(Tanpa Subjek)'}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate mt-0.5">
                        Tujuan: {item.to_email}
                    </span>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'STATUS',
            render: (item) => (
                !item.is_read ? (
                    <Badge className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 gap-1">
                        <Mail className="w-3 h-3" />
                        <span>UNREAD</span>
                    </Badge>
                ) : (
                    <Badge className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-500/10 text-slate-500 border border-slate-500/20 gap-1">
                        <MailOpen className="w-3 h-3" />
                        <span>READ</span>
                    </Badge>
                )
            ),
        },
        {
            key: 'created_at',
            label: 'WAKTU TERIMA',
            render: (item) => (
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {formatDate(item.created_at)}
                </span>
            ),
        },
    ], []);

    return (
        <Tabel
            data={dataList}
            columns={type === 'inbox' ? inboxColumns : outboxColumns}
            selectedIds={selectedIds}
            onSelectAll={onSelectAll}
            onSelectRow={onSelectRow}
            onEditRow={onOpenDetail}
            getItemId={getItemId}
            getRowNumber={getRowNumber}
            zoomLevel={zoomLevel}
            emptyMessage={type === 'inbox' ? "Belum ada email masuk di kotak pesan." : "Belum ada riwayat pengiriman email."}
        />
    );
}