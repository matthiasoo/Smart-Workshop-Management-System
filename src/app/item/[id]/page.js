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
            <main className='flex flex-col gap-8 justify-center items-center mt-24'>
                <h1 className='fetching text-3xl'>Accessing record...</h1>
                <Link href="/" className='link'>Abort connection</Link>
            </main>
        );
    }

    if (error) {
        return (
            <main className='flex flex-col gap-8 justify-center items-center mt-24'>
                <h1 className='fetching-error text-3xl'>{error.message}</h1>
                <Link href="/" className='link'>Return to base</Link>
            </main>
        );
    }

    if (!item) {
        return (
            <main className='flex flex-col gap-8 justify-center items-center mt-24'>
                <h1 className='fetching-error text-3xl'>Record destroyed / not found!</h1>
                <Link href="/" className='link'>Return to base</Link>
            </main>
        );
    }

    return (
        <main className='flex flex-col gap-8 justify-center items-center mt-12 w-full px-4 animate-fade-in mb-12'>
            <div className='glass-panel p-10 w-full max-w-[600px] flex flex-col items-start gap-8 relative overflow-hidden group'>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-70"></div>
                
                <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-widest text-primary drop-shadow-md">Database Record</h1>
                <hr className='w-full border-t border-outline/50 shadow-[0_1px_5px_rgba(255,255,255,0.1)]' />
                
                <div className='flex flex-col items-start gap-4 w-full'>
                    <div className="w-full bg-main/30 p-5 rounded-xl border border-outline/30 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-main/50 transition-colors gap-2">
                        <span className="text-muted tracking-widest uppercase text-sm font-bold">Designation</span>
                        <h2 className='text-2xl font-bold text-white uppercase'>{item.name}</h2>
                    </div>
                    <div className="w-full bg-main/30 p-5 rounded-xl border border-outline/30 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-main/50 transition-colors gap-2">
                        <span className="text-muted tracking-widest uppercase text-sm font-bold">Units Available</span>
                        <h2 className='text-4xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'>{item.quantity}</h2>
                    </div>
                </div>
            </div>
            
            <Link href="/" className='link mt-4 px-8 py-4 bg-panel/50 rounded-full border border-outline hover:border-primary/50 shadow-lg text-sm tracking-widest uppercase'>
                ← Initialize Return
            </Link>
        </main>
    )
}

export default ItemDetails