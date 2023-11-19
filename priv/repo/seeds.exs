# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Criticos.Repo.insert!(%Criticos.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Criticos.{
  Accounts,
  Accounts.User,
  Files.Image,
  Library.Book,
  Repo,
  Timeline.Review
}

if "clean" in System.argv() do
  for table <- [Review, Book, Image, User] do
    Repo.delete_all(table)
  end
end

for {email_user, password} <- [
      {"alice", "alphaAPPLE11!"},
      {"bob", "bravoBANANA22@"},
      {"carol", "charlieCARROT33#"}
    ] do
  {:ok, _user} =
    Accounts.register_user(%{email: "#{email_user}@example.com", password: password})
end

authors =
  for {name, birthdate, birthplace, biography} <- [
        {"Agatha Christie", ~D[1890-09-15], "Torquay, England",
         "Renowned English author of detective fiction."},
        {"Bram Stoker", ~D[1847-11-08], "Dublin, Ireland",
         "Irish author best known for his classic Gothic novel 'Dracula.'"},
        {"Charles Dickens", ~D[1812-02-07], "Portsmouth, England",
         "Famous English novelist and social critic."},
        {"David Foster Wallace", ~D[1962-02-21], "Ithaca, New York, USA",
         "American author and essayist known for his postmodern works."},
        {"Edgar Allan Poe", ~D[1809-01-19], "Boston, Massachusetts, USA",
         "American writer and poet famous for his macabre tales."},
        {"F. Scott Fitzgerald", ~D[1896-09-24], "Saint Paul, Minnesota, USA",
         "American novelist celebrated for 'The Great Gatsby.'"}
      ] do
    {:ok, author} =
      Criticos.Library.create_author(%{
        name: name,
        birthdate: birthdate,
        birthplace: birthplace,
        biography: biography
      })

    author
  end

book_data = [
  {"Agatha Christie", "Murder on the Orient Express", 1934, "A famous detective novel.",
   "murder-on-the-orient-express.jpg"},
  {"Bram Stoker", "Dracula", 1897, "A classic Gothic novel about vampires.", "dracula.jpg"},
  {"Charles Dickens", "Great Expectations", 1861, "A beloved novel about the life of Pip.",
   "great-expectations.jpg"},
  {"David Foster Wallace", "Infinite Jest", 1996, "A postmodern epic novel.",
   "infinite-jest.jpg"},
  {"Edgar Allan Poe", "The Tell-Tale Heart", 1843, "A famous macabre short story.",
   "tell-tale-heart.jpg"},
  {"F. Scott Fitzgerald", "The Great Gatsby", 1925, "A classic novel of the Jazz Age.",
   "great-gatsby.jpg"}
]

books =
  for {author, {_, title, year, summary, filename}} <- Enum.zip(authors, book_data) do
    image_data = File.read!(__DIR__ <> "/fixtures/#{filename}")

    {:ok, image} =
      Criticos.Files.create_image(%{
        creator_id: author.creator_id,
        data: image_data,
        content_type: "image/jpeg"
      })

    {:ok, book} =
      Criticos.Library.create_book(%{
        creator_id: author.creator_id,
        author_id: author.id,
        title: title,
        year: year,
        summary: summary,
        image_url: image.url
      })

    book
  end

for {book, {content, rating, private_notes}} <-
      Enum.zip(books, [
        {"Everything you could hope for from a mystery on a train!", 4, "Nothing else to say"},
        {"Too gosh darned scary, could barely finish it!", 2, "Heavens to Betsy"},
        {"Who even knows why this is a classic when it's a tale of a three terrible people", 2,
         "Note, should probably finish this at some point"},
        {"Super great brilliant book that I totally understood", 4,
         "How do people actually read this, I can't understand anything"},
        {"Creepy and fantastic", 4,
         "How do people actually read this, I can't understand anything"},
        {"Not bad but the movie was way better", 3, ""}
      ]) do
  Criticos.Timeline.create_review(%{
    creator_id: book.creator_id,
    book_id: book.id,
    content: content,
    rating: rating,
    private_notes: private_notes
  })
end
