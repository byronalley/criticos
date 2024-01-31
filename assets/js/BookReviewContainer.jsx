import React, { useState } from "react";

import Footer from "./Footer";
import Reviews from "./Reviews";
import BookSearch from "./components/BookSearch";
import BookResults from "./components/BookResults";

export default function BookReviewContainer() {
  const [results, setResults] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [reviewContents, setReviewContents] = useState("");
  const [reviewRating, setReviewRating] = useState(2);
  const [bookId, setBookId] = useState("");

  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const handleBookInputChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorInputChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (bookName !== "" || author !== "") {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            bookName,
          )}+inauthor:${encodeURIComponent(author)}`,
        );
        const data = await response.json();

        setResults(data.items);
        setIsResultsVisible(true);
      } catch (error) {
        console.error("Error fetching data from Google Books API", error);
      }
    } else {
      handleSearch();
    }
  };

  const postReview = async (event) => {
    event.preventDefault();

    const response = await fetch("/web_api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        review: {
          content: reviewContents,
          google_volume_id: bookId,
          rating: reviewRating,
        },
      }),
    });

    if (response.ok) {
      alert("Review posted successfully");
    } else {
      alert("Error posting review");
      console.log("Error posting review");
      console.log(response);
    }
  };

  return (
    <>
      <header className="flex flex-col lg:flex-row top-0 text-white text-center  lg:text-left">
        <BookSearch
          bookName={bookName}
          author={author}
          setBookName={setBookName}
          setAuthor={setAuthor}
          handleBookInputChange={handleBookInputChange}
          handleAuthorInputChange={handleAuthorInputChange}
          handleSearch={handleSearch}
          reviewContents={reviewContents}
          setReviewContents={setReviewContents}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          postReview={postReview}
        />

        <BookResults
          results={results}
          handleSearch={handleSearch}
          isResultsVisible={isResultsVisible}
          setIsResultsVisible={setIsResultsVisible}
          setAuthor={setAuthor}
          setBookName={setBookName}
          setBookId={setBookId}
        />
      </header>
      <Reviews />
      <Footer />
    </>
  );
}
