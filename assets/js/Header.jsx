export default function Header() {
  return (
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
  );
}
