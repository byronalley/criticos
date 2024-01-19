defmodule CriticosWeb.WebAPI.ReviewJSON do
  alias Criticos.Timeline.Review

  @doc """
  Renders a list of reviews.
  """
  def index(%{reviews: reviews}) do
    %{data: for(review <- reviews, do: data(review))}
  end

  @doc """
  Renders a single review.
  """
  def show(%{review: review}) do
    %{data: data(review)}
  end

  defp data(%Review{} = review) do
    %{
      id: review.id,
      content: review.content,
      rating: review.rating,
      private_notes: review.private_notes,
      book_id: review.book_id,
      google_volume_id: review.google_volume_id
    }
  end
end
