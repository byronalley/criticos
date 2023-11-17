defmodule CriticosWeb.WebAPI.ImageControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.FilesFixtures

  @create_attrs %{
    data: "some data",
    content_type: "image/png"
  }

  @invalid_attrs %{data: nil, content_type: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all images", %{conn: conn} do
      conn = get(conn, ~p"/web_api/images")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create image" do
    setup [:register_and_log_in_user]

    test "renders image when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/images", image: @create_attrs)

      assert %{"url" => url, "filename" => filename} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/web_api/images/#{filename}")

      assert %{
               "url" => ^url
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/images", image: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "show image info" do
    setup [:register_and_log_in_user, :create_image]

    test "returns image info", %{conn: conn, image: image} do
      conn = get(conn, ~p"/web_api/images/#{image}")

      assert json_response(conn, 200) == %{
               "data" => %{
                 "filename" => image.filename,
                 "url" => "images/#{image.filename}",
                 "content_type" => image.content_type
               }
             }
    end

    test "404 when doesn't exist", %{conn: conn} do
      conn = get(conn, ~p"/web_api/images/foo")

      assert json_response(conn, 404)
    end
  end

  describe "delete image" do
    setup [:register_and_log_in_user, :create_image]

    test "deletes chosen image", %{conn: conn, image: image} do
      conn = delete(conn, ~p"/web_api/images/#{image}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/web_api/images/#{image}")
      end
    end
  end

  defp create_image(%{user: user}) do
    image = image_fixture(%{creator_id: user.id})
    %{image: image}
  end
end
