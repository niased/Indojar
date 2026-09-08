// resources/js/Pages/Welcome/ProjectWelcome.jsx

import React from 'react';

import img1 from '@/../images/b2s.jpg';
import img2 from '@/../images/ptindojar3.jpg';
import img3 from '@/../images/colo.jpg';
import img4 from '@/../images/ptindojar.jpg';
import img5 from '@/../images/ptindojar2.jpg';

import ProjectStatsWelcome from './ProjectStatsWelcome';

const projectImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img1,
];

function ProjectMosaic() {
    return (
        <div className="project-mosaic">
            {/* =====================================================
                FOTO 1
                BESAR KIRI ATAS
            ===================================================== */}
            <div className="project-photo photo-1">
                <img
                    src={projectImages[0]}
                    alt="Dokumentasi proyek PT Indojar Mulia Abadi"
                />
            </div>

            {/* =====================================================
                FOTO 2
                ATAS TENGAH
            ===================================================== */}
            <div className="project-photo photo-2">
                <img
                    src={projectImages[1]}
                    alt="Dokumentasi proyek PT Indojar Mulia Abadi"
                />
            </div>

            {/* =====================================================
                FOTO 3
                TENGAH BAWAH
            ===================================================== */}
            <div className="project-photo photo-3">
                <img
                    src={projectImages[2]}
                    alt="Dokumentasi proyek PT Indojar Mulia Abadi"
                />
            </div>

            {/* =====================================================
                FOTO 4
                VERTIKAL KANAN — 2 BARIS
            ===================================================== */}
            <div className="project-photo photo-4">
                <img
                    src={projectImages[3]}
                    alt="Dokumentasi proyek PT Indojar Mulia Abadi"
                />
            </div>

            {/* =====================================================
                FOTO 5
                KIRI BAWAH
            ===================================================== */}
            <div className="project-photo photo-5">
                <img
                    src={projectImages[4]}
                    alt="Dokumentasi proyek PT Indojar Mulia Abadi"
                />
            </div>

            {/* =====================================================
                FOTO 6
                TENGAH BAWAH
            ===================================================== */}
            <div className="project-photo photo-6">
                <img
                    src={projectImages[5]}
                    alt="Dokumentasi proyek PT Indojar Mulia Abadi"
                />
            </div>
        </div>
    );
}

export default function ProjectWelcome({ t }) {
    const lang = t?.lang || 'id';

    return (
        <section
            id="portofolio"
            className="
                relative
                w-full
                overflow-hidden
                bg-transparent
            "
        >
            {/* =====================================================
                PROJECT GALLERY
            ===================================================== */}
            <div className="project-gallery">
                <div className="project-gallery-track">
                    {/* =================================================
                        GROUP 1
                    ================================================= */}
                    <div className="project-gallery-group">
                        <ProjectMosaic />
                    </div>

                    {/* =================================================
                        GROUP 2
                        DUPLIKAT UNTUK LOOPING SEAMLESS
                    ================================================= */}
                    <div className="project-gallery-group">
                        <ProjectMosaic />
                    </div>
                </div>
            </div>

            {/* =====================================================
                PROJECT STATUS
                DIPISAH KE COMPONENT SENDIRI
            ===================================================== */}
            <ProjectStatsWelcome lang={lang} />

            {/* =====================================================
                GALLERY STYLES
            ===================================================== */}
            <style>{`
                /* =================================================
                   PROJECT GALLERY
                ================================================= */

                .project-gallery {
                    width: 100%;
                    overflow: hidden;
                    background: transparent;
                }

                .project-gallery-track {
                    display: flex;
                    width: max-content;

                    animation:
                        projectGalleryRight
                        34s
                        linear
                        infinite;

                    will-change: transform;
                }

                .project-gallery-group {
                    width: 100vw;
                    min-width: 100vw;
                    flex-shrink: 0;
                }

                /* =================================================
                   MOSAIC
                ================================================= */

                .project-mosaic {
                    display: grid;

                    /*
                     * 4 kolom
                     * 2 baris
                     *
                     * Semua posisi foto ditentukan manual
                     * supaya tidak pernah membuat baris ke-3.
                     */
                    grid-template-columns:
                        minmax(180px, 1.25fr)
                        minmax(150px, 0.9fr)
                        minmax(150px, 0.9fr)
                        minmax(180px, 1.15fr);

                    grid-template-rows:
                        280px
                        240px;

                    width: 100%;
                    gap: 4px;

                    background: transparent;
                }

                /* =================================================
                   FOTO
                ================================================= */

                .project-photo {
                    position: relative;

                    min-width: 0;
                    min-height: 0;

                    overflow: hidden;

                    background: transparent;
                }

                .project-photo img {
                    display: block;

                    width: 100%;
                    height: 100%;

                    object-fit: cover;

                    transition:
                        transform 800ms cubic-bezier(.22,.8,.2,1),
                        filter 500ms ease;
                }

                .project-photo:hover img {
                    transform: scale(1.035);
                    filter: brightness(1.05);
                }

                /* =================================================
                   POSISI FOTO
                ================================================= */

                /*
                 * FOTO 1
                 * Besar kiri atas
                 */
                .photo-1 {
                    grid-column: 1 / span 2;
                    grid-row: 1;
                }

                /*
                 * FOTO 2
                 * Atas tengah
                 */
                .photo-2 {
                    grid-column: 3;
                    grid-row: 1;
                }

                /*
                 * FOTO 3
                 * Tengah bawah
                 */
                .photo-3 {
                    grid-column: 3;
                    grid-row: 2;
                }

                /*
                 * FOTO 4
                 * Kanan dan memanjang 2 baris
                 */
                .photo-4 {
                    grid-column: 4;
                    grid-row: 1 / span 2;
                }

                /*
                 * FOTO 5
                 * Kiri bawah
                 */
                .photo-5 {
                    grid-column: 1;
                    grid-row: 2;
                }

                /*
                 * FOTO 6
                 * Tengah bawah
                 */
                .photo-6 {
                    grid-column: 2;
                    grid-row: 2;
                }

                /* =================================================
                   OVERLAY TIPIS
                ================================================= */

                .project-photo::after {
                    content: '';

                    position: absolute;
                    inset: 0;

                    pointer-events: none;

                    background:
                        linear-gradient(
                            to bottom,
                            rgba(3, 26, 20, 0.015),
                            rgba(3, 26, 20, 0.08)
                        );
                }

                /* =================================================
                   MARQUEE
                   Bergerak ke kanan
                ================================================= */

                @keyframes projectGalleryRight {
                    from {
                        transform: translateX(-100vw);
                    }

                    to {
                        transform: translateX(0);
                    }
                }

                /*
                 * Saat mouse masuk ke gallery,
                 * animasi berhenti.
                 */
                .project-gallery:hover
                    .project-gallery-track {
                    animation-play-state: paused;
                }

                /* =================================================
                   TABLET
                ================================================= */

                @media (max-width: 1024px) {
                    .project-mosaic {
                        grid-template-columns:
                            minmax(140px, 1.25fr)
                            minmax(120px, 0.9fr)
                            minmax(120px, 0.9fr)
                            minmax(140px, 1.15fr);

                        grid-template-rows:
                            230px
                            195px;
                    }

                    .project-gallery-track {
                        animation-duration: 30s;
                    }
                }

                /* =================================================
                   MOBILE
                ================================================= */

                @media (max-width: 640px) {
                    .project-mosaic {
                        grid-template-columns:
                            minmax(95px, 1.15fr)
                            minmax(85px, 0.9fr)
                            minmax(85px, 0.9fr)
                            minmax(95px, 1fr);

                        grid-template-rows:
                            165px
                            135px;

                        gap: 3px;
                    }

                    .project-gallery-track {
                        animation-duration: 25s;
                    }
                }

                /* =================================================
                   REDUCED MOTION
                ================================================= */

                @media (prefers-reduced-motion: reduce) {
                    .project-gallery-track {
                        animation: none;
                        transform: translateX(0);
                    }

                    .project-photo img {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}