defmodule CriticosWeb.WebAPI.AuthorControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.LibraryFixtures

  alias Criticos.Library.Author

  @create_attrs %{
    name: "some name",
    birthdate: ~D[2023-10-09],
    birthplace: "some birthplace",
    biography: "some biography"
  }
  @update_attrs %{
    name: "some updated name",
    birthdate: ~D[2023-10-10],
    birthplace: "some updated birthplace",
    biography: "some updated biography"
  }
  @invalid_attrs %{name: nil, birthdate: nil, birthplace: nil, biography: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all authors", %{conn: conn} do
      conn = get(conn, ~p"/web_api/authors")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create author" do
    test "renders author when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/authors", author: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/web_api/authors/#{id}")

      assert %{
               "id" => ^id,
               "biography" => "some biography",
               "birthdate" => "2023-10-09",
               "birthplace" => "some birthplace",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/authors", author: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update author" do
    @describetag :skip
    setup [:create_author]

    test "renders author when data is valid", %{conn: conn, author: %Author{id: id} = author} do
      conn = put(conn, ~p"/web_api/authors/#{author}", author: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/web_api/authors/#{id}")

      assert %{
               "id" => ^id,
               "biography" => "some updated biography",
               "birthdate" => "2023-10-10",
               "birthplace" => "some updated birthplace",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, author: author} do
      conn = put(conn, ~p"/web_api/authors/#{author}", author: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete author" do
    @describetag :skip
    setup [:create_author]

    test "deletes chosen author", %{conn: conn, author: author} do
      conn = delete(conn, ~p"/web_api/authors/#{author}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/web_api/authors/#{author}")
      end
    end
  end

  defp create_author(_) do
    author = author_fixture()
    %{author: author}
  end
end
