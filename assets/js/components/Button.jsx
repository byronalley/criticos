import React from "react";

export default function Button({ children, variant, onClick, isHidden }) {
  const baseStyle = ` font-bold py-2 px-4 rounded w-auto m-0`;
  const primaryStyle =
    "bg-white hover:bg-blue-500 text-black hover:text-white  ";
  const secondaryStyle =
    "border-2 border-white bg-transparent hover:bg-white hover:text-gray-700 text-white";
  const noStyle = "bg-transparent hover:bg-transparent text-white";

  const buttonStyle =
    variant === "primary"
      ? primaryStyle
      : variant === "secondary"
      ? secondaryStyle
      : noStyle;

  return (
    <button
      className={`${baseStyle} ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
