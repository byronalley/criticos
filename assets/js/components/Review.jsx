import React from "react";

import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const defaultThumbnail = "images/white-square.gif";

function Review({ review, book }) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border-slate-600 border-1 shadow-sm text-slate-700 bg-zinc-50">
    <p className="text-xl font-medium italic px-9 pt-5 pb-2"><span className="font-bold">{review.username}</span> {review.thumbs_up ? 'recommends' : 'does not recommend'}:</p>
    <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden text-slate-200 bg-zinc-50">
      {/* Book and Thumbnail */}
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
          <p className="text-5xl text-red-800">
            {review.thumbs_up ? (
              <HandThumbUpIcon className="w-24 text-gray-500" />
            ) : (
              <HandThumbDownIcon className="w-24 text-gray-500" />
            )}
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
        <div className="flex bg-zinc-50 text-slate-400 px-4 py-2 rounded-md mb-4">
          <div className="text-5xl font-serif relative right-3 inline-block">
            &ldquo;
          </div>
          <div className="text-xl text-slate-700 inline-block">
            {review.content}
          </div>
          <div className="text-5xl font-serif mt-0 relative left-2 inline-block">
            &rdquo;
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Review;
