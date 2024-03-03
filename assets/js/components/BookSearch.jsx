import React, { useState } from "react";

import Input from "./Input";
import Button from "./Button";
import SubmitButton from "./SubmitButton";
import SearchIcon from "../icons/SearchIcon";
import SubmitIcon from "../icons/SubmitIcon";

const BookSearch = ({
  bookName,
  author,
  bookId,
  handleBookInputChange,
  handleAuthorInputChange,
  handleSearch,
  postReview,
  reviewContents,
  setReviewContents,
  reviewRating,
  setReviewRating,
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
      <div className="flex">
        <Input
          placeholder="Title..."
          value={bookName}
          onChange={handleBookInputChange}
        ></Input>
      </div>
      <div className="flex space-x-1">
        <Input
          placeholder="Author..."
          value={author}
          onChange={handleAuthorInputChange}
          className="mr-10"
        />
        <Button variant="secondary" onClick={handleSearch} isHidden={isHidden}>
          <SearchIcon />
        </Button>
      </div>

      <div className="flex space-x-1">
        <Input
          value={reviewContents}
          placeholder={"Review a book..."}
          onChange={handleReviewContents}
          multiline={true}
        />
      </div>

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
