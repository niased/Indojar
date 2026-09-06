import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Layers, ListOrdered } from 'lucide-react';

export default function ModalStageTask({
    isOpen,
    onClose,
    stages = [],
    sows = [],
    stagesCount = 0,
}) {
    const [modalType, setModalType] = useState('TASK'); // 'TASK' | 'STAGE'

    const stageForm = useForm({
        kode_stage: '',
        nama_stage: '',
        urutan: stagesCount + 1,
    });

    const taskForm = useForm({
        stage_id: stages[0]?.id ? String(stages[0].id) : '',
        sow_id: '',
        nama_task: '',
        satuan: 'Lot',
        default_bobot: 5.0,
        urutan: 1,
    });

    useEffect(() => {
        if (isOpen) {
            stageForm.setData({
                kode_stage: '',
                nama_stage: '',
                urutan: stagesCount + 1,
            });
            taskForm.setData({
                stage_id: stages[0]?.id ? String(stages[0].id) : '',
                sow_id: '',
                nama_task: '',
                satuan: 'Lot',
                default_bobot: 5.0,
                urutan: 1,
            });
        } else {
            stageForm.reset();
            taskForm.reset();
        }
    }, [isOpen, stages, stagesCount]);

    const isProcessing = modalType === 'STAGE' ? stageForm.processing : taskForm.processing;

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (modalType === 'STAGE') {
            stageForm.post(route('master-data.stage.store'), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            taskForm.post(route('master-data.task.store'), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Kelola Tahapan Konstruksi & Template WBS"
            onSubmit={handleSubmit}
            submitLabel={modalType === 'STAGE' ? 'Simpan Tahapan Baru' : 'Simpan Item WBS Baru'}
            isProcessing={isProcessing}
        >
            <div className="space-y-4 text-xs">
                {/* Selector Tipe Data */}
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={() => setModalType('TASK')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                            modalType === 'TASK'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                    >
                        <ListOrdered className="w-3.5 h-3.5" />
                        <span>Tambah Item WBS / Task</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setModalType('STAGE')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                            modalType === 'STAGE'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                    >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Tambah Tahapan</span>
                    </button>
                </div>

                {modalType === 'STAGE' ? (
                    <div className="space-y-3 pt-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label>Kode Stage *</Label>
                                <Input
                                    placeholder="Contoh: CIVIL, CME"
                                    value={stageForm.data.kode_stage}
                                    onChange={(e) => stageForm.setData('kode_stage', e.target.value.toUpperCase())}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Urutan Tahap *</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    value={stageForm.data.urutan}
                                    onChange={(e) => stageForm.setData('urutan', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label>Nama Tahapan *</Label>
                            <Input
                                placeholder="Contoh: 2. Pekerjaan Pondasi & Sipil"
                                value={stageForm.data.nama_stage}
                                onChange={(e) => stageForm.setData('nama_stage', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3 pt-2">
                        <div className="space-y-1">
                            <Label>Nama Pekerjaan Fisik *</Label>
                            <Input
                                placeholder="Contoh: Pengecoran Beton K-300 & Slump Test"
                                value={taskForm.data.nama_task}
                                onChange={(e) => taskForm.setData('nama_task', e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label>Pilih Tahapan *</Label>
                                <select
                                    value={taskForm.data.stage_id}
                                    onChange={(e) => taskForm.setData('stage_id', e.target.value)}
                                    className="w-full h-9 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-xs"
                                    required
                                >
                                    {stages.map((st) => (
                                        <option key={st.id} value={st.id}>
                                            {st.urutan}. {st.nama_stage}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label>Khusus SOW</Label>
                                <select
                                    value={taskForm.data.sow_id}
                                    onChange={(e) => taskForm.setData('sow_id', e.target.value)}
                                    className="w-full h-9 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-xs"
                                >
                                    <option value="">Semua SOW</option>
                                    {sows.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.nama_sow}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label>Satuan *</Label>
                                <Input
                                    placeholder="Lot, M3, Kg, Titik"
                                    value={taskForm.data.satuan}
                                    onChange={(e) => taskForm.setData('satuan', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Bobot Acuan (%) *</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min={0}
                                    max={100}
                                    value={taskForm.data.default_bobot}
                                    onChange={(e) => taskForm.setData('default_bobot', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}