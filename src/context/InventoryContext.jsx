import { createContext, useState, useCallback, useContext, useEffect } from "react";

export const InventoryContext = createContext();

function InventoryProvider({ children }) {
    const [inventory, setInventory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const data = [
                { id: 1, name: "Hammer", quantity: 20, description: "Strong, classic, iron hammer..." },
                { id: 2, name: "Screwdriver", quantity: 20, description: "Just a simple screwdriver..." },
                { id: 3, name: "Shovel", quantity: 20, description: "Dig or bury whatever you want!" },
                { id: 4, name: "Axe", quantity: 20, description: "Cut trees like a real timberman!" },
            ];
            if (data.length === 0) setError(new Error("Error connecting to server!"));
            else setInventory(data);
            setIsLoading(false);
        }, 2000);
    }, []);

    const updateQuantity = useCallback((id, change) => {
        setInventory((inventory) => {
            const newArray = inventory.map(item => {
                if (item.id === id) return { ...item, quantity: change }
                else return item;
            });
            return newArray;
        })
    }, []);

    const addNewItem = (data) => {
        setInventory([...inventory, { id: Date.now(), name: data.name, quantity: 0, description: data.description }]);
    }

    const deleteItem = (id) => {
        setInventory(inventory.filter(item => item.id !== id));
    }

    return (
        // InventoryContext.Provider in older versions of React
        <InventoryContext value={{ isLoading, error, inventory, updateQuantity, addNewItem, deleteItem }}>
            {children}
        </InventoryContext>
    )
}

export default InventoryProvider;

export const useInventory = () => useContext(InventoryContext);