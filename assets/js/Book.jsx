import React from "react";

function Book({ result, index }) {
  return (
    <li key={index}>
      <h1 className="text-blue-500">{result.volumeInfo.title}</h1>
      <img
        src={result.volumeInfo.imageLinks.smallThumbnail}
        alt=""
      />
      <h2 className="text-purple-500">{result.volumeInfo.authors}</h2>
    </li>
  );
}

export default Book;
