import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const Orders = ({isAuthed}) => {
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthed) {
            alert("You are not authorized!");
            navigate('/');
        }

        async function fetchData() {
            try {
                const ordersResponse = await fetch('http://localhost:8080/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userEmail: Cookies.get('email')})
                })

                if (ordersResponse.ok) {
                    const ordersData = await ordersResponse.json();
                    setOrders(ordersData);
                } else {
                    console.error("Error fetching order");
                }
            } catch (error) {
                console.error("Error fetching order", error);
            }
        }

        fetchData().then();
    }, []);

    return (
        <div className="container">
            <h1 className="mb-5 text-center fw-normal">Your orders</h1>
            <div className="row row-cols-md-4 g-4">
            {orders.map(order => (
                <div key={order.id} className="col card me-4" style={{width: "15rem"}}>
                    <div className="card-body">
                        <Link to={`/orders/${order.id}`}>
                            <h5 className="card-title text-center">Order #{order.id}</h5>
                        </Link>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Orders;