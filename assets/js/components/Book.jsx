import React, { useState } from "react";

import AddReview from "./AddReview";

function Book({ result, handleSearch }) {
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const title = result.volumeInfo.title;
  const authors = result.volumeInfo.authors;
  const imageThumbnail = result.volumeInfo.imageLinks;

  return (
    <li className="flex flex-row bg-gray-600 w-full hover:bg-gray-200 p-4 relative text-left">
      <img
        src={
          imageThumbnail === undefined
            ? "https://via.placeholder.com/128x192.png?text=No+Cover"
            : imageThumbnail.thumbnail
        }
        alt={`Cover of ${title} by ${authors}`}
        className="w-16 relative h-auto pr-4"
      />
      {isReviewVisible && (
        <AddReview
          bookId={result.id}
          isReviewVisible={isReviewVisible}
          setIsReviewVisible={setIsReviewVisible}
        />
      )}
      <div>
        <h1 className="text-blue-500 ">{title}</h1>
        <h2 className="text-purple-500 ">{authors}</h2>
        <button
          className="border-2 border-white "
          onClick={() => setIsReviewVisible(true)}
        >
          Review
        </button>
      </div>
    </li>
  );
}

export default Book;
