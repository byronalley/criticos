import React, { useState } from "react";

import Input from "./Input";
import Button from "./Button";
import SubmitButton from "./SubmitButton";
import SearchIcon from "../icons/SearchIcon";
import SubmitIcon from "../icons/SubmitIcon";
import BookResults from "./BookResults";

const placeholder = "https://via.placeholder.com/128x192.png?text=No+Cover";

const BookSearch = ({
  bookName,
  author,
  thumbnail,
  bookId,
  results,
  setResults,
  handleBookInputChange,
  handleAuthorInputChange,
  handleSearch,
  postReview,
  reviewContents,
  setReviewContents,
  reviewRating,
  setReviewRating,
  setAuthor,
  setBookName,
  setThumbnail,
  setBookId,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const handleReviewContents = (event) => {
    setReviewContents(event.target.value);
  };

  const handleReviewRating = (event) => {
    setReviewRating(event.target.value);
  };

  const ratingDescription = [
    "Terrible. Avert your eyes!",
    "Not good. Not worth reading.",
    "Worthwhile but there are better options.",
    "Really great!",
    "Amazing! A classic. Must-read!",
  ];

  const handleSubmitReview = (event) => {
    event.preventDefault(); // prevent the default action
    postReview(event);
  };

  return (
    <form className="p-6 w-full lg:w-1/2 rounded-lg space-y-2 bg-gray-800">
      <fieldset className="flex lg:flex-row space-x-2">
        {thumbnail ? (
          <img className="h-24 w-16 max-w-16" src={thumbnail || placeholder} />
        ) : (
          ""
        )}
        <div className="w-full">
          <div className="flex">
            <Input
              placeholder="Title..."
              value={bookName}
              onChange={handleBookInputChange}
              id="titleSearch"
            ></Input>
          </div>
          <div className="flex space-x-1">
            <Input
              placeholder="Author..."
              value={author}
              id="authorSearch"
              onChange={handleAuthorInputChange}
              className="mr-10"
            />
            <Button
              variant="secondary"
              onClick={handleSearch}
              isHidden={isHidden}
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
      </fieldset>

      <BookResults
        results={results}
        setResults={setResults}
        handleSearch={handleSearch}
        setAuthor={setAuthor}
        setBookName={setBookName}
        setThumbnail={setThumbnail}
        setBookId={setBookId}
      />

      <Input
        value={reviewContents}
        placeholder={"Review a book..."}
        onChange={handleReviewContents}
        multiline={true}
        maxLength="256"
      />

      <fieldset className="mt-8 flex flex-col lg:flex-row space-y-5 gap-x-6">
        <div className="mt-2 w-full lg:w-3/4">
          <span className="text-white-500 flex mb-2">Rating: </span>
          <input
            onChange={handleReviewRating}
            type="range"
            name="rating"
            id="rating"
            className="text-blue-500 w-full ml-2"
            value={reviewRating}
            min="0"
            max="4"
            step="1"
          />

          <div className="p-2 h-16">
            <output htmlFor="rating">
              {reviewRating} Stars: &ldquo;{ratingDescription[reviewRating]}
              &rdquo;
            </output>
          </div>
        </div>
        <SubmitButton onClick={(e) => handleSubmitReview(e)}>
          <SubmitIcon />
        </SubmitButton>
      </fieldset>
    </form>
  );
};

export default BookSearch;
