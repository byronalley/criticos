export default function Reviews() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800">
          Latest Book Reviews
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6"></div>
      </div>{" "}
    </section>
  );
}
