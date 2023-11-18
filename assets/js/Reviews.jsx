import React, { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/web_api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
        console.log(reviews);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold txt-gray-800">
          Latest Book Reviews
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {reviews.map((book) => (
            <div className="bg-blue-500 rounded-lg shadow-lg overflow-hidden">
              <img
                src="images/white-square.gif"
                alt="Book Title"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold text-white">Book Title</h4>
                <p className="text-white mt-2 mb-3">Author Name</p>
                <div className="bg-white px-4 py-2 rounded-md">
                  <p className="text-black font-semibold">
                    Rating: {book.rating}
                  </p>

                  <p className="inline-block mt-4  text-500-blue ">
                    {book.content}
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
