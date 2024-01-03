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

function App() {
    useEffect(() => {
        let cart = Cookies.get('cart');
        let cartArray = cart ? cart.split(':') : [];

        const fetchPromises = cartArray.map(
            id => fetch(`http://localhost:8080/api/products/${id}`).then(res => res.json())
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

    return <BrowserRouter>
        <div>
            <Routes>
                <Route path="/" element={<MainLayout isAuthed={isAuthed} onLogout={handleLogOut} price={price}/>}>
                    <Route path="products" element={<Products onChange={(toAdd) => handleAddPrice(toAdd)}/>} />
                    <Route path="/products/:id" element={<ProductPage isAuthed={isAuthed}/>} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="login" element={<Login onLogin={handleLogin} />} />
                    <Route path="signup" element={<Signup onSignup={handleSignup}/>} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
}

export default App;
