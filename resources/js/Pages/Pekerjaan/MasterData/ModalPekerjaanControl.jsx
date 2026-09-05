import { useState, useEffect, useCallback, useMemo } from 'react';
import { router } from '@inertiajs/react';

export const MAX_ROWS_LIMIT = 500;

export const LIST_TAHAP_STANDAR = [
    'PONDASI',
    'ERECTION',
    'CME',
    'ATP'
];

export const LIST_STATUS_STANDAR = [
    'PLANNING',
    'IN_PROGRESS',
    'COMPLETED'
];

export const LIST_SATUAN_PEKERJAAN = [
    'Lot',
    'M3',
    'M2',
    'Meter',
    'Kg',
    'Ton',
    'Titik',
    'Set',
    'Site',
    'Unit',
    'Pcs'
];

export function useModalPekerjaanControl({ isOpen, isEditMode, selectedItem, projects = [], existingOptions, onClose }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [editData, setEditData] = useState({});
    const [addItems, setAddItems] = useState([]);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const projectOptions = useMemo(() => {
        return (projects || []).map(p => ({
            value: `${p.site_id} - ${p.site_name}`,
            label: `${p.site_id} - ${p.site_name}`,
            id: p.id,
            site_id: p.site_id
        }));
    }, [projects]);

    const tahapOptions = useMemo(() => {
        const set = new Set([...LIST_TAHAP_STANDAR, ...(existingOptions?.tahapList || [])]);
        return Array.from(set).filter(Boolean);
    }, [existingOptions?.tahapList]);

    const satuanOptions = useMemo(() => {
        const set = new Set([...LIST_SATUAN_PEKERJAAN, ...(existingOptions?.satuanList || [])]);
        return Array.from(set).filter(Boolean);
    }, [existingOptions?.satuanList]);

    const createEmptyRow = useCallback(() => ({
        project_id: projects[0]?.id ? String(projects[0].id) : '',
        kode_pekerjaan: '',
        kategori_tahap: 'PONDASI',
        nama_pekerjaan: '',
        satuan: 'Lot',
        bobot: '',
        progress_percent: 0,
        status: 'PLANNING',
        foto_file: null,
        foto_preview: null,
        catatan: ''
    }), [projects]);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                setEditData({
                    id: selectedItem.id,
                    project_id: selectedItem.project_id ? String(selectedItem.project_id) : (projects[0]?.id ? String(projects[0].id) : ''),
                    kode_pekerjaan: (selectedItem.kode_pekerjaan || '').toUpperCase(),
                    kategori_tahap: (selectedItem.kategori_tahap || 'PONDASI').toUpperCase(),
                    nama_pekerjaan: selectedItem.nama_pekerjaan || '',
                    satuan: selectedItem.satuan || 'Lot',
                    bobot: selectedItem.bobot || '',
                    progress_percent: selectedItem.progress_percent || 0,
                    status: selectedItem.status || 'PLANNING',
                    foto: selectedItem.foto || '',
                    foto_file: null,
                    catatan: selectedItem.catatan || '',
                });
                setPreviewPhoto(selectedItem.foto || null);
            } else {
                setAddItems([createEmptyRow()]);
                setPreviewPhoto(null);
            }
        } else {
            setEditData({});
            setAddItems([]);
            setPreviewPhoto(null);
            setIsProcessing(false);
        }
    }, [isOpen, isEditMode, selectedItem, projects, createEmptyRow]);

    const handleSingleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditData(prev => ({ ...prev, foto_file: file }));
            setPreviewPhoto(URL.createObjectURL(file));
        }
    };

    const handleRemoveSinglePhoto = () => {
        setEditData(prev => ({ ...prev, foto_file: null, foto: '' }));
        setPreviewPhoto(null);
    };

    const parseAndApplyExcelData = useCallback((pastedText) => {
        if (!pastedText) return false;
        let rawRows = pastedText.trim().split(/\r\n|\n|\r/).filter(r => r.trim().length > 0);
        if (rawRows.length === 1 && !rawRows[0].includes('\t')) return false;

        if (rawRows.length > MAX_ROWS_LIMIT) {
            alert(`Maksimal paste data adalah ${MAX_ROWS_LIMIT} baris.`);
            rawRows = rawRows.slice(0, MAX_ROWS_LIMIT);
        }

        const parsedItems = rawRows.map(rowStr => {
            const cells = rowStr.split('\t').map(c => c.trim().replace(/^"(.*)"$/, '$1'));
            const rowObj = createEmptyRow();

            const matchedProject = projects.find(p => 
                p.site_id?.toUpperCase() === (cells[0] ?? '').toUpperCase() || 
                p.project_code?.toUpperCase() === (cells[0] ?? '').toUpperCase()
            );

            if (matchedProject) {
                rowObj.project_id = String(matchedProject.id);
            }

            rowObj.kode_pekerjaan   = (cells[1] ?? '').toUpperCase();
            rowObj.kategori_tahap   = (cells[2] ?? 'PONDASI').toUpperCase();
            rowObj.nama_pekerjaan   = cells[3] ?? '';
            rowObj.satuan           = cells[4] ?? 'Lot';
            rowObj.bobot            = cells[5] ? parseFloat(cells[5].replace(',', '.')) : 0;
            rowObj.progress_percent = cells[6] ? parseFloat(cells[6].replace(',', '.')) : 0;
            rowObj.catatan          = cells[7] ?? '';

            rowObj.status = rowObj.progress_percent >= 100 ? 'COMPLETED' : (rowObj.progress_percent > 0 ? 'IN_PROGRESS' : 'PLANNING');

            return rowObj;
        });

        if (parsedItems.length > 0) {
            setAddItems(parsedItems);
            return true;
        }
        return false;
    }, [projects, createEmptyRow]);

    const handleContainerPaste = useCallback((e) => {
        if (isEditMode) return;
        const pastedText = e.clipboardData.getData('text');
        if (parseAndApplyExcelData(pastedText)) e.preventDefault();
    }, [isEditMode, parseAndApplyExcelData]);

    const handlePasteFromClipboardButton = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text && !parseAndApplyExcelData(text)) {
                alert('Format teks bukan format tabel Excel yang sesuai.');
            }
        } catch (err) {
            alert('Gagal membaca clipboard. Berikan izin clipboard pada peramban.');
        }
    }, [parseAndApplyExcelData]);

    const handleAddMoreRows = useCallback((count = 1) => {
        setAddItems(prev => {
            if (prev.length + count > MAX_ROWS_LIMIT) {
                alert(`Maksimal penambahan data sekaligus adalah ${MAX_ROWS_LIMIT} baris.`);
                return prev;
            }
            return [...prev, ...Array.from({ length: count }, () => createEmptyRow())];
        });
    }, [createEmptyRow]);

    const handleRemoveAddRow = useCallback((index) => {
        if (addItems.length <= 1) return;
        setAddItems(prev => prev.filter((_, i) => i !== index));
    }, [addItems.length]);

    const handleAddItemChange = useCallback((index, field, value) => {
        setAddItems(prev => {
            const updated = [...prev];
            const finalVal = (field === 'kode_pekerjaan' || field === 'kategori_tahap') ? value.toUpperCase() : value;
            updated[index] = { ...updated[index], [field]: finalVal };
            return updated;
        });
    }, []);

    const handleRowFileChange = (index, e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAddItems(prev => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    foto_file: file,
                    foto_preview: URL.createObjectURL(file)
                };
                return updated;
            });
        }
    };

    const handleRemoveRowPhoto = (index) => {
        setAddItems(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                foto_file: null,
                foto_preview: null
            };
            return updated;
        });
    };

    const handleSubmitForm = (e) => {
        e?.preventDefault();

        if (isEditMode) {
            if (!editData.project_id) {
                alert('Pilih Site Proyek terlebih dahulu.');
                return;
            }
            if (!editData.kode_pekerjaan?.trim() || !editData.nama_pekerjaan?.trim()) {
                alert('Kode WBS dan Nama Pekerjaan wajib diisi.');
                return;
            }

            setIsProcessing(true);
            router.post(`/pekerjaan/${editData.id}`, {
                _method: 'put',
                ...editData
            }, {
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
            // Jika single row di addItems, dukung unggah foto langsung
            if (addItems.length === 1) {
                const single = addItems[0];
                if (!single.project_id) {
                    alert('Site Proyek wajib dipilih.');
                    return;
                }
                if (!single.kode_pekerjaan?.trim() || !single.nama_pekerjaan?.trim()) {
                    alert('Kode WBS dan Nama Pekerjaan wajib diisi.');
                    return;
                }

                setIsProcessing(true);
                router.post('/pekerjaan', single, {
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

            // Multi-row batch insert
            for (let i = 0; i < addItems.length; i++) {
                const item = addItems[i];
                if (!item.project_id) {
                    alert(`Baris #${i + 1}: Site Proyek wajib dipilih.`);
                    return;
                }
                if (!item.kode_pekerjaan?.trim() || !item.nama_pekerjaan?.trim()) {
                    alert(`Baris #${i + 1}: Kode WBS dan Nama Pekerjaan wajib diisi.`);
                    return;
                }
            }

            setIsProcessing(true);
            router.post('/pekerjaan', { items: addItems }, {
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
        editData,
        setEditData,
        addItems,
        previewPhoto,
        projectOptions,
        tahapOptions,
        satuanOptions,
        handleSingleFileChange,
        handleRemoveSinglePhoto,
        handleRowFileChange,
        handleRemoveRowPhoto,
        handleContainerPaste,
        handlePasteFromClipboardButton,
        handleAddMoreRows,
        handleRemoveAddRow,
        handleAddItemChange,
        handleSubmitForm,
    };
}