import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
    Trash2, 
    Upload, 
    X, 
    Calendar, 
    Camera,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';
import HybridDropdown from '@/components/HybridDropdown';

export default function ModalPekerjaanRow({
    item,
    rowIdx,
    rowsCount,
    isEditMode,
    isProcessing,
    stageOptions = [],
    satuanOptions = [],
    onRemoveRow,
    onFieldChange,
    onRowFileChange,
    onRemoveRowPhoto,
}) {
    const isIssueType = item.tipe_foto === 'ISSUE';

    return (
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 relative group space-y-3.5 transition-all shadow-xs">
            {/* Header Baris */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-xs font-mono">
                        {rowIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Laporan Pekerjaan #{rowIdx + 1}
                    </span>
                </div>

                {rowsCount > 1 && !isEditMode && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveRow(rowIdx)}
                        className="h-7 px-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs gap-1 cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus Baris
                    </Button>
                )}
            </div>

            {/* Baris 1: Tahapan Konstruksi & Kode WBS */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8 space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Tahapan Konstruksi *
                    </Label>
                    <HybridDropdown
                        value={item.stage_id}
                        options={stageOptions}
                        onChange={(val) => onFieldChange(rowIdx, 'stage_id', val)}
                        placeholder="Pilih Tahapan..."
                        searchPlaceholder="Cari Tahapan..."
                        allowCustom={false}
                        disabled={isProcessing}
                        inputClassName="h-8 text-xs font-semibold"
                    />
                </div>

                <div className="sm:col-span-4 space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Kode WBS *
                    </Label>
                    <Input
                        disabled={isProcessing}
                        value={item.kode_pekerjaan}
                        onChange={(e) => onFieldChange(rowIdx, 'kode_pekerjaan', e.target.value)}
                        placeholder="Contoh: PND-01"
                        className="h-8 text-xs bg-white dark:bg-slate-900 font-mono font-bold uppercase"
                        required
                    />
                </div>
            </div>

            {/* Baris 2: Uraian Pekerjaan, Satuan, & Tanggal */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6 space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Uraian Laporan Fisik *
                    </Label>
                    <Input
                        disabled={isProcessing}
                        value={item.nama_pekerjaan}
                        onChange={(e) => onFieldChange(rowIdx, 'nama_pekerjaan', e.target.value)}
                        placeholder="Contoh: Pengecoran Pondasi Footplat & Kolom Pedestal"
                        className="h-8 text-xs bg-white dark:bg-slate-900 font-semibold"
                        required
                    />
                </div>

                <div className="sm:col-span-3 space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Satuan *
                    </Label>
                    <HybridDropdown
                        value={item.satuan || 'Lot'}
                        options={satuanOptions}
                        onChange={(val) => onFieldChange(rowIdx, 'satuan', val)}
                        placeholder="Satuan..."
                        allowCustom={false}
                        disabled={isProcessing}
                        inputClassName="h-8 text-xs font-semibold"
                    />
                </div>

                <div className="sm:col-span-3 space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Tanggal Lapor *</span>
                    </Label>
                    <Input
                        type="date"
                        disabled={isProcessing}
                        value={item.tanggal_pekerjaan}
                        onChange={(e) => onFieldChange(rowIdx, 'tanggal_pekerjaan', e.target.value)}
                        className="h-8 text-xs bg-white dark:bg-slate-900 font-mono cursor-pointer"
                        required
                    />
                </div>
            </div>

            {/* Baris 3: Eviden Foto & Catatan Lapangan */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                <div className="sm:col-span-5 space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <Camera className="w-3 h-3 text-slate-400" />
                            <span>Unggah Foto</span>
                        </Label>

                        <div className="flex items-center p-0.5 bg-slate-200 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 text-[10px] font-bold">
                            <button
                                type="button"
                                onClick={() => onFieldChange(rowIdx, 'tipe_foto', 'DOKUMENTASI')}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                                    !isIssueType 
                                        ? 'bg-blue-600 text-white shadow-xs' 
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                            >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Eviden</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => onFieldChange(rowIdx, 'tipe_foto', 'ISSUE')}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                                    isIssueType 
                                        ? 'bg-rose-600 text-white shadow-xs' 
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                            >
                                <AlertTriangle className="w-3 h-3" />
                                <span>Issue</span>
                            </button>
                        </div>
                    </div>

                    {item.foto_preview || item.foto ? (
                        <div className={`flex items-center gap-2.5 p-2 bg-white dark:bg-slate-900 rounded-xl border ${
                            isIssueType ? 'border-rose-500/50 bg-rose-500/5' : 'border-slate-200 dark:border-slate-700'
                        } h-[76px] shadow-xs`}>
                            <img
                                src={item.foto_preview || item.foto}
                                alt="Pratinjau"
                                className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                            />
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                                    {item.foto_file?.name || 'Foto Terpilih'}
                                </span>
                                <span className={`text-[9px] font-semibold ${isIssueType ? 'text-rose-500' : 'text-blue-500'}`}>
                                    {isIssueType ? 'Akan masuk ke Tab Kendala' : 'Akan masuk ke Tab Foto'}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemoveRowPhoto(rowIdx)}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                                title="Hapus Foto"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label className={`flex flex-col items-center justify-center gap-1.5 h-[76px] px-3 rounded-xl border-2 border-dashed ${
                            isIssueType 
                                ? 'border-rose-400/60 dark:border-rose-700/60 bg-rose-500/5 hover:border-rose-500 text-rose-600 dark:text-rose-400' 
                                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-500 text-slate-500 dark:text-slate-400'
                        } cursor-pointer text-xs transition-all`}>
                            <Upload className="w-4 h-4" />
                            <span className="text-[11px] font-bold">
                                {isIssueType ? 'Unggah Bukti Kendala (Issue)' : 'Unggah Foto Eviden'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => onRowFileChange(rowIdx, e)}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                <div className="sm:col-span-7 space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {isIssueType ? 'Deskripsi Kendala Lapangan *' : 'Catatan Teknis / Keterangan Lapangan'}
                    </Label>
                    <textarea
                        rows={3}
                        disabled={isProcessing}
                        value={item.catatan}
                        onChange={(e) => onFieldChange(rowIdx, 'catatan', e.target.value)}
                        placeholder={isIssueType ? 'Jelaskan kendala lapangan atau penyebab hambatan...' : 'Contoh: Pengecoran berjalan lancar sesuai spesifikasi teknis...'}
                        className={`w-full p-2.5 text-xs bg-white dark:bg-slate-900 border ${
                            isIssueType ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                        } rounded-xl focus:outline-none focus:ring-1 resize-none`}
                    />
                </div>
            </div>
        </div>
    );
}