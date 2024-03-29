defmodule CriticosWeb.WebAPI.BookJSON do
  alias Criticos.Library.Book

  @doc """
  Renders a list of books.
  """
  def index(%{books: books}) do
    %{data: for(book <- books, do: data(book))}
  end

  @doc """
  Renders a single book.
  """
  def show(%{book: book}) do
    %{data: data(book)}
  end

  defp data(%Book{} = book) do
    %{
      id: book.id,
      title: book.title,
      year: book.year,
      google_volume_id: book.google_volume_id,
      isbn: book.isbn,
      summary: book.summary,
      image_url: book.image_url
    }
  end
end
