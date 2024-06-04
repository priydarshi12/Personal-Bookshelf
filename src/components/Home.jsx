import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [addedBooks, setAddedBooks] = useState([]);

  // Debounce function to throttle API calls
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const fetchData = async (query) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
      );
      setData(response.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const initialfetchData = async (query) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=the+lord+of&limit=10&page=1`
      );
      setData(response.data.docs);
      console.log("initial fetch->",response.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    initialfetchData();
  }, []);

  const handleChange = useCallback(debounce((e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.trim() !== "") {
      fetchData(query);
    } else {
      setData([]);
    }
  }, 300), []);

  const addToBookshelf = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    if (!savedBooks.some(savedBook => savedBook.key === book.key)) {
      savedBooks.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(savedBooks));
      setAddedBooks(prevAddedBooks => [...prevAddedBooks, book.key]);
      alert(`${book.title} has been added to your bookshelf!`);
    }
  };

  const isBookInBookshelf = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    return savedBooks.some(savedBook => savedBook.key === book.key) || addedBooks.includes(book.key);
  };

  return (
    <div className="container-home">
      <div className="left-container-home">
        <div className="left-content-home">
          <div className="heading-left-home">
            <h2>Search by book name:</h2>
            <input
              type="text"
              className="book-search-input"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="search-results">
            {data.map((book) => (
              <div key={book.key} className="book-card">
                <div className="book-content">
                  <h4 className="book-title">Book title:</h4>
                  <span className="book-name">{book.title}</span>
                </div>
                <div className="editor-content">
                  <h4 className="editor-title">Editor Count:</h4>
                  <span className="editor-count">{book.edition_count}</span>
                </div>
                {!isBookInBookshelf(book) && (
                  <button className="add-book-btn" onClick={() => addToBookshelf(book)}>
                    Add to Bookshelf
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-container-home">
        <button className="right-home-btn" onClick={() => window.location.href='/bookshelf'}>
          My Bookshelf
        </button>
      </div>
    </div>
  );
};

export default Home;
