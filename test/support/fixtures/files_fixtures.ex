defmodule Criticos.FilesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Criticos.Files` context.
  """

  @doc """
  Generate a image.
  """
  def image_fixture(attrs \\ %{}) do
    {:ok, image} =
      attrs
      |> Enum.into(%{
        content_type: "image/png",
        data: "some data"
      })
      |> Criticos.Files.create_image()

    image
  end
end
