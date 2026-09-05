import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export const MAX_ROWS_LIMIT = 50;

export const LIST_STATUS_PROYEK = [
    'PLANNING',
    'ON_PROGRESS',
    'ISSUE',
    'COMPLETED',
];

export function useModalProjectControl({
    isOpen,
    isEditMode = false,
    selectedItem = null,
    areas = [],
    sows = [],
    users = [],
    onClose
}) {
    const [isProcessing, setIsProcessing] = useState(false);

    // Template Baris Kosong untuk Batch Add (Paste Excel)
    const createEmptyRow = () => ({
        site_id: '',
        site_name: '',
        pid: '',
        site_id_dmt: '',
        site_id_tenant: '',
        area_id: areas[0]?.id ? String(areas[0].id) : '',
        sow_id: sows[0]?.id ? String(sows[0].id) : '',
        tipe_tower: 'SST 4 LEGS',
        tinggi_tower: '52M',
        client_name: 'Telkomsel / Mitratel',
        no_po: '',
        status: 'PLANNING',
    });

    const [addItems, setAddItems] = useState([createEmptyRow()]);

    // State untuk Single Insert / Edit Form
    const [formData, setFormData] = useState({
        site_id: '',
        site_name: '',
        pid: '',
        site_id_dmt: '',
        site_id_tenant: '',
        area_id: '',
        sow_id: '',
        client_name: 'Telkomsel / Mitratel',
        konsultan: 'PT. ATRYA REKAYASA',
        no_po: '',
        tgl_po: '',
        spk_date: '',
        kompensasi: '',
        tipe_tower: 'SST 4 LEGS',
        tinggi_tower: '52M',
        alamat_site: '',
        latitude: '',
        longitude: '',
        target_rfi_date: '',
        status: 'PLANNING',
        proses_status: '',
        pic_user_id: '',
        catatan_proyek: '',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && selectedItem) {
                setFormData({
                    site_id: selectedItem.site_id || '',
                    site_name: selectedItem.site_name || '',
                    pid: selectedItem.pid || '',
                    site_id_dmt: selectedItem.site_id_dmt || '',
                    site_id_tenant: selectedItem.site_id_tenant || '',
                    area_id: selectedItem.area_id ? String(selectedItem.area_id) : '',
                    sow_id: selectedItem.sow_id ? String(selectedItem.sow_id) : '',
                    client_name: selectedItem.client_name || 'Telkomsel / Mitratel',
                    konsultan: selectedItem.konsultan || '',
                    no_po: selectedItem.no_po || '',
                    tgl_po: selectedItem.tgl_po ? String(selectedItem.tgl_po).split('T')[0] : '',
                    spk_date: selectedItem.spk_date ? String(selectedItem.spk_date).split('T')[0] : '',
                    kompensasi: selectedItem.kompensasi || '',
                    tipe_tower: selectedItem.tipe_tower || 'SST 4 LEGS',
                    tinggi_tower: selectedItem.tinggi_tower || '52M',
                    alamat_site: selectedItem.alamat_site || '',
                    latitude: selectedItem.latitude !== null ? String(selectedItem.latitude) : '',
                    longitude: selectedItem.longitude !== null ? String(selectedItem.longitude) : '',
                    target_rfi_date: selectedItem.target_rfi_date ? String(selectedItem.target_rfi_date).split('T')[0] : '',
                    status: selectedItem.status || 'PLANNING',
                    proses_status: selectedItem.proses_status || '',
                    pic_user_id: selectedItem.pic_user_id ? String(selectedItem.pic_user_id) : '',
                    catatan_proyek: selectedItem.catatan_proyek || '',
                });
            } else {
                setFormData({
                    site_id: '',
                    site_name: '',
                    pid: '',
                    site_id_dmt: '',
                    site_id_tenant: '',
                    area_id: areas[0]?.id ? String(areas[0].id) : '',
                    sow_id: sows[0]?.id ? String(sows[0].id) : '',
                    client_name: 'Telkomsel / Mitratel',
                    konsultan: 'PT. ATRYA REKAYASA',
                    no_po: '',
                    tgl_po: '',
                    spk_date: '',
                    kompensasi: '',
                    tipe_tower: 'SST 4 LEGS',
                    tinggi_tower: '52M',
                    alamat_site: '',
                    latitude: '',
                    longitude: '',
                    target_rfi_date: '',
                    status: 'PLANNING',
                    proses_status: '',
                    pic_user_id: users[0]?.id ? String(users[0].id) : '',
                    catatan_proyek: '',
                });
                setAddItems([createEmptyRow()]);
            }
        }
    }, [isOpen, isEditMode, selectedItem, areas, sows, users]);

    const handleAddMoreRows = (count = 1) => {
        setAddItems((prev) => {
            const available = MAX_ROWS_LIMIT - prev.length;
            if (available <= 0) return prev;
            const toAdd = Math.min(count, available);
            return [...prev, ...Array.from({ length: toAdd }, () => createEmptyRow())];
        });
    };

    const handleRemoveAddRow = (index) => {
        if (addItems.length <= 1) return;
        setAddItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddItemChange = (index, field, value) => {
        setAddItems((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    // Paste Parser dari Excel
    const handlePasteFromClipboard = (clipboardText) => {
        if (!clipboardText) return;
        const rows = clipboardText.trim().split(/\r\n|\n|\r/);
        if (rows.length === 0) return;

        const parsed = rows.map((line) => {
            const cols = line.split('\t');
            // Urutan umum salin Excel Indojar: Site ID, Site Name, PID, SOW, Area, Tinggi
            return {
                site_id: cols[0]?.trim() || '',
                site_name: cols[1]?.trim() || '',
                pid: cols[2]?.trim() || '',
                site_id_dmt: cols[3]?.trim() || '',
                site_id_tenant: cols[4]?.trim() || '',
                tipe_tower: cols[5]?.trim() || 'SST 4 LEGS',
                tinggi_tower: cols[6]?.trim() || '52M',
                client_name: cols[7]?.trim() || 'Telkomsel / Mitratel',
                no_po: cols[8]?.trim() || '',
                status: 'PLANNING',
                area_id: areas[0]?.id ? String(areas[0].id) : '',
                sow_id: sows[0]?.id ? String(sows[0].id) : '',
            };
        }).filter((item) => item.site_id || item.site_name);

        if (parsed.length > 0) {
            setAddItems(parsed.slice(0, MAX_ROWS_LIMIT));
        }
    };

    const handleSubmitForm = (e) => {
        e?.preventDefault();
        setIsProcessing(true);

        if (isEditMode && selectedItem) {
            router.put(route('project.update', selectedItem.id), formData, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsProcessing(false);
                    onClose();
                },
                onError: () => setIsProcessing(false),
                onFinish: () => setIsProcessing(false),
            });
        } else {
            // Single insert jika hanya 1 baris
            router.post(route('project.store'), formData, {
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
        formData,
        setFormData,
        addItems,
        handleAddMoreRows,
        handleRemoveAddRow,
        handleAddItemChange,
        handlePasteFromClipboard,
        handleSubmitForm,
    };
}