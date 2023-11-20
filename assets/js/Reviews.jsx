import React, { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/web_api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
        console.log(reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/web_api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleReview() {
    //map through books
    books.map((book) => {
      //initialize reviews as an array
      book.reviews = [];
      //map through reviews
      reviews.map((review) => {
        if (book.id === review.book_id) {
          //push the review to the reviews array of the book
          book.reviews.push(review);
        }
      });
    });
  }

  //add reviews properties to books array

  handleReview();

  return (
    <section className="py-12 bg-black">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold text-cyan">
          Latest Book Reviews
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 mx-2 ">
          {books.map((book) => (
            <div className="card  xs:mx-4 ">
              <div className="card-inner shadow-lg">
                <div
                  className="card-front bg-black p-6
                shadow-[0_0_10px_2px_cyan]
               "
                >
                  {" "}
                  {/* <img
                    src="images/white-square.gif"
                    alt="Book Title"
                    className="w-full h-48 object-cover"
                  /> */}
                  <h4 className="text-xl font-semibold text-cyan">
                    {book.title}
                  </h4>
                  <p className="text-cyan mt-2 mb-3">Author Name</p>
                  <p className="inline-block text-500-blue">{book.summary}</p>
                </div>

                <div className="card-back  px-4 py-2 shadow-[0_0_20px_2px_cyan]">
                  <p className="text-black font-semibold font-twobit">
                    Rating:{" "}
                    {book.reviews.length > 0
                      ? book.reviews[0].rating
                      : "No reviews yet"}
                  </p>
                  <p className="inline-block mt-4 text-500-blue">
                    {book.reviews.length > 0
                      ? book.reviews[0].content
                      : "No reviews yet"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
