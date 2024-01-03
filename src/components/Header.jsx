import Menu from "./Menu";
import {Link} from "react-router-dom";


const Header = () => {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <span className="fs-4">Online Shop</span>
                    </a>
                </div>

                <Menu />

                <div className="col-md-3 text-end">
                    <Link to="login">
                        <button type="button" className="btn btn-outline-primary me-2">Login</button>
                    </Link>

                    <Link to="signup">
                        <button type="button" className="btn btn-primary">Sign up</button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header;
