import React from "react";

import Book from "./Book";

function BookResults({
  results,
  handleSearch,
  isResultsVisible,
  setIsResultsVisible,
}) {
  return (
    <div
      className={`flex flex-row w-full lg:w-1/2 self-end  
     bg-gray-400 gap-4 p-2  mx-auto  overflow-x-auto ${
       isResultsVisible
         ? "opacity-100 translate-y-0"
         : "opacity-0 -translate-y-0"
     }`}
    >
      <div
        onClick={() => {
          setIsResultsVisible(false);
        }}
        className="cursor-pointer text-2xl text-white font-bold col-span-3 text-right"
      >
        X
      </div>
      {results.map((result) => {
        return (
          <Book
            result={result}
            key={result.id}
            handleSearch={handleSearch}
          />
        );
      })}
    </div>
  );
}

export default BookResults;
