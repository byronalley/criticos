export default function Featured() {
  return (
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
  );
}
