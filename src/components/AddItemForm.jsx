import { useState, useRef } from 'react';
import './AddItemForm.css';
import { useInventory } from '../context/InventoryContext.jsx'

function AddItemForm() {
    const [newItemName, setNewItemName] = useState("");
    const { addNewItem, isLoading } = useInventory();
    const inputRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();

        if (newItemName === "") {
            alert("Enter item name!")
            inputRef.current.focus();
            return;
        }
        addNewItem(newItemName);
        setNewItemName("");
    }

    return (
        <form onSubmit={submit} className='add-item-form'>
            <h2>Add New Item</h2>
            <div className='input-and-btn'>
                <input 
                    type="text"
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className='text-input'
                    disabled={isLoading}
                    ref={inputRef}
                />
                <button 
                    type="submit" 
                    className='submit-btn'
                    disabled={isLoading}
                >Add</button>
            </div>
        </form>
    )
}

export default AddItemForm