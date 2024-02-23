defmodule CriticosWeb.WebAPI.ReviewController do
  use CriticosWeb, :controller

  alias Criticos.Timeline
  alias Criticos.Timeline.Review

  action_fallback CriticosWeb.FallbackController

  def index(conn, _params) do
    reviews = Timeline.latest_reviews()
    render(conn, :index, reviews: reviews)
  end

  def create(%{assigns: %{current_user: user}} = conn, %{"review" => review_params}) do
    creation_params = Map.put(review_params, "creator_id", user.id)

    with {:ok, %Review{} = review} <- Timeline.create_review(creation_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/web_api/reviews/#{review}")
      |> render(:show, review: review)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, review} <- Timeline.get_review_with_google_volume_id(id) do
      render(conn, :show, review: review)
    end
  end

  def update(conn, %{"id" => id, "review" => review_params}) do
    review = Timeline.get_review!(id)

    with :ok <- valid_owner(conn, review),
         {:ok, %Review{} = review} <- Timeline.update_review(review, review_params) do
      render(conn, :show, review: review)
    end
  end

  def delete(conn, %{"id" => id}) do
    review = Timeline.get_review!(id)

    with :ok <- valid_owner(conn, review),
         {:ok, %Review{}} <- Timeline.delete_review(review) do
      send_resp(conn, :no_content, "")
    end
  end

  defp valid_owner(%{assigns: %{current_user: user}} = _conn, review) do
    if user && user.id == review.creator_id, do: :ok, else: {:error, :unauthorized}
  end
end
