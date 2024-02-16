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
    responses.map((book) => [
      book.id,
      {
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors.join(", "),
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
      },
    ]),
  );

  return books;
};

export { fetchGoogleVolumes };
