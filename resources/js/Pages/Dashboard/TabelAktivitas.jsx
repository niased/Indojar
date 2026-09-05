import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, History, Search } from 'lucide-react';

export default function TabelAktivitas({ recentProjects = [] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return recentProjects;
        const q = searchQuery.toLowerCase().trim();
        return recentProjects.filter(p => 
            (p.no_transaksi && p.no_transaksi.toLowerCase().includes(q)) ||
            (p.pihak_asal && p.pihak_asal.toLowerCase().includes(q)) ||
            (p.sow && p.sow.toLowerCase().includes(q)) ||
            (p.area && p.area.toLowerCase().includes(q)) ||
            (p.pic_user?.name && p.pic_user.name.toLowerCase().includes(q))
        );
    }, [recentProjects, searchQuery]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'COMPLETED':
                return <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold uppercase tracking-wider">SELESAI</Badge>;
            case 'ON_PROGRESS':
                return <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-bold uppercase tracking-wider">ON PROGRESS</Badge>;
            case 'ISSUE':
                return <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 font-bold uppercase tracking-wider">ISSUE</Badge>;
            default:
                return <Badge variant="outline" className="font-semibold uppercase">{status || 'PLANNING'}</Badge>;
        }
    };

    return (
        <Card className="w-full bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
            <CardHeader className="pb-3 pt-4 px-5 border-b border-slate-100 dark:border-slate-800/50 flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                        Riwayat Proyek & Site Menara Terkini
                    </CardTitle>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari Site / PIC..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1 text-xs bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors w-40 sm:w-60"
                        />
                    </div>
                    <Link href={route('project.index')} className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                        <span>Semua Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full overflow-x-auto">
                    <Table className="w-full text-xs">
                        <TableHeader className="bg-slate-100 dark:bg-slate-950/90">
                            <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                                <TableHead className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5">Kode Proyek</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-wider px-2 py-2.5 text-center">Status</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5">Site Menara & Area</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5">SOW</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 text-center">Progres</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-wider px-4 py-2.5">PIC Waslap</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredList.length > 0 ? (
                                filteredList.map((p) => (
                                    <TableRow key={p.id || p.no_transaksi} className="border-slate-100 dark:border-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <TableCell className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 py-3 px-4">
                                            {p.no_transaksi}
                                            <span className="block font-normal text-[10px] text-slate-400">{p.tanggal}</span>
                                        </TableCell>
                                        <TableCell className="text-center py-3 px-2">
                                            {getStatusBadge(p.sub_jenis)}
                                        </TableCell>
                                        <TableCell className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                                            {p.pihak_asal}
                                            <span className="block text-[10px] text-slate-400 font-normal">{p.area}</span>
                                        </TableCell>
                                        <TableCell className="py-3 px-4 font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                                            {p.sow}
                                        </TableCell>
                                        <TableCell className="py-3 px-4 text-center font-mono font-bold">
                                            {p.progress || 0}%
                                        </TableCell>
                                        <TableCell className="py-3 px-4 text-slate-600 dark:text-slate-300">
                                            {p.pic_user?.name || '-'}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6 text-slate-400 text-xs">
                                        Tidak ada data proyek terkini.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}