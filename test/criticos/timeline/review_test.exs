defmodule Criticos.Timeline.ReviewTest do
  use ExUnit.Case, async: true

  alias Ecto.Changeset
  alias Criticos.Timeline.Review

  @valid_review %Review{
    content: "Some content",
    rating: 4
  }

  describe "changeset/2" do
    test "rating must be between 0 and 4" do
      for bad_value <- [-1, 5] do
        assert(
          %Changeset{errors: [rating: {"must be between 0 and 4", _}]} =
            Review.changeset(@valid_review, %{rating: bad_value})
        )
      end
    end
  end
end
