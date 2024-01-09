import React from "react";

import Book from "./Book";

function BookResults({ results, handleSearch }) {
  return (
    <ul className="grid grid-cols-1  gap-4">
      {results.map((result) => {
        return (
          <Book
            result={result}
            key={result.id}
            handleSearch={handleSearch}
          />
        );
      })}
    </ul>
  );
}

export default BookResults;
