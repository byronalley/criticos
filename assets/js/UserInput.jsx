import React from "react";

function UserInput() {
  return (
    <form
      className="py-12
    px-4 container mx-auto"
    >
      <span className="w-full py-2">
        <input
          className="w-1/2"
          type="text"
          placeholder="Book Name"
        />
        <input
          className="w-1/2"
          type="text"
          placeholder="Author"
        />
      </span>
      <br />
      <input
        type="text"
        placeholder="Review"
        className="w-full"
        maxLength={160}
      />
      <button
        class="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default UserInput;
