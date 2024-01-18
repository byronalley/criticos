defmodule Criticos.Library.BookTest do
  use ExUnit.Case, async: true

  alias Criticos.Library.Book
  alias Ecto.Changeset

  @valid_params %{
    title: "title",
    year: 2011,
    summary: "short summary",
    google_volume_id: "someStuff1234",
    isbn: "9780553898194",
    image_url: "image_url",
    author_id: Ecto.UUID.generate(),
    creator_id: Ecto.UUID.generate()
  }

  describe "changeset/2" do
    test "returns valid changeset from valid arguments" do
      assert %Changeset{valid?: true} = changeset = Book.changeset(%Book{}, @valid_params)

      for {field, expected} <- @valid_params do
        change = Changeset.get_change(changeset, field)
        assert change == expected, "Expected #{field} to be #{expected}, got #{change}"
      end
    end

    test "requires at least one of title, google_volume_id, or isbn" do
      required = ~w[title google_volume_id isbn]a
      missing_all_required = Map.reject(@valid_params, fn {k, _} -> k in required end)

      refute Book.changeset(%Book{}, missing_all_required).valid?,
             "A changeset without any required fields should be invalid"

      for field <- required do
        assert Book.changeset(%Book{}, Map.delete(@valid_params, field)).valid?,
               "Expected changeset with only #{field} missing to be invalid, got valid"
      end
    end
  end
end
