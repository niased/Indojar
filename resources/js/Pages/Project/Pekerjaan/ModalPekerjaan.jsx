import React from 'react';
import Modal from '@/components/Modal';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    PlusCircle,
    ClipboardPaste,
    AlertCircle,
} from 'lucide-react';
import ModalPekerjaanRow from './ModalPekerjaanRow';
import {
    useModalPekerjaanControl,
    MAX_ROWS_LIMIT,
} from './ModalPekerjaanControl';

export default function ModalPekerjaan({
    isOpen,
    onClose,
    isEditMode = false,
    selectedItem = null,
    project = null,
    stages = [],
}) {
    const {
        isProcessing,
        items,
        stageOptions,
        satuanOptions,
        statusOptions,
        handleSingleFileChange,
        handleRemoveSinglePhoto,
        handleRowFileChange,
        handleRemoveRowPhoto,
        handleContainerPaste,
        handlePasteFromClipboardButton,
        handleAddMoreRows,
        handleRemoveRow,
        handleFieldChange,
        handleSubmitForm,
    } = useModalPekerjaanControl({ isOpen, isEditMode, selectedItem, project, stages, onClose });

    const handleFilteredPaste = (e) => {
        const targetTag = e.target?.tagName;
        if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') {
            return;
        }
        handleContainerPaste?.(e);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? `Edit Pekerjaan: ${selectedItem?.kode_pekerjaan || ''}` : 'Tambah Rincian Pekerjaan WBS'}
            onSubmit={handleSubmitForm}
            submitLabel={isEditMode ? 'Simpan Perubahan' : `Simpan Semua Data (${items.length} Item)`}
            isProcessing={isProcessing}
            onPaste={!isEditMode ? handleFilteredPaste : undefined}
            headerExtra={
                !isEditMode && (
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handlePasteFromClipboardButton}
                            className="h-7 text-xs gap-1.5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                        >
                            <ClipboardPaste className="w-3.5 h-3.5" />
                            <span>Paste dari Excel</span>
                        </Button>
                        <Badge
                            variant="secondary"
                            className={`text-[11px] font-mono font-bold px-2.5 py-0.5 ${
                                items.length >= MAX_ROWS_LIMIT
                                    ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40'
                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                            }`}
                        >
                            {items.length} / {MAX_ROWS_LIMIT} Baris
                        </Badge>
                    </div>
                )
            }
        >
            {/* Banner Konteks Identitas Site Proyek Terkunci */}
            <Alert className="shrink-0 mb-3 bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 p-2.5 rounded-xl flex items-start gap-2 shadow-xs">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <AlertDescription className="text-xs leading-relaxed">
                    Site Proyek: <strong className="text-blue-700 dark:text-blue-300 font-mono">{project?.site_id} — {project?.site_name}</strong>.
                    {!isEditMode && (
                        <span> Setiap baris mewakili tugas fisik. Anda dapat mengetik manual, menambah baris, atau menempelkan tabel dari Excel (<strong>Ctrl+V</strong>).</span>
                    )}
                </AlertDescription>
            </Alert>

            <div className="space-y-4">
                {items.map((item, rowIdx) => (
                    <ModalPekerjaanRow
                        key={`row-wbs-${rowIdx}`}
                        item={item}
                        rowIdx={rowIdx}
                        rowsCount={items.length}
                        isEditMode={isEditMode}
                        isProcessing={isProcessing}
                        stageOptions={stageOptions}
                        satuanOptions={satuanOptions}
                        statusOptions={statusOptions}
                        onRemoveRow={handleRemoveRow}
                        onFieldChange={handleFieldChange}
                        onRowFileChange={isEditMode ? (_, e) => handleSingleFileChange(e) : handleRowFileChange}
                        onRemoveRowPhoto={isEditMode ? handleRemoveSinglePhoto : handleRemoveRowPhoto}
                    />
                ))}

                {!isEditMode && (
                    <div className="flex items-center gap-2 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddMoreRows(1)}
                            disabled={isProcessing || items.length >= MAX_ROWS_LIMIT}
                            className="h-8 text-xs gap-1.5 cursor-pointer"
                        >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Tambah 1 Baris</span>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddMoreRows(5)}
                            disabled={isProcessing || items.length >= MAX_ROWS_LIMIT}
                            className="h-8 text-xs gap-1.5 cursor-pointer"
                        >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Tambah 5 Baris</span>
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
}