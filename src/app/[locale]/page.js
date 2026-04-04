"use client";

import { useTranslations } from 'next-intl';
import { useMemo, useEffect } from 'react';
import InventoryCard from '@/components/InventoryCard.jsx';
import AddItemForm from '@/components/AddItemForm.jsx';
import { useInventoryStore } from '@/store/useInventoryStore.js';

export default function Home() {
    const { inventory, isLoading, error, fetchInventory } = useInventoryStore();
    const t = useTranslations();

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    return (
        <main className='flex flex-col gap-8 w-full justify-center items-center mb-16'>
            <div className="glass-panel py-3 px-8 text-center flex items-center justify-center gap-4">
                <h2 className="text-xl text-muted font-medium uppercase tracking-widest">{t('components.table.total')}</h2>
                <span className="font-mono font-bold text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{useMemo(() =>
                    inventory.reduce((ac, cur) => ac + cur.quantity, 0), [inventory])}</span>
            </div>

            <div className='flex flex-col lg:flex-row gap-8 w-full max-w-[1400px] items-start'>
                {isLoading && <h1 className='fetching text-2xl mx-auto my-12 animate-pulse'>{t('common.status.loading')}...</h1>}
                
                {!isLoading && !error && (
                <section className='flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full auto-rows-max'>
                    {inventory.map(item => (
                        <InventoryCard key={item.id} item={item} />
                    ))}
                    {inventory.length === 0 && <p className='text-muted mt-8'>{t('common.status.empty')}</p>}
                </section>
                )}
                
                <section className='w-full lg:w-96 flex-shrink-0 sticky top-24'>
                    <AddItemForm />
                </section>
            </div>
        </main>
    )
}