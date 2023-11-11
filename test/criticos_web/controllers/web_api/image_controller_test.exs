defmodule CriticosWeb.WebAPI.ImageControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.FilesFixtures

  alias Criticos.Files.Image

  @create_attrs %{
    data: "some data",
    url: "some url",
    content_type: "some content_type"
  }
  @update_attrs %{
    data: "some updated data",
    url: "some updated url",
    content_type: "some updated content_type"
  }
  @invalid_attrs %{data: nil, url: nil, content_type: nil}

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
    test "renders image when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/images", image: @create_attrs)
      assert %{"url" => url} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/web_api/images/#{url}")

      assert %{
               "url" => ^url,
               "content_type" => "some content_type",
               "data" => "some data",
               "url" => "some url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/images", image: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update image" do
    setup [:create_image]

    test "renders image when data is valid", %{conn: conn, image: %Image{url: url} = image} do
      conn = put(conn, ~p"/web_api/images/#{image}", image: @update_attrs)
      assert %{"url" => ^url} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/web_api/images/#{url}")

      assert %{
               "content_type" => "some updated content_type",
               "data" => "some updated data",
               "url" => "some updated url"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, image: image} do
      conn = put(conn, ~p"/web_api/images/#{image}", image: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete image" do
    setup [:create_image]

    test "deletes chosen image", %{conn: conn, image: image} do
      conn = delete(conn, ~p"/web_api/images/#{image}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/web_api/images/#{image}")
      end
    end
  end

  defp create_image(_) do
    image = image_fixture()
    %{image: image}
  end
end
