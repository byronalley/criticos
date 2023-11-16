defmodule CriticosWeb.ImageController do
  @moduledoc """
  Controller module for sending image data
  """
  use Phoenix.Controller

  import Plug.Conn

  alias Criticos.Files

  action_fallback CriticosWeb.FallbackController

  def show(conn, params) do
    %{"filename" => filename} = params

    %{data: data, content_type: content_type} = Files.get_image!(filename)

    conn
    |> put_resp_content_type(content_type, nil)
    |> send_resp(200, data)
    |> halt()
  end
end
