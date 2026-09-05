import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeft, 
    Building2, 
    MapPin, 
    Calendar, 
    CheckCircle2, 
    Clock, 
    Camera, 
    Upload, 
    Trash2, 
    ExternalLink,
    HardHat,
    Layers,
    Wrench,
    Sparkles
} from 'lucide-react';

export default function ProjectShow({ project, pekerjaans = [] }) {
    const [activeTab, setActiveTab] = useState('milestone');
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [selectedPekerjaanId, setSelectedPekerjaanId] = useState('');

    // Form Tambah Progress / Milestone
    const progressForm = useForm({
        tahap: 'PONDASI',
        bobot_persen: '',
        keterangan: '',
        tanggal_pengerjaan: new Date().toISOString().slice(0, 10),
    });

    // Form Upload Foto Dokumentasi Lapangan
    const photoForm = useForm({
        tahap: 'PONDASI',
        keterangan: '',
        foto: null,
    });

    // Handler Auto-fill saat memilih dari Master Pekerjaan
    const handleSelectPekerjaan = (pekerjaanId) => {
        setSelectedPekerjaanId(pekerjaanId);
        if (!pekerjaanId) return;

        const found = pekerjaans.find(p => String(p.id) === String(pekerjaanId));
        if (found) {
            progressForm.setData({
                ...progressForm.data,
                tahap: found.kategori_tahap,
                bobot_persen: found.bobot_standar,
                keterangan: `${found.kode_pekerjaan} - ${found.nama_pekerjaan}${found.deskripsi ? ` (${found.deskripsi})` : ''}`,
            });
        }
    };

    const handleProgressSubmit = (e) => {
        e.preventDefault();
        progressForm.post(route('project.progress.store', project.id), {
            preserveScroll: true,
            onSuccess: () => {
                progressForm.reset('bobot_persen', 'keterangan');
                setSelectedPekerjaanId('');
            },
        });
    };

    const handlePhotoSubmit = (e) => {
        e.preventDefault();
        photoForm.post(route('project.photo.store', project.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsUploadOpen(false);
                photoForm.reset();
            },
        });
    };

    const handleDeletePhoto = (photoId) => {
        if (confirm('Apakah kamu yakin ingin menghapus foto dokumentasi ini?')) {
            router.delete(route('project.photo.destroy', photoId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout header={`Detail Site: ${project.site_id}`}>
            <Head title={`Site ${project.site_id} - ${project.site_name}`} />

            <div className="space-y-6 max-w-7xl mx-auto">
                {/* 1. Header & Tombol Kembali */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link 
                            href={route('project.index')} 
                            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                                    {project.project_code}
                                </span>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span className="text-xs text-slate-500 font-mono">PID: {project.pid || '-'}</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                {project.site_id} — {project.site_name}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            Status: {project.status}
                        </span>
                    </div>
                </div>

                {/* 2. Ringkasan Parameter Site */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Spesifikasi Struktur</span>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{project.tipe_tower}</div>
                        <span className="text-xs text-emerald-600 font-semibold">{project.tinggi_tower}</span>
                    </div>

                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Klien / Operator</span>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{project.client_name}</div>
                        <span className="text-xs text-slate-500">Konsultan: {project.konsultan}</span>
                    </div>

                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Wilayah & Koordinat</span>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">{project.wilayah}</div>
                        <span className="text-xs font-mono text-slate-400 truncate block">{project.lat_long || '-'}</span>
                    </div>

                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Target RFI</span>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                            {project.target_rfi_date ? new Date(project.target_rfi_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-emerald-600 dark:bg-amber-400 h-full rounded-full transition-all duration-300" 
                                    style={{ width: `${Math.min(100, project.progress_percent || 0)}%` }} 
                                />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{project.progress_percent}%</span>
                        </div>
                    </div>
                </div>

                {/* 3. Tab Navigasi Detail */}
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={() => setActiveTab('milestone')}
                        className={`pb-3 px-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                            activeTab === 'milestone'
                                ? 'border-emerald-600 text-emerald-600 dark:border-amber-400 dark:text-amber-400'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                        }`}
                    >
                        Milestone & Progres ({project.progresses?.length || 0})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('photos')}
                        className={`pb-3 px-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                            activeTab === 'photos'
                                ? 'border-emerald-600 text-emerald-600 dark:border-amber-400 dark:text-amber-400'
                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                        }`}
                    >
                        Dokumentasi Lapangan ({project.photos?.length || 0})
                    </button>
                </div>

                {/* 4. Konten Tab Milestone */}
                {activeTab === 'milestone' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Timeline Riwayat Progres */}
                        <div className="lg:col-span-7 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Riwayat Progres Terverifikasi</h3>
                            {project.progresses && project.progresses.length > 0 ? (
                                <div className="space-y-4 border-l-2 border-slate-200 dark:border-slate-800 ml-2 pl-4">
                                    {project.progresses.map((prog, idx) => (
                                        <div key={idx} className="relative space-y-1">
                                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white dark:ring-slate-900" />
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-bold text-slate-800 dark:text-slate-100">{prog.tahap}</span>
                                                <span className="text-slate-400 font-mono">{prog.tanggal_pengerjaan}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 dark:text-slate-300">{prog.keterangan || 'Pekerjaan selesai.'}</p>
                                            <span className="inline-block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                                                Bobot: +{prog.bobot_persen}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 py-8 text-center">Belum ada progres yang dicatat untuk site ini.</p>
                            )}
                        </div>

                        {/* Form Input Progres Baru (Terintegrasi Master Pekerjaan) */}
                        <div className="lg:col-span-5 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Input Progres dari Master WBS</h3>
                            </div>
                            
                            <form onSubmit={handleProgressSubmit} className="space-y-3.5 text-xs">
                                {/* DROPDOWN PILIH DARI MASTER PEKERJAAN */}
                                <div>
                                    <label className="block font-bold mb-1 text-slate-800 dark:text-slate-200">
                                        Pilih Item Master Pekerjaan
                                    </label>
                                    <select
                                        value={selectedPekerjaanId}
                                        onChange={(e) => handleSelectPekerjaan(e.target.value)}
                                        className="w-full px-3 py-2 bg-emerald-50/50 dark:bg-slate-950 border border-emerald-500/30 dark:border-slate-800 rounded-xl font-semibold text-emerald-800 dark:text-emerald-300 cursor-pointer"
                                    >
                                        <option value="">-- Pilih dari Katalog Master Pekerjaan --</option>
                                        {pekerjaans.map((pek) => (
                                            <option key={pek.id} value={pek.id}>
                                                [{pek.kode_pekerjaan}] {pek.nama_pekerjaan} ({pek.bobot_standar}%)
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-[10px] text-slate-400 mt-1 block">
                                        Memilih item pekerjaan akan otomatis mengisi kolom tahap, bobot, dan uraian di bawah.
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                                    <div>
                                        <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Tahap Konstruksi</label>
                                        <select
                                            value={progressForm.data.tahap}
                                            onChange={(e) => progressForm.setData('tahap', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold"
                                        >
                                            <option value="PLANNING">Planning / Bowplank</option>
                                            <option value="PONDASI">Pondasi & Cor Beton</option>
                                            <option value="ERECTION">Erection Tower</option>
                                            <option value="CME">CME & Grounding</option>
                                            <option value="ATP">Uji Kelayakan / ATP</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Bobot Persen (%) *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            placeholder="Contoh: 15.00"
                                            value={progressForm.data.bobot_persen}
                                            onChange={(e) => progressForm.setData('bobot_persen', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono font-bold"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Tanggal Pekerjaan *</label>
                                    <input
                                        type="date"
                                        value={progressForm.data.tanggal_pengerjaan}
                                        onChange={(e) => progressForm.setData('tanggal_pengerjaan', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Uraian / Catatan Tambahan</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Keterangan pelaksanaan teknis di lapangan..."
                                        value={progressForm.data.keterangan}
                                        onChange={(e) => progressForm.setData('keterangan', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={progressForm.processing}
                                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {progressForm.processing ? 'Menyimpan...' : 'Simpan Milestone Progres'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* 5. Konten Tab Foto Lapangan */}
                {activeTab === 'photos' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Dokumentasi Uji Fisik & Foto Site</h3>
                            <button
                                type="button"
                                onClick={() => setIsUploadOpen(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
                            >
                                <Upload className="w-3.5 h-3.5" />
                                <span>Unggah Foto Site</span>
                            </button>
                        </div>

                        {project.photos && project.photos.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {project.photos.map((ph) => (
                                    <div key={ph.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                                        <img 
                                            src={ph.file_path ? `/storage/${ph.file_path}` : '/images/ptindojar.jpg'} 
                                            alt={ph.keterangan || 'Dokumentasi Site'} 
                                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="p-2.5 text-xs">
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase block">{ph.tahap}</span>
                                            <p className="text-slate-700 dark:text-slate-300 truncate mt-0.5">{ph.keterangan || 'Foto lapangan'}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeletePhoto(ph.id)}
                                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/80 text-white opacity-0 group-hover:opacity-100 hover:bg-rose-700 transition-all cursor-pointer"
                                            title="Hapus Foto"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
                                <Camera className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                                <p className="text-xs">Belum ada foto dokumentasi teknis lapangan yang diunggah.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal Unggah Foto */}
            {isUploadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Unggah Foto Lapangan</h3>
                            <button type="button" onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer">Tutup</button>
                        </div>

                        <form onSubmit={handlePhotoSubmit} className="space-y-3 text-xs">
                            <div>
                                <label className="block font-semibold mb-1">Tahap Dokumentasi</label>
                                <select
                                    value={photoForm.data.tahap}
                                    onChange={(e) => photoForm.setData('tahap', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                                >
                                    <option value="PONDASI">Pondasi (Slump Test / Pembesian)</option>
                                    <option value="ERECTION">Erection (Vertikalitas & Rangka)</option>
                                    <option value="CME">CME (Grounding & KWH Listrik)</option>
                                    <option value="ATP">ATP / Uji Terima Konsultan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Keterangan Foto</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Pengujian nilai grounding kaki A..."
                                    value={photoForm.data.keterangan}
                                    onChange={(e) => photoForm.setData('keterangan', e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Pilih File Foto</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => photoForm.setData('foto', e.target.files[0])}
                                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950 dark:file:text-emerald-400"
                                    required
                                />
                            </div>

                            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadOpen(false)}
                                    className="px-4 py-2 text-slate-500 font-semibold cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={photoForm.processing}
                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                                >
                                    {photoForm.processing ? 'Mengunggah...' : 'Unggah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}