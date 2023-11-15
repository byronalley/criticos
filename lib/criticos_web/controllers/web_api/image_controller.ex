defmodule CriticosWeb.WebAPI.ImageController do
  use CriticosWeb, :controller

  alias Criticos.Files
  alias Criticos.Files.Image

  action_fallback CriticosWeb.FallbackController

  def index(conn, _params) do
    images = Files.list_images()
    render(conn, :index, images: images)
  end

  def create(conn, %{"image" => image_params}) do
    with {:ok, %Image{} = image} <- Files.create_image(image_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/web_api/images/#{image}")
      |> render(:show, image: image)
    end
  end

  def show(conn, %{"url" => url}) do
    image = Files.get_image!(url)
    render(conn, :show, image: image)
  end

  def delete(conn, %{"url" => url}) do
    image = Files.get_image!(url)

    with {:ok, %Image{}} <- Files.delete_image(image) do
      send_resp(conn, :no_content, "")
    end
  end
end
