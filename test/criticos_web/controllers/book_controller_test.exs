defmodule CriticosWeb.BookControllerTest do
  use CriticosWeb.ConnCase

  @create_attrs %{title: "some title", year: 42, summary: "some summary", isbn: "some isbn"}
  @update_attrs %{
    title: "some updated title",
    year: 43,
    summary: "some updated summary",
    isbn: "some updated isbn"
  }
  @invalid_attrs %{title: nil, year: nil, summary: nil, isbn: nil}

  describe "index" do
    test "lists all books", %{conn: conn} do
      conn = get(conn, ~p"/books")
      assert html_response(conn, 200) =~ "Listing Books"
    end
  end

  describe "new book" do
    setup [:register_and_log_in_user]

    test "renders form", %{conn: conn} do
      conn = get(conn, ~p"/books/new")
      assert html_response(conn, 200) =~ "New Book"
    end
  end

  describe "create book" do
    setup [:register_and_log_in_user]

    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/books", book: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == ~p"/books/#{id}"

      conn = get(conn, ~p"/books/#{id}")
      assert html_response(conn, 200) =~ "Book #{id}"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/books", book: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Book"
    end
  end

  describe "edit book" do
    setup [:register_and_log_in_user, :book]

    test "renders form for editing chosen book", %{conn: conn, book: book} do
      conn = get(conn, ~p"/books/#{book}/edit")
      assert html_response(conn, 200) =~ "Edit Book"
    end
  end

  describe "update book" do
    setup [:register_and_log_in_user, :book]

    test "redirects when data is valid", %{conn: conn, book: book} do
      conn = put(conn, ~p"/books/#{book}", book: @update_attrs)
      assert redirected_to(conn) == ~p"/books/#{book}"

      conn = get(conn, ~p"/books/#{book}")
      assert html_response(conn, 200) =~ "some updated title"
    end

    test "renders errors when data is invalid", %{conn: conn, book: book} do
      conn = put(conn, ~p"/books/#{book}", book: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Book"
    end
  end

  describe "delete book" do
    setup [:register_and_log_in_user, :book]

    test "deletes chosen book", %{conn: conn, book: book} do
      conn = delete(conn, ~p"/books/#{book}")
      assert redirected_to(conn) == ~p"/books"

      assert_error_sent 404, fn ->
        get(conn, ~p"/books/#{book}")
      end
    end
  end
end
