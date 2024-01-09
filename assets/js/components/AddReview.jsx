import React, { useState } from "react";
import Button from "./Button";

function AddReview({ bookId, setIsReviewVisible, isReviewVisible }) {
  const [review, setReview] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/web_api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id: bookId, content: review }),
    });

    if (!response.ok) {
      console.error("Failed to create review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-3/4 w-full absolute bottom-0 bg-gray-800 right-0 h-auto text-gray-900 p-4 m-0 sm:m-2 rounded shadow-lg flex"
    >
      <Button
        variant="noStyle"
        onClick={() => setIsReviewVisible(false)}
      >
        X
      </Button>
      <textarea
        className="w-full h-full bg-grey-800  rounded shadow-lg"
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <Button
        variant="secondary"
        type="submit"
      >
        Post
      </Button>
    </form>
  );
}

export default AddReview;
