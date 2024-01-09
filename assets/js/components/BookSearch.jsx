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
    <form className="w-full lg:sticky">
      <input
        className="w-full mb-2 bg-gray-800 text-white px-6 py-3 rounded-full"
        type="text"
        placeholder="Search by title..."
        value={bookName}
        onChange={handleBookInputChange}
      />
      <input
        className="w-full mb-2 bg-gray-800 text-white px-6 py-3 rounded-full"
        type="text"
        placeholder="Search by author..."
        value={author}
        onChange={handleAuthorInputChange}
      />
      <br />
      <Button
        variant="primary"
        onClick={handleSearch}
        className="w-full mt-4"
      >
        Search
      </Button>
    </form>
  );
};

export default BookSearch;
