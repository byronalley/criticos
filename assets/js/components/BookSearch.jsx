import React, { useState } from "react";

import Button from "./Button";

const BookSearch = ({
  bookName,
  author,
  handleBookInputChange,
  handleAuthorInputChange,
  handleSearch,
}) => {
  return (
    <form className="w-1/3 fixed">
      <h1 className="text-4xl mb-8 font-semibold animate-flip-up animate-ease-out">
        Find a book
      </h1>
      <input
        className="w-full mb-2 bg-gray-800 text-white px-6 py-3 rounded"
        type="text"
        placeholder="Search by title..."
        value={bookName}
        onChange={handleBookInputChange}
      />
      <input
        className="w-full mb-2 bg-gray-800 text-white px-6 py-3 rounded"
        type="text"
        placeholder="Search by author..."
        value={author}
        onChange={handleAuthorInputChange}
      />
      <br />
      <Button
        variant="primary"
        onClick={handleSearch}
        className=" mt-4"
      >
        Search
      </Button>
    </form>
  );
};

export default BookSearch;
