"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useInventoryStore } from '@/store/useInventoryStore.js';

function ItemDetails() {
    const { id } = useParams();
    const { inventory, isLoading, error } = useInventoryStore();

    const item = inventory.find(item => item.id === Number(id));

    if (isLoading) {
        return (
            <main className='flex flex-col gap-1 justify-center items-center'>
                <h1 className='fetching'>Loading tool data...</h1>
                <Link href="/" className='link'>Back to inventory</Link>
            </main>
        );
    }

    if (error) {
        return (
            <main className='flex flex-col gap-1 justify-center items-center'>
                <h1 className='fetching-error'>{error.message}</h1>
                <Link href="/" className='link'>Back to inventory</Link>
            </main>
        );
    }

    if (!item) {
        return (
            <main className='flex flex-col gap-1 justify-center items-center'>
                <h1 className='fetching-error'>Tool not found!</h1>
                <Link href="/" className='link'>Back to inventory</Link>
            </main>
        );
    }

    return (
        <main className='flex flex-col gap-1 justify-center items-center'>
            <div className='bg-panel border border-outline rounded-[1rem] p-8 w-full max-w-[600px] flex flex-col items-start gap-6 shadow-xl shadow-black'>
                <h1>Details</h1>
                <hr className='w-full border-t-1 border-outline mb-4' />
                <div className='flex flex-col items-start'>
                    <h2 className='my-2'>Name: <span className='font-thin text-muted'>{item.name}</span></h2>
                    <h2 className='my-2'>Quantity: <span className='font-thin text-muted'>{item.quantity}</span> pcs</h2>
                </div>
            </div>
            <Link href="/" className='link'>Back to inventory</Link>
        </main>
    )
}

export default ItemDetails