defmodule CriticosWeb.AuthorControllerTest do
  use CriticosWeb.ConnCase

  alias Criticos.Library

  import Criticos.AccountsFixtures

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

  describe "index" do
    test "lists all authors", %{conn: conn} do
      conn = get(conn, ~p"/authors")
      assert html_response(conn, 200) =~ "Listing Authors"
    end
  end

  describe "new author" do
    setup [:register_and_log_in_user]

    test "renders form", %{conn: conn} do
      conn = get(conn, ~p"/authors/new")
      assert html_response(conn, 200) =~ "New Author"
    end
  end

  describe "create author" do
    setup [:register_and_log_in_user]

    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/authors", author: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == ~p"/authors/#{id}"

      conn = get(conn, ~p"/authors/#{id}")
      assert html_response(conn, 200) =~ "Author #{id}"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/authors", author: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Author"
    end
  end

  describe "edit author" do
    setup [:register_and_log_in_user, :author]

    test "renders form for editing chosen author", %{conn: conn, author: author} do
      conn = get(conn, ~p"/authors/#{author}/edit")
      assert html_response(conn, 200) =~ "Edit Author"
    end

    test "disallows changing author created by another user", %{conn: conn} do
      other_user = user_fixture()
      author_attribs = @create_attrs |> Map.put(:creator_id, other_user.id)
      assert {:ok, author} = Library.create_author(author_attribs)

      conn = get(conn, ~p"/authors/#{author}/edit")
      assert redirected_to(conn) == ~p"/authors/"
    end
  end

  describe "update author" do
    setup [:author, :register_and_log_in_user]

    test "redirects when data is valid", %{conn: conn, author: author} do
      conn = put(conn, ~p"/authors/#{author}", author: @update_attrs)
      assert redirected_to(conn) == ~p"/authors/#{author}"

      conn = get(conn, ~p"/authors/#{author}")
      assert html_response(conn, 200) =~ "some updated name"
    end

    test "renders errors when data is invalid", %{conn: conn, author: author} do
      conn = put(conn, ~p"/authors/#{author}", author: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Author"
    end
  end

  describe "delete author" do
    setup [:author, :register_and_log_in_user]

    test "deletes chosen author", %{conn: conn, author: author} do
      conn = delete(conn, ~p"/authors/#{author}")
      assert redirected_to(conn) == ~p"/authors"

      assert_error_sent 404, fn ->
        get(conn, ~p"/authors/#{author}")
      end
    end
  end
end
