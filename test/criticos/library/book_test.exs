defmodule Criticos.Library.BookTest do
  use ExUnit.Case, async: true

  alias Criticos.Library.Book
  alias Ecto.Changeset

  describe "changeset/2" do
    test "returns valid changeset from valid arguments" do
      data = %{
        title: "title",
        year: 2011,
        summary: "short summary",
        isbn: "9780553898194",
        image_url: "image_url",
        author_id: Ecto.UUID.generate(),
        creator_id: Ecto.UUID.generate()
      }

      assert %Changeset{valid?: true} = changeset = Book.changeset(%Book{}, data)

      for {field, expected} <- data do
        change = Changeset.get_change(changeset, field)
        assert change == expected, "Expected #{field} to be #{expected}, got #{change}"
      end
    end
  end
end
