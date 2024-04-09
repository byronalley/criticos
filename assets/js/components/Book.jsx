import React from "react";

const placeholder = "https://via.placeholder.com/128x192.png?text=No+Cover";

function Book({
  book,
  setAuthor,
  setBookName,
  setBookId,
  setResults,
  setThumbnail,
}) {
  const id = book.id;
  const title = book.title;
  const authors = book.authors;
  const thumbnail = book.thumbnail || placeholder;

  return (
    <div
      className="flex relative bg-gray-800 w-full h-500 p-4 text-left min-w-400 h-full min-w-400 h-[200px] "
      onClick={() => {
        setAuthor(authors);
        setBookName(title);
        setThumbnail(thumbnail);
        setResults([]);
        setBookId(id);
      }}
    >
      <div className="w-32 h-48 hover:opacity-20">
        <img
          src={thumbnail}
          alt={`Cover of ${title} by ${authors}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col justify-center items-start ml-4 "></div>
    </div>
  );
}

export default Book;
