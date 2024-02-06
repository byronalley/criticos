import React from "react";

import Input from "./Input";

function Review({
  review,
  book,
  isEditable,
  handleBookInputChange,
  handleAuthorInputChange,
}) {
  return (
    <div className="bg-blue-500 rounded-lg shadow-lg overflow-hidden">
      <img
        src="images/white-square.gif"
        alt="Book Title"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h4 className="text-xl font-semibold text-white">
          {isEditable ? (
            <Input
              value={book?.title}
              onChange={handleBookInputChange}
              placeholder={"Title"}
            />
          ) : (
            book?.title || "Title Unknown"
          )}
        </h4>
        <p className="text-white mt-2 mb-3">
          {isEditable ? (
            <Input
              value={book?.author}
              onChange={handleAuthorInputChange}
              placeholder={"Author"}
            />
          ) : (
            book?.author || "Author Unknown"
          )}
        </p>
        <div className="bg-white px-4 py-2 rounded-md">
          <p className="text-black font-semibold">Rating: {review.rating}</p>

          <p className="inline-block mt-4  text-500-blue ">{review.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
