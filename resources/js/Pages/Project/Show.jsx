import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout, { useConfirm } from '@/Layouts/AuthenticatedLayout';
import ProjectSidebar from './ShowPartials/ProjectSidebar';
import TabWbs from './ShowPartials/TabWbs';
import TabPhotos from './ShowPartials/TabPhotos';
import TabIssues from './ShowPartials/TabIssues';
import ModalTimeline from './ShowPartials/ModalTimeline';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Wrench, 
    Camera, 
    AlertTriangle, 
    ExternalLink, 
    X 
} from 'lucide-react';

export default function ProjectShow({ project, stages = [] }) {
    const confirm = useConfirm();
    const [activeSecondaryTab, setActiveSecondaryTab] = useState('photos');

    const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
    const [isProcessingTimeline, setIsProcessingTimeline] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const [timelineData, setTimelineData] = useState({
        tgl_po: project.tgl_po ? String(project.tgl_po).split('T')[0] : '',
        tgl_mos: project.tgl_mos ? String(project.tgl_mos).split('T')[0] : '',
        tgl_start: project.tgl_start ? String(project.tgl_start).split('T')[0] : '',
        tgl_done: project.tgl_done ? String(project.tgl_done).split('T')[0] : '',
        target_rfi_date: project.target_rfi_date ? String(project.target_rfi_date).split('T')[0] : '',
        tgl_atp: project.tgl_atp ? String(project.tgl_atp).split('T')[0] : '',
        tgl_bast: project.tgl_bast ? String(project.tgl_bast).split('T')[0] : '',
        tgl_baut: project.tgl_baut ? String(project.tgl_baut).split('T')[0] : '',
        tgl_invoice: project.tgl_invoice ? String(project.tgl_invoice).split('T')[0] : '',
        status: project.status || 'PLANNING',
    });

    const documentationPhotos = useMemo(() => {
        return (project.pekerjaans || []).filter(
            (p) => Boolean(p.foto) && String(p.tipe_foto || '').toUpperCase() !== 'ISSUE'
        );
    }, [project.pekerjaans]);

    const issueList = useMemo(() => {
        const wbsIssues = (project.pekerjaans || [])
            .filter((p) => String(p.tipe_foto || '').toUpperCase() === 'ISSUE')
            .map((p) => ({
                id: `wbs-issue-${p.id}`,
                judul_isu: `Kendala [${p.kode_pekerjaan}] ${p.nama_pekerjaan}`,
                deskripsi: p.catatan || `Ditemukan kendala pada pekerjaan ${p.nama_pekerjaan}.`,
                severity: 'MEDIUM',
                kategori: p.stage?.nama_stage || p.kategori_tahap || 'TEKNIS',
                status: p.progress_percent >= 100 ? 'RESOLVED' : 'OPEN',
                tanggal_terjadi: p.tanggal_pekerjaan ? String(p.tanggal_pekerjaan).split(' ')[0] : null,
                foto: p.foto,
                pic_user: p.pic_user,
            }));

        const existingDirectIssues = project.issues || [];
        return [...wbsIssues, ...existingDirectIssues];
    }, [project.pekerjaans, project.issues]);

    const stageBreakdown = useMemo(() => {
        const items = project.pekerjaans || [];
        if (items.length === 0) return [];

        const grouped = {};
        items.forEach((item) => {
            const stageName = item.stage?.nama_stage || item.kategori_tahap || 'UMUM';
            const stageKey = item.stage_id || stageName;
            if (!grouped[stageKey]) {
                grouped[stageKey] = {
                    id: item.stage_id,
                    name: stageName,
                    urutan: item.stage?.urutan || 99,
                    totalBobot: 0,
                    weightedProgress: 0,
                };
            }
            const bobot = parseFloat(item.bobot) || 0;
            const prog = parseFloat(item.progress_percent) || 0;
            grouped[stageKey].totalBobot += bobot;
            grouped[stageKey].weightedProgress += (bobot * (prog / 100));
        });

        return Object.values(grouped).sort((a, b) => a.urutan - b.urutan).map((st) => ({
            ...st,
            progressPercent: st.totalBobot > 0 ? Math.min(100, Math.round((st.weightedProgress / st.totalBobot) * 100)) : 0,
        }));
    }, [project.pekerjaans]);

    const handleTimelineSubmit = (e) => {
        e.preventDefault();
        setIsProcessingTimeline(true);
        router.put(route('project.update', project.id), {
            ...project,
            ...timelineData,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsProcessingTimeline(false);
                setIsTimelineModalOpen(false);
            },
            onError: () => setIsProcessingTimeline(false),
            onFinish: () => setIsProcessingTimeline(false),
        });
    };

    const handleApplyTemplate = () => {
        confirm({
            title: 'Terapkan Template WBS',
            message: `Apakah kamu ingin menyalin template WBS acuan untuk SOW “${project.sow?.nama_sow || 'B2S'}” ke site ini?`,
            variant: 'primary',
            confirmText: 'Ya, Salin',
            cancelText: 'Batal',
            onConfirm: () => {
                router.post(route('pekerjaan.store'), {
                    apply_template: 1,
                    project_id: project.id,
                }, { preserveScroll: true });
            },
        });
    };

    const getStatusStyle = (status) => {
        const s = String(status || '').toUpperCase();
        if (s === 'COMPLETED') return { dot: 'bg-emerald-500 ring-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400' };
        if (s === 'ON_PROGRESS' || s === 'IN_PROGRESS') return { dot: 'bg-blue-500 ring-blue-500/20', text: 'text-blue-600 dark:text-blue-400' };
        if (s === 'ISSUE') return { dot: 'bg-rose-500 ring-rose-500/20', text: 'text-rose-600 dark:text-rose-400' };
        return { dot: 'bg-amber-500 ring-amber-500/20', text: 'text-amber-600 dark:text-amber-400' };
    };

    const statusStyle = getStatusStyle(project.status);

    return (
        <AuthenticatedLayout header={`Site Detail: ${project.site_id}`}>
            <Head title={`Site ${project.site_id} — ${project.site_name}`} />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* 1. HEADER ATAS (NAVIGASI & STATUS TEKS MINIMALIS) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900/70 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center gap-3">
                        <Link 
                            href={route('project.index')} 
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                                    {project.project_code}
                                </span>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span className="text-xs text-slate-500 font-mono">PID: {project.pid || '-'}</span>
                                {project.sow && (
                                    <Badge variant="outline" className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                                        {project.sow.nama_sow}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-0.5">
                                {project.site_id} — {project.site_name}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className={`w-2 h-2 rounded-full ring-4 ${statusStyle.dot}`} />
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${statusStyle.text}`}>
                            {(project.status || 'PLANNING').replace('_', ' ')}
                        </span>
                    </div>
                </div>

                {/* 2. AREA TENGAH: SIDEBAR PROYEK & TAB FOTO/KENDALA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    <div className="lg:col-span-4">
                        <ProjectSidebar 
                            project={project}
                            stageBreakdown={stageBreakdown}
                            onOpenTimeline={() => setIsTimelineModalOpen(true)}
                        />
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-slate-900/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => setActiveSecondaryTab('photos')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                                            activeSecondaryTab === 'photos'
                                                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                        }`}
                                    >
                                        <Camera className="w-3.5 h-3.5" />
                                        <span>Foto Cloudinary ({documentationPhotos.length})</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSecondaryTab('issues')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                                            activeSecondaryTab === 'issues'
                                                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                        }`}
                                    >
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        <span>Kendala Lapangan ({issueList.length})</span>
                                    </button>
                                </div>
                            </div>

                            {activeSecondaryTab === 'photos' && (
                                <TabPhotos 
                                    photos={documentationPhotos}
                                    onPreviewPhoto={setPreviewPhoto}
                                />
                            )}

                            {activeSecondaryTab === 'issues' && (
                                <TabIssues 
                                    issues={issueList} 
                                    onPreviewPhoto={setPreviewPhoto}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. AREA BAWAH: TABEL MASTER WBS LENGKAP */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                Rincian Pekerjaan WBS & Progres Lapangan
                            </h3>
                        </div>
                    </div>

                    <TabWbs 
                        project={project}
                        pekerjaans={project.pekerjaans || []}
                        stages={stages}
                        sowName={project.sow?.nama_sow || 'B2S'}
                        onApplyTemplate={handleApplyTemplate}
                    />
                </div>
            </div>

            {/* Modal Update Milestone Siklus Proyek (Terkoneksi ke SOW Dinamis) */}
            <ModalTimeline 
                isOpen={isTimelineModalOpen}
                onClose={() => setIsTimelineModalOpen(false)}
                siteId={project.site_id}
                sow={project.sow}
                timelineData={timelineData}
                setTimelineData={setTimelineData}
                onSubmit={handleTimelineSubmit}
                isProcessing={isProcessingTimeline}
            />

            {/* Lightbox Pop-up Foto Cloudinary */}
            {previewPhoto && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
                    onClick={() => setPreviewPhoto(null)}
                >
                    <div 
                        className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-3 border-b border-slate-800">
                            <h4 className="text-xs font-bold text-white truncate max-w-md">
                                {previewPhoto.title}
                            </h4>
                            <div className="flex items-center gap-2">
                                <a
                                    href={previewPhoto.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                                >
                                    <span>Buka Ukuran Asli</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setPreviewPhoto(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-2 flex justify-center bg-slate-950 rounded-xl overflow-hidden">
                            <img 
                                src={previewPhoto.url} 
                                alt={previewPhoto.title} 
                                className="max-h-[75vh] object-contain rounded-lg" 
                            />
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}