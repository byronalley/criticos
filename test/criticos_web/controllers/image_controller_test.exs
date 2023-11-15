defmodule CriticosWeb.ImageControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.FilesFixtures

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "show/2" do
    setup [:create_image]

    test "returns image data", %{conn: conn, image: image} do
      conn = get(conn, ~p"/web_api/images/#{image.filename}")
      assert html_response(conn, 200) == image.data
    end
  end

  defp create_image(_) do
    image = image_fixture()
    %{image: image}
  end
end
