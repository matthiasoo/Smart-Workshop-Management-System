import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './AddItemForm.css';
import { useInventory } from '../context/InventoryContext.jsx'

const formSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 characters").max(50, "Name is too long"),
    description: z.string().max(200, "Description is too long").optional()
});

function AddItemForm() {

    const { addNewItem, isLoading } = useInventory();
    const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", description: "" }
    });

    const onSubmit = (data) => {
        addNewItem(data);
        reset();
        setFocus("name");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='add-item-form'>
            <h2>Add New Item</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input 
                        {...register("name")}
                        placeholder="Item name"
                        className='text-input'
                        disabled={isLoading}
                    />
                    {errors.name && <span className="fetching-error" style={{ fontSize: '0.8rem' }}>{errors.name.message}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input 
                        {...register("description")} 
                        placeholder="Description"
                        className='text-input'
                        disabled={isLoading}
                    />
                    {errors.description && <span className="fetching-error" style={{ fontSize: '0.8rem' }}>{errors.description.message}</span>}
                </div>
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