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
    Sliders,
    Minus,
    Plus,
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
    const handleProgressChange = (val) => {
        const parsed = parseFloat(val);
        const nextVal = isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
        const nextStatus = nextVal >= 100 ? 'COMPLETED' : nextVal > 0 ? 'IN_PROGRESS' : 'PLANNING';
        
        onFieldChange(rowIdx, 'progress_percent', nextVal);
        onFieldChange(rowIdx, 'status', nextStatus);
    };

    const handleProgressStep = (delta) => {
        const current = parseFloat(item.progress_percent) || 0;
        handleProgressChange(current + delta);
    };

    const handleBobotChange = (val) => {
        const parsed = parseFloat(val);
        const nextVal = isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
        onFieldChange(rowIdx, 'bobot', nextVal);
    };

    const handleBobotStep = (delta) => {
        const current = parseFloat(item.bobot) || 0;
        const nextVal = Math.min(100, Math.max(0, Number((current + delta).toFixed(2))));
        onFieldChange(rowIdx, 'bobot', nextVal);
    };

    const currentProgress = parseFloat(item.progress_percent) || 0;
    const isIssueType = item.tipe_foto === 'ISSUE';

    return (
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 relative group space-y-4 transition-all shadow-xs">
            {/* Header Baris */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2.5">
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-xs font-mono">
                        {rowIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Item Pekerjaan #{rowIdx + 1}
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

            {/* Kolom 1: Tahapan Konstruksi & Kode WBS */}
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

            {/* Kolom 2: Uraian Pekerjaan & Satuan */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-9 space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Uraian Pekerjaan Fisik *
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
            </div>

            {/* Kolom 3: Tanggal Pelaksanaan & Bobot Kontrak (2 Kolom Lebar) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                        <span>Tanggal Pelaksanaan *</span>
                    </Label>
                    <Input
                        type="date"
                        disabled={isProcessing}
                        value={item.tanggal_pekerjaan}
                        onChange={(e) => onFieldChange(rowIdx, 'tanggal_pekerjaan', e.target.value)}
                        className="h-8 text-xs bg-white dark:bg-slate-900 font-mono cursor-pointer text-slate-800 dark:text-slate-200 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Bobot Kontrak (%) *
                    </Label>
                    <div className="flex items-center">
                        <button
                            type="button"
                            disabled={isProcessing || (parseFloat(item.bobot) || 0) <= 0}
                            onClick={() => handleBobotStep(-1)}
                            className="h-8 w-8 rounded-l-lg border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs disabled:opacity-40 cursor-pointer"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            disabled={isProcessing}
                            value={item.bobot}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) => handleBobotChange(e.target.value)}
                            placeholder="10.00"
                            className="h-8 w-full text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            required
                        />
                        <button
                            type="button"
                            disabled={isProcessing || (parseFloat(item.bobot) || 0) >= 100}
                            onClick={() => handleBobotStep(1)}
                            className="h-8 w-8 rounded-r-lg border border-l-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs disabled:opacity-40 cursor-pointer"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Kolom 4: Bar Progres Interaktif Berwarna */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                        <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Realisasi Progres Fisik:</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            disabled={isProcessing || currentProgress <= 0}
                            onClick={() => handleProgressStep(-5)}
                            className="h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs disabled:opacity-40 cursor-pointer transition-colors"
                            title="Kurang 5%"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        
                        <div className="relative w-16">
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                step="1"
                                disabled={isProcessing}
                                value={item.progress_percent}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => handleProgressChange(e.target.value)}
                                className="h-7 px-1 text-center font-mono font-bold text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">%</span>

                        <button
                            type="button"
                            disabled={isProcessing || currentProgress >= 100}
                            onClick={() => handleProgressStep(5)}
                            className="h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs disabled:opacity-40 cursor-pointer transition-colors"
                            title="Tambah 5%"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                <div className="py-1">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        disabled={isProcessing}
                        value={currentProgress}
                        onChange={(e) => handleProgressChange(e.target.value)}
                        style={{
                            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${currentProgress}%, #334155 ${currentProgress}%, #334155 100%)`
                        }}
                        className="w-full h-2.5 rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                </div>
            </div>

            {/* Kolom 5: Foto Dokumen / Issue & Catatan Lapangan */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                <div className="sm:col-span-5 space-y-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <Camera className="w-3 h-3 text-slate-400" />
                            <span>Unggah Foto</span>
                        </Label>

                        {/* Switcher Jenis Foto: Progres vs Issue */}
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
                                <span>Progres</span>
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
                                    {isIssueType ? 'Akan masuk ke Tab Issue' : 'Akan masuk ke Tab Foto'}
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
                                {isIssueType ? 'Unggah Bukti Kendala (Issue)' : 'Unggah Foto Progres'}
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
                        {isIssueType ? 'Deskripsi Kendala / Catatan Isu Lapangan *' : 'Catatan Teknis / Keterangan Lapangan'}
                    </Label>
                    <textarea
                        rows={3}
                        disabled={isProcessing}
                        value={item.catatan}
                        onChange={(e) => onFieldChange(rowIdx, 'catatan', e.target.value)}
                        placeholder={isIssueType ? 'Jelaskan kendala lapangan, penyebab hambatan, atau instruksi perbaikan...' : 'Contoh: Slump test 12±2 cm, pengecoran berjalan lancar sesuai spesifikasi...'}
                        className={`w-full p-2.5 text-xs bg-white dark:bg-slate-900 border ${
                            isIssueType ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                        } rounded-xl focus:outline-none focus:ring-1 resize-none`}
                    />
                </div>
            </div>
        </div>
    );
}