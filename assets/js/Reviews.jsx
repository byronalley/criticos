import React from "react";

export default function Reviews() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold txt-gray-800">
          Latest Book Reviews
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="images/white-square.gif"
              alt="Book Title"
              className="w-full h-48 object-cover"
            />
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
        </div>
      </div>
    </section>
  );
}
