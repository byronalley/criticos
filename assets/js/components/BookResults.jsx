import React from "react";

import Book from "./Book";

function BookResults({
  results,
  handleSearch,
  isResultsVisible,
  setIsResultsVisible,
}) {
  return (
    <ul
      className={`grid w-3/4 grid-cols-1 relative
       bg-gray-400 mx-auto gap-4 p-2 flex flex-column mx-auto transition-all rounded duration-500 ease-in-out ${
         isResultsVisible
           ? "opacity-100 translate-y-0"
           : "opacity-0 -translate-y-10"
       }`}
    >
      <li
        onClick={() => {
          setIsResultsVisible(false);
        }}
      >
        X
      </li>
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
