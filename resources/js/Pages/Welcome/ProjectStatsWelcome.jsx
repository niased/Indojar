// resources/js/Pages/Welcome/ProjectStatsWelcome.jsx

import React from 'react';
import {
    Building2,
    MapPinned,
    TowerControl,
    Wrench,
} from 'lucide-react';

const stats = {
    id: [
        {
            value: '16',
            label: 'Project',
            description: 'Portofolio pekerjaan',
            icon: Building2,
        },
        {
            value: '08',
            label: 'B2S SACME',
            description: 'Pembangunan menara baru',
            icon: TowerControl,
        },
        {
            value: '08',
            label: 'Strengthening',
            description: 'Penguatan struktur menara',
            icon: Wrench,
        },
        {
            value: '05',
            label: 'Provinsi',
            description: 'Wilayah proyek',
            icon: MapPinned,
        },
    ],

    en: [
        {
            value: '16',
            label: 'Projects',
            description: 'Project portfolio',
            icon: Building2,
        },
        {
            value: '08',
            label: 'B2S SACME',
            description: 'New tower construction',
            icon: TowerControl,
        },
        {
            value: '08',
            label: 'Strengthening',
            description: 'Structural strengthening',
            icon: Wrench,
        },
        {
            value: '05',
            label: 'Provinces',
            description: 'Project coverage',
            icon: MapPinned,
        },
    ],
};

function ProjectStat({ stat, className }) {
    const Icon = stat.icon;

    return (
        <article className={`project-stat ${className}`}>
            <div className="project-stat-shape">
                <div className="project-stat-content">
                    <Icon className="project-stat-icon" />

                    <strong className="project-stat-value">
                        {stat.value}
                    </strong>

                    <span className="project-stat-label">
                        {stat.label}
                    </span>

                    <span className="project-stat-description">
                        {stat.description}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default function ProjectStatsWelcome({ lang = 'id' }) {
    const items = stats[lang] || stats.id;

    return (
        <section className="project-stats">
            <div className="project-stats-inner">
                {items.map((item, index) => (
                    <ProjectStat
                        key={item.label}
                        stat={item}
                        className={`project-stat-${index + 1}`}
                    />
                ))}
            </div>

            <style>{`
                /* =====================================================
                   SECTION
                ===================================================== */

                .project-stats {
                    width: 100%;
                    overflow: hidden;
                    background: #031a14;
                    border-bottom: 1px solid rgba(213, 173, 89, 0.18);
                }

                /*
                 * Ukuran area mengikuti layar.
                 * 1120px = batas maksimal.
                 * 70vw = ukuran relatif ketika layar mengecil.
                 * 560px = tinggi maksimal.
                 */
                .project-stats-inner {
                    --diamond-size: clamp(160px, 15vw, 220px);

                    position: relative;
                    width: min(100%, 1120px);
                    height: clamp(450px, 42vw, 560px);
                    margin: 0 auto;
                }

                /* =====================================================
                   DIAMOND
                ===================================================== */

                .project-stat {
                    position: absolute;

                    width: var(--diamond-size);
                    height: var(--diamond-size);

                    z-index: 1;
                }

                .project-stat-shape {
                    width: 100%;
                    height: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    transform: rotate(45deg);

                    background: #08271e;
                    border: 1px solid rgba(213, 173, 89, 0.12);

                    transition:
                        background-color 200ms ease;
                }

                .project-stat-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    width: 100%;
                    height: 100%;

                    padding: clamp(18px, 2vw, 28px);

                    transform: rotate(-45deg);

                    text-align: center;
                }

                /* =====================================================
                   ICON
                ===================================================== */

                .project-stat-icon {
                    width: clamp(22px, 2vw, 29px);
                    height: clamp(22px, 2vw, 29px);

                    margin-bottom: clamp(10px, 1.2vw, 14px);

                    color: #d5ad59;
                    stroke-width: 1.7;
                }

                /* =====================================================
                   NUMBER
                ===================================================== */

                .project-stat-value {
                    color: #ffffff;

                    font-size: clamp(34px, 3.2vw, 46px);
                    line-height: 1;
                    font-weight: 800;
                    letter-spacing: -0.05em;
                }

                /* =====================================================
                   LABEL
                ===================================================== */

                .project-stat-label {
                    margin-top: clamp(7px, 0.8vw, 9px);

                    color: #d5ad59;

                    font-size: clamp(7px, 0.65vw, 9px);
                    line-height: 1.3;
                    font-weight: 700;

                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                }

                /* =====================================================
                   DESCRIPTION
                ===================================================== */

                .project-stat-description {
                    max-width: clamp(95px, 9vw, 125px);

                    margin-top: 6px;

                    color: rgba(255, 255, 255, 0.42);

                    font-size: clamp(8px, 0.72vw, 10px);
                    line-height: 1.45;
                }

                /* =====================================================
                   RESPONSIVE POSITION
                   PC + TABLET
                ===================================================== */

                /*
                 * 01 — Atas agak ke kiri
                 */
                .project-stat-1 {
                    top: clamp(40px, 7vw, 80px);
                    left: 40%;

                    transform: translateX(-50%);
                    z-index: 4;
                }

                /*
                 * 02 — Kiri bawah
                 */
                .project-stat-2 {
                    top: clamp(155px, 19vw, 220px);
                    left: clamp(3%, 11vw, 11%);

                    z-index: 3;
                }

                /*
                 * 03 — Kanan atas
                 */
                .project-stat-3 {
                    top: clamp(40px, 7vw, 80px);
                    right: clamp(4%, 12vw, 12%);

                    z-index: 3;
                }

                /*
                 * 04 — Kanan bawah agak ke tengah
                 */
                .project-stat-4 {
                    top: clamp(155px, 19vw, 220px);
                    left: 59%;

                    transform: translateX(-50%);
                    z-index: 2;
                }

                /* =====================================================
                   HOVER
                   Sangat ringan.
                ===================================================== */

                .project-stat:hover {
                    z-index: 5;
                }

                .project-stat:hover .project-stat-shape {
                    background: #0a3025;
                }

                /* =====================================================
                   MOBILE
                   Kotak 2 x 2
                ===================================================== */

                @media (max-width: 640px) {
                    .project-stats {
                        padding: 20px 16px 24px;
                    }

                    .project-stats-inner {
                        display: grid;

                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));

                        gap: 12px;

                        width: 100%;
                        height: auto;

                        --diamond-size: auto;
                    }

                    .project-stat {
                        position: static;

                        width: auto;
                        height: auto;

                        transform: none;
                    }

                    .project-stat-shape {
                        width: 100%;
                        height: auto;

                        aspect-ratio: 1 / 1;

                        transform: none;
                    }

                    .project-stat-content {
                        transform: none;
                        padding: 18px;
                    }

                    .project-stat-icon {
                        width: 23px;
                        height: 23px;
                        margin-bottom: 10px;
                    }

                    .project-stat-value {
                        font-size: 30px;
                    }

                    .project-stat-label {
                        margin-top: 7px;
                        font-size: 7px;
                        letter-spacing: 0.1em;
                    }

                    .project-stat-description {
                        max-width: 100px;
                        margin-top: 5px;
                        font-size: 8px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .project-stat-shape {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}