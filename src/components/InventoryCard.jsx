"use client"

import { memo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { FiPlus, FiMinus } from "react-icons/fi";
import Modal from './Modal.jsx';
import { useTranslations } from 'next-intl';
import { updateItemQuantity, deleteInventoryItem } from '@/actions/inventoryActions';

function InventoryCard({ item }) {
    const isOutOfStock = item.quantity === 0;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = useTranslations();

    return (
        <div className={`relative flex flex-col justify-center items-center w-full min-h-72 h-fit p-6 gap-4 border glass-panel animate-fade-in transition-all duration-300 hover:scale-[1.02] hover:shadow-hover ${isOutOfStock ? 'border-danger-outline shadow-[0_0_15px_var(--color-danger)]' : 'border-outline hover:border-primary/50'}`}>
            <Link href={`/item/${item.id}`} className='link text-xl lg:text-2xl mt-4'>
                <h1 className='text-center uppercase tracking-widest leading-tight'>{item.name}</h1>
            </Link>
            <div className='flex items-center gap-6 text-xl my-4'>
                <button className={`control ${isOutOfStock ? 'hover:bg-danger-outline opacity-50 cursor-not-allowed border-danger-outline text-danger' : 'hover:bg-outline'}`} 
                    disabled={isOutOfStock}
                    onClick={() => {
                    if (item.quantity > 0) updateItemQuantity(item.id, item.quantity - 1);
                }}><FiMinus /></button>
                <span className="font-mono text-3xl font-bold w-12 text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{item.quantity}</span>
                <button className={`control ${isOutOfStock ? 'hover:bg-danger-outline border-danger-outline text-danger hover:text-white' : 'hover:bg-outline'}`}
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
            </div>
            
            <button className='submit-btn mt-auto text-red-500 bg-none border border-red-900/50 hover:bg-red-900/30 hover:shadow-none hover:text-white backdrop-blur-sm' onClick={() => setIsModalOpen(true)}>{t('common.actions.delete')}</button>
            
            {isOutOfStock && <h4 className='text-danger absolute -top-3 left-1/2 -translate-x-1/2 uppercase tracking-widest font-bold text-xs bg-danger-panel px-4 py-1.5 rounded-full border border-danger shadow-[0_0_15px_oklch(0.65_0.2_20_/_0.8)] animate-pulse whitespace-nowrap z-10'>{t('common.status.out_of_stock')}!</h4>}
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
                    <h2>{t('common.titles.warning')}</h2>
                    <p>{t('dialogs.delete_item.description', { name: item.name })}</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="submit-btn" onClick={() => deleteInventoryItem(item.id)}>{t('dialogs.delete_item.delete')}</button>
                        <button className="submit-btn" onClick={() => setIsModalOpen(false)}>{t('dialogs.delete_item.cancel')}</button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default memo(InventoryCard)