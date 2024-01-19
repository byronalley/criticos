defmodule CriticosWeb.WebAPI.BookControllerTest do
  use CriticosWeb.ConnCase

  alias Criticos.Library.Book

  @create_attrs %{
    title: "some title",
    year: 42,
    isbn: "some isbn",
    google_volume_id: "abcxyz123",
    summary: "some summary"
  }
  @update_attrs %{
    title: "some updated title",
    year: 43,
    isbn: "some updated isbn",
    summary: "some updated summary"
  }
  @invalid_attrs %{title: nil, year: nil, isbn: nil, summary: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all books", %{conn: conn} do
      conn = get(conn, ~p"/web_api/books")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "show book" do
    setup [:author, :book]

    test "renders book", %{
      conn: conn,
      book: %Book{id: id, google_volume_id: google_volume_id}
    } do
      conn = get(conn, ~p"/web_api/books/#{id}")

      assert %{
               "title" => "some title",
               "year" => 42,
               "isbn" => "some isbn",
               "google_volume_id" => ^google_volume_id,
               "summary" => "some summary"
             } = json_response(conn, 200)["data"]
    end
  end

  describe "create book" do
    setup [:register_and_log_in_user]

    test "renders book when data is valid and user logged in", %{conn: conn} do
      conn = post(conn, ~p"/web_api/books", book: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/web_api/books/#{id}")

      assert %{
               "id" => ^id,
               "isbn" => "some isbn",
               "summary" => "some summary",
               "title" => "some title",
               "year" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      invalid_attrs = Map.put(@invalid_attrs, :creator_id, user.id)

      conn = post(conn, ~p"/web_api/books", book: invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update book" do
    setup [:register_and_log_in_user, :author, :book]

    test "renders book when data is valid", %{conn: conn, book: %Book{id: id} = book} do
      conn = put(conn, ~p"/web_api/books/#{book}", book: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/web_api/books/#{id}")

      assert %{
               "id" => ^id,
               "isbn" => "some updated isbn",
               "summary" => "some updated summary",
               "title" => "some updated title",
               "year" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, book: book} do
      conn = put(conn, ~p"/web_api/books/#{book}", book: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete book" do
    setup [:register_and_log_in_user, :author, :book]

    test "deletes chosen book", %{conn: conn, book: book} do
      conn = delete(conn, ~p"/web_api/books/#{book}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/web_api/books/#{book}")
      end
    end
  end
end
