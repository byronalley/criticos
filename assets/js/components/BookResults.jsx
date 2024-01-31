import React from "react";

import Book from "./Book";

function BookResults({
  results,
  handleSearch,
  setBookName,
  setAuthor,
  setBookId,
  bookId,
}) {
  return (
    <div className="flex lg:flex-row w-full lg:w-1/2 self-end gap-4 p-6 mx-auto overflow-x-auto cursor-pointer opacity-100 translate-x-0 ">
      {results.map((result) => {
        return (
          <div className="flex-shrink-0" key={result.id}>
            <Book
              result={result}
              handleSearch={handleSearch}
              setAuthor={setAuthor}
              setBookName={setBookName}
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
