import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
            <div className="space-y-3 text-xs">
                <div className="space-y-1">
                    <Label className="font-bold">Nama Area *</Label>
                    <Input
                        placeholder="Contoh: AREA 1, AREA 2"
                        value={data.nama_area}
                        onChange={(e) => setData('nama_area', e.target.value)}
                        className="h-8 bg-white dark:bg-slate-950 font-semibold"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-bold">Regional / Provinsi *</Label>
                    <Input
                        placeholder="Contoh: Jawa Barat, Banten, Jabodetabek"
                        value={data.regional}
                        onChange={(e) => setData('regional', e.target.value)}
                        className="h-8 bg-white dark:bg-slate-950 font-semibold"
                        required
                    />
                </div>
            </div>
        </Modal>
    );
}