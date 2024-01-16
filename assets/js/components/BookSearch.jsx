import React, { useState } from "react";

import Input from "./Input";
import Button from "./Button";

const BookSearch = ({
  bookName,
  author,
  setAuthor,
  setBookName,
  handleBookInputChange,
  handleAuthorInputChange,
  handleSearch,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const handleInputChange = (event) => {
    setIsHidden(true);
  };

  return (
    <form className=" w-full md:w-1/2 fixed  bg-gray-800 p-6 z-10">
      <h1 className="text-4xl bg-gray-800 text-white font-semibold animate-flip-up animate-ease-out">
        Find a book leave a review
      </h1>
      <div className="flex ">
        <Input
          placeholder={"By title..."}
          value={bookName}
          onChange={handleBookInputChange}
          isHidden={isHidden}
        ></Input>
        <Input
          placeholder={"By author..."}
          value={author}
          onChange={handleAuthorInputChange}
          isHidden={isHidden}
        />
        <Button
          variant="secondary"
          onClick={handleSearch}
          isHidden={isHidden}
        >
          Search
        </Button>
        <br />
      </div>
      <div className="flex">
        <Input
          placeholder={"Review..."}
          onChange={handleInputChange}
          isHidden={true}
        />
        <Button
          variant="primary"
          isHidden={isHidden}
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default BookSearch;
