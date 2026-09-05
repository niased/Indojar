import React, { useState, useMemo } from 'react';
import CrudTablePekerjaan from '@/Pages/Pekerjaan/MasterData/CrudTable';
import HybridDropdown from '@/components/HybridDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Sparkles, X } from 'lucide-react';

export default function TabWbs({
    pekerjaans = [],
    stages = [],
    sowName = 'B2S',
    onOpenAdd,
    onOpenEdit,
    onDelete,
    onApplyTemplate,
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStage, setSelectedStage] = useState('ALL');
    const [zoomLevel, setZoomLevel] = useState(100);

    const filteredPekerjaans = useMemo(() => {
        return pekerjaans.filter((p) => {
            const matchesSearch = !searchTerm.trim() || 
                (p.kode_pekerjaan && p.kode_pekerjaan.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (p.nama_pekerjaan && p.nama_pekerjaan.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (p.catatan && p.catatan.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesStage = selectedStage === 'ALL' || String(p.stage_id) === String(selectedStage);

            return matchesSearch && matchesStage;
        });
    }, [pekerjaans, searchTerm, selectedStage]);

    return (
        <div className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            {/* Sub-Header Toolbar */}
            <div className="p-3.5 sm:p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                    <div className="w-44">
                        <HybridDropdown
                            value={selectedStage}
                            options={[
                                { value: 'ALL', label: 'Semua Tahap' },
                                ...stages.map((st) => ({
                                    value: String(st.id),
                                    label: st.nama_stage,
                                })),
                            ]}
                            onChange={setSelectedStage}
                            placeholder="Semua Tahap"
                            searchPlaceholder="Cari tahap..."
                            allowCustom={false}
                            className="w-full"
                            inputClassName="h-8 text-xs font-semibold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        />
                    </div>

                    <div className="relative w-48 sm:w-60">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari kode / tugas WBS..."
                            className="h-8 pl-8 pr-7 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    {pekerjaans.length === 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onApplyTemplate}
                            className="h-8 text-xs gap-1 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Salin Template SOW ({sowName})</span>
                        </Button>
                    )}
                    <Button
                        type="button"
                        size="sm"
                        onClick={onOpenAdd}
                        className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-xs"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah WBS</span>
                    </Button>
                </div>
            </div>

            {/* Tabel Pekerjaan WBS */}
            <div className="w-full overflow-x-auto relative">
                <CrudTablePekerjaan
                    dataList={filteredPekerjaans}
                    selectedIds={[]}
                    onSelectAll={() => {}}
                    onSelectRow={() => {}}
                    onEditRow={onOpenEdit}
                    getRowNumber={(idx) => idx + 1}
                    zoomLevel={zoomLevel}
                />
            </div>
        </div>
    );
}