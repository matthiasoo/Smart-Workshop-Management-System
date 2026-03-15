import { useState } from 'react'
import './App.css'
import InventoryCard from './components/InventoryCard.jsx'

function App() {

    return (
        <>
            <h1>Smart Workshop Management System</h1>
            <section className='products-list'>
                <InventoryCard name={"Hammer"} quantity={20} />
                <InventoryCard name={"Screwdriver"} quantity={20} />
                <InventoryCard name={"Shovel"} quantity={20} />
                <InventoryCard name={"Axe"} quantity={20} />
            </section>
        </>
    )
}

export default App