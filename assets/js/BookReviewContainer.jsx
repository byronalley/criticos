import React, { useState, useEffect } from "react";

import Footer from "./Footer";
import BookReview from "./BookReview";
import Reviews from "./Reviews";
import BookSearch from "./components/BookSearch";
import BookResults from "./components/BookResults";

export default function BookReviewContainer() {
  const [results, setResults] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  const [isResultsVisible, setIsResultsVisible] = useState(false);

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
        setIsResultsVisible(true);
        console.log(results);
      } catch (error) {
        console.error("Error fetching data from Google Books API", error);
      }
    } else {
      handleSearch();
    }
  };

  return (
    <>
      {/* <BookReview /> */}
      <header>
        <div className=" top-0 text-white text-center  lg:text-left">
          <BookSearch
            bookName={bookName}
            author={author}
            setBookName={setBookName}
            setAuthor={setAuthor}
            handleBookInputChange={handleBookInputChange}
            handleAuthorInputChange={handleAuthorInputChange}
            handleSearch={handleSearch}
          />

          <BookResults
            results={results}
            handleSearch={handleSearch}
            isResultsVisible={isResultsVisible}
            setIsResultsVisible={setIsResultsVisible}
          />
        </div>
      </header>
      <Reviews />
      <Footer />
    </>
  );
}
