import {useParams} from "react-router";
import {useEffect, useState} from "react";
import NotFound from "./NotFound";
import {Link, useNavigate} from "react-router-dom";
import Loading from "./Loading";

const OrderPage = ({ isAuthed }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthed) {
            alert("You are not authorized!");
            navigate('/');
        }

        async function fetchData() {
            try {
                const orderResponse = await fetch(`http://localhost:8080/api/orders/${id}`)
                if (orderResponse.ok) {
                    const orderData = await orderResponse.json();
                    setOrder(orderData)

                    const productQuantities = JSON.parse(orderData.productsQuantities);
                    const productPromises = productQuantities.map(async ({id: productId, quantity}) => {
                        const productResponse = await fetch(`http://localhost:8080/api/product/${productId}`);
                        const productData = await productResponse.json();
                        setTotalPrice(prevState => prevState + (quantity * productData.price));
                        return {...productData, quantity};
                    })

                    const productData = await Promise.all(productPromises);
                    setProducts(productData);
                } else if (orderResponse.status === 404) {
                    setNotFound(true);
                } else {
                    console.error("Error fetching order");
                }
            } catch (error) {
                console.error("Error fetching order", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData().then();
    }, [id]);

    if (isLoading) {
        return (
            <div className="container">
                <h1 className="mb-5 text-center fw-normal">Order #{id}</h1>
                <Loading />
            </div>
        )
    }

    if (notFound) {
        return <NotFound />
    }

    return (
        <div className="container">
            <h1 className="mb-5 text-center fw-normal">Order #{id}</h1>

            <div className="row mb-4">
                <div className="col-3">
                    <h2 className="fw-normal">Date of creation:</h2>
                    <p className="card-text">{new Date(order.date).toLocaleString()}</p>
                </div>
                <div className="col-3">
                    <h2 className="fw-normal">Status:</h2>
                    <p className="card-text">{order.status}</p>
                </div>
                <div className="col-3">
                    <h2 className="fw-normal">Total price:</h2>
                    <p className="card-text"><strong>{Math.round(totalPrice * 100) / 100}</strong> CZK</p>
                </div>
            </div>

            <div className="row row-cols-2 row-cols-md-5 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className="card h-100 shadow" style={{width: '100%'}}>
                            <img src={product.image} className="card-img-top p-2" alt={product.name} />
                            <br />
                            <div className="card-body">
                                <Link to={`/product/${product.id}`}>
                                    <h5 className="card-title mb-4">{product.name}</h5>
                                </Link>
                                <p className="card-text"><strong>Price: </strong>{Math.round(product.price * 100) / 100} CZK</p>
                                <p className="card-text"><strong>Quantity: </strong>{product.quantity} pcs</p>
                                <p className="card-text"><strong>Total price: </strong>{Math.round(product.quantity * product.price * 100) / 100} CZK</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderPage;