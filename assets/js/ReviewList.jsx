import React, { useState, useEffect } from "react";

import ReviewItem from "./ReviewItem";

function ReviewsList({ book }) {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);
  const [image, setImage] = useState([]);
  const [updatedBooks, setUpdatedBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resReviews = await fetch("/web_api/reviews");
        const dataReviews = await resReviews.json();
        setReviews(dataReviews.data);

        const resBooks = await fetch("http://localhost:4000/web_api/books");
        const dataBooks = await resBooks.json();
        setBooks(dataBooks.data);

        const resImages = await fetch("http://localhost:4000/web_api/images");
        const dataImages = await resImages.json();
        setImage(dataImages.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (books.length && reviews.length) {
      const newUpdatedBooks = books.map((book) => {
        book.reviews = reviews.filter((review) => book.id === review.book_id);
        return book;
      });
      setUpdatedBooks(newUpdatedBooks);
    }
  }, [books, reviews]);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold txt-gray-800">
          Latest Book Reviews
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 gap-8 mt-6">
          {updatedBooks.map((book, index) => (
            <div
              key={book.id}
              className="card  xs:mx-4  "
            >
              <div className="card-inner shadow-lg">
                <div
                  className="card-front grid grid-cols-2 gap-2 bg-gray-500 p-6
        shadow-[0_0_10px_2px_cyan]"
                >
                  <img
                    src={image[index]?.url}
                    alt={image[index]?.filename}
                    className=" w-full h-full object-contain "
                  />

                  <div>
                    <p className="text-white font-semibold text-left">
                      {book.reviews && book.reviews.length > 0
                        ? Array(book.reviews[0].rating).fill("⭐").join("")
                        : "No reviews yet"}
                    </p>
                    <p className="inline-block mt-4 text-white text-left">
                      "
                      {book.reviews && book.reviews.length > 0
                        ? book.reviews[0].content
                        : "No reviews yet"}
                      "
                    </p>
                  </div>
                </div>
                <div className="card-back  px-4 py-2 shadow-[0_0_20px_2px_cyan]">
                  <h4 className="text-xl font-semibold text-500-blue ">
                    {book.title}
                  </h4>

                  <p className="inline-block text-500-blue">{book.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsList;
