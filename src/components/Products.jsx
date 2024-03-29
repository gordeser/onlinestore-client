import { useState, useEffect } from 'react'
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import Loading from "./Loading";


const Products = ({ onChange }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('all');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }


    useEffect(() => {
        const url = category === 'all'
            ? 'http://localhost:8080/api/product'
            : `http://localhost:8080/api/product?category=${category}`

        fetch(url)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products', error))
    }, [category]);

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
            <div className="row">
                <div className="col-3">
                    <h2 className="fw-normal">Category</h2>
                    <select className="form-select mb-5" value={category} onChange={handleCategoryChange}>
                        <option value="all">All categories</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </select>
                </div>
            </div>
            {products.length === 0 ? (<Loading />) : (
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
                                    <p className="card-text"><strong>Price: </strong>{Math.round(product.price * 100) / 100}</p>
                                    <button className="btn btn-primary" onClick={() => handleAdd(product.id, product.price)}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Products;

