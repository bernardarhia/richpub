import { useContext, useState, useEffect } from "react";
import BookList from "../components/main/BookList";
import Nav from "../components/main/Nav";
import SearchBar from "../components/main/SearchBar";
import Wrapper from "../components/main/Wrapper";
import ItemTitle from "../components/sub/ItemTitle";
import { UserContext } from "../context/UserContext";
import axios from "../requests/axios-config";
const Home = ({ isAuth }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);
  async function fetchBooks() {
    const response = await axios.get("/books");

    const resBooks = await response.data;
    setBooks(resBooks.books);
  }

  return (
    <>
      <Nav isLoggedIn={isAuth} />
      <Wrapper>
        <SearchBar />
        <ItemTitle className="title-large">Recent Books</ItemTitle>
        <BookList books={books} />
      </Wrapper>
    </>
  );
};

export default Home;
