import React from 'react';

export default function LoginAnimation({ bgIndex = 0 }) {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            {/* Grid Latar Belakang Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] z-10" />

            {/* Custom CSS Keyframes Animasi Vektor Sleek */}
            <style>{`
                @keyframes dashFlow {
                    0% { stroke-dashoffset: 32; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes signalExpand {
                    0% { r: 6px; opacity: 0.9; stroke-width: 2px; }
                    100% { r: 42px; opacity: 0; stroke-width: 0.5px; }
                }
                @keyframes barPulseA {
                    0%, 100% { transform: scaleY(0.85); }
                    50% { transform: scaleY(1.05); }
                }
                @keyframes barPulseB {
                    0%, 100% { transform: scaleY(1.05); }
                    50% { transform: scaleY(0.82); }
                }
                @keyframes pulseNode {
                    0%, 100% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.08); opacity: 0.9; }
                }
                @keyframes floatPacket {
                    0% { stroke-dashoffset: 40; opacity: 0.2; }
                    50% { opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 0.2; }
                }
                .animate-dash-flow {
                    stroke-dasharray: 6 6;
                    animation: dashFlow 1.8s linear infinite;
                }
                .animate-signal-wave {
                    animation: signalExpand 2.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                .animate-bar-a {
                    transform-origin: bottom;
                    animation: barPulseA 3.5s ease-in-out infinite;
                }
                .animate-bar-b {
                    transform-origin: bottom;
                    animation: barPulseB 4s ease-in-out infinite;
                }
                .animate-pulse-node {
                    animation: pulseNode 3s ease-in-out infinite;
                }
                .animate-float-packet {
                    stroke-dasharray: 8 12;
                    animation: floatPacket 2.5s linear infinite;
                }
            `}</style>

            {/* TEMA 0: TOWER BTS TELEKOMUNIKASI RAMPING & PRESISI */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${bgIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute left-[28%] top-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 460 300" className="w-full h-auto max-h-[360px]">
                        {/* Gelombang Sinyal dari Puncak Menara */}
                        <g fill="none" stroke="#38bdf8" transform="translate(-10, 0)">
                            <circle cx="170" cy="60" r="10" strokeWidth="1.2" className="animate-signal-wave" />
                            <circle cx="170" cy="60" r="22" strokeWidth="1.2" className="animate-signal-wave" style={{ animationDelay: '0.9s' }} />
                            <circle cx="170" cy="60" r="34" strokeWidth="1.2" className="animate-signal-wave" style={{ animationDelay: '1.8s' }} />
                        </g>

                        {/* Struktur Ramping Menara BTS */}
                        <g stroke="#3b82f6" strokeWidth="1.2" fill="none" transform="translate(-10, 0)">
                            <line x1="135" y1="245" x2="166" y2="60" stroke="#3b82f6" strokeWidth="1.8" />
                            <line x1="205" y1="245" x2="174" y2="60" stroke="#3b82f6" strokeWidth="1.8" />

                            <line x1="140" y1="210" x2="200" y2="210" stroke="#1e293b" />
                            <line x1="147" y1="175" x2="193" y2="175" stroke="#1e293b" />
                            <line x1="154" y1="140" x2="186" y2="140" stroke="#1e293b" />
                            <line x1="160" y1="105" x2="180" y2="105" stroke="#1e293b" />

                            <line x1="135" y1="245" x2="200" y2="210" stroke="#2563eb" opacity="0.6" />
                            <line x1="205" y1="245" x2="140" y2="210" stroke="#2563eb" opacity="0.6" />
                            <line x1="140" y1="210" x2="193" y2="175" stroke="#2563eb" opacity="0.6" />
                            <line x1="200" y1="210" x2="147" y2="175" stroke="#2563eb" opacity="0.6" />
                            <line x1="147" y1="175" x2="186" y2="140" stroke="#2563eb" opacity="0.6" />
                            <line x1="193" y1="175" x2="154" y2="140" stroke="#2563eb" opacity="0.6" />
                            <line x1="154" y1="140" x2="180" y2="105" stroke="#2563eb" opacity="0.6" />
                            <line x1="186" y1="140" x2="160" y2="105" stroke="#2563eb" opacity="0.6" />

                            <rect x="163" y="52" width="14" height="16" rx="2" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.2" />
                            <line x1="155" y1="56" x2="155" y2="64" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="185" y1="56" x2="185" y2="64" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="170" y1="38" x2="170" y2="52" stroke="#fbbf24" strokeWidth="1.5" />
                            <circle cx="170" cy="36" r="2.5" fill="#fbbf24" />
                        </g>
                    </svg>
                </div>
            </div>

            {/* TEMA 1: ANIMASI 2 CLEAN - GARIS & BATANG TANPA TITIK BULAT */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${bgIndex === 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute left-[22%] top-[55%] -translate-y-1/2 w-[380px] h-[380px] bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 460 300" className="w-full h-auto max-h-[360px]">
                        <defs>
                            <linearGradient id="barGradA" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
                                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
                            </linearGradient>
                            <linearGradient id="barGradB" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#059669" stopOpacity="0.08" />
                            </linearGradient>
                            <linearGradient id="waveLineGlow" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="40%" stopColor="#10b981" />
                                <stop offset="80%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
                            </linearGradient>
                            <linearGradient id="areaFillGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

                        {/* Grid Garis Latar Belakang */}
                        <g stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4">
                            <line x1="50" y1="125" x2="380" y2="125" opacity="0.4" />
                            <line x1="50" y1="160" x2="380" y2="160" opacity="0.4" />
                            <line x1="50" y1="195" x2="380" y2="195" opacity="0.4" />
                            <line x1="50" y1="225" x2="380" y2="225" stroke="#334155" strokeDasharray="none" />
                        </g>

                        {/* Diagram Batang / Equalizer Sinyal */}
                        <g transform="translate(0, 0)">
                            <rect x="60" y="170" width="14" height="55" rx="3" fill="url(#barGradA)" className="animate-bar-a" />
                            <rect x="88" y="140" width="14" height="85" rx="3" fill="url(#barGradB)" className="animate-bar-b" />
                            <rect x="116" y="160" width="14" height="65" rx="3" fill="url(#barGradA)" className="animate-bar-a" style={{ animationDelay: '0.6s' }} />
                            <rect x="144" y="120" width="14" height="105" rx="3" fill="url(#barGradB)" className="animate-bar-b" style={{ animationDelay: '0.4s' }} />
                            <rect x="172" y="142" width="14" height="83" rx="3" fill="url(#barGradA)" className="animate-bar-a" style={{ animationDelay: '1s' }} />
                            <rect x="200" y="130" width="14" height="95" rx="3" fill="url(#barGradB)" className="animate-bar-b" style={{ animationDelay: '0.8s' }} />
                            <rect x="228" y="155" width="14" height="70" rx="3" fill="url(#barGradA)" className="animate-bar-a" style={{ animationDelay: '0.2s' }} />
                            <rect x="256" y="175" width="14" height="50" rx="3" fill="url(#barGradB)" className="animate-bar-b" style={{ animationDelay: '0.5s' }} />
                        </g>

                        {/* Area Gradient di Bawah Kurva Line */}
                        <path 
                            d="M 50 185 C 80 175, 95 135, 120 155 C 145 175, 160 120, 180 140 C 200 160, 220 128, 250 150 C 280 170, 320 185, 380 205 L 380 225 L 50 225 Z" 
                            fill="url(#areaFillGrad)" 
                        />

                        {/* Garis Kurva Line Utama */}
                        <path 
                            d="M 50 185 C 80 175, 95 135, 120 155 C 145 175, 160 120, 180 140 C 200 160, 220 128, 250 150 C 280 170, 320 185, 380 205" 
                            fill="none" 
                            stroke="url(#waveLineGlow)" 
                            strokeWidth="2.8" 
                            strokeLinecap="round"
                        />

                        {/* Pulsa Cahaya Mengalir pada Garis Kurva */}
                        <path 
                            d="M 50 185 C 80 175, 95 135, 120 155 C 145 175, 160 120, 180 140 C 200 160, 220 128, 250 150 C 280 170, 320 185, 380 205" 
                            fill="none" 
                            stroke="#ffffff" 
                            strokeWidth="1.4" 
                            className="animate-dash-flow"
                            opacity="0.85"
                        />
                    </svg>
                </div>
            </div>

            {/* TEMA 2: TOPOLOGI ALUR SUREL & DISPOSISI HQ-SITE */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${bgIndex === 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute left-[28%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 460 300" className="w-full h-auto max-h-[360px]">
                        {/* Center Hub Node (HQ) */}
                        <g transform="translate(195, 125)">
                            <circle cx="20" cy="20" r="35" fill="#0f172a" stroke="#0284c7" strokeWidth="1.8" className="animate-pulse-node" />
                            <circle cx="20" cy="20" r="24" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                            <rect x="9" y="12" width="22" height="16" rx="2.5" fill="none" stroke="#38bdf8" strokeWidth="1.8" />
                            <path d="M 9 14 L 20 22 L 31 14" stroke="#38bdf8" strokeWidth="1.8" fill="none" />
                        </g>

                        {/* Branch Paths & Site Nodes */}
                        <g stroke="#334155" strokeWidth="1.2" fill="#0f172a">
                            <path d="M 75 65 Q 140 60, 195 125" stroke="#2563eb" fill="none" className="animate-float-packet" />
                            <circle cx="75" cy="65" r="16" stroke="#3b82f6" strokeWidth="1.5" />
                            <circle cx="75" cy="65" r="3.5" fill="#3b82f6" />

                            <path d="M 365 75 Q 300 65, 235 125" stroke="#f59e0b" fill="none" className="animate-float-packet" />
                            <circle cx="365" cy="75" r="16" stroke="#f59e0b" strokeWidth="1.5" />
                            <circle cx="365" cy="75" r="3.5" fill="#fbbf24" />

                            <path d="M 95 220 Q 150 215, 195 155" stroke="#10b981" fill="none" className="animate-float-packet" />
                            <circle cx="95" cy="220" r="16" stroke="#10b981" strokeWidth="1.5" />
                            <circle cx="95" cy="220" r="3.5" fill="#10b981" />

                            <path d="M 355 210 Q 295 205, 235 155" stroke="#38bdf8" fill="none" className="animate-float-packet" />
                            <circle cx="355" cy="210" r="16" stroke="#38bdf8" strokeWidth="1.5" />
                            <circle cx="355" cy="210" r="3.5" fill="#38bdf8" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}