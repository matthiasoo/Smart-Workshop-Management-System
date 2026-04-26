import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { prisma } from '@/lib/prisma';
import { FiChevronLeft } from 'react-icons/fi';

export default async function ItemDetails({ params }) {
    const { id } = await params;
    const t = await getTranslations();

    const item = await prisma.inventoryItem.findUnique({
        where: { id: id }
    });

    if (!item) {
        notFound(); 
    }

    return (
        <main className='flex flex-col gap-8 justify-center items-center mt-12 w-full px-4 animate-fade-in mb-12'>
            <div className='glass-panel p-10 w-full max-w-[600px] flex flex-col items-start gap-8 relative overflow-hidden group'>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-70"></div>
                
                <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-widest text-primary drop-shadow-md">{t('components.table.record')}</h1>
                <hr className='w-full border-t border-outline/50 shadow-[0_1px_5px_rgba(255,255,255,0.1)]' />
                
                <div className='flex flex-col items-start gap-4 w-full'>
                    <div className="w-full bg-main/30 p-5 rounded-xl border border-outline/30 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-main/50 transition-colors gap-2">
                        <span className="text-muted tracking-widest uppercase text-sm font-bold">{t('features.inventory.fields.name')}</span>
                        <h2 className='text-2xl font-bold text-white uppercase'>{item.name}</h2>
                    </div>
                    {item.description && (
                        <div className="w-full bg-main/30 p-5 rounded-xl border border-outline/30 flex flex-col justify-between items-start hover:bg-main/50 transition-colors gap-2">
                            <span className="text-muted tracking-widest uppercase text-sm font-bold">{t('features.inventory.fields.description')}</span>
                            <span className='text-lg font-medium text-white/80'>{item.description}</span>
                        </div>
                    )}
                    <div className="w-full bg-main/30 p-5 rounded-xl border border-outline/30 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-main/50 transition-colors gap-2">
                        <span className="text-muted tracking-widest uppercase text-sm font-bold">{t('features.inventory.fields.units')}</span>
                        <h2 className='text-4xl font-mono font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'>{item.quantity}</h2>
                    </div>
                </div>
            </div>
            
            <Link href="/" className='link mt-4 px-8 py-4 bg-panel/50 rounded-full border border-outline hover:border-primary/50 shadow-lg text-sm tracking-widest uppercase'>
                <FiChevronLeft /> {t('common.actions.back')}
            </Link>
        </main>
    )
}