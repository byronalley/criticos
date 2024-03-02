import React from "react";

export default function SubmitButton({ variant, onClick }) {
  const style =
    "font-bold py-2 px-4 rounded-full w-full lg:w-1/4 m-0 bg-white hover:bg-blue-500 text-black hover:text-white";

  return (
    <button className={style} onClick={onClick}>
      <span>Post</span>
    </button>
  );
}
