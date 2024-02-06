import React, { useState, useEffect } from "react";

import Review from "./components/Review";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/web_api/reviews")
      .then((res) => res.json())
      .then(({ data: reviewData }) => {
        setReviews(reviewData);

        const googleVolumeIds = new Set(
          reviewData
            .filter(({ google_volume_id }) => google_volume_id)
            .map((book) => book.google_volume_id),
        );

        Promise.all(
          [...googleVolumeIds].map((id) => {
            if (!id) throw new Error("id was null");

            return fetch(
              `https://www.googleapis.com/books/v1/volumes/${id}`,
            ).then((res) => res.json());
          }),
        )
          .then((responses) => {
            const books = Object.fromEntries(
              responses.map((book) => [
                book.id,
                {
                  id: book.id,
                  title: book.volumeInfo.title,
                  author: book.volumeInfo.authors.join(", "),
                },
              ]),
            );

            setBooks(books);
          })
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
