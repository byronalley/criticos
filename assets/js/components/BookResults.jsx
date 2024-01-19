import React from "react";

import Book from "./Book";

function BookResults({
  results,
  handleSearch,
  isResultsVisible,
  setIsResultsVisible,
  setBookName,
  setAuthor,
  setBookId,
}) {
  return (
    <div
      className={`flex lg:flex-row w-full lg:w-1/2  self-end  
     bg-gray-400 gap-4 p-2  mx-auto overflow-x-auto cursor-pointer  ${
       isResultsVisible
         ? "opacity-100 translate-x-0"
         : "opacity-0 -translate-x-0"
     }`}
    >
      {/* <div
        onClick={() => {
          setIsResultsVisible(false);
        }}
        className="cursor-pointer  text-2xl text-white font-bold col-span-3 text-right"
      >
        X
      </div> */}
      {results.map((result) => {
        return (
          <div className="flex-shrink-0">
            <Book
              result={result}
              key={result.id}
              handleSearch={handleSearch}
              setAuthor={setAuthor}
              setBookName={setBookName}
              setBookId={setBookId}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BookResults;
