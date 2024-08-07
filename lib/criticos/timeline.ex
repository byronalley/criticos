defmodule Criticos.Timeline do
  @moduledoc """
  The Timeline context.
  """

  import Ecto.Query, warn: false
  alias Criticos.Repo

  alias Criticos.Library
  alias Criticos.Library.Book
  alias Criticos.Timeline.Review
  alias Criticos.Accounts.User

  @default_posts_limit 25

  @doc """
  Returns the list of reviews

  ## Examples

      iex> list_reviews()
      [%Review{}, ...]

  """
  def list_reviews do
    from(
      r in Review,
      join: b in Book,
      on: r.book_id == b.id,
      select: %{r | google_volume_id: b.google_volume_id}
    )
    |> Repo.all()
  end

  @doc """
  Returns the list of reviews

  ## Examples

      iex> latest_reviews()
      [%Review{}, ...]

  """
  def latest_reviews(limit \\ @default_posts_limit) do
    from(
      r in Review,
      join: b in Book,
      on: r.book_id == b.id,
      join: u in User,
      on: r.creator_id == u.id,
      order_by: [desc: r.inserted_at],
      limit: ^limit,
      preload: [:creator],
      select: %{r | google_volume_id: b.google_volume_id}
    )
    |> Repo.all()
  end

  @doc """
  Gets a single review.

  Raises `Ecto.NoResultsError` if the Review does not exist.

  ## Examples

      iex> get_review!(123)
      %Review{}

      iex> get_review!(456)
      ** (Ecto.NoResultsError)

  """
  def get_review!(id), do: Repo.get!(Review, id)

  @doc """
  Get a review with the google_volume_id virtual field set
  and creator preloaded
  """
  def get_review_with_google_volume_id(id) do
    review =
      from(
        r in Review,
        join: b in Book,
        on: r.book_id == b.id,
        where: r.id == ^id,
        select: %{r | google_volume_id: b.google_volume_id},
        preload: [:creator]
      )
      |> Repo.one()

    if review, do: {:ok, review}, else: {:error, :not_found}
  end

  @doc """
  Creates a review.

  ## Examples

      iex> create_review(%{field: value})
      {:ok, %Review{}}

      iex> create_review(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_review(attrs) do
    updated_attrs =
      case attrs do
        %{book_id: book_id} when is_binary(book_id) ->
          attrs

        %{"book_id" => book_id} when is_binary(book_id) ->
          attrs

        %{google_volume_id: google_volume_id}
        when is_binary(google_volume_id) and google_volume_id != "" ->
          %{id: book_id} =
            Library.find_or_create_book_by_google_volume_id!(google_volume_id)

          Map.put(attrs, :book_id, book_id)

        %{"google_volume_id" => google_volume_id}
        when is_binary(google_volume_id) and google_volume_id != "" ->
          %{id: book_id} =
            Library.find_or_create_book_by_google_volume_id!(google_volume_id)

          Map.put(attrs, "book_id", book_id)

        _ ->
          attrs
      end

    %Review{}
    |> Review.changeset(updated_attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a review.

  ## Examples

      iex> update_review(review, %{field: new_value})
      {:ok, %Review{}}

      iex> update_review(review, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_review(%Review{} = review, attrs) do
    review
    |> Review.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a review.

  ## Examples

      iex> delete_review(review)
      {:ok, %Review{}}

      iex> delete_review(review)
      {:error, %Ecto.Changeset{}}

  """
  def delete_review(%Review{} = review) do
    Repo.delete(review)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking review changes.

  ## Examples

      iex> change_review(review)
      %Ecto.Changeset{data: %Review{}}

  """
  def change_review(%Review{} = review, attrs \\ %{}) do
    Review.changeset(review, attrs)
  end
end
