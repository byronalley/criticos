defmodule CriticosWeb.ImageControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.FilesFixtures

  describe "show/2" do
    setup [:create_image]

    test "returns image data", %{conn: conn, image: image} do
      conn =
        conn
        |> put_req_header("accept", image.content_type)
        |> get(~p"/images/#{image}")

      assert response(conn, 200) == image.data
      assert {"content-type", image.content_type} in conn.resp_headers
    end
  end

  defp create_image(_) do
    image = image_fixture()
    %{image: image}
  end
end
