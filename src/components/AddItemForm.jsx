"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useInventoryStore } from '../store/useInventoryStore.js';
import { useTranslations } from 'next-intl';

function AddItemForm() {

    const t = useTranslations();
    const formSchema = z.object({
        name: z.string().min(3, t('errors.min_characters', { number: 3 })).max(50, t('errors.name_too_long')),
        description: z.string().max(200, t('errors.desc_too_long')).optional()
    });

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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col glass-panel p-8 w-full gap-6 relative overflow-hidden group'>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <h2 className="text-2xl font-bold uppercase tracking-widest text-center mt-2 drop-shadow-md">{t('common.titles.add_new_item')}</h2>
            <div className='flex flex-col gap-6 mt-4'>
                <div className='flex flex-col'>
                    <input 
                        {...register("name")}
                        placeholder={t('features.inventory.fields.name')}
                        className='text-input'
                        disabled={isLoading}
                    />
                    {errors.name && <span className="fetching-error mt-2 text-xs self-end text-right drop-shadow-none">{errors.name.message}</span>}
                </div>
                <div className='flex flex-col mt-2'>
                    <input 
                        {...register("description")} 
                        placeholder={t('features.inventory.fields.description')}
                        className='text-input'
                        disabled={isLoading}
                    />
                    {errors.description && <span className="fetching-error mt-2 text-xs self-end text-right drop-shadow-none">{errors.description.message}</span>}
                </div>
                <button 
                    type="submit" 
                    className='submit-btn mt-4'
                    disabled={isLoading}
                >{t('common.actions.register_item')}</button>
            </div>
        </form>
    )
}

export default AddItemForm