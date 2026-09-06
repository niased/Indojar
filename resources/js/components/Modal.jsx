import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
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
                {/* FIXED HEADER */}
                {(title || description || headerExtra) && (
                    <DialogHeader className="shrink-0 px-6 py-4 border-b border-slate-100 dark:border-slate-800 select-none bg-slate-50/50 dark:bg-slate-900/50">
                        <DialogTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between pr-6">
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

                {/* SCROLLABLE BODY / ISI FORM */}
                <div className="flex-1 overflow-y-auto px-6 py-4 select-text space-y-4">
                    {children}
                </div>

                {/* FIXED FOOTER */}
                {showFooter && (
                    <DialogFooter className="shrink-0 px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5 bg-slate-50/50 dark:bg-slate-900/50 select-none">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="h-9 px-4 text-xs font-semibold cursor-pointer rounded-xl border-slate-300 dark:border-slate-700"
                        >
                            {cancelLabel}
                        </Button>

                        {onSubmit && (
                            <Button
                                type="button"
                                onClick={onSubmit}
                                disabled={isProcessing}
                                className="h-9 px-5 text-xs font-bold gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors cursor-pointer rounded-xl"
                            >
                                {isProcessing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                <span>{submitLabel}</span>
                            </Button>
                        )}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}