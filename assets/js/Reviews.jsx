import React, { useState, useEffect } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/web_api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
        ;
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

  useEffect(() => {
    fetch("http://localhost:4000/web_api/images")
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data);
      })
      .catch((err) => console.log(err));
  }, [      
]);

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
 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 mt-6 mx-2 ">
          {books.map((book, index) => (
            <div className="card  xs:mx-4  ">
              <div className="card-inner shadow-lg">
                <div
                  className="card-front grid grid-cols-2 gap-2 bg-black p-6
                shadow-[0_0_10px_2px_cyan] 
               "
                >
                  <img
                    src={image[index]?.url}
                    alt={image[index]?.filename}
                    className=" w-full h-full object-contain "
                  />
                 
              <div>
                  <p className="text-white font-semibold text-left">
                    
                    {book.reviews.length > 0
                      ?  Array(book.reviews[0].rating).fill('⭐').join('')
                      : "No reviews yet"}
                       
                  </p>
                  <p className="inline-block mt-4 text-white text-left">
                   "{book.reviews.length > 0
                      ? book.reviews[0].content
                      : "No reviews yet"}"
                  </p>
                </div>
                </div>
                <div className="card-back  px-4 py-2 shadow-[0_0_20px_2px_cyan]">
                      <h4 className="text-xl font-semibold text-500-blue ">
                        {book.title}
                     
                      </h4>

                  <p className="inline-block text-500-blue">
                  {book.summary}
                
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
