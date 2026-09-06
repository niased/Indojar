import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    onSubmit,
    submitLabel = 'Simpan',
    cancelLabel = 'Batal',
    isProcessing = false,
    maxWidth = 'sm:max-w-2xl',
    showFooter = true,
    headerExtra,
    onPaste,
}) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose?.()}>
            <DialogContent 
                className={`${maxWidth} max-h-[90vh] h-auto flex flex-col p-0 gap-0 overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 select-text rounded-2xl`}
                onPaste={onPaste}
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                }}
            >
                {/* 1. FIXED HEADER (dengan pr-10 agar aman dari tombol 'X') */}
                {(title || description || headerExtra) && (
                    <DialogHeader className="shrink-0 px-6 py-4 sm:px-7 border-b border-slate-100 dark:border-slate-800/80 select-none bg-slate-50/60 dark:bg-slate-900/60">
                        <DialogTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between gap-3 pr-8">
                            <span className="truncate">{title}</span>
                            {headerExtra && <div className="shrink-0">{headerExtra}</div>}
                        </DialogTitle>
                        {description ? (
                            <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {description}
                            </DialogDescription>
                        ) : (
                            <DialogDescription className="sr-only">
                                Dialog Modal
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}

                {/* 2. SCROLLABLE BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-7 select-text space-y-4">
                    {children}
                </div>

                {/* 3. FIXED FOOTER (Menggunakan container pasti dengan padding aman dari sudut lengkungan) */}
                {showFooter && (
                    <div className="shrink-0 px-6 py-4 sm:px-7 sm:py-4.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end gap-3 select-none rounded-b-2xl">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="h-9 px-4 text-xs font-semibold cursor-pointer rounded-xl border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                        >
                            {cancelLabel}
                        </Button>

                        {onSubmit && (
                            <Button
                                type="button"
                                onClick={onSubmit}
                                disabled={isProcessing}
                                className="h-9 px-5 text-xs font-bold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30 transition-all cursor-pointer rounded-xl shrink-0"
                            >
                                {isProcessing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                <span>{submitLabel}</span>
                            </Button>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}