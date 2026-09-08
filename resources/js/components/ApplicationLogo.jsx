import React from 'react';
import { cn } from '@/lib/utils';
import defaultLogo from '../../images/indojar.png';

export function AppLogo({
    className,
    imageSrc = defaultLogo,
    showTextOnMobile = true,
    textClassName,
    variant = 'default',
    ...props
}) {
    const isNavbar = variant === 'navbar';

    const brandTextClass = isNavbar
        ? 'text-white'
        : 'text-slate-900 dark:text-white';

    const taglineClass = isNavbar
        ? 'text-emerald-400'
        : 'text-emerald-600 dark:text-emerald-300';

    return (
        <div
            className={cn(
                'flex items-center gap-3 select-none',
                className,
            )}
            {...props}
        >
            {/* Logo */}
            <div
                className="
                    flex
                    h-11
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    bg-transparent
                "
            >
                <img
                    src={imageSrc}
                    alt="Logo PT Indojar Mulia Abadi"
                    className="
                        h-full
                        w-full
                        object-contain
                    "
                />
            </div>

            {/* Brand */}
            <div
                className={
                    showTextOnMobile
                        ? 'flex min-w-0 flex-col'
                        : 'hidden flex-col sm:flex'
                }
            >
                <span
                    className={cn(
                        `
                            font-sans
                            text-[12px]
                            font-bold
                            leading-tight
                            tracking-[0.03em]
                        `,
                        brandTextClass,
                        textClassName,
                    )}
                >
                    PT INDOJAR MULIA ABADI
                </span>

                <span
                    className={cn(
                        `
                            mt-1
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                        `,
                        taglineClass,
                    )}
                >
                    Manajemen Proyek
                </span>
            </div>
        </div>
    );
}

export default AppLogo;