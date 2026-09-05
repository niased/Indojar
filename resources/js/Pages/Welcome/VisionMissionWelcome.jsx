// resources/js/Pages/Welcome/VisionMissionWelcome.jsx

import React from 'react';

import visionMissionBackground from '@/../images/visimisi.png';
import visionImage from '@/../images/ptindojar3.jpg';

export default function VisionMissionWelcome({ lang = 'id' }) {
    const isIndonesia = lang === 'id';

    const content = {
        title: {
            vision: isIndonesia ? 'Visi' : 'Vision',
            mission: isIndonesia ? 'Misi' : 'Mission',
        },

        vision: isIndonesia
            ? 'Kami berkomitmen untuk menjadi perusahaan terkemuka dalam bidang pembangunan infrastruktur telekomunikasi dengan pelayanan yang cepat, berkualitas, dan memberikan kepuasan kepada pelanggan.'
            : 'We are committed to becoming a leading company in telecommunication infrastructure construction by providing fast, high-quality service and delivering customer satisfaction.',

        missions: isIndonesia
            ? [
                'Memastikan kualitas setiap produk dan memberikan layanan yang sesuai dengan harapan pelanggan.',
                'Membangun dan menjaga hubungan yang erat dengan pelanggan.',
                'Meningkatkan keterampilan dan kemampuan tim secara berkelanjutan untuk memenuhi dan mempertahankan kepuasan pelanggan.',
            ]
            : [
                'Ensuring the quality of each product and providing services that meet customer expectations.',
                'Establishing and maintaining close relationships with customers.',
                'Improving skills and abilities of the team continuously to meet and maintain customer satisfaction.',
            ],
    };

    return (
        <section
            id="visi-misi"
            className="w-full overflow-hidden bg-[#f4f6f1]"
        >
            <div className="relative aspect-[16/9] w-full">

                {/* =====================================================
                    BACKGROUND
                ===================================================== */}
                <img
                    src={visionMissionBackground}
                    alt=""
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                    "
                />


                {/* =====================================================
                    VISION TITLE
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[6.2%]
                    top-[10%]
                    z-20
                    flex
                    h-[6.5%]
                    w-[17.5%]
                    items-center
                    justify-center
                ">
                    <span className="
                        font-heading
                        text-[clamp(20px,2vw,34px)]
                        font-semibold
                        uppercase
                        leading-none
                        tracking-[-0.02em]
                        text-white
                    ">
                        {content.title.vision}
                    </span>
                </div>


                {/* =====================================================
                    VISION TEXT
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[11.8%]
                    top-[19.8%]
                    z-10
                    w-[42%]
                    max-w-[690px]
                ">
                    <p className="
                        text-[clamp(10px,1.3vw,24px)]
                        font-normal
                        leading-[1.42]
                        tracking-[-0.008em]
                        text-white
                    ">
                        {content.vision}
                    </p>
                </div>


                {/* =====================================================
                    MISSION TITLE
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[6.2%]
                    top-[43.2%]
                    z-30
                    flex
                    h-[7.5%]
                    w-[17.5%]
                    items-center
                    justify-center
                ">
                    <span className="
                        font-heading
                        text-[clamp(20px,2vw,34px)]
                        font-semibold
                        uppercase
                        leading-none
                        tracking-[-0.02em]
                        text-white
                    ">
                        {content.title.mission}
                    </span>
                </div>


                {/* =====================================================
                    MISSION 01
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[17.8%]
                    top-[55.9%]
                    z-10
                    w-[34%]
                    max-w-[590px]
                ">
                    <p className="
                        text-[clamp(8px,0.95vw,17px)]
                        font-normal
                        leading-[1.4]
                        text-slate-800
                    ">
                        {content.missions[0]}
                    </p>
                </div>


                {/* =====================================================
                    MISSION 02
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[17.8%]
                    top-[70.8%]
                    z-10
                    w-[34%]
                    max-w-[590px]
                ">
                    <p className="
                        text-[clamp(8px,0.95vw,17px)]
                        font-normal
                        leading-[1.4]
                        text-slate-800
                    ">
                        {content.missions[1]}
                    </p>
                </div>


                {/* =====================================================
                    MISSION 03
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[17.8%]
                    top-[82.2%]
                    z-10
                    w-[34%]
                    max-w-[590px]
                ">
                    <p className="
                        text-[clamp(8px,0.95vw,17px)]
                        font-normal
                        leading-[1.35]
                        text-slate-800
                    ">
                        {content.missions[2]}
                    </p>
                </div>


                {/* =====================================================
                    TOWER PHOTO
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    right-[0%]
                    top-[16%]
                    z-30
                    h-[76%]
                    w-[41.5%]
                    overflow-hidden
                    rounded-tl-[7vw]
                    rounded-bl-[7vw]
                ">
                    <img
                        src={visionImage}
                        alt={
                            isIndonesia
                                ? 'Infrastruktur telekomunikasi PT Indojar Mulia Abadi'
                                : 'Telecommunication infrastructure PT Indojar Mulia Abadi'
                        }
                        className="
                            h-full
                            w-[125%]
                            max-w-none
                            object-cover
                            object-left
                            transition-transform
                            duration-700
                            hover:scale-[1.02]
                        "
                    />
                </div>

            </div>
        </section>
    );
}