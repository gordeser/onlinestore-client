import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const Cart = ({ onCreate, isAuthed, price }) => {
    const [productsCount, setProductsCount] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const cartCookie = Cookies.get('cart');
        if (cartCookie) {
            const productIds = cartCookie.split(':').map(Number);
            const count = productIds.reduce((acc, id) => {
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});
            setProductsCount(count);
        }
    }, []);


    const [productsInfo, setProductsInfo] = useState({});

    useEffect(() => {
        async function fetchProductInfo(id) {
            const response = await fetch(`http://localhost:8080/api/products/${id}`);
            return await response.json();
        }

        Object.keys(productsCount).forEach(async (id) => {
            const info = await fetchProductInfo(id);
            setProductsInfo(prev => ({...prev, [id]: info}));
        });

    }, [productsCount]);

    // todo
    const handleOrder = async () => {

        const orderProducts = Object.entries(productsCount).map(([id, quantity]) => ({
            id: parseInt(id),
            quantity: parseInt(quantity)
        }))

        const order = {
            userEmail: Cookies.get('email'),
            orderProducts
        }

        try {
            const response = await fetch("http://localhost:8080/api/orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                alert("Order is successfully created");
                onCreate();
                navigate("/");
            } else if (response.status === 400) {
                alert("Order amount should be in the range of 300 to 100,000 CZK")
            } else {
                alert("Error creating an order");
            }
        } catch (error) {
            console.error("Error creating an order: ", error);
        }
    }

    return (
        <div className="container py-4 align-content-center">
            <h1 className="mb-5 text-center fw-normal">Cart</h1>
            {Object.keys(productsInfo).map(id =>
                <div key={id} className="justify-content-center mb-5 row align-items-center my-3">
                    <div className="col-1">
                        <img src={productsInfo[id].image} className="img-fluid" alt={productsInfo[id].name} style={{maxWidth: "100px"}} />
                    </div>
                    <div className="col-1"><strong>{productsInfo[id].name}</strong></div>

                    <div className="ms-5 col-1">{productsCount[id]} items</div>
                    <div className="col-1">*</div>
                    <div className="col-1">{Math.round(productsInfo[id].price * 100) / 100} CZK</div>
                    <div className="col-1">=</div>
                    <div className="col-1"><strong>{Math.round(productsCount[id] * productsInfo[id].price * 100) / 100} CZK</strong></div>
                </div>
            )}

            {Object.keys(productsInfo).length === 0 && (
                <div>
                    <h3 className="mb-5 text-center fw-normal">There are no items in your cart</h3>
                </div>
            )}

            {Object.keys(productsInfo).length !== 0 && (
                <>
                    <div className="d-flex justify-content-center">
                        <h4>Total: {price} CZK</h4>
                    </div>
                    {isAuthed ? (
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary" onClick={handleOrder}>Make an order</button>
                        </div>) : (
                        <div className="d-flex justify-content-center alert alert-warning" style={{width: "30%", margin: "auto"}} role="alert">
                            <span className="me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                        <path d="M8.982 1.318a.5.5 0 00-.964 0L1 13h14L8.982 1.318zM8 5a.5.5 0 011 0v3a.5.5 0 010 1H8V5zM8 12a.5.5 0 110-1 .5.5 0 010 1z"/>
                                    </svg>
                                </span>
                            Only signed up users can make orders.
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Cart;
