import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import HybridDropdown from '@/components/HybridDropdown';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Upload,
    X,
    Sliders
} from 'lucide-react';
import { router } from '@inertiajs/react';

export default function ModalPekerjaan({
    isOpen,
    onClose,
    isEditMode = false,
    selectedItem = null,
    projects = [],
    stages = []
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [fotoFile, setFotoFile] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);

    const [formData, setFormData] = useState({
        project_id: '',
        stage_id: '',
        kode_pekerjaan: '',
        nama_pekerjaan: '',
        satuan: 'Lot',
        bobot: 10.0,
        progress_percent: 0,
        status: 'PLANNING',
        tanggal_pekerjaan: new Date().toISOString().slice(0, 10),
        catatan: '',
    });

    useEffect(() => {
        if (isOpen) {
            setFotoFile(null);

            if (isEditMode && selectedItem) {
                setFormData({
                    project_id: selectedItem.project_id ? String(selectedItem.project_id) : '',
                    stage_id: selectedItem.stage_id ? String(selectedItem.stage_id) : '',
                    kode_pekerjaan: selectedItem.kode_pekerjaan || '',
                    nama_pekerjaan: selectedItem.nama_pekerjaan || '',
                    satuan: selectedItem.satuan || 'Lot',
                    bobot: selectedItem.bobot !== undefined ? selectedItem.bobot : 10.0,
                    progress_percent: selectedItem.progress_percent || 0,
                    status: selectedItem.status || 'PLANNING',
                    tanggal_pekerjaan: selectedItem.tanggal_pekerjaan
                        ? String(selectedItem.tanggal_pekerjaan).split('T')[0]
                        : new Date().toISOString().slice(0, 10),
                    catatan: selectedItem.catatan || '',
                });

                setFotoPreview(selectedItem.foto || null);
            } else {
                setFormData({
                    project_id: projects[0]?.id ? String(projects[0].id) : '',
                    stage_id: stages[0]?.id ? String(stages[0].id) : '',
                    kode_pekerjaan: '',
                    nama_pekerjaan: '',
                    satuan: 'Lot',
                    bobot: 10.0,
                    progress_percent: 0,
                    status: 'PLANNING',
                    tanggal_pekerjaan: new Date().toISOString().slice(0, 10),
                    catatan: '',
                });

                setFotoPreview(null);
            }
        }
    }, [isOpen, isEditMode, selectedItem, projects, stages]);

    const handleFieldChange = (field, value) => {
        setFormData((prev) => {
            const next = { ...prev, [field]: value };

            if (field === 'progress_percent') {
                const val = parseFloat(value) || 0;
                next.status = val >= 100
                    ? 'COMPLETED'
                    : val > 0
                        ? 'IN_PROGRESS'
                        : 'PLANNING';
            }

            return next;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFotoFile(file);
            setFotoPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveFoto = () => {
        setFotoFile(null);
        setFotoPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const payload = new FormData();

        Object.keys(formData).forEach((key) => {
            payload.append(key, formData[key] ?? '');
        });

        if (fotoFile) {
            payload.append('foto_file', fotoFile);
        }

        if (isEditMode && selectedItem) {
            payload.append('_method', 'PUT');

            router.post(route('pekerjaan.update', selectedItem.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsProcessing(false);
                    onClose();
                },
                onError: () => setIsProcessing(false),
                onFinish: () => setIsProcessing(false),
            });
        } else {
            router.post(route('pekerjaan.store'), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsProcessing(false);
                    onClose();
                },
                onError: () => setIsProcessing(false),
                onFinish: () => setIsProcessing(false),
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                isEditMode
                    ? `Edit Pekerjaan: ${selectedItem?.kode_pekerjaan || ''}`
                    : 'Tambah Rincian Pekerjaan WBS'
            }
            onSubmit={handleSubmit}
            submitLabel={isEditMode ? 'Simpan Perubahan' : 'Simpan Pekerjaan'}
            isProcessing={isProcessing}
        >
            <div className="space-y-4 text-xs">
                {/* 1. Pilih Proyek & Tahapan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                    <div className="space-y-1">
                        <Label className="text-[11px] font-bold">
                            Site Proyek *
                        </Label>

                        <HybridDropdown
                            value={formData.project_id}
                            options={projects.map((p) => ({
                                value: String(p.id),
                                label: `${p.site_id} - ${p.site_name}`
                            }))}
                            onChange={(value) =>
                                handleFieldChange('project_id', value)
                            }
                            placeholder="-- Pilih Site Proyek --"
                            searchPlaceholder="Cari site proyek..."
                            allowCustom={false}
                            className="w-full"
                            inputClassName="h-8 text-xs font-bold bg-white dark:bg-slate-950"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] font-bold">
                            Tahapan Konstruksi *
                        </Label>

                        <HybridDropdown
                            value={formData.stage_id}
                            options={stages.map((st) => ({
                                value: String(st.id),
                                label: st.nama_stage
                            }))}
                            onChange={(value) =>
                                handleFieldChange('stage_id', value)
                            }
                            placeholder="-- Pilih Tahap --"
                            searchPlaceholder="Cari tahap..."
                            allowCustom={false}
                            className="w-full"
                            inputClassName="h-8 text-xs font-bold bg-white dark:bg-slate-950"
                        />
                    </div>
                </div>

                {/* 2. Kode WBS & Uraian Pekerjaan */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px] font-bold">
                            Kode WBS *
                        </Label>

                        <Input
                            placeholder="Contoh: PND-01, ERC-02"
                            value={formData.kode_pekerjaan}
                            onChange={(e) =>
                                handleFieldChange(
                                    'kode_pekerjaan',
                                    e.target.value.toUpperCase()
                                )
                            }
                            className="h-8 text-xs font-mono font-bold bg-white dark:bg-slate-950"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                        <Label className="text-[11px] font-bold">
                            Nama Pekerjaan Fisik *
                        </Label>

                        <Input
                            placeholder="Contoh: Cor Beton K-300 & Uji Slump"
                            value={formData.nama_pekerjaan}
                            onChange={(e) =>
                                handleFieldChange(
                                    'nama_pekerjaan',
                                    e.target.value
                                )
                            }
                            className="h-8 text-xs font-semibold bg-white dark:bg-slate-950"
                            required
                        />
                    </div>
                </div>

                {/* 3. Bobot, Satuan, & Slider Progres Riil */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">
                                Bobot Kontrak (%) *
                            </Label>

                            <Input
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                placeholder="Contoh: 15.00"
                                value={formData.bobot}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'bobot',
                                        e.target.value
                                    )
                                }
                                className="h-8 text-xs font-mono font-bold bg-white dark:bg-slate-950"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px] font-bold">
                                Satuan Pengukuran
                            </Label>

                            <Input
                                placeholder="Lot, M3, Kg, Titik, Ton"
                                value={formData.satuan}
                                onChange={(e) =>
                                    handleFieldChange(
                                        'satuan',
                                        e.target.value
                                    )
                                }
                                className="h-8 text-xs font-medium bg-white dark:bg-slate-950"
                            />
                        </div>
                    </div>

                    {/* Progres Slider 0 - 100% */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                                <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Realisasi Progres Fisik:</span>
                            </div>

                            <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">
                                {formData.progress_percent}%
                            </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={formData.progress_percent}
                            onChange={(e) =>
                                handleFieldChange(
                                    'progress_percent',
                                    e.target.value
                                )
                            }
                            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                    </div>
                </div>

                {/* 4. Tanggal Pengerjaan & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[11px] font-bold">
                            Tanggal Pengerjaan Fisik *
                        </Label>

                        <Input
                            type="date"
                            value={formData.tanggal_pekerjaan}
                            onChange={(e) =>
                                handleFieldChange(
                                    'tanggal_pekerjaan',
                                    e.target.value
                                )
                            }
                            className="h-8 text-xs bg-white dark:bg-slate-950 cursor-pointer"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] font-bold">
                            Status Pekerjaan
                        </Label>

                        <HybridDropdown
                            value={formData.status}
                            options={[
                                {
                                    value: 'PLANNING',
                                    label: 'PLANNING (Rencana)'
                                },
                                {
                                    value: 'IN_PROGRESS',
                                    label: 'IN_PROGRESS (Dalam Proses)'
                                },
                                {
                                    value: 'COMPLETED',
                                    label: 'COMPLETED (Selesai 100%)'
                                }
                            ]}
                            onChange={(value) =>
                                handleFieldChange('status', value)
                            }
                            placeholder="-- Pilih Status --"
                            searchPlaceholder="Cari status..."
                            allowCustom={false}
                            className="w-full"
                            inputClassName="h-8 text-xs font-bold bg-white dark:bg-slate-950"
                        />
                    </div>
                </div>

                {/* 5. Unggah Foto Bukti ke Cloudinary */}
                <div className="space-y-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                    <Label className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                        Dokumentasi Fisik (Cloudinary Auto-Report)
                    </Label>

                    {fotoPreview ? (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center">
                            <img
                                src={fotoPreview}
                                alt="Pratinjau Foto"
                                className="h-full object-contain"
                            />

                            <button
                                type="button"
                                onClick={handleRemoveFoto}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white shadow-md hover:bg-rose-700 cursor-pointer"
                                title="Hapus Foto"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 bg-white dark:bg-slate-950 cursor-pointer transition-colors">
                            <Upload className="w-5 h-5 text-slate-400 mb-1" />

                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                Klik untuk memilih foto dokumentasi fisik
                            </span>

                            <span className="text-[9px] text-slate-400">
                                Format JPG, PNG, WEBP (Maks. 5MB)
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* 6. Catatan Tambahan Waslap */}
                <div className="space-y-1">
                    <Label className="text-[11px]">
                        Catatan / Keterangan Teknis
                    </Label>

                    <textarea
                        rows={2}
                        placeholder="Contoh: Mutu beton K-300 kubus sesuai standar, slump test 12±2 cm..."
                        value={formData.catatan}
                        onChange={(e) =>
                            handleFieldChange('catatan', e.target.value)
                        }
                        className="w-full p-2.5 text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                    />
                </div>
            </div>
        </Modal>
    );
}