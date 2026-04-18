"use client";

import { FiGlobe } from 'react-icons/fi';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export default function LanguageToggle() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'pl' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <button 
            onClick={toggleLanguage}
            className="control w-9 h-9 ml-4 rounded-full border-outline/50 text-2xl"
            aria-label="Zmień język"
        >
            <FiGlobe size={16} />
        </button>
    );
}
