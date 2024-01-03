import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import NotFound from "./NotFound";
import Loading from "./Loading";

// end.

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 404) {
                    setNotFound(true);
                    return null;
                } else {
                    throw new Error("Error fetching product");
                }
            }).then(data => {
                if (data) {
                    setProduct(data);
                }
            })
            .catch(error => {
                console.error("Error fetching product", error);
            })
    }, [id]);

    if (notFound) {
        return <NotFound />
    }

    if (!product) {
        return <Loading />
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} className="img-fluid w-75 ms-5" alt={product.name} />
                </div>

                <div className="col-md-6">
                    <h2 className="mb-3 text-center fw-normal">{product.name}</h2>
                    <p className="lead">{product.description}</p>
                    <p><strong>Price: </strong> {Math.round(product.price * 100) / 100} CZK</p>
                    <p><strong>Category: </strong> {product.category}</p>
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
