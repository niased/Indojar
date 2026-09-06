import { useState, useEffect, useCallback, useMemo } from 'react';
import { router } from '@inertiajs/react';

export const MAX_ROWS_LIMIT = 500;

export const LIST_SATUAN_WBS = [
    'Lot',
    'Titik',
    'Set',
    'Meter',
    'M2',
    'M3',
    'Kg',
    'Ton',
    'Unit',
    'Pcs',
    'Batang',
    'Site',
];

export function useModalPekerjaanControl({
    isOpen,
    isEditMode = false,
    selectedItem = null,
    project = null,
    stages = [],
    onClose,
}) {
    const [isProcessing, setIsProcessing] = useState(false);

    const stageOptions = useMemo(() => {
        return (stages || []).map((st) => ({
            value: String(st.id),
            label: st.nama_stage,
            kode: st.kode_stage,
        }));
    }, [stages]);

    const satuanOptions = useMemo(() => {
        return LIST_SATUAN_WBS.map((s) => ({ value: s, label: s }));
    }, []);

    const defaultStageId = stages[0]?.id ? String(stages[0].id) : '';

    const createEmptyRow = useCallback(() => ({
        project_id: project?.id ? String(project.id) : '',
        stage_id: defaultStageId,
        kode_pekerjaan: '',
        nama_pekerjaan: '',
        satuan: 'Lot',
        bobot: '',
        progress_percent: 0,
        status: 'PLANNING',
        tanggal_pekerjaan: new Date().toISOString().slice(0, 10),
        catatan: '',
        tipe_foto: 'DOKUMENTASI',
        foto_file: null,
        foto_preview: null,
    }), [project?.id, defaultStageId]);

    const [items, setItems] = useState([createEmptyRow()]);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                const prog = parseFloat(selectedItem.progress_percent) || 0;
                const autoStatus = prog >= 100 ? 'COMPLETED' : prog > 0 ? 'IN_PROGRESS' : 'PLANNING';

                setItems([{
                    id: selectedItem.id,
                    project_id: project?.id ? String(project.id) : String(selectedItem.project_id || ''),
                    stage_id: selectedItem.stage_id ? String(selectedItem.stage_id) : defaultStageId,
                    kode_pekerjaan: (selectedItem.kode_pekerjaan || '').toUpperCase(),
                    nama_pekerjaan: selectedItem.nama_pekerjaan || '',
                    satuan: selectedItem.satuan || 'Lot',
                    bobot: selectedItem.bobot !== undefined ? selectedItem.bobot : '',
                    progress_percent: prog,
                    status: autoStatus,
                    tanggal_pekerjaan: selectedItem.tanggal_pekerjaan
                        ? String(selectedItem.tanggal_pekerjaan).split('T')[0]
                        : new Date().toISOString().slice(0, 10),
                    tipe_foto: selectedItem.tipe_foto || 'DOKUMENTASI',
                    foto: selectedItem.foto || '',
                    foto_file: null,
                    foto_preview: selectedItem.foto || null,
                    catatan: selectedItem.catatan || '',
                }]);
            } else {
                setItems([createEmptyRow()]);
            }
        } else {
            setItems([]);
            setIsProcessing(false);
        }
    }, [isOpen, isEditMode, selectedItem, project?.id, defaultStageId, createEmptyRow]);

    const handleAddMoreRows = (count = 1) => {
        setItems((prev) => {
            if (prev.length + count > MAX_ROWS_LIMIT) {
                alert(`Maksimal penambahan data sekaligus adalah ${MAX_ROWS_LIMIT} baris.`);
                return prev;
            }
            return [...prev, ...Array.from({ length: count }, () => createEmptyRow())];
        });
    };

    const handleRemoveRow = (index) => {
        if (items.length <= 1) return;
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFieldChange = (rowIdx, field, value) => {
        setItems((prev) => {
            const updated = [...prev];
            let finalVal = field === 'kode_pekerjaan' ? value.toUpperCase() : value;
            updated[rowIdx] = { ...updated[rowIdx], [field]: finalVal };

            if (field === 'progress_percent') {
                const prog = parseFloat(value) || 0;
                updated[rowIdx].status = prog >= 100 ? 'COMPLETED' : prog > 0 ? 'IN_PROGRESS' : 'PLANNING';
            }

            return updated;
        });
    };

    const handleSingleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setItems((prev) => {
                const updated = [...prev];
                updated[0] = {
                    ...updated[0],
                    foto_file: file,
                    foto_preview: URL.createObjectURL(file),
                };
                return updated;
            });
        }
    };

    const handleRemoveSinglePhoto = () => {
        setItems((prev) => {
            const updated = [...prev];
            updated[0] = {
                ...updated[0],
                foto_file: null,
                foto_preview: null,
                foto: '',
            };
            return updated;
        });
    };

    const handleRowFileChange = (index, e) => {
        const file = e.target.files?.[0];
        if (file) {
            setItems((prev) => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    foto_file: file,
                    foto_preview: URL.createObjectURL(file),
                };
                return updated;
            });
        }
    };

    const handleRemoveRowPhoto = (index) => {
        setItems((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                foto_file: null,
                foto_preview: null,
            };
            return updated;
        });
    };

    const parseAndApplyExcelData = useCallback((pastedText) => {
        if (!pastedText) return false;
        let rawRows = pastedText.trim().split(/\r\n|\n|\r/).filter((r) => r.trim().length > 0);
        if (rawRows.length === 1 && !rawRows[0].includes('\t')) return false;

        if (rawRows.length > MAX_ROWS_LIMIT) {
            alert(`Perhatian: Data paste dibatasi maksimal ${MAX_ROWS_LIMIT} baris.`);
            rawRows = rawRows.slice(0, MAX_ROWS_LIMIT);
        }

        const parsedItems = rawRows.map((rowStr) => {
            const cells = rowStr.split('\t').map((c) => c.trim().replace(/^"(.*)"$/, '$1'));
            const rowObj = createEmptyRow();

            rowObj.kode_pekerjaan = (cells[0] ?? '').toUpperCase();
            if (cells[1]) {
                const targetTahap = cells[1].toUpperCase();
                const matchedStage = stages.find(
                    (st) =>
                        st.kode_stage?.toUpperCase() === targetTahap ||
                        st.nama_stage?.toUpperCase().includes(targetTahap)
                );
                if (matchedStage) rowObj.stage_id = String(matchedStage.id);
            }

            rowObj.nama_pekerjaan = cells[2] ?? '';
            rowObj.satuan = cells[3] || 'Lot';
            rowObj.bobot = cells[4] ? parseFloat(cells[4].replace('%', '').replace(',', '.')) || 0 : 0;
            rowObj.progress_percent = cells[5] ? parseFloat(cells[5].replace('%', '').replace(',', '.')) || 0 : 0;
            rowObj.tanggal_pekerjaan = cells[6] ? cells[6] : new Date().toISOString().slice(0, 10);
            rowObj.catatan = cells[7] ?? '';
            rowObj.status = rowObj.progress_percent >= 100 ? 'COMPLETED' : rowObj.progress_percent > 0 ? 'IN_PROGRESS' : 'PLANNING';

            return rowObj;
        });

        if (parsedItems.length > 0) {
            setItems(parsedItems);
            return true;
        }
        return false;
    }, [createEmptyRow, stages]);

    const handleContainerPaste = useCallback((e) => {
        if (isEditMode) return;
        const pastedText = e.clipboardData.getData('text');
        if (parseAndApplyExcelData(pastedText)) e.preventDefault();
    }, [isEditMode, parseAndApplyExcelData]);

    const handlePasteFromClipboardButton = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text && !parseAndApplyExcelData(text)) {
                alert('Format teks clipboard bukan format kolom Excel yang sesuai.');
            }
        } catch {
            alert('Gagal membaca clipboard. Izinkan akses clipboard browser atau gunakan Ctrl+V.');
        }
    }, [parseAndApplyExcelData]);

    const handleSubmitForm = (e) => {
        e?.preventDefault();

        if (isEditMode) {
            const single = items[0];
            if (!single.kode_pekerjaan?.trim() || !single.nama_pekerjaan?.trim()) {
                alert('Kode WBS dan Uraian Pekerjaan wajib diisi.');
                return;
            }

            setIsProcessing(true);
            const payload = new FormData();
            Object.keys(single).forEach((k) => {
                if (single[k] !== null && single[k] !== undefined && k !== 'foto_preview') {
                    payload.append(k, single[k]);
                }
            });
            payload.append('_method', 'PUT');

            router.post(route('pekerjaan.update', single.id), payload, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsProcessing(false);
                    onClose();
                },
                onError: () => setIsProcessing(false),
                onFinish: () => setIsProcessing(false),
            });
        } else {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (!item.kode_pekerjaan?.trim() || !item.nama_pekerjaan?.trim()) {
                    alert(`Baris #${i + 1}: Kode WBS dan Uraian Pekerjaan wajib diisi.`);
                    return;
                }
            }

            setIsProcessing(true);

            if (items.length === 1) {
                const single = items[0];
                const payload = new FormData();
                payload.append('project_id', project?.id);
                payload.append('stage_id', single.stage_id || '');
                payload.append('kode_pekerjaan', single.kode_pekerjaan || '');
                payload.append('nama_pekerjaan', single.nama_pekerjaan || '');
                payload.append('satuan', single.satuan || 'Lot');
                payload.append('bobot', single.bobot || 0);
                payload.append('progress_percent', single.progress_percent || 0);
                payload.append('status', single.status || 'PLANNING');
                payload.append('tanggal_pekerjaan', single.tanggal_pekerjaan || new Date().toISOString().slice(0, 10));
                payload.append('catatan', single.catatan || '');
                payload.append('tipe_foto', single.tipe_foto || 'DOKUMENTASI');
                if (single.foto_file) {
                    payload.append('foto_file', single.foto_file);
                }

                router.post(route('pekerjaan.store'), payload, {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsProcessing(false);
                        onClose();
                    },
                    onError: () => setIsProcessing(false),
                    onFinish: () => setIsProcessing(false),
                });
                return;
            }

            const payload = new FormData();
            items.forEach((item, idx) => {
                payload.append(`items[${idx}][project_id]`, project?.id);
                payload.append(`items[${idx}][stage_id]`, item.stage_id || '');
                payload.append(`items[${idx}][kode_pekerjaan]`, item.kode_pekerjaan || '');
                payload.append(`items[${idx}][nama_pekerjaan]`, item.nama_pekerjaan || '');
                payload.append(`items[${idx}][satuan]`, item.satuan || 'Lot');
                payload.append(`items[${idx}][bobot]`, item.bobot || 0);
                payload.append(`items[${idx}][progress_percent]`, item.progress_percent || 0);
                payload.append(`items[${idx}][status]`, item.status || 'PLANNING');
                payload.append(`items[${idx}][tanggal_pekerjaan]`, item.tanggal_pekerjaan || new Date().toISOString().slice(0, 10));
                payload.append(`items[${idx}][catatan]`, item.catatan || '');
                payload.append(`items[${idx}][tipe_foto]`, item.tipe_foto || 'DOKUMENTASI');
                if (item.foto_file) {
                    payload.append(`items[${idx}][foto_file]`, item.foto_file);
                }
            });

            router.post(route('pekerjaan.store'), payload, {
                forceFormData: true,
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

    return {
        isProcessing,
        items,
        stageOptions,
        satuanOptions,
        handleSingleFileChange,
        handleRemoveSinglePhoto,
        handleRowFileChange,
        handleRemoveRowPhoto,
        handleContainerPaste,
        handlePasteFromClipboardButton,
        handleAddMoreRows,
        handleRemoveRow,
        handleFieldChange,
        handleSubmitForm,
    };
}