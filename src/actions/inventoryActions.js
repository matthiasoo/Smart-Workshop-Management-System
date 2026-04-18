"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function fetchInventory() {
    return await prisma.inventoryItem.findMany({
        orderBy: { createdAt: 'asc' }
    });
}

export async function addInventoryItem(data) {
    if (!data.name || data.name.trim() === '') return;

    await prisma.inventoryItem.create({
        data: {
            name: data.name,
            description: data.description,
            quantity: 0,
        }
    });

    // refresh and update page without restarting the browser
    revalidatePath("/")
}

export async function updateItemQuantity(id, newQuantity) {
    if (newQuantity < 0) return;

    await prisma.inventoryItem.update({
        where: { id },
        data: { quantity: newQuantity }
    });

    revalidatePath("/");
}

export async function deleteInventoryItem(id) {
    await prisma.inventoryItem.delete({
        where: { id }
    });

    revalidatePath("/");
}