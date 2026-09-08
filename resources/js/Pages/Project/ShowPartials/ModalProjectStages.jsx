import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Modal from '@/components/Modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Layers, Plus, Trash2, Minus, Sliders } from 'lucide-react';

export default function ModalProjectStages({
    isOpen,
    onClose,
    project,
    masterStages = [],
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [stagesList, setStagesList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const current = (project?.project_stages || []).map((ps) => ({
                stage_id: String(ps.stage_id),
                bobot: ps.bobot !== undefined ? ps.bobot : 0,
                progress_percent: ps.progress_percent !== undefined ? ps.progress_percent : 0,
            }));

            // Jika belum ada tahapan diplot sama sekali, defaultkan dengan tahapan pertama
            if (current.length === 0 && masterStages.length > 0) {
                setStagesList([{
                    stage_id: String(masterStages[0].id),
                    bobot: 100,
                    progress_percent: 0,
                }]);
            } else {
                setStagesList(current);
            }
        }
    }, [isOpen, project, masterStages]);

    const totalBobot = stagesList.reduce((sum, item) => sum + (parseFloat(item.bobot) || 0), 0);

    const handleAddStageRow = () => {
        // Cari stage yang belum dipilih
        const usedIds = stagesList.map((s) => s.stage_id);
        const available = masterStages.find((ms) => !usedIds.includes(String(ms.id))) || masterStages[0];

        setStagesList((prev) => [
            ...prev,
            {
                stage_id: available ? String(available.id) : '',
                bobot: 0,
                progress_percent: 0,
            },
        ]);
    };

    const handleRemoveStageRow = (idx) => {
        if (stagesList.length <= 1) return;
        setStagesList((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleChangeField = (idx, field, val) => {
        setStagesList((prev) => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], [field]: val };
            return updated;
        });
    };

    const handleStep = (idx, field, delta, max = 100) => {
        setStagesList((prev) => {
            const updated = [...prev];
            const current = parseFloat(updated[idx][field]) || 0;
            const nextVal = Math.min(max, Math.max(0, Number((current + delta).toFixed(2))));
            updated[idx] = { ...updated[idx], [field]: nextVal };
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e?.preventDefault();

        if (stagesList.length === 0) {
            alert('Minimal pilih 1 tahapan konstruksi.');
            return;
        }

        if (totalBobot > 100) {
            alert(`Total bobot tahapan (${totalBobot}%) melebihi batas 100%.`);
            return;
        }

        setIsProcessing(true);
        router.put(route('project.stages.update', project.id), {
            stages: stagesList,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsProcessing(false);
                onClose();
            },
            onError: () => setIsProcessing(false),
            onFinish: () => setIsProcessing(false),
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="sm:max-w-3xl"
            title={`Plotting Tahapan & Bobot: ${project?.site_id || ''}`}
            onSubmit={handleSubmit}
            submitLabel="Simpan Tahapan & Progres"
            isProcessing={isProcessing}
            headerExtra={
                <Badge
                    variant="outline"
                    className={`font-mono text-xs font-bold px-2.5 py-0.5 ${
                        totalBobot === 100
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    }`}
                >
                    Total Bobot: {Number(totalBobot.toFixed(2))}% / 100%
                </Badge>
            }
        >
            <div className="space-y-4 text-xs">
                <Alert className="bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-300 p-2.5 rounded-xl flex items-start gap-2 shadow-xs">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <AlertDescription className="text-xs leading-relaxed">
                        Tentukan tahapan yang berlaku untuk site ini beserta porsi bobot kontraknya. Akumulasi capaian proyek dihitung otomatis dari persentase progres yang Anda validasi di setiap tahapan.
                    </AlertDescription>
                </Alert>

                <div className="space-y-3">
                    {stagesList.map((item, idx) => (
                        <div
                            key={`ps-row-${idx}`}
                            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-3 shadow-xs"
                        >
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    Tahapan #{idx + 1}
                                </span>
                                {stagesList.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStageRow(idx)}
                                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                                        title="Hapus Tahapan Ini"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                <div className="sm:col-span-7 space-y-1">
                                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                        Pilih Tahapan Standar *
                                    </Label>
                                    <select
                                        value={item.stage_id}
                                        onChange={(e) => handleChangeField(idx, 'stage_id', e.target.value)}
                                        className="w-full h-8 px-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold"
                                        required
                                    >
                                        <option value="" disabled>-- Pilih Tahapan --</option>
                                        {masterStages.map((ms) => (
                                            <option key={ms.id} value={ms.id}>
                                                [{ms.kode_stage}] {ms.nama_stage}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-5 space-y-1">
                                    <Label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                        Bobot Kontrak Tahap (%) *
                                    </Label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            disabled={isProcessing || (parseFloat(item.bobot) || 0) <= 0}
                                            onClick={() => handleStep(idx, 'bobot', -1, 100)}
                                            className="h-8 w-8 rounded-l-lg border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs cursor-pointer"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            value={item.bobot}
                                            onChange={(e) => handleChangeField(idx, 'bobot', parseFloat(e.target.value) || 0)}
                                            className="h-8 w-full text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            required
                                        />
                                        <button
                                            type="button"
                                            disabled={isProcessing || (parseFloat(item.bobot) || 0) >= 100}
                                            onClick={() => handleStep(idx, 'bobot', 1, 100)}
                                            className="h-8 w-8 rounded-r-lg border border-l-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs cursor-pointer"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Progres Fisik Tahapan yang Divalidasi Admin */}
                            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                        <Sliders className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                        Validasi Progres Fisik Tahapan:
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            disabled={isProcessing || (parseFloat(item.progress_percent) || 0) <= 0}
                                            onClick={() => handleStep(idx, 'progress_percent', -5, 100)}
                                            className="h-6 w-6 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400 min-w-[38px] text-center">
                                            {item.progress_percent}%
                                        </span>
                                        <button
                                            type="button"
                                            disabled={isProcessing || (parseFloat(item.progress_percent) || 0) >= 100}
                                            onClick={() => handleStep(idx, 'progress_percent', 5, 100)}
                                            className="h-6 w-6 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={item.progress_percent}
                                    onChange={(e) => handleChangeField(idx, 'progress_percent', parseFloat(e.target.value) || 0)}
                                    style={{
                                        background: `linear-gradient(to right, #2563eb 0%, #2563eb ${item.progress_percent}%, #334155 ${item.progress_percent}%, #334155 100%)`
                                    }}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none"
                                />
                            </div>
                        </div>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddStageRow}
                        className="w-full h-8 text-xs gap-1.5 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Tambah Tahapan Konstruksi Lainnya</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
}