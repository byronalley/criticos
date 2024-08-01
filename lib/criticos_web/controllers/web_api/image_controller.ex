defmodule CriticosWeb.WebAPI.ImageController do
  use CriticosWeb, :controller

  alias Criticos.Files
  alias Criticos.Files.Image

  action_fallback CriticosWeb.FallbackController

  def index(conn, _params) do
    images = Files.list_images()
    render(conn, :index, images: images)
  end

  def create(conn, %{"data" => %{"path" => path, "content_type" => content_type}})
      when is_binary(path) do
    file_data = File.read!(path)

    image_params = %{data: file_data, content_type: content_type}

    with {:ok, %Image{} = image} <-
           Files.create_image(Map.put(image_params, :content_type, "image/png")) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/web_api/images/#{image}")
      |> render(:show, image: image)
    end
  end

  def create(_conn, %{"data" => _}), do: {:error, :unprocessable_entity}

  def show(conn, %{"filename" => filename}) do
    with {:ok, image} <- Files.get_image(filename) do
      render(conn, :show, image: image)
    end
  end

  def delete(conn, params) do
    %{"filename" => filename} = params

    image = Files.get_image!(filename)

    with {:ok, %Image{}} <- Files.delete_image(image) do
      send_resp(conn, :no_content, "")
    end
  end
end
