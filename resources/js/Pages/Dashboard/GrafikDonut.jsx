import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function GrafikDonutDistribusi({ sowDistribution = {} }) {
    const COLOR_PALETTE = {
        'B2S': { color: '#10b981', badge: 'bg-emerald-500' },
        'COLO': { color: '#3b82f6', badge: 'bg-blue-500' },
        'CME ONLY': { color: '#f59e0b', badge: 'bg-amber-500' },
        'STRENGTHENING': { color: '#f43f5e', badge: 'bg-rose-500' },
    };

    const { donutData, totalAll } = useMemo(() => {
        const entries = Object.keys(sowDistribution);
        let total = 0;

        const raw = entries.map((key, idx) => {
            const val = Number(sowDistribution[key] || 0);
            total += val;
            const fallbackColors = ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4'];
            const colorDef = COLOR_PALETTE[key] || { 
                color: fallbackColors[idx % fallbackColors.length], 
                badge: 'bg-slate-500' 
            };

            return {
                name: key,
                value: val,
                color: colorDef.color,
                badgeClass: colorDef.badge,
            };
        });

        return {
            totalAll: total,
            donutData: raw.map(item => ({
                ...item,
                pct: total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0',
            }))
        };
    }, [sowDistribution]);

    return (
        <Card className="lg:col-span-1 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 rounded-xl shadow-xs flex flex-col justify-between">
            <CardHeader className="pb-3 pt-4 px-5 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <CardTitle className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Distribusi Scope of Work (SOW)
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col justify-center items-center">
                <div className="relative w-full h-[180px] flex items-center justify-center">
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                        <span className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none">
                            {totalAll.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
                            TOTAL SITE
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={totalAll === 0 ? [{ name: 'Belum Ada Site', value: 1, color: '#334155' }] : donutData}
                                cx="50%"
                                cy="50%"
                                innerRadius={58}
                                outerRadius={78}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {(totalAll === 0 ? [{ color: '#334155' }] : donutData).map((entry, idx) => (
                                    <Cell key={`donut-${idx}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px', color: '#f8fafc' }}
                                formatter={(val, name) => [`${val.toLocaleString('id-ID')} Site (${totalAll > 0 ? ((val / totalAll) * 100).toFixed(1) : 0}%)`, name]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Grid Label Donut */}
                <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                    {donutData.length === 0 ? (
                        <p className="col-span-2 text-center text-xs text-slate-400 py-2">Belum ada data SOW terdaftar.</p>
                    ) : (
                        donutData.map((item, index) => (
                            <div 
                                key={item.name}
                                className={`flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/40 ${
                                    index === donutData.length - 1 && donutData.length % 2 !== 0 ? 'col-span-2' : ''
                                }`}
                            >
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.badgeClass}`} />
                                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">{item.name}</span>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block leading-none">{item.value.toLocaleString('id-ID')}</span>
                                    <span className="text-[9px] text-slate-400 font-medium">{item.pct}%</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}