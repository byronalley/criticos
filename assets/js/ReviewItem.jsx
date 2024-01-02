import React, { useState, useEffect } from "react";

function ReviewItem({ books }) {
  // return (
  //   <div className="card  xs:mx-4  ">
  //     <div className="card-inner shadow-lg">
  //       <div
  //         className="card-front grid grid-cols-2 gap-2 bg-black p-6
  //     shadow-[0_0_10px_2px_cyan]
  //    "
  //       >
  //         <img
  //           src={image[index]?.url}
  //           alt={image[index]?.filename}
  //           className=" w-full h-full object-contain "
  //         />
  //         <div>
  //           <p className="text-white font-semibold text-left">
  //             {book.reviews.length > 0
  //               ? Array(book.reviews[0].rating).fill("⭐").join("")
  //               : "No reviews yet"}
  //           </p>
  //           <p className="inline-block mt-4 text-white text-left">
  //             "
  //             {book.reviews.length > 0
  //               ? book.reviews[0].content
  //               : "No reviews yet"}
  //             "
  //           </p>
  //         </div>
  //       </div>
  //       <div className="card-back  px-4 py-2 shadow-[0_0_20px_2px_cyan]">
  //         <h4 className="text-xl font-semibold text-500-blue ">{book.title}</h4>
  //         <p className="inline-block text-500-blue">{book.summary}</p>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default ReviewItem;
