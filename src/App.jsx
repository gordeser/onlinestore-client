import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import MainLayout from "./layouts/MainLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductPage from "./components/ProductPage";

function App() {
    return <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductPage />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;
