import { useMemo } from 'react'
import './App.css'
import InventoryCard from './components/InventoryCard.jsx'
import AddItemForm from './components/AddItemForm.jsx'
import { useInventory } from './context/InventoryContext.jsx'

function App() {
    const { inventory, isLoading, error } = useInventory();

    return (
        <main className='app-container'>
            <h1>Smart Workshop Management System</h1>
            <h2>Total Number of Items: {useMemo(() => 
                inventory.reduce((ac, cur) => ac + cur.quantity, 0), [inventory])}</h2>
            
            <div className='content-wrapper'>
                {isLoading && <h1 className='fetching'>Connecting to server...</h1>}
                {error && <h1 className='fetching-error'>{error.message}</h1>}
                {!isLoading && !error && <section className='products-list'>
                    {inventory.map(item => <InventoryCard key={item.id} item={item} />)}
                </section>}
                <section className='forms-panel'>
                    <AddItemForm />
                </section>
            </div>
        </main>
    )
}

export default App