import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';

export default function ModalArea({
    isOpen,
    onClose,
    isEditMode = false,
    selectedItem = null,
}) {
    const { data, setData, post, processing, reset } = useForm({
        nama_area: '',
        regional: '',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                setData({
                    nama_area: selectedItem.nama_area || '',
                    regional: selectedItem.regional || '',
                });
            } else {
                setData({ nama_area: '', regional: '' });
            }
        } else {
            reset();
        }
    }, [isOpen, isEditMode, selectedItem]);

    const handleSubmit = (e) => {
        e?.preventDefault();
        post(route('master-data.area.store'), {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? `Edit Area: ${selectedItem?.nama_area || ''}` : 'Tambah Master Area Operasional'}
            onSubmit={handleSubmit}
            submitLabel={isEditMode ? 'Simpan Perubahan' : 'Simpan Area'}
            isProcessing={processing}
        >
            <div className="space-y-4 text-xs">
                {/* Banner Konteks */}
                <Alert className="bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 p-2.5 rounded-xl flex items-start gap-2 shadow-xs">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <AlertDescription className="text-xs leading-relaxed">
                        Area operasional dan regional digunakan untuk pemetaan sebaran site menara serta filter laporan proyek.
                    </AlertDescription>
                </Alert>

                {/* Kontainer Form Input */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Nama Area *
                            </Label>
                            <Input
                                placeholder="Contoh: AREA 1, AREA 2"
                                value={data.nama_area}
                                onChange={(e) => setData('nama_area', e.target.value.toUpperCase())}
                                className="h-8 text-xs font-bold uppercase bg-white dark:bg-slate-900"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                Regional / Provinsi *
                            </Label>
                            <Input
                                placeholder="Contoh: Jawa Barat, Banten"
                                value={data.regional}
                                onChange={(e) => setData('regional', e.target.value)}
                                className="h-8 text-xs font-semibold bg-white dark:bg-slate-900"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}