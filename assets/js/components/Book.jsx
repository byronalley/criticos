import React, { useState } from "react";

import AddReview from "./AddReview";
import Button from "./Button";

function Book({ result, handleSearch }) {
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const title = result.volumeInfo.title;
  const authors = result.volumeInfo.authors;
  const imageThumbnail = result.volumeInfo.imageLinks;

  return (
    <li
      className="flex flex-row relative 
    bg-gray-600 w-full  p-4  text-left"
    >
      <img
        src={
          imageThumbnail === undefined
            ? "https://via.placeholder.com/128x192.png?text=No+Cover"
            : imageThumbnail.thumbnail
        }
        alt={`Cover of ${title} by ${authors}`}
        className="w-32 relative h-full pr-4"
      />
      <div>
        <h1 className="text-grey-800 ">{title}</h1>
        <h2 className="text-grey-500 ">{authors}</h2>
        <Button
          key={result.id}
          variant="secondary"
          onClick={() => setIsReviewVisible(true)}
        >
          Review
        </Button>
      </div>
      {isReviewVisible && (
        <AddReview
          bookId={result.id}
          isReviewVisible={isReviewVisible}
          setIsReviewVisible={setIsReviewVisible}
        />
      )}
    </li>
  );
}

export default Book;
