import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export const MASTER_MILESTONES_LIST = [
    { key: 'tgl_po', label: 'Surat Pesanan (PO)' },
    { key: 'tgl_mos', label: 'Material on Site (MoS)' },
    { key: 'tgl_start', label: 'Start Konstruksi / Pengerjaan' },
    { key: 'tgl_done', label: 'Fisik Selesai (Done)' },
    { key: 'target_rfi_date', label: 'Target RFI' },
    { key: 'tgl_atp', label: 'ATP Bersama' },
    { key: 'tgl_bast', label: 'BAST Resmi' },
    { key: 'tgl_baut', label: 'BAUT' },
    { key: 'tgl_invoice', label: 'Pengajuan Invoice' },
];

export function useModalMasterKamusControl({
    isOpen,
    isEditMode = false,
    selectedItem = null,
    mainTab = 'SOW',
    stages = [],
    sows = [],
    onClose,
}) {
    // Form Hook SOW
    const sowForm = useForm({
        nama_sow: '',
        keterangan: '',
        milestones: MASTER_MILESTONES_LIST.map((m) => m.key),
    });

    // Form Hook Area
    const areaForm = useForm({
        nama_area: '',
        regional: '',
    });

    // Form Hook Stage
    const stageForm = useForm({
        kode_stage: '',
        nama_stage: '',
        urutan: stages.length + 1,
    });

    // Form Hook Task
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
            if (mainTab === 'SOW') {
                if (isEditMode && selectedItem) {
                    sowForm.setData({
                        nama_sow: selectedItem.nama_sow || '',
                        keterangan: selectedItem.keterangan || '',
                        milestones: Array.isArray(selectedItem.milestones) && selectedItem.milestones.length > 0
                            ? selectedItem.milestones
                            : MASTER_MILESTONES_LIST.map((m) => m.key),
                    });
                } else {
                    sowForm.setData({
                        nama_sow: '',
                        keterangan: '',
                        milestones: MASTER_MILESTONES_LIST.map((m) => m.key),
                    });
                }
            } else if (mainTab === 'AREA') {
                if (isEditMode && selectedItem) {
                    areaForm.setData({
                        nama_area: selectedItem.nama_area || '',
                        regional: selectedItem.regional || '',
                    });
                } else {
                    areaForm.setData({ nama_area: '', regional: '' });
                }
            } else if (mainTab === 'STAGE') {
                if (isEditMode && selectedItem) {
                    stageForm.setData({
                        kode_stage: selectedItem.kode_stage || '',
                        nama_stage: selectedItem.nama_stage || '',
                        urutan: selectedItem.urutan || 1,
                    });
                } else {
                    stageForm.setData({ kode_stage: '', nama_stage: '', urutan: stages.length + 1 });
                }
            } else if (mainTab === 'TASK') {
                if (isEditMode && selectedItem) {
                    taskForm.setData({
                        stage_id: String(selectedItem.stage_id || stages[0]?.id || ''),
                        sow_id: selectedItem.sow_id ? String(selectedItem.sow_id) : '',
                        nama_task: selectedItem.nama_task || '',
                        satuan: selectedItem.satuan || 'Lot',
                        default_bobot: selectedItem.default_bobot || 5.0,
                        urutan: selectedItem.urutan || 1,
                    });
                } else {
                    taskForm.setData({
                        stage_id: stages[0]?.id ? String(stages[0].id) : '',
                        sow_id: '',
                        nama_task: '',
                        satuan: 'Lot',
                        default_bobot: 5.0,
                        urutan: 1,
                    });
                }
            }
        }
    }, [isOpen, isEditMode, selectedItem, mainTab, stages]);

    const toggleSowMilestone = (key) => {
        const current = sowForm.data.milestones || [];
        if (current.includes(key)) {
            sowForm.setData('milestones', current.filter((k) => k !== key));
        } else {
            sowForm.setData('milestones', [...current, key]);
        }
    };

    const isProcessing =
        sowForm.processing || areaForm.processing || stageForm.processing || taskForm.processing;

    const handleSubmitForm = (e) => {
        e?.preventDefault();

        if (mainTab === 'SOW') {
            if (isEditMode && selectedItem) {
                sowForm.put(route('master-data.sow.update', selectedItem.id), {
                    preserveScroll: true,
                    onSuccess: () => onClose(),
                });
            } else {
                sowForm.post(route('master-data.sow.store'), {
                    preserveScroll: true,
                    onSuccess: () => onClose(),
                });
            }
        } else if (mainTab === 'AREA') {
            areaForm.post(route('master-data.area.store'), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else if (mainTab === 'STAGE') {
            stageForm.post(route('master-data.stage.store'), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else if (mainTab === 'TASK') {
            taskForm.post(route('master-data.task.store'), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return {
        isProcessing,
        sowForm,
        areaForm,
        stageForm,
        taskForm,
        toggleSowMilestone,
        handleSubmitForm,
    };
}