defmodule CriticosWeb.WebAPI.ReviewControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.TimelineFixtures

  alias Criticos.Timeline.Review

  @create_attrs %{
    content: "some content",
    rating: 2,
    private_notes: "some private_notes"
  }
  @update_attrs %{
    content: "some updated content",
    rating: 3,
    private_notes: "some updated private_notes"
  }
  @invalid_attrs %{content: nil, rating: nil, private_notes: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all reviews", %{conn: conn} do
      conn = get(conn, ~p"/web_api/reviews")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create review" do
    test "renders review when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/reviews", review: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/web_api/reviews/#{id}")

      assert %{
               "id" => ^id,
               "content" => "some content",
               "private_notes" => "some private_notes",
               "rating" => 2
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/reviews", review: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update review" do
    setup [:create_review]

    test "renders review when data is valid", %{conn: conn, review: %Review{id: id} = review} do
      conn = put(conn, ~p"/web_api/reviews/#{review}", review: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/web_api/reviews/#{id}")

      assert %{
               "id" => ^id,
               "content" => "some updated content",
               "private_notes" => "some updated private_notes",
               "rating" => 3
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, review: review} do
      conn = put(conn, ~p"/web_api/reviews/#{review}", review: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete review" do
    setup [:create_review]

    test "deletes chosen review", %{conn: conn, review: review} do
      conn = delete(conn, ~p"/web_api/reviews/#{review}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/web_api/reviews/#{review}")
      end
    end
  end

  defp create_review(_) do
    review = review_fixture()
    %{review: review}
  end
end
