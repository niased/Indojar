import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Phone, Mail, Lock, ArrowRight } from 'lucide-react';

export default function ProjectsCtaFooter({ auth, t }) {
    const [activeTab, setActiveTab] = useState('b2s');

    const b2sList = [
        { site: 'Panguragan Kulon', city: 'Cirebon', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Cilangkap', city: 'Depok', province: 'Jawa Barat', scope: 'Monopole 30M SACME' },
        { site: 'Ciomas Kota Baru', city: 'Bogor', province: 'Jawa Barat', scope: 'SST 42M B2S SACME' },
        { site: 'Katulampa', city: 'Bogor', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Batujajar', city: 'Bandung', province: 'Jawa Barat', scope: 'SST 42M B2S SACME' },
        { site: 'Bahagia Babelan', city: 'Bekasi', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Sukadanau Cikarang', city: 'Bekasi', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
        { site: 'Bengle Majalaya', city: 'Karawang', province: 'Jawa Barat', scope: 'SST 52M B2S SACME' },
    ];

    const strList = [
        { site: 'Kawali Linggapura', city: 'Ciamis', province: 'Jawa Barat', scope: 'Re-Bracing & Member' },
        { site: 'Cipaku Selamanik', city: 'Ciamis', province: 'Jawa Barat', scope: 'Strengthening Leg 1-4' },
        { site: 'Curug Serang', city: 'Serang', province: 'Banten', scope: 'Member Replacement' },
        { site: 'Raya Kresek', city: 'Tangerang', province: 'Banten', scope: 'Strengthening SST' },
        { site: 'Mayor Oking Citeureup', city: 'Bogor', province: 'Jawa Barat', scope: 'Antenna Mount Support' },
        { site: 'Rorotan', city: 'Jakarta Utara', province: 'DKI Jakarta', scope: 'Strengthening & CME' },
        { site: 'Dumai Harbor', city: 'Dumai', province: 'Riau Mainland', scope: 'Tower Strengthening' },
        { site: 'Tabek Patah', city: 'Tanah Datar', province: 'Sumatera Barat', scope: 'Tower Strengthening' },
    ];

    return (
        <div>
            {/* LAPISAN 6: OUR PROJECTS (Portofolio Proyek Nyata) */}
            <section id="portofolio" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
                            {t.projects.tag}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            {t.projects.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                            {t.projects.subtitle}
                        </p>
                    </div>

                    <div className="flex items-center rounded-xl p-1 bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => setActiveTab('b2s')}
                            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                                activeTab === 'b2s' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold' : 'text-slate-500'
                            }`}
                        >
                            {t.projects.b2sTab}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('str')}
                            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                                activeTab === 'str' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold' : 'text-slate-500'
                            }`}
                        >
                            {t.projects.strTab}
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">No</th>
                                    <th className="px-6 py-4">{t.projects.thSite}</th>
                                    <th className="px-6 py-4">{t.projects.thCity}</th>
                                    <th className="px-6 py-4">{t.projects.thProvince}</th>
                                    <th className="px-6 py-4 text-right">{t.projects.thScope}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                {(activeTab === 'b2s' ? b2sList : strList).map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-3.5 font-mono text-slate-400">{idx + 1}</td>
                                        <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-white">{item.site}</td>
                                        <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300">{item.city}</td>
                                        <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400">{item.province}</td>
                                        <td className="px-6 py-3.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">
                                            {item.scope}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Klien Strip */}
            <section id="klien" className="py-16 px-6 sm:px-10 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800/80 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-6">
                    {t.clients.tag} &bull; {t.clients.title}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300 text-xs font-bold">
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">MITRATEL</span>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">TELKOMSEL</span>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">XL AXIATA</span>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300">INDOSAT OOREDOO</span>
                </div>
            </section>

            {/* LAPISAN 7: CALL TO ACTION (CTA) */}
            <section className="py-20 px-6 sm:px-10 max-w-7xl mx-auto">
                <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#064e3b] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                    
                    <div className="relative z-10 max-w-xl">
                        <span className="text-xs font-bold tracking-widest uppercase text-amber-300 block mb-2">Let's Build a Better Connected Indonesia</span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Partner with Us for Reliable Telecommunication Solutions.</h2>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <a
                            href="#kontak"
                            className="px-6 py-3.5 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-900 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                            <span>Contact Us</span>
                            <ArrowRight className="w-4 h-4 text-amber-400" />
                        </a>
                    </div>
                </div>
            </section>

            {/* LAPISAN 8: FOOTER */}
            <footer id="kontak" className="bg-slate-950 text-slate-400 py-12 px-6 sm:px-10 text-xs border-t border-slate-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">IMA</div>
                            <span className="font-bold text-sm text-white">PT INDOJAR MULIA ABADI</span>
                        </div>
                        <p className="leading-relaxed">General Contractor, Telecommunication & Civil Engineering Infrastructure.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white mb-3">{t.contact.officeHead}</h4>
                        <p className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{t.contact.officeAddr}</span>
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-white mb-3">{t.contact.mgmtHead}</h4>
                        <p><strong>{t.contact.director}:</strong> Edy Julianto</p>
                        <p className="mt-1 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>edy_juls@yahoo.co.id &bull; info@indojar.com</span>
                        </p>
                        <p className="mt-1 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>021-29888318 &bull; +62 816-896-973</span>
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-3">
                    <span>&copy; {new Date().getFullYear()} PT Indojar Mulia Abadi. All rights reserved.</span>
                    <span>DBS Bank Tower 28/F, Ciputra World One, Jakarta</span>
                </div>
            </footer>

            {/* Tombol Melayang (Floating Action Button) di Pojok Kanan Bawah */}
            <div className="fixed bottom-6 right-6 z-50">
                <Link
                    href={auth?.user ? "/dashboard" : "/login"}
                    className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#064e3b] to-emerald-600 hover:from-[#08634c] hover:to-emerald-500 text-white shadow-2xl shadow-emerald-950/60 border border-emerald-400/30 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
                        <Lock className="w-4 h-4 text-amber-300" />
                    </div>
                    <div className="flex flex-col text-left pr-1">
                        <span className="text-xs font-bold leading-none tracking-tight">
                            {auth?.user ? 'Ke Dashboard' : t.floating.text}
                        </span>
                        <span className="text-[10px] text-emerald-200 font-medium mt-0.5">
                            {auth?.user ? 'Sistem Aktif' : t.floating.sub}
                        </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}