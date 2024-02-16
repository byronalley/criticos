import React, { useState, useEffect } from "react";
import { fetchGoogleVolumes } from "./lib/BookAPI";
import { fetchReviews } from "./lib/ReviewAPI";

import Review from "./components/Review";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchReviews().then((reviewData) => {
      setReviews(reviewData);

      const googleVolumeIds = new Set(
        reviewData
          .filter(({ google_volume_id }) => google_volume_id)
          .map((book) => book.google_volume_id),
      );

      fetchGoogleVolumes(googleVolumeIds)
        .then((books) => setBooks(books))
        .catch((err) => console.error(err));
    });
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {reviews.map((review, index) => (
            <Review
              review={review}
              book={books[review.google_volume_id]}
              key={index}
              isEditable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
