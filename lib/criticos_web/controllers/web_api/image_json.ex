defmodule CriticosWeb.WebAPI.ImageJSON do
  alias Criticos.Files.Image

  @doc """
  Renders a list of images.
  """
  def index(%{images: images}) do
    %{data: for(image <- images, do: data(image))}
  end

  @doc """
  Renders a single image.
  """
  def show(%{image: image}) do
    %{data: data(image)}
  end

  defp data(%Image{} = image) do
    image
    |> Image.set_url()
    |> Map.take([:url, :filename, :content_type])
  end
end
