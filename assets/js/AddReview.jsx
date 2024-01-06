import React, { useState } from "react";

function AddReview({ bookId }) {
  const [review, setReview] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/web_api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id: bookId, contnent: review }),
    });

    if (!response.ok) {
      console.error("Failed to create review");
    }
  };

  return (
    <form
      onSubmit={() => handleSubmit}
      className="absolute bg-white p-4 rounded shadow-lg"
    >
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></input>
      <button type="submit">Post</button>
    </form>
  );
}

export default AddReview;
