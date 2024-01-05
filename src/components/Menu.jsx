import { NavLink } from "react-router-dom";

const Menu = ({price}) => {
    return (
        <nav className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <NavLink to="." className="nav-link px-2">Home</NavLink>
            <NavLink to="product" className="nav-link px-2">Products</NavLink>
            <NavLink to="cart" className="nav-link px-2">Cart: {price} CZK</NavLink>
        </nav>
    )
}

export default Menu;
