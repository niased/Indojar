import React from 'react';
import { cn } from '@/lib/utils';
import defaultLogo from '../../images/indojar.png';

export function AppLogo({
    className,
    imageSrc = defaultLogo,
    showTextOnMobile = true,
    textClassName = 'text-white',
    ...props
}) {
    return (
        <div
            className={cn(
                'flex items-center gap-3 select-none',
                className
            )}
            {...props}
        >
            {/* Logo */}
            <div className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-transparent
                p-1.5
                ring-1
                ring-white/20
            ">
                <img
                    src={imageSrc}
                    alt="Logo PT Indojar Mulia Abadi"
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Brand */}
            <div
                className={
                    showTextOnMobile
                        ? 'flex flex-col'
                        : 'hidden flex-col sm:flex'
                }
            >
                <span
                    className={cn(
                        'font-sans text-[12px] font-bold leading-tight tracking-[0.03em]',
                        textClassName
                    )}
                >
                    PT INDOJAR MULIA ABADI
                </span>

                <span className="
                    mt-1
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-emerald-300
                ">
                    Manajemen Proyek
                </span>
            </div>
        </div>
    );
}

export default AppLogo;