defmodule Criticos.Timeline.ReviewTest do
  use ExUnit.Case, async: true

  alias Ecto.Changeset
  alias Criticos.Timeline.Review

  @valid_params %{
    content: "Some content",
    rating: 4,
    book_id: Ecto.UUID.generate(),
    creator_id: Ecto.UUID.generate()
  }

  @valid_review Map.merge(%Review{}, @valid_params)

  describe "changeset/2" do
    test "rating must be between 0 and 4" do
      for bad_value <- [-1, 5] do
        assert(
          %Changeset{errors: [rating: {"must be between 0 and 4", _}]} =
            Review.changeset(@valid_review, %{rating: bad_value})
        )
      end
    end

    test "requires book_id, content, creator_id, rating" do
      required = ~w[book_id content creator_id rating]a

      for f <- required do
        invalid =
          Map.put(@valid_params, f, nil)

        assert match?(
                 %Changeset{
                   valid?: false,
                   errors: [{^f, {"can't be blank", [validation: :required]}}]
                 },
                 Review.changeset(%Review{}, invalid)
               ),
               "#{inspect(f)} should be required"
      end
    end

    test "max 100 chars" do
      assert %Changeset{
               valid?: false,
               errors: [
                 {:content,
                  {"should be at most" <> _, [{:count, 100}, {:validation, :length} | _]}}
               ]
             } =
               Review.changeset(
                 @valid_review,
                 %{content: String.duplicate("x", 101)}
               )
    end
  end
end
