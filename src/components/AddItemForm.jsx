"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { useTransition, useState } from 'react';
import { addInventoryItem } from '@/actions/inventoryActions';
import { generateDescription } from '@/actions/aiActions';
import { LiaBrainSolid } from "react-icons/lia";

function AddItemForm() {
    const [isPending, startTransition] = useTransition();
    const [isGenerating, setIsGenerating] = useState(false);
    const t = useTranslations();
    const formSchema = z.object({
        name: z.string().min(3, t('errors.min_characters', { number: 3 })).max(50, t('errors.name_too_long')),
        description: z.string().max(200, t('errors.desc_too_long')).optional()
    });

    const { register, handleSubmit, formState: { errors }, reset, setFocus, setValue, getValues } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", description: "" }
    });

    const onSubmit = (data) => {
        startTransition(async () => {
            await addInventoryItem(data);
            reset();
            setFocus("name");
        });
    }

    const generateAIDescription = async () => {
        const name = getValues("name");
        if (!name || name.trim() === '') return;

        setIsGenerating(true);
        try {
            const result = await generateDescription(name);
            if (result.content) {
                setValue("description", result.content);
            } else if (result.error) {
                console.error(result.error);
            }
        } finally {
            setIsGenerating(false);
        }
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
                        disabled={isPending}
                    />
                    {errors.name && <span className="fetching-error mt-2 text-xs self-end text-right drop-shadow-none">{errors.name.message}</span>}
                </div>
                <div className='flex flex-col mt-2'>
                    <div className='relative'>
                        <input 
                            {...register("description")} 
                            placeholder={t('features.inventory.fields.description')}
                            className='text-input'
                            disabled={isPending}
                        />
                        <div className='flex items-center absolute inset-y-0 right-0 p-2'>
                            <button 
                                type='button'
                                className={`submit-btn p-1 bg-none border hover:bg-white/10 hover:shadow-none backdrop-blur-sm ${isGenerating ? 'animate-pulse opacity-50' : ''}`}
                                onClick={() => generateAIDescription() }
                                disabled={isPending || isGenerating}
                            >
                                <LiaBrainSolid size={28} className={isGenerating ? 'animate-spin-slow' : ''} />
                            </button>
                        </div>
                    </div>
                    {errors.description && <span className="fetching-error mt-2 text-xs self-end text-right drop-shadow-none">{errors.description.message}</span>}
                </div>
                <button 
                    type="submit" 
                    className='submit-btn mt-4'
                    disabled={isPending}
                >{t('common.actions.register_item')}</button>
            </div>
        </form>
    )
}

export default AddItemForm