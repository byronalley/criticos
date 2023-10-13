defmodule Criticos.LibraryFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Criticos.Library` context.
  """

  @doc """
  Generate a author.
  """
  def author_fixture(attrs \\ %{}) do
    {:ok, author} =
      attrs
      |> Enum.into(%{
        biography: "some biography",
        birthdate: ~D[2023-10-09],
        birthplace: "some birthplace",
        name: "some name"
      })
      |> Criticos.Library.create_author()

    author
  end
end
