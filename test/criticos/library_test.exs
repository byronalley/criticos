defmodule Criticos.LibraryTest do
  use Criticos.DataCase

  alias Criticos.Library
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
end
