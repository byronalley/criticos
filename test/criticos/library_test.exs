defmodule Criticos.LibraryTest do
  use Criticos.DataCase

  alias Criticos.Library
  alias Criticos.Library.Book
  alias Ecto.Changeset

  describe "authors" do
    alias Criticos.Library.Author

    import Criticos.AccountsFixtures
    import Criticos.LibraryFixtures

    @invalid_attrs %{name: nil, birthdate: nil, birthplace: nil, biography: nil}

    @valid_attrs %{
      creator_id: nil,
      name: "some name",
      birthdate: ~D[2023-10-09],
      birthplace: "some birthplace",
      biography: "some biography"
    }

    test "list_authors/0 returns all authors" do
      author = author_fixture()
      assert Library.list_authors() == [author]
    end

    test "get_author!/1 returns the author with given id" do
      author = author_fixture()
      assert Library.get_author!(author.id) == author
    end

    test "create_author/1 with valid data creates an author" do
      user = user_fixture()

      assert {:ok, %Author{} = author} =
               Library.create_author(%{@valid_attrs | creator_id: user.id})

      assert author.name == "some name"
      assert author.birthdate == ~D[2023-10-09]
      assert author.birthplace == "some birthplace"
      assert author.biography == "some biography"
      assert author.creator_id == user.id
    end

    test "create_author/1 fails without valid creator_id" do
      assert {:error, %Changeset{errors: errors}} =
               Library.create_author(%{@valid_attrs | creator_id: Ecto.UUID.generate()})

      assert [creator: {"does not exist", _}] = errors
    end

    test "create_author/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Library.create_author(@invalid_attrs)
    end

    test "update_author/2 with valid data updates the author" do
      author = author_fixture()

      update_attrs = %{
        name: "some updated name",
        birthdate: ~D[2023-10-10],
        birthplace: "some updated birthplace",
        biography: "some updated biography"
      }

      assert {:ok, %Author{} = author} = Library.update_author(author, update_attrs)
      assert author.name == "some updated name"
      assert author.birthdate == ~D[2023-10-10]
      assert author.birthplace == "some updated birthplace"
      assert author.biography == "some updated biography"
    end

    test "update_author/2 with invalid data returns error changeset" do
      author = author_fixture()
      assert {:error, %Ecto.Changeset{}} = Library.update_author(author, @invalid_attrs)
      assert author == Library.get_author!(author.id)
    end

    test "delete_author/1 deletes the author" do
      author = author_fixture()
      assert {:ok, %Author{}} = Library.delete_author(author)
      assert_raise Ecto.NoResultsError, fn -> Library.get_author!(author.id) end
    end

    test "change_author/1 returns a author changeset" do
      author = author_fixture()
      assert %Ecto.Changeset{} = Library.change_author(author)
    end
  end

  describe "books" do
    alias Criticos.Library.Book

    import Criticos.LibraryFixtures

    @invalid_attrs %{title: nil, year: nil, summary: nil, isbn: nil}

    test "list_books/0 returns all books" do
      book = book_fixture()
      assert Library.list_books() == [book]
    end

    test "get_book!/1 returns the book with given id" do
      book = book_fixture()
      assert Library.get_book!(book.id) == book
    end

    test "create_book/1 with valid data creates a book" do
      valid_attrs = %{
        title: "some title",
        year: 42,
        summary: "some summary",
        isbn: "some isbn",
        google_volume_id: "abc123"
      }

      assert {:ok, %Book{} = book} = Library.create_book(valid_attrs)
      assert book.title == "some title"
      assert book.year == 42
      assert book.summary == "some summary"
      assert book.isbn == "some isbn"
      assert book.google_volume_id == "abc123"
    end

    test "create_book/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Library.create_book(@invalid_attrs)
    end

    test "update_book/2 with valid data updates the book" do
      book = book_fixture()

      update_attrs = %{
        title: "some updated title",
        year: 43,
        summary: "some updated summary",
        isbn: "some updated isbn"
      }

      assert {:ok, %Book{} = book} = Library.update_book(book, update_attrs)
      assert book.title == "some updated title"
      assert book.year == 43
      assert book.summary == "some updated summary"
      assert book.isbn == "some updated isbn"
    end

    test "update_book/2 with invalid data returns error changeset" do
      book = book_fixture()
      assert {:error, %Ecto.Changeset{}} = Library.update_book(book, @invalid_attrs)
      assert book == Library.get_book!(book.id)
    end

    test "delete_book/1 deletes the book" do
      book = book_fixture()
      assert {:ok, %Book{}} = Library.delete_book(book)
      assert_raise Ecto.NoResultsError, fn -> Library.get_book!(book.id) end
    end

    test "change_book/1 returns a book changeset" do
      book = book_fixture(%{})
      assert %Ecto.Changeset{} = Library.change_book(book)
    end

    test "find_or_create_book_by_google_volume_id!/1 finds an existing book by google_volume_id" do
      google_volume_id = "abc123"
      %Book{id: expected_id} = book_fixture(%{google_volume_id: google_volume_id})

      assert %Book{id: ^expected_id} =
               Library.find_or_create_book_by_google_volume_id!(google_volume_id)
    end

    test "find_or_create_book_by_google_volume_id!/1 creates new book when google_volume_id not found" do
      google_volume_id = "abc123"

      refute Repo.get_by(Book, google_volume_id: google_volume_id)

      assert %Book{google_volume_id: ^google_volume_id} =
               Library.find_or_create_book_by_google_volume_id!(google_volume_id)
    end
  end
end
