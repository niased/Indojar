import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Layers, Minus, Plus } from 'lucide-react';

export default function ModalStage({ 
    isOpen, 
    onClose, 
    isEditMode = false, 
    selectedItem = null, 
    stagesCount = 0 
}) {
    const { data, setData, post, put, processing, reset } = useForm({
        kode_stage: '',
        nama_stage: '',
        urutan: stagesCount + 1,
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                setData({
                    kode_stage: selectedItem.kode_stage || '',
                    nama_stage: selectedItem.nama_stage || '',
                    urutan: selectedItem.urutan || 1,
                });
            } else {
                setData({
                    kode_stage: '',
                    nama_stage: '',
                    urutan: stagesCount + 1,
                });
            }
        } else {
            reset();
        }
    }, [isOpen, isEditMode, selectedItem, stagesCount]);

    const handleUrutanStep = (delta) => {
        const current = parseInt(data.urutan, 10) || 1;
        setData('urutan', Math.max(1, current + delta));
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (isEditMode && selectedItem) {
            put(route('master-data.stage.update', selectedItem.id), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            post(route('master-data.stage.store'), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? `Edit Tahapan: ${selectedItem?.nama_stage || ''}` : 'Tambah Tahapan Konstruksi Standar'}
            onSubmit={handleSubmit}
            submitLabel={isEditMode ? 'Simpan Perubahan' : 'Simpan Tahapan'}
            isProcessing={processing}
        >
            <div className="space-y-4 text-xs">
                <Alert className="bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 p-2.5 rounded-xl flex items-start gap-2 shadow-xs">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <AlertDescription className="text-xs leading-relaxed">
                        Tahapan ini menjadi referensi fase kerja pada rincian WBS proyek dan ditampilkan pada grafik progres sidebar site menara.
                    </AlertDescription>
                </Alert>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-7 space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Kode Tahapan *
                            </Label>
                            <Input
                                placeholder="Contoh: CIVIL, ERECTION, CME"
                                value={data.kode_stage}
                                onChange={(e) => setData('kode_stage', e.target.value.toUpperCase())}
                                className="h-8 text-xs bg-white dark:bg-slate-900 font-mono font-bold uppercase"
                                required
                            />
                        </div>

                        <div className="sm:col-span-5 space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Urutan Fase *
                            </Label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    disabled={processing || data.urutan <= 1}
                                    onClick={() => handleUrutanStep(-1)}
                                    className="h-8 w-8 rounded-l-lg border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs disabled:opacity-40 cursor-pointer"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <Input
                                    type="number"
                                    min="1"
                                    value={data.urutan}
                                    onChange={(e) => setData('urutan', parseInt(e.target.value, 10) || 1)}
                                    className="h-8 w-full text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    required
                                />
                                <button
                                    type="button"
                                    disabled={processing}
                                    onClick={() => handleUrutanStep(1)}
                                    className="h-8 w-8 rounded-r-lg border border-l-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs disabled:opacity-40 cursor-pointer"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            Nama Lengkap Tahapan *
                        </Label>
                        <Input
                            placeholder="Contoh: Pekerjaan Pondasi & Sipil"
                            value={data.nama_stage}
                            onChange={(e) => setData('nama_stage', e.target.value)}
                            className="h-8 text-xs bg-white dark:bg-slate-900 font-semibold"
                            required
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}