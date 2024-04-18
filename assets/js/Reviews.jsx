import React from "react";

import Review from "./components/Review";

export default function Reviews({ reviews, books }) {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 mt-6">
        {reviews.map((review, index) => (
          <Review
            review={review}
            book={books[review.google_volume_id]}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
