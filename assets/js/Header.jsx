import React, { useState } from "react";

import BookSearch from "./components/BookSearch";
import BookResults from "./components/BookResults";

export default function BookReview() {
  const [results, setResults] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookNameOutput, setBookNameOutput] = useState("");
  const [authorOutput, setAuthorOutput] = useState("");

  const handleBookInputChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorInputChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (bookName !== "" || author !== "") {
      setBookNameOutput("");
      setAuthorOutput("");

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            bookName
          )}+inauthor:${encodeURIComponent(author)}`
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
    <header className="h-screen  text-white lg:flex ">
      <div className=" bg-gray-800 sticky p-12 lg:w-1/2 mx-auto text-center lg:text-left ">
        <BookSearch
          bookName={bookName}
          author={author}
          handleBookInputChange={handleBookInputChange}
          handleAuthorInputChange={handleAuthorInputChange}
          handleSearch={handleSearch}
        />
      </div>
      <div className="bg-gray-400 text-center lg:text-left p-12 lg:w-1/2  h-full">
        <BookResults
          results={results}
          handleSearch={handleSearch}
        />
      </div>
    </header>
  );
}
