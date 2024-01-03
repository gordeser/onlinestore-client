import { NavLink } from "react-router-dom";


const Menu = () => {
    return (
        <nav className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <NavLink to="." className="nav-link px-2">Home</NavLink>
            <NavLink to="products" className="nav-link px-2">Products</NavLink>
            <NavLink to="cart" className="nav-link px-2">Cart: 0 CZK</NavLink>
        </nav>
    )
}

export default Menu;
