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

for {email_user, password} <- [
      {"alice", "alphaAPPLE11!"},
      {"bob", "bravoBANANA22@"},
      {"carol", "charlieCARROT33#"}
    ] do
  {:ok, _user} =
    Criticos.Accounts.register_user(%{email: "#{email_user}@example.com", password: password})
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

books = [
  {"Agatha Christie", "Murder on the Orient Express", 1934, "A famous detective novel."},
  {"Bram Stoker", "Dracula", 1897, "A classic Gothic novel about vampires."},
  {"Charles Dickens", "Great Expectations", 1861, "A beloved novel about the life of Pip."},
  {"David Foster Wallace", "Infinite Jest", 1996, "A postmodern epic novel."},
  {"Edgar Allan Poe", "The Tell-Tale Heart", 1843, "A famous macabre short story."},
  {"F. Scott Fitzgerald", "The Great Gatsby", 1925, "A classic novel of the Jazz Age."}
]

for {author, {_, title, year, summary}} <- Enum.zip(authors, books),
    do:
      Criticos.Library.create_book(%{
        creator_id: author.creator_id,
        author_id: author.id,
        title: title,
        year: year,
        summary: summary
      })
