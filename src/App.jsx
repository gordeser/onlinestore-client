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

    return <BrowserRouter>
        <div>
            <Routes>
                    <Route path="products" element={<Products />} />
                <Route path="/" element={<MainLayout isAuthed={isAuthed} onLogout={handleLogOut} />}>
                    <Route path="/products/:id" element={<ProductPage />} />
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
