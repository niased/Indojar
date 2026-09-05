import React from 'react';
import Modal from '@/components/Modal';
import HybridDropdown from '@/components/HybridDropdown';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from 'lucide-react';
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
            title={isEditMode ? `Edit Proyek: ${selectedItem?.site_id || ''}` : 'Tambah Master Proyek & Site Menara'}
            onSubmit={handleSubmitForm}
            submitLabel={isEditMode ? 'Simpan Perubahan' : 'Simpan Proyek'}
            isProcessing={isProcessing}
        >
            <div className="space-y-4 text-xs">
                {/* 1. Identitas Pokok Site Menara */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                        1. Identitas Pokok Site Menara
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">Site ID *</Label>
                            <Input
                                placeholder="Contoh: SRG117, BGR021"
                                value={formData.site_id}
                                onChange={(e) => handleFieldChange('site_id', e.target.value.toUpperCase())}
                                className="h-8 text-xs font-mono font-bold bg-white dark:bg-slate-950"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">Nama Site *</Label>
                            <Input
                                placeholder="Contoh: LANUDGORDA, CIPARIGI"
                                value={formData.site_name}
                                onChange={(e) => handleFieldChange('site_name', e.target.value.toUpperCase())}
                                className="h-8 text-xs font-bold bg-white dark:bg-slate-950"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px]">Project ID (PID)</Label>
                            <Input
                                placeholder="Contoh: 21SF10C0013"
                                value={formData.pid}
                                onChange={(e) => handleFieldChange('pid', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-950"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px]">Site ID DMT</Label>
                            <Input
                                placeholder="ID Menara Mitratel"
                                value={formData.site_id_dmt}
                                onChange={(e) => handleFieldChange('site_id_dmt', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-950"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px]">Site ID Tenant</Label>
                            <Input
                                placeholder="ID Operator Tenant"
                                value={formData.site_id_tenant}
                                onChange={(e) => handleFieldChange('site_id_tenant', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-950"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Klasifikasi Kontrak & Teritori */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                        2. Klasifikasi Kontrak & Penanggung Jawab
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">Area Operasional *</Label>
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
                                inputClassName="h-8 text-xs font-semibold bg-white dark:bg-slate-950"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">Scope of Work (SOW) *</Label>
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
                                inputClassName="h-8 text-xs font-bold bg-white dark:bg-slate-950"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">PIC Waslap Lapangan</Label>
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
                                inputClassName="h-8 text-xs font-semibold bg-white dark:bg-slate-950"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px]">Klien / Operator Pemilik</Label>
                            <Input
                                value={formData.client_name}
                                onChange={(e) => handleFieldChange('client_name', e.target.value)}
                                className="h-8 text-xs bg-white dark:bg-slate-950"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px]">Konsultan Pengawas</Label>
                            <Input
                                value={formData.konsultan}
                                onChange={(e) => handleFieldChange('konsultan', e.target.value)}
                                className="h-8 text-xs bg-white dark:bg-slate-950"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Legalitas Kontrak & No. PO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px]">Nomor PO / SPK</Label>
                        <Input
                            placeholder="Contoh: 4100088581"
                            value={formData.no_po}
                            onChange={(e) => handleFieldChange('no_po', e.target.value)}
                            className="h-8 text-xs font-mono bg-white dark:bg-slate-950"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px]">Tanggal PO / SPK</Label>
                        <Input
                            type="date"
                            value={formData.tgl_po}
                            onChange={(e) => handleFieldChange('tgl_po', e.target.value)}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px]">Target RFI</Label>
                        <Input
                            type="date"
                            value={formData.target_rfi_date}
                            onChange={(e) => handleFieldChange('target_rfi_date', e.target.value)}
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer font-bold text-emerald-600 dark:text-emerald-400"
                        />
                    </div>
                </div>

                {/* 4. Spesifikasi Menara & Lokasi Koordinat */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            3. Spesifikasi Menara & Koordinat Lapangan
                        </span>

                        {hasCoordinates && (
                            <a
                                href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <ExternalLink className="w-3 h-3" />
                                <span>Cek Peta</span>
                            </a>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px]">Tipe Menara</Label>
                            <Input
                                placeholder="SST 4 LEGS, Monopole, Guyed"
                                value={formData.tipe_tower}
                                onChange={(e) => handleFieldChange('tipe_tower', e.target.value)}
                                className="h-8 text-xs font-semibold bg-white dark:bg-slate-950"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px]">Tinggi Menara</Label>
                            <Input
                                placeholder="52M, 42M, 32M"
                                value={formData.tinggi_tower}
                                onChange={(e) => handleFieldChange('tinggi_tower', e.target.value)}
                                className="h-8 text-xs font-semibold bg-white dark:bg-slate-950"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">Latitude (Lintang)</Label>
                            <Input
                                type="number"
                                step="0.00000001"
                                placeholder="-6.07123400"
                                value={formData.latitude}
                                onChange={(e) => handleFieldChange('latitude', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-950"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">Longitude (Bujur)</Label>
                            <Input
                                type="number"
                                step="0.00000001"
                                placeholder="106.35412300"
                                value={formData.longitude}
                                onChange={(e) => handleFieldChange('longitude', e.target.value)}
                                className="h-8 text-xs font-mono bg-white dark:bg-slate-950"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px]">Alamat Lengkap Site</Label>
                        <Input
                            placeholder="Desa, Kecamatan, Kabupaten, Patokan Akses Jalan..."
                            value={formData.alamat_site}
                            onChange={(e) => handleFieldChange('alamat_site', e.target.value)}
                            className="h-8 text-xs bg-white dark:bg-slate-950"
                        />
                    </div>
                </div>

                {/* 5. Status & Catatan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px] font-bold">Status Operasional Proyek</Label>
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
                            inputClassName="h-8 text-xs font-bold bg-white dark:bg-slate-950"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px]">Status Proses Klien</Label>
                        <Input
                            placeholder="Contoh: jaguar, mitratel"
                            value={formData.proses_status}
                            onChange={(e) => handleFieldChange('proses_status', e.target.value)}
                            className="h-8 text-xs bg-white dark:bg-slate-950"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="text-[11px]">Catatan / Keterangan Khusus</Label>
                    <textarea
                        rows={2}
                        placeholder="Catatan kendala lahan, izin warga, atau instruksi khusus..."
                        value={formData.catatan_proyek}
                        onChange={(e) => handleFieldChange('catatan_proyek', e.target.value)}
                        className="w-full p-2.5 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                    />
                </div>
            </div>
        </Modal>
    );
}