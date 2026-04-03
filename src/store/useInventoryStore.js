import { create } from "zustand";

export const useInventoryStore = create((set, get) => ({
    inventory: [],
    isLoading: true,
    error: null,

    fetchInventory: () => {
        set({ isLoading: true, error: null });

        setTimeout(() => {
            const data = [
                { id: 1, name: "Hammer", quantity: 20, description: "Strong, classic, iron hammer..." },
                { id: 2, name: "Screwdriver", quantity: 20, description: "Just a simple screwdriver..." },
                { id: 3, name: "Shovel", quantity: 20, description: "Dig or bury whatever you want!" },
                { id: 4, name: "Axe", quantity: 20, description: "Cut trees like a real timberman!" },
            ];

            set({ inventory: data, isLoading: false, error: null });
        }, 2000);
    },

    updateQuantity: (id, change) => {
        set((state) => ({
            inventory: state.inventory.map(item => item.id === id ? { ...item, quantity: change } : item)
        }));
    },

    addNewItem: (data) => {
        set((state) => ({
            inventory: ([...state.inventory, { id: Date.now(), name: data.name, quantity: 0, description: data.description }])
        }));
    },

    deleteItem: (id) => {
        set((state) => ({
            inventory: state.inventory.filter(item => item.id !== id)
        }))
    }
})) 