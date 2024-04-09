import React, { useState } from "react";

import BookSearch from "./components/BookSearch";
import { searchBooks } from "./lib/BookAPI";

export default function ReviewEditor({ updateReviews }) {
  const [results, setResults] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [reviewContents, setReviewContents] = useState("");
  const [reviewRating, setReviewRating] = useState(2);
  const [bookId, setBookId] = useState("");

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
        const results = await searchBooks(bookName, author);

        setResults(results);
      } catch (error) {
        console.error("Error fetching data from Books API", error);
      }
    } else {
      handleSearch();
    }
  };

  const postReview = async (event) => {
    event.preventDefault();

    let form = document.querySelector("form");

    let formIsValid = true;
    if (!bookId) {
      document
        .querySelector("#titleSearch")
        .setCustomValidity("Please choose a book!");
      formIsValid = false;
    }
    if (![...form.elements].every((e) => e.reportValidity())) {
      formIsValid = false;
    }

    if (!formIsValid) return;

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
      clearReview();
      updateReviews();

      // TODO(BA): Replace with flash
      alert("Review posted successfully");
    } else if (response.status == 422) {
      const { errors } = await response.json();
      const errorString = Object.entries(errors)
        .map((error) => {
          const [e, a] = error;
          return `${e}: ${a.join(", ")}`;
        })
        .join("\n");

      alert(`Error posting review:\n${errorString}`);
      console.log(`Error posting review:\n${errorString}`);
    } else {
      alert(`Error posting review`);
      console.log(`Error posting review:`);
      console.dir(response);
    }
  };

  const clearReview = () => {
    setResults([]);
    setBookName("");
    setAuthor("");
    setReviewContents("");
    setReviewRating(2);
    setBookId("");
  };

  return (
    <>
      <main className="p-6 flex flex-col lg:flex-row top-0 text-white text-center  lg:text-left">
        <BookSearch
          bookName={bookName}
          author={author}
          thumbnail={thumbnail}
          handleBookInputChange={handleBookInputChange}
          handleAuthorInputChange={handleAuthorInputChange}
          handleSearch={handleSearch}
          results={results}
          setResults={setResults}
          reviewContents={reviewContents}
          setReviewContents={setReviewContents}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          postReview={postReview}
          setAuthor={setAuthor}
          setBookName={setBookName}
          setThumbnail={setThumbnail}
          setBookId={setBookId}
        />
      </main>
    </>
  );
}
