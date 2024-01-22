import React from "react";

function Input({ value, onChange, placeholder, isHidden, multiline }) {
  return multiline ? (
    <textarea
      className={` w-full  bg-gray-800 text-white px-6 py-3 rounded`}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ) : (
    <input
      className={`$ w-full  bg-gray-800 text-white px-6 py-3 rounded`}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
