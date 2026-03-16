import { useState } from 'react';

function AddItemForm({ onSubmit }) {
    const [newItemName, setNewItemName] = useState("");

    const submit = (e) => {
        e.preventDefault();

        if (newItemName === "") {
            alert("Enter item name!")
            return;
        }
        onSubmit(newItemName);
        setNewItemName("");
    }

    return (
        <form onSubmit={submit}>
            <h2>Add New Item</h2>
            <div className='input-and-btn'>
                <input 
                    type="text"
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className='text-input'
                />
                <button type="submit" className='submit-btn'>Add</button>
            </div>
        </form>
    )
}

export default AddItemForm