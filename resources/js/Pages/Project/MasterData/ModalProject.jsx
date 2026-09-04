import React from 'react';
import Modal from '@/components/Modal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
    PlusCircle, 
    Trash2, 
    ClipboardPaste, 
    AlertCircle 
} from 'lucide-react';
import HybridDropdown from '@/components/HybridDropdown';
import { 
    useModalProjectControl, 
    MAX_ROWS_LIMIT,
    LIST_STATUS_PROYEK 
} from './ModalProjectControl';

export default function ModalProject({
    isOpen,
    onClose,
    isEditMode = false,
    selectedItem = null,
    existingOptions = {}
}) {
    const {
        isProcessing,
        editData,
        setEditData,
        addItems,
        tipeTowerOptions,
        tinggiTowerOptions,
        wilayahOptions,
        clientOptions,
        konsultanOptions,
        handleContainerPaste,
        handlePasteFromClipboardButton,
        handleAddMoreRows,
        handleRemoveAddRow,
        handleAddItemChange,
        handleSubmitForm
    } = useModalProjectControl({ isOpen, isEditMode, selectedItem, existingOptions, onClose });

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
            title={isEditMode ? 'Edit Data Site Proyek' : 'Tambah Master Proyek & Site Menara'}
            onSubmit={handleSubmitForm}
            submitLabel={isEditMode ? 'Simpan Perubahan' : 'Simpan Semua Proyek'}
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
                            className={`text-[11px] font-mono font-bold ${
                                addItems.length >= MAX_ROWS_LIMIT
                                    ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40'
                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                            }`}
                        >
                            {addItems.length} / {MAX_ROWS_LIMIT} Baris
                        </Badge>
                    </div>
                )
            }
        >
            {!isEditMode && (
                <Alert className="shrink-0 mb-3 bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 p-3 rounded-xl flex items-start gap-2.5 shadow-xs">
                    <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <AlertDescription className="text-xs leading-relaxed">
                        <strong>Smart Input Proyek:</strong> Kamu dapat mengisi langsung kolom per baris atau copy kolom dari Excel (Site ID, Nama Site, PID, Tipe Tower, Tinggi, Wilayah, Klien, Target RFI) lalu tekan tombol <strong>Paste dari Excel</strong>.
                    </AlertDescription>
                </Alert>
            )}

            <div className="space-y-4">
                {isEditMode ? (
                    <div className="space-y-3 p-1">
                        {/* Baris 1: Site ID, Nama Site, PID */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-4 space-y-1.5">
                                <Label className="text-xs font-semibold">Site ID *</Label>
                                <Input 
                                    disabled={isProcessing}
                                    value={editData.site_id || ''} 
                                    onChange={(e) => setEditData({ ...editData, site_id: e.target.value.toUpperCase() })} 
                                    placeholder="Contoh: SRG117" 
                                    className="h-8 text-xs font-mono font-bold uppercase"
                                    required 
                                />
                            </div>
                            <div className="sm:col-span-5 space-y-1.5">
                                <Label className="text-xs font-semibold">Nama Site *</Label>
                                <Input 
                                    disabled={isProcessing}
                                    value={editData.site_name || ''} 
                                    onChange={(e) => setEditData({ ...editData, site_name: e.target.value.toUpperCase() })} 
                                    placeholder="Contoh: LANUDGORDA" 
                                    className="h-8 text-xs font-semibold uppercase"
                                    required 
                                />
                            </div>
                            <div className="sm:col-span-3 space-y-1.5">
                                <Label className="text-xs font-semibold">PID / WBS</Label>
                                <Input 
                                    disabled={isProcessing}
                                    value={editData.pid || ''} 
                                    onChange={(e) => setEditData({ ...editData, pid: e.target.value })} 
                                    placeholder="Contoh: 24TS01B0531" 
                                    className="h-8 text-xs font-mono"
                                />
                            </div>
                        </div>

                        {/* Baris 2: Spesifikasi Tower & Wilayah */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-5 space-y-1.5">
                                <Label className="text-xs font-semibold">Tipe Menara *</Label>
                                <HybridDropdown
                                    value={editData.tipe_tower || 'SST 4 LEGS'}
                                    options={tipeTowerOptions}
                                    onChange={(val) => setEditData({ ...editData, tipe_tower: val })}
                                    placeholder="Pilih tipe menara..."
                                    searchPlaceholder="Cari tipe..."
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="sm:col-span-3 space-y-1.5">
                                <Label className="text-xs font-semibold">Tinggi Menara *</Label>
                                <HybridDropdown
                                    value={editData.tinggi_tower || '52M'}
                                    options={tinggiTowerOptions}
                                    onChange={(val) => setEditData({ ...editData, tinggi_tower: val })}
                                    placeholder="Tinggi..."
                                    searchPlaceholder="Cari tinggi..."
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="sm:col-span-4 space-y-1.5">
                                <Label className="text-xs font-semibold">Wilayah / Kota-Kab</Label>
                                <HybridDropdown
                                    value={editData.wilayah || ''}
                                    options={wilayahOptions}
                                    onChange={(val) => setEditData({ ...editData, wilayah: val })}
                                    placeholder="Wilayah..."
                                    searchPlaceholder="Cari wilayah..."
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>

                        {/* Baris 3: Klien & Konsultan */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-6 space-y-1.5">
                                <Label className="text-xs font-semibold">Klien / Operator</Label>
                                <HybridDropdown
                                    value={editData.client_name || 'Telkomsel / Mitratel'}
                                    options={clientOptions}
                                    onChange={(val) => setEditData({ ...editData, client_name: val })}
                                    placeholder="Klien..."
                                    searchPlaceholder="Cari klien..."
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="sm:col-span-6 space-y-1.5">
                                <Label className="text-xs font-semibold">Konsultan Pengawas</Label>
                                <HybridDropdown
                                    value={editData.konsultan || 'PT. ATRYA REKAYASA'}
                                    options={konsultanOptions}
                                    onChange={(val) => setEditData({ ...editData, konsultan: val })}
                                    placeholder="Konsultan..."
                                    searchPlaceholder="Cari konsultan..."
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>

                        {/* Baris 4: Koordinat & Alamat */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                            <div className="sm:col-span-4 space-y-1.5">
                                <Label className="text-xs font-semibold">Koordinat GPS (Lat, Long)</Label>
                                <Input 
                                    disabled={isProcessing}
                                    value={editData.lat_long || ''} 
                                    onChange={(e) => setEditData({ ...editData, lat_long: e.target.value })} 
                                    placeholder="-6.1234, 106.5678" 
                                    className="h-8 text-xs font-mono"
                                />
                            </div>
                            <div className="sm:col-span-8 space-y-1.5">
                                <Label className="text-xs font-semibold">Alamat Detail Site</Label>
                                <Input 
                                    disabled={isProcessing}
                                    value={editData.alamat_site || ''} 
                                    onChange={(e) => setEditData({ ...editData, alamat_site: e.target.value })} 
                                    placeholder="Detail lokasi pembangunan..." 
                                    className="h-8 text-xs"
                                />
                            </div>
                        </div>

                        {/* Baris 5: Status, Bobot, Target RFI */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="sm:col-span-4 space-y-1.5">
                                <Label className="text-xs font-semibold">Tahap Pekerjaan *</Label>
                                <HybridDropdown
                                    value={editData.status || 'PLANNING'}
                                    options={LIST_STATUS_PROYEK}
                                    onChange={(val) => setEditData({ ...editData, status: val })}
                                    placeholder="Status..."
                                    searchPlaceholder="Cari status..."
                                    allowCustom={false}
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="sm:col-span-4 space-y-1.5">
                                <Label className="text-xs font-semibold">Bobot Progress (%)</Label>
                                <Input 
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    max={100}
                                    disabled={isProcessing}
                                    value={editData.progress_percent || 0} 
                                    onChange={(e) => setEditData({ ...editData, progress_percent: parseFloat(e.target.value) || 0 })} 
                                    className="h-8 text-xs font-bold"
                                />
                            </div>
                            <div className="sm:col-span-4 space-y-1.5">
                                <Label className="text-xs font-semibold">Target RFI</Label>
                                <Input 
                                    type="date"
                                    disabled={isProcessing}
                                    value={editData.target_rfi_date || ''} 
                                    onChange={(e) => setEditData({ ...editData, target_rfi_date: e.target.value })} 
                                    className="h-8 text-xs"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Multi-Row Add Mode */
                    <div className="space-y-4">
                        {addItems.map((item, idx) => (
                            <div key={`add-row-${idx}`} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 relative space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                        Site Proyek #{idx + 1}
                                    </span>
                                    {addItems.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveAddRow(idx)}
                                            className="h-7 px-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 text-xs gap-1 cursor-pointer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Hapus Baris
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {/* Baris 1: Site ID, Nama Site, PID */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                        <div className="sm:col-span-4 space-y-1">
                                            <Label className="text-[11px] font-medium">Site ID *</Label>
                                            <Input 
                                                disabled={isProcessing}
                                                value={item.site_id} 
                                                onChange={(e) => handleAddItemChange(idx, 'site_id', e.target.value)} 
                                                placeholder="Contoh: SRG117" 
                                                className="h-8 text-xs bg-white dark:bg-slate-900 font-mono font-bold uppercase"
                                                required 
                                            />
                                        </div>
                                        <div className="sm:col-span-5 space-y-1">
                                            <Label className="text-[11px] font-medium">Nama Site *</Label>
                                            <Input 
                                                disabled={isProcessing}
                                                value={item.site_name} 
                                                onChange={(e) => handleAddItemChange(idx, 'site_name', e.target.value)} 
                                                placeholder="Contoh: LANUDGORDA" 
                                                className="h-8 text-xs bg-white dark:bg-slate-900 font-semibold uppercase"
                                                required 
                                            />
                                        </div>
                                        <div className="sm:col-span-3 space-y-1">
                                            <Label className="text-[11px] font-medium">PID / WBS</Label>
                                            <Input 
                                                disabled={isProcessing}
                                                value={item.pid} 
                                                onChange={(e) => handleAddItemChange(idx, 'pid', e.target.value)} 
                                                placeholder="24TS01B0531" 
                                                className="h-8 text-xs bg-white dark:bg-slate-900 font-mono"
                                            />
                                        </div>
                                    </div>

                                    {/* Baris 2: Tipe, Tinggi, Wilayah */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                        <div className="sm:col-span-4 space-y-1">
                                            <Label className="text-[11px] font-medium">Tipe Menara *</Label>
                                            <HybridDropdown
                                                value={item.tipe_tower}
                                                options={tipeTowerOptions}
                                                onChange={(val) => handleAddItemChange(idx, 'tipe_tower', val)}
                                                placeholder="Tipe Menara..."
                                                searchPlaceholder="Cari tipe..."
                                                disabled={isProcessing}
                                            />
                                        </div>
                                        <div className="sm:col-span-4 space-y-1">
                                            <Label className="text-[11px] font-medium">Tinggi Menara *</Label>
                                            <HybridDropdown
                                                value={item.tinggi_tower}
                                                options={tinggiTowerOptions}
                                                onChange={(val) => handleAddItemChange(idx, 'tinggi_tower', val)}
                                                placeholder="Tinggi..."
                                                searchPlaceholder="Cari tinggi..."
                                                disabled={isProcessing}
                                            />
                                        </div>
                                        <div className="sm:col-span-4 space-y-1">
                                            <Label className="text-[11px] font-medium">Wilayah</Label>
                                            <HybridDropdown
                                                value={item.wilayah}
                                                options={wilayahOptions}
                                                onChange={(val) => handleAddItemChange(idx, 'wilayah', val)}
                                                placeholder="Wilayah..."
                                                searchPlaceholder="Cari wilayah..."
                                                disabled={isProcessing}
                                            />
                                        </div>
                                    </div>

                                    {/* Baris 3: Klien, Target RFI, Status */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                        <div className="sm:col-span-5 space-y-1">
                                            <Label className="text-[11px] font-medium">Klien / Operator</Label>
                                            <HybridDropdown
                                                value={item.client_name}
                                                options={clientOptions}
                                                onChange={(val) => handleAddItemChange(idx, 'client_name', val)}
                                                placeholder="Klien..."
                                                searchPlaceholder="Cari klien..."
                                                disabled={isProcessing}
                                            />
                                        </div>
                                        <div className="sm:col-span-4 space-y-1">
                                            <Label className="text-[11px] font-medium">Target RFI</Label>
                                            <Input 
                                                type="date"
                                                disabled={isProcessing}
                                                value={item.target_rfi_date} 
                                                onChange={(e) => handleAddItemChange(idx, 'target_rfi_date', e.target.value)} 
                                                className="h-8 text-xs bg-white dark:bg-slate-900"
                                            />
                                        </div>
                                        <div className="sm:col-span-3 space-y-1">
                                            <Label className="text-[11px] font-medium">Status *</Label>
                                            <HybridDropdown
                                                value={item.status}
                                                options={LIST_STATUS_PROYEK}
                                                onChange={(val) => handleAddItemChange(idx, 'status', val)}
                                                placeholder="Status..."
                                                searchPlaceholder="Cari status..."
                                                allowCustom={false}
                                                disabled={isProcessing}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center gap-2 pt-1">
                            <Button type="button" variant="outline" size="sm" onClick={() => handleAddMoreRows(1)} className="h-8 text-xs gap-1.5 cursor-pointer">
                                <PlusCircle className="w-3.5 h-3.5" /> <span>Tambah 1 Baris</span>
                            </Button>
                            <Button type="button" variant="outline" size="sm" onClick={() => handleAddMoreRows(5)} className="h-8 text-xs gap-1.5 cursor-pointer">
                                <PlusCircle className="w-3.5 h-3.5" /> <span>Tambah 5 Baris</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}