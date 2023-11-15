defmodule CriticosWeb.ImageController do
  @moduledoc """
  Controller module for sending image data
  """
  use CriticosWeb, :controller

  alias Criticos.Files

  action_fallback CriticosWeb.FallbackController

  def show(conn, %{"filename" => filename}) do
    %{data: data, content_type: content_type} = Files.get_image!(filename)

    conn
    |> put_resp_content_type(content_type)
    |> send_resp(200, data)
    |> halt()
  end
end
