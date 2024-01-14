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
    <form className=" w-full fixed absolute bg-gray-800 p-6 ">
      <div className="flex ">
        <input
          className="w-full mb-2 bg-gray-800 text-white px-6 py-3 rounded"
          type="text"
          placeholder="By title..."
          value={bookName}
          onChange={handleBookInputChange}
        />
        <input
          className="w-full mb-2 bg-gray-800 text-white px-6 py-3 rounded"
          type="text"
          placeholder="By author..."
          value={author}
          onChange={handleAuthorInputChange}
        />
        <br />
      </div>
      <Button
        variant="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
    </form>
  );
};

export default BookSearch;
