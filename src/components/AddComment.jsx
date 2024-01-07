import {useState} from "react";
import Cookies from "js-cookie";

const AddComment = ({ productId, onAddComment }) => {
    const [commentText, setCommentText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userEmail = Cookies.get('email');
        if (!userEmail) {
            alert("You are not signed up");
            return;
        }

        const commentData = {
            text: commentText,
            userEmail
        }

        try {
            const response = await fetch(`http://localhost:8080/api/product/${productId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData)
            });

            if (response.ok) {
                alert("Comment is successfully added");
                const newComment = await response.json();
                console.log(newComment);
                onAddComment(newComment);
                setCommentText('');
            } else {
                console.error("Error adding comment");
            }
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="comment" className="form-label fw-bold">Add new comment: </label>
                <textarea
                    className="form-control"
                    id="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Add comment</button>
        </form>
    )
}

export default AddComment;
