import React, { useState } from "react";

import AddReview from "./AddReview";
import Button from "./Button";

function Book({ result, handleSearch }) {
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const title = result.volumeInfo.title;
  const authors = result.volumeInfo.authors;
  const imageThumbnail = result.volumeInfo.imageLinks;

  return (
    <div
      className="flex flex-row relative 
    bg-gray-600 w-full  p-4  text-left min-w-400 h-full"
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
        <h1 className="text-white ">{title}</h1>
        <h2 className="text-white ">{authors}</h2>
        {/* {!isReviewVisible && (
          <Button
            key={result.id}
            variant="secondary"
            onClick={() => setIsReviewVisible(true)}
          >
            Review
          </Button>
        )} */}
      </div>
      {isReviewVisible && (
        <AddReview
          bookId={result.id}
          isReviewVisible={isReviewVisible}
          setIsReviewVisible={setIsReviewVisible}
        />
      )}
    </div>
  );
}

export default Book;
