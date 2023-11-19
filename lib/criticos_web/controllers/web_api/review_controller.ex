defmodule CriticosWeb.WebAPI.ReviewController do
  use CriticosWeb, :controller

  alias Criticos.Timeline
  alias Criticos.Timeline.Review

  action_fallback CriticosWeb.FallbackController

  def index(conn, _params) do
    reviews = Timeline.list_reviews()
    render(conn, :index, reviews: reviews)
  end

  def create(conn, %{"review" => review_params}) do
    with {:ok, %Review{} = review} <- Timeline.create_review(review_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/web_api/reviews/#{review}")
      |> render(:show, review: review)
    end
  end

  def show(conn, %{"id" => id}) do
    review = Timeline.get_review!(id)

    render(conn, :show, review: review)
  end

  def update(conn, %{"id" => id, "review" => review_params}) do
    review = Timeline.get_review!(id)

    with {:ok, %Review{} = review} <- Timeline.update_review(review, review_params) do
      render(conn, :show, review: review)
    end
  end

  def delete(conn, %{"id" => id}) do
    review = Timeline.get_review!(id)

    with {:ok, %Review{}} <- Timeline.delete_review(review) do
      send_resp(conn, :no_content, "")
    end
  end
end
