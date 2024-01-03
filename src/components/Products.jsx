import { useState, useEffect } from 'react'
import Cookies from "js-cookie";


const Products = ({ onChange }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products', error))
    }, []);

    const addToCart = (productId) => {
        let cart = Cookies.get('cart');
        let cartArray = cart ? cart.split(':') : [];

        cartArray.push(productId.toString());
        Cookies.set('cart', cartArray.join(':'), {expires: 7});
    }

    const handleAdd = (productId, productPrice) => {
        addToCart(productId);
        onChange(productPrice);
    }

    return (
        <div className="container">
            <h1 className="mb-3 text-center fw-normal">Products</h1>
            <div className="row row-cols-2 row-cols-md-4 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <div className="card h-100 shadow" style={{width: '100%'}}>
                            <img src={product.image} className="card-img-top p-2" alt={product.name} />
                            <br />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text"><strong>Price: </strong>{product.price}</p>
                                <button className="btn btn-primary" onClick={() => handleAdd(product.id, product.price)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;

