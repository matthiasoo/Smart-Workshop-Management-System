"use client"

import { memo, useState } from 'react';
import Link from 'next/link';
import { useInventoryStore } from '../store/useInventoryStore.js';
import Modal from './Modal.jsx';

function InventoryCard({ item }) {
    const isOutOfStock = item.quantity === 0;
    const { updateQuantity, deleteItem } = useInventoryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`relative flex flex-col justify-center items-center w-full min-h-72 h-fit p-2 gap-2 shadow-xl shadow-black border rounded-[0.5rem] lg:w-48 ${isOutOfStock ? 'border-danger-outline bg-danger-panel' : 'bg-panel border-outline'}`}>
            <Link href={`/item/${item.id}`} className='link'>
                <h1 className='text-2xl'>{item.name}</h1>
            </Link>
            <div className='flex items-center gap-4 text-xl'>
                <button className={`control ${isOutOfStock ? 'hover:bg-danger-outline' : 'hover:bg-outline'}`} onClick={() => {
                    if (item.quantity > 0) updateQuantity(item.id, item.quantity - 1);
                }}>-</button>
                <span>{item.quantity}</span>
                <button className={`control ${isOutOfStock ? 'hover:bg-danger-outline' : 'hover:bg-outline'}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className='control' onClick={() => setIsModalOpen(true)}>Delete</button>
            {isOutOfStock && <h4 className='text-danger absolute bottom-2'>Out of Stock!</h4>}
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <h2>Warning</h2>
                    <p>Are you sure you want to permanently delete {item.name}?</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="submit-btn" onClick={() => deleteItem(item.id)}>Delete</button>
                        <button className="submit-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default memo(InventoryCard)