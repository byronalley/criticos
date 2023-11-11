defmodule Criticos.FilesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Criticos.Files` context.
  """

  @doc """
  Generate a unique image url.
  """
  def unique_image_url, do: "some url#{System.unique_integer([:positive])}"

  @doc """
  Generate a image.
  """
  def image_fixture(attrs \\ %{}) do
    {:ok, image} =
      attrs
      |> Enum.into(%{
        content_type: "image/png",
        data: "some data",
        url: unique_image_url() <> ".png"
      })
      |> Criticos.Files.create_image()

    image
  end
end
