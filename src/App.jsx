import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useInventoryStore } from './store/useInventoryStore.js';
import Home from './pages/Home.jsx';
import ItemDetails from './pages/ItemDetails.jsx';
import Layout from './components/Layout.jsx';

function App() {
    const { fetchInventory } = useInventoryStore();

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route 
                        path="/item/:id"
                        element={<ItemDetails />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App