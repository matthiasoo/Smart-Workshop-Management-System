"use client"

import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { FiSearch } from 'react-icons/fi';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <form onSubmit={e => e.preventDefault()} className='w-full max-w-[1400px]'>
            <div className='flex flex-col w-full relative'>
                <input 
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('search')?.toString()}
                    placeholder={t("common.actions.search") + "..."}
                    className='text-input pr-12 drop-shadow-md'
                />
                <div className='flex items-center absolute inset-y-0 right-0 p-4 text-muted'>
                    <FiSearch className={isPending ? 'animate-pulse text-primary' : ''} size={20} />
                </div>
            </div>
        </form>
    )
}