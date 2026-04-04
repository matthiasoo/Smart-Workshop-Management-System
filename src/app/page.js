"use client"

import { useMemo, useEffect } from 'react'
import InventoryCard from '@/components/InventoryCard.jsx'
import AddItemForm from '@/components/AddItemForm.jsx'
import { useInventoryStore } from '@/store/useInventoryStore.js';

function Home() {
    const { inventory, isLoading, error, fetchInventory } = useInventoryStore();

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    return (
        <main className='flex flex-col gap-6 w-full justify-center items-center mb-12'>
            <h2 className="text-xl">Total Number of Items: <span className="font-bold text-2xl ml-2">{useMemo(() =>
                inventory.reduce((ac, cur) => ac + cur.quantity, 0), [inventory])}</span></h2>

            <div className='flex flex-col lg:flex-row gap-8 w-full max-w-6xl justify-center items-start'>
                {isLoading && <h1 className='fetching text-2xl animate-pulse'>Connecting to server...</h1>}
                {error && <h1 className='fetching-error text-2xl'>{error.message}</h1>}
                
                {!isLoading && !error && <section className='flex-1 flex flex-wrap justify-center lg:justify-start gap-4'>
                    {inventory.map(item => <InventoryCard key={item.id} item={item} />)}
                </section>}
                
                <section className='w-full lg:w-96 flex-shrink-0'>
                    <AddItemForm />
                </section>
            </div>
        </main>
    )
}

export default Home