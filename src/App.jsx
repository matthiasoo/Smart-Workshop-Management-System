import { useState } from 'react'
import './App.css'
import InventoryCard from './components/InventoryCard.jsx'
import AddItemForm from './components/AddItemForm.jsx';

function App() {
    const [inventory, setInventory] = useState([
        { id: 1, name: "Hammer", quantity: 20 },
        { id: 2, name: "Screwdriver", quantity: 20 },
        { id: 3, name: "Shovel", quantity: 20 },
        { id: 4, name: "Axe", quantity: 20 },
    ]);

    const updateQuantity = (id, change) => {
        const newArray = inventory.map(item => {
            if (item.id === id) return { ...item, quantity: change }
            else return item;
        });
        
        setInventory(newArray);
    };

    const addNewItem = (name) => {
        setInventory([...inventory, { id: Date.now(), name: name, quantity: 0 }]);
    }

    return (
        <main className='app-container'>
            <h1>Smart Workshop Management System</h1>
            <h2>Total Number of Items: {inventory.reduce((ac, cur) => ac + cur.quantity, 0)}</h2>
            <section className='products-list'>
                {inventory.map(item => <InventoryCard key={item.id} item={item} update={updateQuantity} />)}
            </section>
            <section className='forms-panel'>
                <AddItemForm onSubmit={addNewItem} />
            </section>
        </main>
    )
}

export default App