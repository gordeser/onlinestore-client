import {useEffect, useState} from "react";
import {useParams} from "react-router";
import NotFound from "./NotFound";
import Loading from "./Loading";
import '../styles/ProductPage.css'

const ProductPage = () => {
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

                    <div className="comments-section mt-5">
                        <h3>Comments</h3>
                        {comments.map(comment => (
                            <div className="comment mb-3">
                                <p><strong>{comment.user.name} {comment.user.surname}</strong> ({comment.user.email}) - <small>{new Date(comment.date).toLocaleString()}</small></p>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;
