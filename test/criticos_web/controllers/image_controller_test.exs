defmodule CriticosWeb.ImageControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.FilesFixtures

  alias Criticos.Files.Image

  @update_attrs %{
    data: "some updated data",
    url: "some updated url",
    content_type: "some updated content_type"
  }
  @invalid_attrs %{data: nil, url: nil, content_type: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
    setup [:create_image]
  end

  describe "show/2" do
    test "returns image data", %{conn: conn, image: image} do
      conn = get(conn, ~p"/web_api/images/#{image.url}")
      assert html_response(conn, 200) == image.data
    end
  end

  defp create_image(_) do
    image = image_fixture()
    %{image: image}
  end
end
