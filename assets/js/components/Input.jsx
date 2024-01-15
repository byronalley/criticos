import React from "react";

function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="w-full mb-2 bg-gray-800 text-white px-6 py-3 rounded"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
