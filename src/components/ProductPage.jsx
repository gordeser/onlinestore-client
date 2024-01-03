import {useEffect, useState} from "react";
import {useParams} from "react-router";
import NotFound from "./NotFound";
import Loading from "./Loading";
import '../styles/ProductPage.css'
import AddComment from "./AddComment";
import Cookies from "js-cookie";

const ProductPage = ({ isAuthed, onChange }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const productResponse = await fetch(`http://localhost:8080/api/products/${id}`);
                if (productResponse.ok) {
                    const productData = await productResponse.json();
                    setProduct(productData);
                } else if (productResponse.status === 404) {
                    setNotFound(true);
                    return;
                } else {
                    throw new Error("Error fetching product");
                }

                const commentsResponse = await fetch(`http://localhost:8080/api/products/${id}/comments`);
                if (commentsResponse.ok) {
                    const commentsData = await commentsResponse.json();
                    setComments(commentsData);
                } else {
                    throw new Error("Error fetching comments");
                }

            } catch (error) {
                console.error("Error fetching product", error);
            }
        }

        fetchData().then().catch(error => console.error("Fetch error", error));
    }, [id]);


    const addComment = (newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
    }

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
                    <button className="btn btn-primary" onClick={() => handleAdd(id, product.price)}>Add to cart</button>

                    <div className="comments-section mt-5">
                        <h3>Comments</h3>
                        {comments.map(comment => (
                            <div key={comment.id} className="comment mb-3">
                                <p><strong>{comment.user.name} {comment.user.surname}</strong> ({comment.user.email}) - <small>{new Date(comment.date).toLocaleString()}</small></p>
                                <p>{comment.text}</p>
                            </div>
                        ))}

                        {isAuthed ? <AddComment productId={product.id} onAddComment={addComment}/> : (
                            <div className="alert alert-warning" role="alert">
                                <span className="me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                        <path d="M8.982 1.318a.5.5 0 00-.964 0L1 13h14L8.982 1.318zM8 5a.5.5 0 011 0v3a.5.5 0 010 1H8V5zM8 12a.5.5 0 110-1 .5.5 0 010 1z"/>
                                    </svg>
                                </span>
                                Only signed up users can leave comments.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
