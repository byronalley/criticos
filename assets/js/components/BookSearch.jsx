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
    <form className=" w-full fixed  bg-gray-800 p-6 z-10">
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
        <br />
      </div>
      <Input
        placeholder={"Review..."}
        onChange={handleInputChange}
        isHidden={true}
      />
      <Button
        variant="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
    </form>
  );
};

export default BookSearch;
