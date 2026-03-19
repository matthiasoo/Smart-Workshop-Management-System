import { memo } from 'react'
import { Link } from 'react-router-dom'; 
import './InventoryCard.css'
import { useInventory } from '../context/InventoryContext.jsx'

function InventoryCard({ item }) {
    const isOutOfStock = item.quantity === 0;
    const { updateQuantity } = useInventory();

    return (
        <div className={`card ${isOutOfStock ? 'card-out' : ''}`}>
            <Link to={`/item/${item.id}`} className='link'>
                <h1 className='name'>{item.name}</h1>
            </Link>
            <div className='quantity-panel'>
                <button className={`control ${isOutOfStock ? 'control-out' : ''}`} onClick={() => {
                    if (item.quantity > 0) updateQuantity(item.id, item.quantity - 1);
                }}>-</button>
                <span>{item.quantity}</span>
                <button className={`control ${isOutOfStock ? 'control-out' : ''}`} 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            {isOutOfStock && <h4 className='out-of-stock-msg'>Out of Stock!</h4>}
        </div>
    )
}

export default memo(InventoryCard)