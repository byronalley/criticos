import React, { useState } from "react";

import { BeakerIcon } from "@heroicons/react/solid";

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

  const handleHiddenChange = (event) => {
    setIsHidden(true);
  };

  return (
    <form className="p-4 w-full lg:w-1/2   bg-gray-800 p-6 z-10">
      <h1 className="text-4xl bg-gray-800 text-white font-semibold animate-flip-up animate-ease-out">
        Find a book leave a review
      </h1>

      <div className="flex ">
        <Input
          placeholder={bookName === "" ? "By title..." : bookName}
          value={bookName}
          onChange={handleBookInputChange}
          isHidden={isHidden}
        ></Input>
        <Input
          placeholder={author === "" ? "By author..." : author}
          value={author}
          onChange={handleAuthorInputChange}
          isHidden={isHidden}
        />
        <Button
          variant="secondary"
          onClick={handleSearch}
          isHidden={isHidden}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Button>
        <br />
      </div>
      <div className="flex">
        <Input
          placeholder={"Review..."}
          onChange={handleHiddenChange}
          isHidden={true}
          multiline={true}
        />
        <Button
          variant="primary"
          isHidden={isHidden}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </Button>
      </div>
    </form>
  );
};

export default BookSearch;
