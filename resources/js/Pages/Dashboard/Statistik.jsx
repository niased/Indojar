import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, HardHat, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Statistik({ kpi = {} }) {
    const totalSite      = kpi.totalSite ?? 0;
    const totalPlanning  = kpi.totalPlanning ?? 0;
    const totalProgress  = kpi.totalProgress ?? 0;
    const totalCompleted = kpi.totalCompleted ?? 0;
    const totalIssues    = kpi.totalIssues ?? 0;

    const cards = [
        {
            title: 'TOTAL SITE MENARA',
            value: totalSite.toLocaleString('id-ID'),
            desc: 'Site kontrak terdaftar',
            icon: Building2,
            iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
            valColor: 'text-slate-900 dark:text-white',
        },
        {
            title: 'PLANNING & PERSIAPAN',
            value: totalPlanning.toLocaleString('id-ID'),
            desc: 'Site tahap perencanaan',
            icon: HardHat,
            iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
            valColor: 'text-amber-600 dark:text-amber-400',
        },
        {
            title: 'ON PROGRESS',
            value: totalProgress.toLocaleString('id-ID'),
            desc: 'Konstruksi fisik berjalan',
            icon: Layers,
            iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
            valColor: 'text-sky-600 dark:text-sky-400',
        },
        {
            title: 'SELESAI 100% / RFI',
            value: totalCompleted.toLocaleString('id-ID'),
            desc: 'Siap uji terima & BAST',
            icon: CheckCircle2,
            iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            valColor: 'text-emerald-600 dark:text-emerald-400',
        },
        {
            title: 'KENDALA LAPANGAN',
            value: totalIssues.toLocaleString('id-ID'),
            desc: 'Isu lapangan terbuka',
            icon: AlertTriangle,
            iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
            valColor: 'text-rose-600 dark:text-rose-400',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <Card 
                        key={idx} 
                        className={`bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 rounded-xl shadow-xs flex flex-col justify-between ${
                            idx === cards.length - 1 ? 'col-span-2 md:col-span-1' : ''
                        }`}
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3.5 px-4">
                            <CardTitle className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                                {card.title}
                            </CardTitle>
                            <div className={`p-1.5 rounded-lg ${card.iconBg}`}>
                                <Icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3.5">
                            <div 
                                className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${card.valColor} truncate`}
                                title={card.value}
                            >
                                {card.value}
                            </div>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">
                                {card.desc}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}