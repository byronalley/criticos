defmodule CriticosWeb.WebAPI.ReviewControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.AccountsFixtures
  import Criticos.LibraryFixtures
  import Criticos.TimelineFixtures

  alias Criticos.Timeline.Review

  @bad_id "deadbeef-0404-0404-0404-deadbeafdead"

  @create_attrs %{
    content: "some content",
    thumbs_up: true,
    private_notes: "some private_notes",
    google_volume_id: "google_volume_id"
  }
  @update_attrs %{
    content: "some updated content",
    thumbs_up: false,
    private_notes: "some updated private_notes"
  }
  @invalid_attrs %{content: nil, private_notes: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:create_review]

    test "lists most recent reviews", %{conn: conn, review: review, book: book} do
      conn = get(conn, ~p"/web_api/reviews")
      assert [received] = json_response(conn, 200)["data"]

      id = review.id
      book_id = book.id
      google_volume_id = book.google_volume_id

      # TODO: verify has user_id and username in review
      assert %{
               "id" => ^id,
               "content" => "some content",
               "thumbs_up" => true,
               "private_notes" => "some private_notes",
               "google_volume_id" => ^google_volume_id,
               "book_id" => ^book_id
             } = received
    end
  end

  describe "create review" do
    setup [:create_book, :create_user]

    test "renders review when data is valid", %{conn: conn, user: user} do
      conn =
        conn
        |> log_in_user(user)
        |> post(~p"/web_api/reviews", review: @create_attrs)

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/web_api/reviews/#{id}")

      assert %{
               "id" => ^id,
               "content" => "some content",
               "private_notes" => "some private_notes",
               "thumbs_up" => true
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      conn =
        conn
        |> log_in_user(user)
        |> post(~p"/web_api/reviews", review: @invalid_attrs)

      assert %{"content" => ["can't be blank"]} = json_response(conn, 422)["errors"]
    end
  end

  describe "update review" do
    setup [:create_user, :create_review]

    test "renders review when data is valid", %{
      conn: conn,
      review: %Review{id: id} = review,
      user: user
    } do
      conn =
        conn
        |> log_in_user(user)
        |> put(~p"/web_api/reviews/#{review}", review: @update_attrs)

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/web_api/reviews/#{id}")

      assert %{
               "id" => ^id,
               "content" => "some updated content",
               "private_notes" => "some updated private_notes",
               "thumbs_up" => false
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, review: review, user: user} do
      conn =
        conn
        |> log_in_user(user)
        |> put(~p"/web_api/reviews/#{review}", review: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "show review" do
    setup [:create_book, :create_review]

    test "renders review when data is valid", %{
      conn: conn,
      book: %{google_volume_id: google_volume_id},
      review: %Review{id: id, book_id: book_id} = review
    } do
      conn = get(conn, ~p"/web_api/reviews/#{review}")

      assert %{
               "id" => ^id,
               "content" => "some content",
               "private_notes" => "some private_notes",
               "thumbs_up" => true,
               "book_id" => ^book_id,
               "google_volume_id" => ^google_volume_id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      assert %{status: 404} = get(conn, ~p"/web_api/reviews/#{@bad_id}")
    end
  end

  describe "delete review" do
    setup [:create_user, :create_review]

    test "deletes chosen review", %{conn: conn, review: review, user: user} do
      conn =
        conn
        |> log_in_user(user)
        |> delete(~p"/web_api/reviews/#{review}")

      assert response(conn, 204)

      assert %{status: 404} = get(conn, ~p"/web_api/reviews/#{review}")
    end
  end

  defp create_book(_) do
    %{book: book_fixture(%{google_volume_id: Ecto.UUID.generate()})}
  end

  defp create_review(%{book: book, user: user}) do
    review =
      review_fixture(%{
        book_id: book.id,
        creator_id: user.id
      })

    %{review: review, book: book}
  end

  defp create_review(context) do
    book = context[:book] || book_fixture(%{google_volume_id: Ecto.UUID.generate()})
    user = context[:user] || user_fixture(context)

    create_review(Map.merge(context, %{book: book, user: user}))
  end

  defp create_user(_) do
    %{user: user_fixture()}
  end
end
