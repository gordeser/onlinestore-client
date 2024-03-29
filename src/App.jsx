import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import MainLayout from "./layouts/MainLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import ProductPage from "./components/ProductPage";
import Orders from "./components/Orders";
import OrderPage from "./components/OrderPage";

function App() {

    useEffect(() => {
        let cart = Cookies.get('cart');
        let cartArray = cart ? cart.split(':') : [];

        const fetchPromises = cartArray.map(
            id => fetch(`http://localhost:8080/api/product/${id}`).then(res => res.json())
        )

        Promise.all(fetchPromises).then(products => {
            const sum = products.reduce(
                (acc, product) => acc + product.price, 0);

            setPrice(Math.round(sum*100)/100);
        }).catch(error => {
            console.error("Failed fetching products: ", error);
        })
    }, []);

    const [price, setPrice] = useState(0);
    const [isAuthed, setIsAuthed] = useState(!!Cookies.get("email"));

    const handleLogin = () => {
        setIsAuthed(true);
    }

    const handleLogOut = () => {
        setIsAuthed(false);
        alert("Successfully logged out");
        Cookies.remove("email");
    }

    const handleSignup = () => {
        setIsAuthed(true);
    }

    const handleAddPrice = (toAdd) => {
        setPrice(Math.round((price + toAdd)*100)/100);
    }

    const handleClearCart = () => {
        setPrice(0);
        Cookies.set('cart', '', {expires: 7});
    }

    return <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<MainLayout isAuthed={isAuthed} onLogout={handleLogOut} price={price}/>}>
                    <Route path="product" element={<Products onChange={(toAdd) => handleAddPrice(toAdd)}/>} />
                    <Route path="product/:id" element={<ProductPage isAuthed={isAuthed} onChange={(toAdd) => handleAddPrice(toAdd)}/>} />
                    <Route path="cart" element={<Cart onCreate={handleClearCart} isAuthed={isAuthed} price={price}/>} />
                    <Route path="login" element={<Login onLogin={handleLogin} />} />
                    <Route path="signup" element={<Signup onSignup={handleSignup}/>} />
                    <Route path="orders" element={<Orders isAuthed={isAuthed} />} />
                    <Route path="orders/:id" element={<OrderPage isAuthed={isAuthed} />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;
