defmodule CriticosWeb.WebAPI.BookController do
  use CriticosWeb, :controller

  alias Criticos.Library
  alias Criticos.Library.Book

  action_fallback CriticosWeb.FallbackController

  def index(conn, _params) do
    books = Library.list_books()
    render(conn, :index, books: books)
  end

  def create(conn, %{"book" => book_params}) do
    with {:ok, %Book{} = book} <- Library.create_book(book_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/web_api/books/#{book}")
      |> render(:show, book: book)
    end
  end

  def show(conn, %{"id" => id}) do
    book = Library.get_book!(id)
    render(conn, :show, book: book)
  end

  def update(conn, %{"id" => id, "book" => book_params}) do
    book = Library.get_book!(id)

    with {:ok, %Book{} = book} <- Library.update_book(book, book_params) do
      render(conn, :show, book: book)
    end
  end

  def delete(conn, %{"id" => id}) do
    book = Library.get_book!(id)

    with {:ok, %Book{}} <- Library.delete_book(book) do
      send_resp(conn, :no_content, "")
    end
  end
end
