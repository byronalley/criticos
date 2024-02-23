const fetchGoogleVolumes = async (googleVolumeIds) => {
  const responses = await Promise.all(
    [...googleVolumeIds].map((id) => {
      if (!id) throw new Error("id was null");

      return fetch(`https://www.googleapis.com/books/v1/volumes/${id}`).then(
        (res) => res.json(),
      );
    }),
  );

  const books = Object.fromEntries(
    responses.map((book) => {
      return [
        book.id,
        {
          id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors?.join(", ") || "",
          thumbnail: securifyThumbnailUrl(
            book.volumeInfo.imageLinks?.thumbnail,
          ),
        },
      ];
    }),
  );

  return books;
};

const searchBooks = async (title, author) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      title,
    )}+inauthor:${encodeURIComponent(author)}`,
  );
  const { items } = await response.json();

  const books = items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors,

    thumbnail: item.volumeInfo.imageLinks?.thumbnail?.replace(
      "http:",
      "https:",
    ),
  }));

  return books;
};

// The thumbnail urls are returned as http for some reason but
// the https exists
const securifyThumbnailUrl = (url) =>
  url?.replace("http:", "https:") ||
  "https://via.placeholder.com/128x192.png?text=No+Cover";

export { fetchGoogleVolumes, searchBooks };
