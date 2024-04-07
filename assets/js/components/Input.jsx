import React from "react";

function Input({
  value,
  onChange,
  placeholder,
  isHidden,
  multiline,
  maxLength,
  id,
}) {
  return multiline ? (
    <textarea
      className={` w-full  bg-gray-800 text-white px-6 py-3 rounded`}
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      required={true}
    />
  ) : (
    <input
      className={`$ w-full  bg-gray-800 text-white px-6 py-3 rounded`}
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
