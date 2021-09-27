import { FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import BookImage from "./testbook.jpg"
const Book = ({book}) => {

    function removeBook(bookId){
console.log(bookId);
    }
    return (
       <div className="book-card">
            <div className="card-image">
                <img src={BookImage} alt="" />
            </div>
            <div className="card-content">
                <div className="title"><Link to={`/product/${book.product_id}`}>{book.title}</Link></div>
            </div>
            <div className="author-text">{book.author}</div>
            <div className="card-icon btn" onClick={()=>removeBook(book.product_id)}><FaTrash /></div>
        </div>
    )
}

export default Book
