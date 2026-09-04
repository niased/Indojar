// resources/js/Pages/Welcome/VisionMissionServices.jsx
import React from 'react';
import { Building2, HardHat, Layers, CheckCircle2, ArrowRight, Radio } from 'lucide-react';

export default function VisionMissionServices({ t }) {
    return (
        <div>
            {/* LAPISAN 4: VISION & MISSION */}
            <section className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800/80">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Our Vision */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">Our Vision</h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {t.about.visionDesc}
                            </p>
                        </div>
                    </div>

                    {/* Our Mission (Numbered List 01, 02, 03) */}
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                        
                        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            <div className="flex items-start gap-4">
                                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-base">01</span>
                                <p className="leading-relaxed pt-0.5">{t.about.m1}</p>
                            </div>
                            <div className="flex items-start gap-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-base">02</span>
                                <p className="leading-relaxed pt-0.5">{t.about.m2}</p>
                            </div>
                            <div className="flex items-start gap-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-base">03</span>
                                <p className="leading-relaxed pt-0.5">{t.about.m3}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LAPISAN 5: PRODUCTS & SERVICES */}
            <section id="layanan" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
                    <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
                            {t.services.tag}
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            {t.services.title}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Item 1 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tower Construction / B2S SACME</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                {t.services.s1Desc}
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                                <HardHat className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tower Strengthening</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                {t.services.s2Desc}
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Colocation Works</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                {t.services.s3Desc}
                            </p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                                <Radio className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">And Others</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                Perbaikan umum infrastruktur menara, pemeliharaan site, penarikan kabel, dan perizinan teknis lapangan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}