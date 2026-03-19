import { createContext, useState, useCallback, useContext } from "react";

export const InventoryContext = createContext();

function InventoryProvider({ children }) {
    const [inventory, setInventory] = useState([
        { id: 1, name: "Hammer", quantity: 20 },
        { id: 2, name: "Screwdriver", quantity: 20 },
        { id: 3, name: "Shovel", quantity: 20 },
        { id: 4, name: "Axe", quantity: 20 },
    ]);

    const updateQuantity = useCallback((id, change) => {
        setInventory((inventory) => {
            const newArray = inventory.map(item => {
                if (item.id === id) return { ...item, quantity: change }
                else return item;
            });
            return newArray;
        })
    }, []);

    const addNewItem = (name) => {
        setInventory([...inventory, { id: Date.now(), name: name, quantity: 0 }]);
    }

    return (
        // InventoryContext.Provider in older react
        <InventoryContext value={{ inventory, updateQuantity, addNewItem }}>
            {children}
        </InventoryContext>
    )
}

export default InventoryProvider;

export const useInventory = () => useContext(InventoryContext);