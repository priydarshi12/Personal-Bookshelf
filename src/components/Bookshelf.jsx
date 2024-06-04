import React, { useState, useEffect, useCallback } from "react";
import "./Bookshelf.css";
const Bookshelf = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setData(savedBooks);
  }, []);
  return (
    <div className="bookshelf-container">
      <h2 className="bookshelf-heading">My Bookshelf</h2>
      <div className="bookshelf-content">
        {data.map((book) => (
          <div key={book.key} className="bookshelf-card">
            <div className="bookshelf-book-content">
              <h4 className="bookshelf-book-title">Book title:</h4>
              <span className="bookshelf-book-name">{book.title}</span>
            </div>
            <div className="bookshelf-editor-content">
              <h4 className="bookshelf-editor-title">Editor Count:</h4>
              <span className="bookshelf-editor-count">
                {book.edition_count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
