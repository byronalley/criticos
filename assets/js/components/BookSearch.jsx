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
  thumbsUp,
  setThumbsUp,
  setAuthor,
  setBookName,
  setThumbnail,
  setBookId,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const handleReviewContents = (event) => {
    setReviewContents(event.target.value);
  };

  const handleThumbsUp = (event) => {
    setThumbsUp(event.target.value === "true");
  };

  const handleSubmitReview = (event) => {
    event.preventDefault(); // prevent the default action
    postReview(event);
  };

  return (
    <form className="mx-auto p-6 w-full max-w-4xl rounded-lg space-y-2 bg-gray-800">
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

      <fieldset className="mt-3 flex flex-col lg:flex-row space-y-5 gap-x-6 p-5 items-center">
        <span className="bold text-2xl mt-3 p-2">Rate this title:</span>
        <div className="mt-2 w-full lg:w-3/4">
          <div className="inline">
            <input
              onChange={handleThumbsUp}
              type="radio"
              name="thumbs_up"
              id="thumbsDown"
              className="appearance-none opacity-0 peer"
              value="false"
              required={true}
            />
            <label
              htmlFor="thumbsDown"
              className="p-2 text-5xl opacity-50 saturate-50 peer-checked:opacity-100 peer-checked:saturate-100 hover:opacity-60"
            >
              👎
            </label>
          </div>

          <div className="inline">
            <input
              onChange={handleThumbsUp}
              type="radio"
              name="thumbs_up"
              id="thumbsUp"
              className="m-0 h-0 w-0 appearance-none opacity-0 peer"
              value="true"
              required={true}
            />
            <label
              htmlFor="thumbsUp"
              className="relative bottom-1 p-2 text-5xl saturate-50 opacity-50 peer-checked:opacity-100 peer-checked:saturate-100 hover:opacity-60"
            >
              👍
            </label>
          </div>
        </div>
      </fieldset>
      <SubmitButton onClick={(e) => handleSubmitReview(e)}>
        <SubmitIcon />
      </SubmitButton>
    </form>
  );
};

export default BookSearch;
