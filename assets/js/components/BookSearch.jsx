import React, { useState } from "react";

import Book from "./Book";

const BookSearch = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookNameOutput, setBookNameOutput] = useState("");
  const [authorOutput, setAuthorOutput] = useState("");

  const [results, setResults] = useState([]);

  const handleBookInputChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorInputChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSearch = async () => {
    if (bookName !== "" || author !== "") {
      setBookNameOutput("");
      setAuthorOutput("");

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${bookName}+inauthor:${author}`
        );
        const data = await response.json();

        setResults(data.items);
        console.log(results);
      } catch (error) {
        console.error("Error fetching data from Google Books API", error);
      }
    } else {
      handleSearch();
    }
  };

  return (
    <div className="px-4 container mx-auto">
      <span className="w-full py-2">
        <input
          className="w-1/2 text-blue-500"
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={handleBookInputChange}
        />
        <input
          className="w-1/2"
          type="text"
          placeholder="Author"
          value={author}
          onChange={handleAuthorInputChange}
        />
        <button
          onClick={handleSearch}
          className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
        >
          Search
        </button>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => {
            return (
              <Book
                result={result}
                key={result.id}
                handleSearch={handleSearch}
              />
            );
          })}
        </ul>
      </span>
    </div>
  );
};

export default BookSearch;
