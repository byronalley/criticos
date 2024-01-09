import React, { useState } from "react";

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
      className="w-3/4 absolute right-0 h-auto bg-grey-800 p-4 rounded shadow-lg flex"
    >
      <input
        className="w-full h-full bg-grey-800 p-4 rounded shadow-lg"
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></input>
      <div>
        <button onClick={() => setIsReviewVisible(false)}>X</button>
        <br />
        <button type="submit">Post</button>
      </div>
    </form>
  );
}

export default AddReview;
