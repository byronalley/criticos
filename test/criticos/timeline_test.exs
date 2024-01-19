defmodule Criticos.TimelineTest do
  use Criticos.DataCase

  alias Criticos.Timeline

  import Criticos.LibraryFixtures

  describe "reviews" do
    alias Criticos.Timeline.Review

    import Criticos.TimelineFixtures

    @invalid_attrs %{content: nil, rating: nil, private_notes: nil}

    test "list_reviews/0 returns all reviews with google_volume_id" do
      google_volume_id = "abc123"
      book = book_fixture(%{google_volume_id: google_volume_id})

      review =
        %{review_fixture(%{book_id: book.id}) | google_volume_id: google_volume_id}

      assert Timeline.list_reviews() == [review]
    end

    test "get_review!/1 returns the review with given id" do
      book = book_fixture()

      review = review_fixture(%{book_id: book.id})

      assert Timeline.get_review!(review.id) == review
    end

    test "create_review/1 with valid data creates a review" do
      valid_attrs = %{
        content: "some content",
        rating: 2,
        private_notes: "some private_notes",
        book_id: book_fixture().id
      }

      assert {:ok, %Review{} = review} = Timeline.create_review(valid_attrs)
      assert review.content == "some content"
      assert review.rating == 2
      assert review.private_notes == "some private_notes"
    end

    test "create_review/1 with google_volume_id of existing book sets book_id" do
      google_volume_id = "google_volume_id"
      %{id: book_id} = book_fixture(%{google_volume_id: google_volume_id})

      valid_attrs = %{
        content: "some content",
        rating: 2,
        private_notes: "some private_notes",
        google_volume_id: google_volume_id
      }

      assert {:ok, %Review{book_id: ^book_id}} = Timeline.create_review(valid_attrs)
    end

    test "create_review/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Timeline.create_review(@invalid_attrs)
    end

    test "update_review/2 with valid data updates the review" do
      review = review_fixture()

      update_attrs = %{
        content: "some updated content",
        rating: 3,
        private_notes: "some updated private_notes"
      }

      assert {:ok, %Review{} = review} = Timeline.update_review(review, update_attrs)
      assert review.content == "some updated content"
      assert review.rating == 3
      assert review.private_notes == "some updated private_notes"
    end

    test "update_review/2 with invalid data returns error changeset" do
      review = review_fixture()
      assert {:error, %Ecto.Changeset{}} = Timeline.update_review(review, @invalid_attrs)
      assert review == Timeline.get_review!(review.id)
    end

    test "delete_review/1 deletes the review" do
      review = review_fixture()
      assert {:ok, %Review{}} = Timeline.delete_review(review)
      assert_raise Ecto.NoResultsError, fn -> Timeline.get_review!(review.id) end
    end

    test "change_review/1 returns a review changeset" do
      review = review_fixture()
      assert %Ecto.Changeset{} = Timeline.change_review(review)
    end

    test "get_review_with_google_volume_id/1 sets google_volume_id virtual field" do
      google_volume_id = "abc123"

      review = review_fixture(%{google_volume_id: google_volume_id})

      assert %{google_volume_id: google_volume_id} = review

      assert {:ok, %{google_volume_id: ^google_volume_id}} =
               Timeline.get_review_with_google_volume_id(review.id)
    end

    test "get_review_with_google_volume_id/1 returns error tuple when not found" do
      bad_id = "deadbeef-0404-0404-0404-deadbeafdead"

      assert {:error, :not_found} =
               Timeline.get_review_with_google_volume_id(bad_id)
    end
  end
end
