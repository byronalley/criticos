import React from "react";

import Review from "./components/Review";

export default function Reviews({ reviews, books }) {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {reviews.map((review, index) => (
            <Review
              review={review}
              book={books[review.google_volume_id]}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
