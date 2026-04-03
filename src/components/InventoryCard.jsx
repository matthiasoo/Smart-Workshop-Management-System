import { memo, useState } from 'react'
import { Link } from 'react-router-dom'; 
import './InventoryCard.css'
import { useInventoryStore } from '../store/useInventoryStore.js';
import Modal from './Modal.jsx';

function InventoryCard({ item }) {
    const isOutOfStock = item.quantity === 0;
    const { updateQuantity, deleteItem } = useInventoryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <button className='control' onClick={() => setIsModalOpen(true)}>Delete</button>
            {isOutOfStock && <h4 className='out-of-stock-msg'>Out of Stock!</h4>}
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