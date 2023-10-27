defmodule CriticosWeb.WebAPI.AuthorController do
  use CriticosWeb, :controller

  alias Criticos.Library
  alias Criticos.Library.Author

  action_fallback CriticosWeb.FallbackController

  def index(conn, _params) do
    authors = Library.list_authors()
    render(conn, :index, authors: authors)
  end

  def create(conn, %{"author" => author_params}) do
    with {:ok, %Author{} = author} <- Library.create_author(author_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/web_api/authors/#{author}")
      |> render(:show, author: author)
    end
  end

  def show(conn, %{"id" => id}) do
    author = Library.get_author!(id)
    render(conn, :show, author: author)
  end

  def update(conn, %{"id" => id, "author" => author_params}) do
    author = Library.get_author!(id)

    with {:ok, %Author{} = author} <- Library.update_author(author, author_params) do
      render(conn, :show, author: author)
    end
  end

  def delete(conn, %{"id" => id}) do
    author = Library.get_author!(id)

    with {:ok, %Author{}} <- Library.delete_author(author) do
      send_resp(conn, :no_content, "")
    end
  end
end
