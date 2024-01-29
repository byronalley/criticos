import React from "react";

export default function Welcome() {
  return (
    <header className="bg-gray-800 text-white p-12 ">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold animate-flip-up animate-ease-out">
          Discover and Share Your Favorite Books
        </h2>

        <p className="text-lg mt-4 animate-flip-down animate-delay-500 animate-ease-out">
          Join our community of book lovers and start sharing your reviews
          today.
        </p>
        <a
          href="/users/register"
          className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}
