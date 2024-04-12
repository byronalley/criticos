import React from "react";

const defaultThumbnail = "images/white-square.gif";

function Review({ review, book }) {
  return (
    <div className="bg-blue-500 rounded-lg shadow-lg overflow-hidden">
      <div className="w-full h-64">
        <img
          src={book?.thumbnail || defaultThumbnail}
          alt={`Cover of ${book?.title} by ${book?.author}`}
          className="w-full h-full mt-4 object-contain object-center"
        />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-semibold text-white">
          {book?.title || "Title Unknown"}
        </h4>
        <p className="text-white mt-2 mb-3">
          {book?.author || "Author Unknown"}
        </p>
        <div className="bg-white px-4 py-2 rounded-md">
          <p className="text-black font-semibold">
            Rating: {review.thumbs_up ? "👍" : "👎"}{" "}
          </p>

          <p className="inline-block mt-4  text-500-blue ">{review.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Review;
