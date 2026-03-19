import { useMemo } from 'react'
import './App.css'
import InventoryCard from './components/InventoryCard.jsx'
import AddItemForm from './components/AddItemForm.jsx'
import { useInventory } from './context/InventoryContext.jsx'

function App() {
    const { inventory } = useInventory();

    return (
        <main className='app-container'>
            <h1>Smart Workshop Management System</h1>
            <h2>Total Number of Items: {useMemo(() => inventory.reduce((ac, cur) => ac + cur.quantity, 0), [inventory])}</h2>
            <section className='products-list'>
                {inventory.map(item => <InventoryCard key={item.id} item={item} />)}
            </section>
            <section className='forms-panel'>
                <AddItemForm />
            </section>
        </main>
    )
}

export default App