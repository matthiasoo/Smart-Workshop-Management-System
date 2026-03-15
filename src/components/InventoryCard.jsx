import './InventoryCard.css'

function InventoryCard({ item, update }) {
    const isOutOfStock = item.quantity === 0;

    return (
        <div className={`card ${isOutOfStock ? 'card-out' : ''}`}>
            <h1 className='name'>{item.name}</h1>
            <div className='quantity-panel'>
                <button className={`control ${isOutOfStock ? 'control-out' : ''}`} onClick={() => {
                    if (item.quantity > 0) update(item.id, item.quantity - 1);
                }}>-</button>
                <span>{item.quantity}</span>
                <button className={`control ${isOutOfStock ? 'control-out' : ''}`} 
                    onClick={() => update(item.id, item.quantity + 1)}>+</button>
            </div>
            {isOutOfStock && <h4 className='out-of-stock-msg'>Out of Stock!</h4>}
        </div>
    )
}

export default InventoryCard