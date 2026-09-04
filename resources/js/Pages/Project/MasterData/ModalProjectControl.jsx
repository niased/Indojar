import { useState, useEffect, useCallback, useMemo } from 'react';
import { router } from '@inertiajs/react';

export const MAX_ROWS_LIMIT = 500;

export const LIST_TIPE_TOWER = [
    'SST 4 LEGS',
    'SST 3 LEGS',
    'MONOPOLE',
    'GUYED TOWER',
    'ROOFTOP POLE',
    'MINI TOWER'
];

export const LIST_TINGGI_TOWER = [
    '72M',
    '62M',
    '52M',
    '42M',
    '36M',
    '32M',
    '25M',
    '20M',
    '15M'
];

export const LIST_STATUS_PROYEK = [
    'PLANNING',
    'PONDASI',
    'ERECTION',
    'CME',
    'RFI',
    'ATP',
    'COMPLETED'
];

export const LIST_CLIENT = [
    'Telkomsel / Mitratel',
    'Indosat Ooredoo Hutchison',
    'XL Axiata',
    'Smartfren'
];

export function useModalProjectControl({ isOpen, isEditMode, selectedItem, existingOptions, onClose }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [editData, setEditData] = useState({});
    const [addItems, setAddItems] = useState([]);

    const tipeTowerOptions = useMemo(() => {
        const set = new Set([...LIST_TIPE_TOWER, ...(existingOptions?.tipeTowerList || [])]);
        return Array.from(set).filter(Boolean);
    }, [existingOptions?.tipeTowerList]);

    const tinggiTowerOptions = useMemo(() => {
        const set = new Set([...LIST_TINGGI_TOWER, ...(existingOptions?.tinggiTowerList || [])]);
        return Array.from(set).filter(Boolean);
    }, [existingOptions?.tinggiTowerList]);

    const wilayahOptions = useMemo(() => existingOptions?.wilayahList || [], [existingOptions?.wilayahList]);
    const clientOptions = useMemo(() => {
        const set = new Set([...LIST_CLIENT, ...(existingOptions?.clientList || [])]);
        return Array.from(set).filter(Boolean);
    }, [existingOptions?.clientList]);

    const konsultanOptions = useMemo(() => existingOptions?.konsultanList || ['PT. ATRYA REKAYASA'], [existingOptions?.konsultanList]);

    const createEmptyRow = useCallback(() => ({
        site_id: '',
        site_name: '',
        pid: '',
        tipe_tower: 'SST 4 LEGS',
        tinggi_tower: '52M',
        wilayah: '',
        client_name: 'Telkomsel / Mitratel',
        konsultan: 'PT. ATRYA REKAYASA',
        lat_long: '',
        alamat_site: '',
        spk_date: '',
        target_rfi_date: '',
        status: 'PLANNING',
        progress_percent: 0,
        catatan_proyek: ''
    }), []);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                setEditData({
                    id: selectedItem.id,
                    site_id: (selectedItem.site_id || '').toUpperCase(),
                    site_name: (selectedItem.site_name || '').toUpperCase(),
                    pid: selectedItem.pid || '',
                    tipe_tower: selectedItem.tipe_tower || 'SST 4 LEGS',
                    tinggi_tower: selectedItem.tinggi_tower || '52M',
                    wilayah: selectedItem.wilayah || '',
                    client_name: selectedItem.client_name || 'Telkomsel / Mitratel',
                    konsultan: selectedItem.konsultan || 'PT. ATRYA REKAYASA',
                    lat_long: selectedItem.lat_long || '',
                    alamat_site: selectedItem.alamat_site || '',
                    spk_date: selectedItem.spk_date ? selectedItem.spk_date.substring(0, 10) : '',
                    target_rfi_date: selectedItem.target_rfi_date ? selectedItem.target_rfi_date.substring(0, 10) : '',
                    status: selectedItem.status || 'PLANNING',
                    progress_percent: selectedItem.progress_percent || 0,
                    catatan_proyek: selectedItem.catatan_proyek || '',
                });
            } else {
                setAddItems([createEmptyRow()]);
            }
        } else {
            setEditData({});
            setAddItems([]);
            setIsProcessing(false);
        }
    }, [isOpen, isEditMode, selectedItem, createEmptyRow]);

    const parseAndApplyExcelData = useCallback((pastedText) => {
        if (!pastedText) return false;
        let rawRows = pastedText.trim().split(/\r\n|\n|\r/).filter(row => row.trim().length > 0);
        if (rawRows.length === 1 && !rawRows[0].includes('\t')) return false;

        if (rawRows.length > MAX_ROWS_LIMIT) {
            alert(`Perhatian: Data paste dibatasi maksimal ${MAX_ROWS_LIMIT} baris.`);
            rawRows = rawRows.slice(0, MAX_ROWS_LIMIT);
        }

        const parsedItems = rawRows.map(rowStr => {
            const cells = rowStr.split('\t').map(c => c.trim().replace(/^"(.*)"$/, '$1'));
            const rowObj = createEmptyRow();

            // Pemetaan Kolom Excel:
            // 0: Site ID, 1: Nama Site, 2: PID, 3: Tipe Tower, 4: Tinggi Tower, 5: Wilayah, 6: Klien, 7: Target RFI, 8: Status
            rowObj.site_id         = (cells[0] ?? '').toUpperCase();
            rowObj.site_name       = (cells[1] ?? '').toUpperCase();
            rowObj.pid             = cells[2] ?? '';
            rowObj.tipe_tower      = cells[3] ?? 'SST 4 LEGS';
            rowObj.tinggi_tower    = cells[4] ?? '52M';
            rowObj.wilayah         = cells[5] ?? '';
            rowObj.client_name     = cells[6] ?? 'Telkomsel / Mitratel';
            rowObj.target_rfi_date = cells[7] ?? '';
            rowObj.status          = cells[8] ? cells[8].toUpperCase() : 'PLANNING';

            return rowObj;
        });

        if (parsedItems.length > 0) {
            setAddItems(parsedItems);
            return true;
        }
        return false;
    }, [createEmptyRow]);

    const handleContainerPaste = useCallback((e) => {
        if (isEditMode) return;
        const pastedText = e.clipboardData.getData('text');
        if (parseAndApplyExcelData(pastedText)) e.preventDefault();
    }, [isEditMode, parseAndApplyExcelData]);

    const handlePasteFromClipboardButton = useCallback(async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text && !parseAndApplyExcelData(text)) {
                alert('Format teks clipboard bukan urutan tabel Excel yang valid.');
            }
        } catch (err) {
            alert('Gagal membaca clipboard. Izinkan akses clipboard browser atau gunakan shortcut Ctrl+V.');
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
            const finalVal = (field === 'site_id' || field === 'site_name') ? value.toUpperCase() : value;
            updated[index] = { ...updated[index], [field]: finalVal };
            return updated;
        });
    }, []);

    const handleSubmitForm = (e) => {
        e?.preventDefault();

        if (isEditMode) {
            if (!editData.site_id?.trim() || !editData.site_name?.trim()) {
                alert('Site ID dan Nama Site wajib diisi.');
                return;
            }

            setIsProcessing(true);
            router.put(`/project/${editData.id}`, editData, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsProcessing(false);
                    onClose();
                },
                onError: () => setIsProcessing(false),
                onFinish: () => setIsProcessing(false),
            });
        } else {
            const siteIdSet = new Set();
            for (let i = 0; i < addItems.length; i++) {
                const item = addItems[i];
                if (!item.site_id?.trim() || !item.site_name?.trim()) {
                    alert(`Baris #${i + 1}: Site ID dan Nama Site wajib diisi.`);
                    return;
                }
                if (siteIdSet.has(item.site_id)) {
                    alert(`Baris #${i + 1}: Site ID "${item.site_id}" terduplikasi pada form.`);
                    return;
                }
                siteIdSet.add(item.site_id);
            }

            setIsProcessing(true);
            router.post('/project', { items: addItems }, {
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
        handleContainerPaste,
        handlePasteFromClipboardButton,
        handleAddMoreRows,
        handleRemoveAddRow,
        handleAddItemChange,
        handleSubmitForm,
        tipeTowerOptions,
        tinggiTowerOptions,
        wilayahOptions,
        clientOptions,
        konsultanOptions,
    };
}