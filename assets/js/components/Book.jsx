import React from "react";

function Book({ result, handleSearch, setAuthor, setBookName, setBookId }) {
  const id = result.id;
  const title = result.volumeInfo.title;
  const authors = result.volumeInfo.authors;

  const imageThumbnail =
    result.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") ||
    "https://via.placeholder.com/128x192.png?text=No+Cover";

  return (
    <div
      className="flex relative 
    bg-gray-800 w-full h-500 p-4  text-left min-w-400 h-full min-w-400 h-[200px]  "
      onClick={() => {
        setAuthor(authors), setBookName(title);
        setBookId(id);
      }}
    >
      <div className="w-32 h-48 hover:opacity-20">
        <img
          src={imageThumbnail}
          alt={`Cover of ${title} by ${authors}`}
          className="w-full h-full object-cover object-center  "
        />
      </div>
      <div className="flex flex-col justify-center items-start ml-4 ">
        {/* <h1 className="text-white ">{title}</h1>
        <h2 className="text-white ">{authors}</h2> */}
      </div>
    </div>
  );
}

export default Book;
