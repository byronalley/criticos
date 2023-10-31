import React from "react";

export default function Reviews() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold txt-gray-800">
          Latest Book Reviews
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="images/white-square.gif"
              alt="Book Title"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h4 class="text-xl font-semibold">Book Title</h4>
              <p class="text-gray-600 mt-2">Author Name</p>
              <a
                href="#"
                class="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
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
