import React from "react";

import Book from "./Book";

function BookResults({
  results,
  setResults,
  handleSearch,
  setBookName,
  setAuthor,
  setThumbnail,
  setBookId,
  bookId,
}) {
  return (
    <div className="flex lg:flex-row lg:ml-2 mt-2 w-full self-end gap-4 mx-auto overflow-x-auto cursor-pointer opacity-100 translate-x-0 ">
      {results.map((book) => {
        return (
          <div className="flex-shrink-0" key={book.id}>
            <Book
              book={book}
              handleSearch={handleSearch}
              setResults={setResults}
              setAuthor={setAuthor}
              setBookName={setBookName}
              setThumbnail={setThumbnail}
              setBookId={setBookId}
              bookId={bookId}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BookResults;
