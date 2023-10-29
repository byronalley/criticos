import { useState, useEffect } from "react";

export default function Home() {
  return (
    <>
      <header className="bg-gray-800 text-white p-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold">
            Discover and Share Your Favorite Books
          </h2>
          <p className="text-lg mt-4">
            Join our community of book lovers and start sharing your reviews
            today.
          </p>
          <a
            href="#"
            className="inline-block mt-6 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Latest Book Reviews Section */}

      <section className="py-12">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800">
            Latest Book Reviews
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
            {/* Featured Book Cards  */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="images/white-square.gif"
                alt="Book Title"
                className="w-full h-48 object-cover"
              ></img>
              <div className="p-6">
                <h4 className="text-xl font-semibold">Book Title</h4>
                <p className="text-gray-600 mt-2">Author Name</p>
                <a
                  href="#"
                  className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Read Review
                </a>
              </div>
            </div>
            {/* Repeat this card structure for other featured books  */}
          </div>
        </div>
      </section>

      {/* Footer Section  */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>Powered by Criticos</p>
        </div>
      </footer>
    </>
  );
}
