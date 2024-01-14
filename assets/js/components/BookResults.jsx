import React from "react";

import Book from "./Book";

function BookResults({ results, handleSearch }) {
  return (
    <ul className="grid grid-cols-1  gap-4">
      <h1 className="text-4xl  font-semibold mb-8 animate-flip-down animate-delay-500 animate-ease-out ">
        Leave a review...
      </h1>
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
