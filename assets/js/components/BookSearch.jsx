import React, { useState } from "react";

import Book from "./Book";

const BookSearch = ({
  bookName,
  author,
  handleBookInputChange,
  handleAuthorInputChange,
  handleSearch,
}) => {
  return (
    <form className="w-full">
      <input
        className="w-full mb-2"
        type="text"
        placeholder="Search by title..."
        value={bookName}
        onChange={handleBookInputChange}
      />
      <input
        className="w-full mt-2"
        type="text"
        placeholder="Search by author..."
        value={author}
        onChange={handleAuthorInputChange}
      />
      <br />
      <button
        onClick={handleSearch}
        className="inline-block w-full mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
};

export default BookSearch;
