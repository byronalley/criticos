defmodule Criticos.TimelineFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Criticos.Timeline` context.
  """

  @doc """
  Generate a review.
  """
  def review_fixture(attrs \\ %{}) do
    book_id = attrs[:book_id] || attrs[:book][:id] || Criticos.LibraryFixtures.book_fixture().id
    creator_id = attrs[:creator_id] || Criticos.AccountsFixtures.user_fixture().id

    {:ok, review} =
      attrs
      |> Enum.into(%{
        creator_id: creator_id,
        book_id: book_id,
        content: "some content",
        private_notes: "some private_notes",
        rating: 4,
        thumbs_up: true
      })
      |> Criticos.Timeline.create_review()

    review
  end
end
