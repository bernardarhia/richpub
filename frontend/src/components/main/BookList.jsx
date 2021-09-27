import React from "react";
import BookCard from "../sub/BookCard";

const BookList = ({books}) => {
  console.log(books);
  return (
    <div className="book-list__container">
      {books.map((item, index) => {
        return <BookCard item={item} key={index} />;
      })}
    </div>
  );
};

export default BookList;
