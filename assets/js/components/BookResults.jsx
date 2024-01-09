import React from "react";

import Book from "./Book";

function BookResults({ results, handleSearch }) {
  return (
    <div>
      <h2 className="text-4xl mb-8 animate-flip-down animate-delay-500 animate-ease-out ">
        Leave a review...
      </h2>
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
    </div>
  );
}

export default BookResults;