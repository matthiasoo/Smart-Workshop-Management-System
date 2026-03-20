import { useParams, Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import './ItemDetails.css';

function ItemDetails() {
    const { id } = useParams();
    const { inventory, isLoading, error } = useInventory();

    const item = inventory.find(item => item.id === Number(id));

    if (isLoading) {
        return (
            <main className='app-container'>
                <h1 className='fetching'>Loading tool data...</h1>
                <Link to="/" className='link'>Back to inventory</Link>
            </main>
        );
    }

    if (error) {
        return (
            <main className='app-container'>
                <h1 className='fetching-error'>{error.message}</h1>
                <Link to="/" className='link'>Back to inventory</Link>
            </main>
        );
    }

    if (!item) {
        return (
            <main className='app-container'>
                <h1 className='fetching-error'>Tool not found!</h1>
                <Link to="/" className='link'>Back to inventory</Link>
            </main>
        );
    }

    return (
        <main className='app-container'>
            <div className='details-panel'>
                <h1>Details</h1>
                <hr className='divider' />
                <div className='details-content'>
                    <h2>Name: <span>{item.name}</span></h2>
                    <h2>Quantity: <span>{item.quantity}</span> pcs</h2>
                </div>
            </div>
            <Link to="/" className='link'>Back to inventory</Link>
        </main>
    )
}

export default ItemDetails