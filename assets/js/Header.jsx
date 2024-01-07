import React, { useState } from "react";

import BookSearch from "./components/BookSearch";
import BookResults from "./components/BookResults";

export default function Header() {
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
    <header className="h-screen bg-gray-800 text-white p-12 ">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl mb-8 font-semibold animate-flip-up animate-ease-out">
          Find a book{" "}
        </h2>

        <p className="text-lg mt-4 animate-flip-down animate-delay-500 animate-ease-out">
          Join our community of book lovers and start sharing your reviews
          today.
        </p>
        <a
          href="#"
          className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
        >
          Get Started
        </a>

        <BookSearch
          bookName={bookName}
          author={author}
          handleBookInputChange={handleBookInputChange}
          handleAuthorInputChange={handleAuthorInputChange}
          handleSearch={handleSearch}
        />
        <h2 className="text-4xl mt-4 animate-flip-down animate-delay-500 animate-ease-out py-5">
          Leave a review!
        </h2>
      </div>

      <BookResults
        results={results}
        handleSearch={handleSearch}
      />
    </header>
  );
}
