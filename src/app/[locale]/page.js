import { getTranslations } from 'next-intl/server';
import { fetchInventory } from '@/actions/inventoryActions';
import InventoryCard from '@/components/InventoryCard';
import AddItemForm from '@/components/AddItemForm';
import SearchBar from '@/components/SearchBar';
import { auth } from '@/auth';

export default async function Home({ params, searchParams }) {
    const t = await getTranslations();
    const session = await auth();

    const resolvedSearchParams = await searchParams; 
    const searchQuery = resolvedSearchParams?.search || "";

    const inventory = await fetchInventory({ search: searchQuery });
    const totalItems = inventory.reduce((ac, cur) => ac + cur.quantity, 0);

    return (
        <main className='flex flex-col gap-8 w-full justify-center items-center mb-16'>
            <div className="flex flex-col gap-2 items-center text-center">
                <h1 className="text-3xl font-bold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-glow)]">
                    {session?.user?.name}
                </h1>
                <p className="text-muted font-mono">{session?.user?.email}</p>
            </div>

            <div className="glass-panel py-3 px-8 text-center flex items-center justify-center gap-4">
                <h2 className="text-xl text-muted font-medium uppercase tracking-widest">{t('components.table.total')}</h2>
                <span className="font-mono font-bold text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{totalItems}</span>
            </div>
            <SearchBar />

            <div className='flex flex-col lg:flex-row gap-8 w-full max-w-[1400px] items-start'>
                <section className='flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full auto-rows-max'>
                    {inventory.map(item => (
                        <InventoryCard key={item.id} item={item} />
                    ))}
                    {inventory.length === 0 && <p className='text-muted mt-8'>{t('common.status.empty')}</p>}
                </section>

                <section className='w-full lg:w-96 flex-shrink-0 sticky top-24'>
                    <AddItemForm />
                </section>
            </div>
        </main>
    )
}