import {FaOpencart} from "react-icons/fa"
import { Link } from "react-router-dom"
import BookImage from "./testbook.jpg"
const BookCard = ({item}) => {
    function addToCart(product_id){
        console.log(product_id);
    }
    return (
        <div className="book-card">
            <div className="card-image">
                <img src={`http://localhost:3000/api/books/${item._id}/image`} alt="" />
            </div>
            <div className="card-content">
                <div className="title"><Link to={`/books/${item._id}`}>{item.title}</Link></div>
                <span className="price">${item.price}</span>
            </div>
            <div className="author-text">{item.authorName}</div>
            <div className="card-icon btn" onClick={()=>addToCart(item.product_id)}><FaOpencart /></div>
        </div>
    )
}

export default BookCard
