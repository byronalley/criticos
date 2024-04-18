import React from "react";

const defaultThumbnail = "images/white-square.gif";

function Review({ review, book }) {
  return (
    <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden border-slate-600 border-1 text-slate-200 bg-zinc-50">
      {/* Book and Rating */}
      <div className="flex">
        <div className="w-56 h-64 mb-6 p-2">
          <img
            src={book?.thumbnail || defaultThumbnail}
            alt={`Cover of ${book?.title} by ${book?.author}`}
            className="w-52 h-full mt-4 object-contain object-center border-1 border-red-500"
          />
        </div>

        {/* Thumb Up or Thumb Down */}
        <div className="flex items-center justify-center">
          <p className="text-5xl text-500-blue">
            {review.thumbs_up ? "👍" : "👎"}
          </p>
        </div>
      </div>

      {/* Book Info and Review */}
      <div className="flex flex-col justify-center lg:w-1/2 p-6">
        <h4 className="text-xl font-semibold text-indigo-950 mb-2 content-start">
          {book?.title || "Title Unknown"}
        </h4>
        <p className="text-slate-700 mb-4">
          {book?.author || "Author Unknown"}
        </p>
        <div className="bg-zinc-50 px-4 py-2 rounded-md mb-4">
          <p className="text-xl text-slate-700">
            <span className="text-5xl font-serif relative top-2 right-2">
              &ldquo;
            </span>
            {review.content}
            <span className="text-5xl font-serif mt-5 relative top-2 left-4">
              &rdquo;
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Review;
