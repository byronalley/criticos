import React, { useState } from "react";

const BookSearch = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");

  const handleBookInputChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorInputChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${bookName}+inauthor:${author}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data from Google Books API", error);
    }
  };

  return (
    <div className="px-4 container mx-auto">
      <span className="w-full py-2">
        <input
          className="w-1/2"
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={handleBookInputChange}
        />
        <input
          className="w-1/2"
          type="text"
          placeholder="Author"
          value={author}
          onChange={handleAuthorInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </span>
    </div>
  );
};

export default BookSearch;
