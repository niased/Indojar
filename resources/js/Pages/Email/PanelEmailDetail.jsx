import React, { useState } from 'react';
import HybridDropdown from '@/components/HybridDropdown';
import {
    ArrowLeft,
    Reply,
    Trash2,
    Clock,
    Mail,
    Send,
    X,
    MoreVertical,
    Forward,
    Star,
    Ban
} from 'lucide-react';

export default function PanelEmailDetail({
    selectedThread,
    onDeselectThread,
    mode = 'inbox',
    onDeleteEmail,
    isReplyMode,
    isForwardMode,
    setIsReplyMode,
    handleStartReply,
    handleStartForward,
    handleSendReply,
    handleToggleFavorite,
    handleBlockSender,
    replyForm,
    senderOptions,
    formatDate
}) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const cleanText = (str) => {
        if (!str) return '';
        return str.replace(/"/g, '').trim();
    };

    const getInitials = (name, email) => {
        const str = cleanText(name) || cleanText(email) || 'U';
        return str.substring(0, 2).toUpperCase();
    };

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const emails = selectedThread?.emails 
        ? [...selectedThread.emails].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        : [];

    const latestEmail = selectedThread?.latestEmail;
    const isFavorite = latestEmail?.is_starred;

    return (
        <div className={`${!selectedThread && 'hidden md:block'} md:col-span-7 lg:col-span-6 flex flex-col justify-between bg-white dark:bg-slate-900 min-h-[500px]`}>
            {selectedThread && latestEmail ? (
                <div className="flex flex-col h-full">
                    
                    {/* TOOLBAR ATAS DENGAN TOMBOL FAVORIT & BLOKIR */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={onDeselectThread}
                            className="md:hidden flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali</span>
                        </button>

                        <div className="flex items-center gap-1.5 ml-auto">
                            {mode === 'inbox' && !isReplyMode && (
                                <>
                                    {/* TOMBOL FAVORIT */}
                                    <button
                                        type="button"
                                        onClick={() => handleToggleFavorite && handleToggleFavorite(latestEmail.id)}
                                        className={`p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 text-xs font-medium ${
                                            isFavorite
                                                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-600 dark:text-amber-400'
                                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                                        }`}
                                        title={isFavorite ? 'Hapus dari Favorit' : 'Tandai Favorit'}
                                    >
                                        <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                                    </button>

                                    {/* TOMBOL BLOKIR */}
                                    <button
                                        type="button"
                                        onClick={() => handleBlockSender && handleBlockSender(latestEmail.from_email)}
                                        className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs font-medium"
                                        title="Blokir Pengirim Ini"
                                    >
                                        <Ban className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Blokir</span>
                                    </button>

                                    {/* TOMBOL BALAS */}
                                    <button
                                        type="button"
                                        onClick={handleStartReply}
                                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Reply className="w-3.5 h-3.5" />
                                        <span>Balas</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* JUDUL SUBJEK PERCAKAPAN */}
                    <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
                        <h1 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                            {cleanText(latestEmail.subject) || '(Tanpa Subjek)'}
                        </h1>
                        <span className="text-[11px] text-slate-400 font-mono">
                            {emails.length} pesan dalam percakapan ini
                        </span>
                    </div>

                    {/* AREA KONTEN */}
                    <div className="p-5 flex-1 overflow-y-auto max-h-[480px]">
                        
                        {/* FORM BALAS / TERUSKAN */}
                        {isReplyMode && (
                            <form onSubmit={handleSendReply} className="space-y-3.5 text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                        {isForwardMode ? (
                                            <>
                                                <Forward className="w-4 h-4 text-blue-600" />
                                                Teruskan Pesan
                                            </>
                                        ) : (
                                            <>
                                                <Reply className="w-4 h-4 text-blue-600" />
                                                Balas Percakapan
                                            </>
                                        )}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setIsReplyMode(false)}
                                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Pengirim</label>
                                    <HybridDropdown
                                        value={replyForm.data.sender}
                                        options={senderOptions}
                                        onChange={(val) => replyForm.setData('sender', val)}
                                        allowCustom={false}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Penerima</label>
                                    <input
                                        type="email"
                                        required
                                        readOnly={!isForwardMode}
                                        placeholder="contoh: penerima@domain.com"
                                        value={replyForm.data.recipient}
                                        onChange={(e) => replyForm.setData('recipient', e.target.value)}
                                        className={`w-full text-xs font-semibold rounded-lg border p-2 outline-none ${
                                            isForwardMode
                                                ? 'border-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100'
                                                : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-500'
                                        }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Subjek</label>
                                    <input
                                        type="text"
                                        value={replyForm.data.subject}
                                        onChange={(e) => replyForm.setData('subject', e.target.value)}
                                        className="w-full text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Isi Pesan</label>
                                    <textarea
                                        rows={6}
                                        value={replyForm.data.body}
                                        onChange={(e) => replyForm.setData('body', e.target.value)}
                                        className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 outline-none focus:border-blue-500 resize-none font-sans"
                                        placeholder="Tulis pesan di sini..."
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsReplyMode(false)}
                                        className="px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 rounded-lg transition font-semibold cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={replyForm.processing}
                                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-xs flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>{replyForm.processing ? 'Mengirim...' : isForwardMode ? 'Teruskan' : 'Kirim'}</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* DAFTAR RIWAYAT EMAIL */}
                        <div className="space-y-6">
                            {emails.map((email, idx) => {
                                const senderName = cleanText(email.sender_name);
                                const senderEmail = cleanText(email.from_email);

                                return (
                                    <div key={email.id || idx} className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] flex items-center justify-center shrink-0">
                                                    {getInitials(senderName, senderEmail || email.recipient)}
                                                </div>
                                                <div className="text-xs">
                                                    <div className="font-bold text-slate-900 dark:text-slate-100">
                                                        {mode === 'inbox' ? (senderName || senderEmail) : `Ke: ${email.recipient}`}
                                                    </div>
                                                    <div className="text-[11px] text-slate-400 font-mono">
                                                        {mode === 'inbox' ? `<${senderEmail}>` : `Operator: ${email.user?.name || 'Sistem'}`}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0 relative">
                                                <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(email.created_at)}
                                                </span>

                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => toggleMenu(email.id, e)}
                                                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded transition cursor-pointer"
                                                        title="Opsi Pesan"
                                                    >
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>

                                                    {openMenuId === email.id && (
                                                        <div 
                                                            className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-md z-20 py-1 text-xs"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenMenuId(null);
                                                                    handleStartForward(email);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium cursor-pointer"
                                                            >
                                                                <Forward className="w-3.5 h-3.5 text-slate-500" />
                                                                <span>Teruskan</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    setOpenMenuId(null);
                                                                    onDeleteEmail && onDeleteEmail(email.id, e);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 font-medium cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                <span>Hapus</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 font-sans whitespace-pre-wrap pl-9">
                                            {mode === 'inbox' ? (
                                                email.html_body ? (
                                                    <div dangerouslySetInnerHTML={{ __html: email.html_body }} />
                                                ) : (
                                                    email.text_body || 'Tidak ada isi pesan.'
                                                )
                                            ) : (
                                                email.body || 'Tidak ada isi pesan.'
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-slate-400 text-xs">
                    <Mail className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                    <p>Pilih percakapan di sebelah kiri untuk membaca.</p>
                </div>
            )}
        </div>
    );
}