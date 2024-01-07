import React, { useState } from "react";

import AddReview from "./AddReview";

function Book({ result, handleSearch }) {
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  const title = result.volumeInfo.title;
  const authors = result.volumeInfo.authors;
  const imageThumbnail = result.volumeInfo.imageLinks;

  return (
    <li className="flex flex-row hover:bg-gray-200 p-4 cursor-pointer relative">
      {isReviewVisible && (
        <AddReview
          bookId={result.id}
          isReviewVisible={isReviewVisible}
          setIsReviewVisible={setIsReviewVisible}
        />
      )}
      <img
        src={
          imageThumbnail === undefined
            ? "https://via.placeholder.com/128x192.png?text=No+Cover"
            : imageThumbnail.thumbnail
        }
        alt={`Cover of ${title} by ${authors}`}
        className="w-1/8"
      />
      <div>
        <h1 className="text-blue-500 text-left">{title}</h1>
        <h2 className="text-purple-500 text-left">{authors}</h2>
        <button
          className="border-2 border-white"
          onClick={() => setIsReviewVisible(true)}
        >
          Review
        </button>
      </div>
    </li>
  );
}

export default Book;
