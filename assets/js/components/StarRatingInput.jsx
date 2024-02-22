import React, { useState } from "react";

const StarRatingInput = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          className="cursor-pointer text-2xl"
          title={`${star} star`}
        >
          <input
            type="radio"
            name="rating"
            value={star}
            onChange={() => handleRatingChange(star)}
            checked={rating === star}
            className="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-6 h-6 ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </label>
      ))}
    </div>
  );
};

export default StarRatingInput;
