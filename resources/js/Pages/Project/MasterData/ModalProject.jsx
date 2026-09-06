import React from 'react';
import Modal from '@/components/Modal';
import HybridDropdown from '@/components/HybridDropdown';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
    Radio, 
    Layers, 
    FileText, 
    MapPin, 
    Activity, 
    ExternalLink 
} from 'lucide-react';
import { useModalProjectControl, LIST_STATUS_PROYEK } from './ModalProjectControl';

export default function ModalProject({
    isOpen,
    onClose,
    isEditMode = false,
    selectedItem = null,
    areas = [],
    sows = [],
    users = []
}) {
    const {
        isProcessing,
        formData,
        setFormData,
        handleSubmitForm
    } = useModalProjectControl({ isOpen, isEditMode, selectedItem, areas, sows, users, onClose });

    const handleFieldChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const hasCoordinates = Boolean(formData.latitude && formData.longitude);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="sm:max-w-3xl"
            title={isEditMode ? `Edit Proyek: ${selectedItem?.site_id || ''}` : 'Tambah Master Proyek & Site Menara'}
            onSubmit={handleSubmitForm}
            submitLabel={isEditMode ? 'Simpan Perubahan' : 'Simpan Proyek'}
            isProcessing={isProcessing}
        >
            <div className="space-y-4 text-xs">
                {/* Banner Informasi Konteks */}
                <Alert className="bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 p-2.5 rounded-xl flex items-start gap-2 shadow-xs">
                    <Radio className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <AlertDescription className="text-xs leading-relaxed">
                        Data site menara telekomunikasi. Konfigurasi Area, Scope of Work (SOW), dan koordinat lokasi akan menentukan pemetaan sebaran dan timeline milestone proyek.
                    </AlertDescription>
                </Alert>

                {/* Bagian 1: Identitas Pokok Site Menara */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3.5 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-2">
                        <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                            1. Identitas Pokok Site Menara
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Site ID *
                            </Label>
                            <Input
                                placeholder="Contoh: SRG117, BGR021"
                                value={formData.site_id}
                                onChange={(e) => handleFieldChange('site_id', e.target.value.toUpperCase())}
                                className="h-8 text-xs font-mono font-bold bg-white dark:bg-slate-900"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Nama Site *
                            </Label>
                            <Input
                                placeholder="Contoh: LANUDGORDA, CIPARIGI"
                                value={formData.site_name}
                                onChange={(e) => handleFieldChange('site_name', e.target.value.toUpperCase())}
                                className="h-8 text-xs font-bold bg-white dark:bg-slate-900"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Project ID (PID)
                            </Label>
                            <Input
                                placeholder="Contoh: 21SF10C0013"
                                value={formData.pid}
                                onChange={(e) => handleFieldChange('pid', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Site ID DMT
                            </Label>
                            <Input
                                placeholder="ID Menara Mitratel"
                                value={formData.site_id_dmt}
                                onChange={(e) => handleFieldChange('site_id_dmt', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Site ID Tenant
                            </Label>
                            <Input
                                placeholder="ID Operator Tenant"
                                value={formData.site_id_tenant}
                                onChange={(e) => handleFieldChange('site_id_tenant', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Bagian 2: Kontrak, Wilayah, & Penanggung Jawab */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3.5 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-2">
                        <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                            2. Kontrak & Penanggung Jawab
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Area Operasional *
                            </Label>
                            <HybridDropdown
                                value={formData.area_id}
                                options={areas.map((a) => ({
                                    value: String(a.id),
                                    label: a.nama_area,
                                    subLabel: a.regional
                                }))}
                                onChange={(value) => handleFieldChange('area_id', value)}
                                placeholder="-- Pilih Area --"
                                searchPlaceholder="Cari area..."
                                allowCustom={false}
                                className="w-full"
                                inputClassName="h-8 text-xs font-semibold bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Scope of Work (SOW) *
                            </Label>
                            <HybridDropdown
                                value={formData.sow_id}
                                options={sows.map((s) => ({
                                    value: String(s.id),
                                    label: s.nama_sow
                                }))}
                                onChange={(value) => handleFieldChange('sow_id', value)}
                                placeholder="-- Pilih SOW --"
                                searchPlaceholder="Cari SOW..."
                                allowCustom={false}
                                className="w-full"
                                inputClassName="h-8 text-xs font-bold bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                PIC Waslap Lapangan
                            </Label>
                            <HybridDropdown
                                value={formData.pic_user_id}
                                options={users.map((u) => ({
                                    value: String(u.id),
                                    label: u.name
                                }))}
                                onChange={(value) => handleFieldChange('pic_user_id', value)}
                                placeholder="-- Pilih PIC --"
                                searchPlaceholder="Cari PIC..."
                                allowCustom={false}
                                className="w-full"
                                inputClassName="h-8 text-xs font-semibold bg-white dark:bg-slate-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Klien / Operator Pemilik
                            </Label>
                            <Input
                                value={formData.client_name}
                                onChange={(e) => handleFieldChange('client_name', e.target.value)}
                                className="h-8 text-xs bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Konsultan Pengawas
                            </Label>
                            <Input
                                value={formData.konsultan}
                                onChange={(e) => handleFieldChange('konsultan', e.target.value)}
                                className="h-8 text-xs bg-white dark:bg-slate-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Nomor PO / SPK
                            </Label>
                            <Input
                                placeholder="Contoh: 4100088581"
                                value={formData.no_po}
                                onChange={(e) => handleFieldChange('no_po', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Tanggal PO / SPK
                            </Label>
                            <Input
                                type="date"
                                value={formData.tgl_po}
                                onChange={(e) => handleFieldChange('tgl_po', e.target.value)}
                                className="h-8 text-xs bg-white dark:bg-slate-900 cursor-pointer"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Target RFI
                            </Label>
                            <Input
                                type="date"
                                value={formData.target_rfi_date}
                                onChange={(e) => handleFieldChange('target_rfi_date', e.target.value)}
                                className="h-8 text-xs bg-white dark:bg-slate-900 cursor-pointer font-bold text-blue-600 dark:text-blue-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Bagian 3: Spesifikasi Teknis & Koordinat Lapangan */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3.5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                                3. Spesifikasi Menara & Lokasi Koordinat
                            </span>
                        </div>
                        {hasCoordinates && (
                            <a
                                href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <ExternalLink className="w-3 h-3" />
                                <span>Cek Google Maps</span>
                            </a>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Tipe Menara
                            </Label>
                            <Input
                                placeholder="SST 4 LEGS, Monopole, Guyed"
                                value={formData.tipe_tower}
                                onChange={(e) => handleFieldChange('tipe_tower', e.target.value)}
                                className="h-8 text-xs font-semibold bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Tinggi Menara
                            </Label>
                            <Input
                                placeholder="52M, 42M, 32M"
                                value={formData.tinggi_tower}
                                onChange={(e) => handleFieldChange('tinggi_tower', e.target.value)}
                                className="h-8 text-xs font-semibold bg-white dark:bg-slate-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Latitude (Garis Lintang)
                            </Label>
                            <Input
                                type="number"
                                step="0.00000001"
                                placeholder="-6.07123400"
                                value={formData.latitude}
                                onChange={(e) => handleFieldChange('latitude', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Longitude (Garis Bujur)
                            </Label>
                            <Input
                                type="number"
                                step="0.00000001"
                                placeholder="106.35412300"
                                value={formData.longitude}
                                onChange={(e) => handleFieldChange('longitude', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-900"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            Alamat Lengkap Site
                        </Label>
                        <Input
                            placeholder="Desa, Kecamatan, Kabupaten, Patokan Akses Jalan..."
                            value={formData.alamat_site}
                            onChange={(e) => handleFieldChange('alamat_site', e.target.value)}
                            className="h-8 text-xs bg-white dark:bg-slate-900"
                        />
                    </div>
                </div>

                {/* Bagian 4: Status Operasional & Catatan */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3.5 shadow-xs">
                    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-2">
                        <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                            4. Status Operasional & Catatan
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Status Operasional Proyek *
                            </Label>
                            <HybridDropdown
                                value={formData.status}
                                options={LIST_STATUS_PROYEK.map((st) => ({
                                    value: st,
                                    label: st
                                }))}
                                onChange={(value) => handleFieldChange('status', value)}
                                placeholder="-- Pilih Status --"
                                searchPlaceholder="Cari status..."
                                allowCustom={false}
                                className="w-full"
                                inputClassName="h-8 text-xs font-bold bg-white dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Status Proses Klien
                            </Label>
                            <Input
                                placeholder="Contoh: jaguar, mitratel"
                                value={formData.proses_status}
                                onChange={(e) => handleFieldChange('proses_status', e.target.value)}
                                className="h-8 text-xs bg-white dark:bg-slate-900"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            Catatan / Keterangan Khusus Lapangan
                        </Label>
                        <textarea
                            rows={3}
                            placeholder="Catatan kendala lahan, perizinan warga, atau instruksi kerja khusus..."
                            value={formData.catatan_proyek}
                            onChange={(e) => handleFieldChange('catatan_proyek', e.target.value)}
                            className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}