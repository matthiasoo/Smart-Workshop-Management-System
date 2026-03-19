import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ItemDetails from './pages/ItemDetails.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route 
                    path="/item/:id"
                    element={<ItemDetails />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App