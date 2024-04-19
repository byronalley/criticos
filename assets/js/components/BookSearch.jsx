import React, { useState } from "react";

import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

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
    <form className="mx-auto p-6 w-full max-w-4xl rounded-lg space-y-1 bg-gray-800">
      <fieldset className="flex lg:flex-row space-x-2">
        {thumbnail ? (
          <img className="h-24 w-16 max-w-16" src={thumbnail || placeholder} />
        ) : (
          ""
        )}
        <div className="w-full">
          <div className="flex">
            <Input
              placeholder="Search by Title..."
              value={bookName}
              onChange={handleBookInputChange}
              id="titleSearch"
            ></Input>
          </div>
          <div className="flex space-x-1">
            <Input
              placeholder="Search by Author..."
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

      <fieldset className="flex flex-col mt-0 lg:flex-row space-y-0 gap-x-10 gap-y-0 p-0 items-center">
        <span className="bold text-2xl my-0 py-0 px-2">Rate this title:</span>
        <div className="mt-0 w-full lg:w-3/4">
          <div className="inline-block mx-2 relative top-2">
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
              className="px-4 py-0 text-xs opacity-50 saturate-50 peer-checked:opacity-100 peer-checked:saturate-100 hover:opacity-60"
            >
              <HandThumbDownIcon className="w-16 text-ivory-500" />
            </label>
          </div>

          <div className="inline-block mx-2 relative top-3">
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
              className="relative bottom-1 px-4 py-0 text-xs saturate-50 opacity-50 peer-checked:opacity-100 peer-checked:saturate-100 hover:opacity-60"
            >
              <HandThumbUpIcon className="w-16 text-ivory-500" />
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
