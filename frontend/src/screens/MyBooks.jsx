import {
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminNav from "../components/main/AdminNav";
import Wrapper from "../components/main/Wrapper";
const MyBooks = () => {
  return (
    <>
      <AdminNav />
      <Wrapper>
        <div className="book-list__container">
          <div className="book-card">
            <div className="card-image">
              <img
                src={`http://localhost:3000/api/books/615135fce75bc39c37936d2f/image`}
                alt=""
              />
            </div>
            <div className="card-content">
              <div className="title">The Book</div>
            </div>
            <div className="card-icon btn">
              <Link to="/edit-book/38378347378378374">
                <FaPencilAlt style={{ marginRight: "10px" }} />
              </Link>
              
                <FaTrash />
            
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default MyBooks;
