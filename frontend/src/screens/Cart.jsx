import Nav from "../components/main/Nav";
import SearchBar from "../components/main/SearchBar";
import Wrapper from "../components/main/Wrapper";
import ItemTitle from "../components/sub/ItemTitle";
import { useEffect, useState } from "react";
import Book from "../components/sub/Book";
import Button  from "../components/sub/Button";
const Cart = (props) => {
  const [books] = useState([
     {
          title: "The book everyone likes",
          price: "$20",
          author: "Biraj Patel",
          product_id:"e39394394839539958"
        },
  ]);
  // Fetch books if user has bought any
  useEffect(() => {

  }, []);
  return (
    <>
      <Nav isLoggedIn={false} />
      <Wrapper>
        <SearchBar />
        <ItemTitle className="title-small">My Books</ItemTitle>
        <p>Total Books : {books.length} </p>
         <div className="book-list__container">
        {books.map((book,index)=>{
            return <Book book={book} key={index} />
        })}
         </div>
         <Button className="btn btn-small small-border" style={{width:"100%",background:"#F48585",color:"#fff"}}>Remove all</Button>
      </Wrapper>
    </>
  );
};

export default Cart;
