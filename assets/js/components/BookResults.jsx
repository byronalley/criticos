import React from "react";

import Book from "./Book";

function BookResults({ results, handleSearch }) {
  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
