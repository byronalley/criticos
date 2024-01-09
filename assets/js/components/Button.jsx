import React from "react";

export default function Button({ children, variant, onClick }) {
  const baseStyle = "font-bold py-2 px-4 rounded";
  const primaryStyle = "bg-blue-500 hover:bg-blue-700 text-white";
  const secondaryStyle =
    "border-2 border-white bg-transparent hover:bg-white hover:text-gray-700 text-white";

  const buttonStyle = variant === "primary" ? primaryStyle : secondaryStyle;

  return (
    <button
      className={`${baseStyle} ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
