import { useState } from 'react'
import './InventoryCard.css'

function InventoryCard({ name, quantity }) {
    const [number, setNumber] = useState(quantity);
    const isOutOfStock = number === 0;

    return (
        <div className={`card ${isOutOfStock ? 'card-out' : ''}`}>
            <h1 className='name'>{name}</h1>
            <div className='quantity-panel'>
                <button className={`control ${isOutOfStock ? 'control-out' : ''}`} onClick={() => {
                    if (number > 0) setNumber(number - 1)
                }}>-</button>
                <span>{number}</span>
                <button className={`control ${isOutOfStock ? 'control-out' : ''}`} onClick={() => setNumber(number + 1)}>+</button>
            </div>
            {isOutOfStock && <h4 className='out-of-stock-msg'>Out of Stock!</h4>}
        </div>
    )
}

export default InventoryCard