"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useInventoryStore } from '../store/useInventoryStore.js';

const formSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 characters").max(50, "Name is too long"),
    description: z.string().max(200, "Description is too long").optional()
});

function AddItemForm() {

    const { addNewItem, isLoading } = useInventoryStore();
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center border border-outline bg-panel rounded-[0.5rem] p-4 shadow-xl shadow-black gap-4'>
            <h2>Add New Item</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <input
                        {...register("name")}
                        placeholder="Item name"
                        className='text-input'
                        disabled={isLoading}
                    />
                    {errors.name && <span className="fetching-error" style={{ fontSize: '0.8rem' }}>{errors.name.message}</span>}
                </div>
                <div className='flex flex-col'>
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