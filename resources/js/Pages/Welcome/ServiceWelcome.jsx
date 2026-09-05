// resources/js/Pages/Welcome/ServiceWelcome.jsx

import React from 'react';

import serviceBackground from '@/../images/service.png';

export default function ServiceWelcome() {
    const services = [
        {
            title: (
                <>
                    Tower Construction
                    <br />
                    / B2S SACME
                </>
            ),
        },
        {
            title: 'Tower Strengthening',
        },
        {
            title: 'Colocation',
        },
        {
            title: 'And Others',
        },
    ];

    return (
        <section
            id="layanan"
            className="w-full overflow-hidden bg-[#f4f6f1]"
        >
            <div className="relative aspect-[16/9] w-full">

                {/* =====================================================
                    BACKGROUND
                ===================================================== */}
                <img
                    src={serviceBackground}
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
                    SECTION TITLE
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[55%]
                    top-[27%]
                    z-20
                    w-[44%]
                ">
                    <h2 className="
                        font-heading
                        text-[clamp(34px,3.1vw,60px)]
                        font-bold
                        uppercase
                        leading-[0.95]
                        tracking-[-0.035em]
                        text-white
                    ">
                        PRODUK & LAYANAN
                    </h2>
                </div>


                {/* =====================================================
                    SERVICE 01
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[14.4%]
                    top-[28%]
                    z-10
                    w-[31%]
                ">
                    <h3 className="
                        font-heading
                        text-[clamp(14px,1.45vw,25px)]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.02em]
                        text-[#075d35]
                    ">
                        {services[0].title}
                    </h3>
                </div>


                {/* =====================================================
                    SERVICE 02
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[14.4%]
                    top-[45%]
                    z-10
                    w-[31%]
                ">
                    <h3 className="
                        font-heading
                        text-[clamp(14px,1.45vw,25px)]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.02em]
                        text-[#075d35]
                    ">
                        {services[1].title}
                    </h3>
                </div>


                {/* =====================================================
                    SERVICE 03
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[14.5%]
                    top-[60.5%]
                    z-10
                    w-[31%]
                ">
                    <h3 className="
                        font-heading
                        text-[clamp(14px,1.45vw,25px)]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.02em]
                        text-[#075d35]
                    ">
                        {services[2].title}
                    </h3>
                </div>


                {/* =====================================================
                    SERVICE 04
                    EDIT POSISI DI SINI
                ===================================================== */}
                <div className="
                    absolute
                    left-[14.4%]
                    top-[76%]
                    z-10
                    w-[31%]
                ">
                    <h3 className="
                        font-heading
                        text-[clamp(14px,1.45vw,25px)]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.02em]
                        text-[#075d35]
                    ">
                        {services[3].title}
                    </h3>
                </div>

            </div>
        </section>
    );
}