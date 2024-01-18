defmodule Criticos.Timeline.ReviewTest do
  use ExUnit.Case, async: true

  alias Ecto.Changeset
  alias Criticos.Timeline.Review

  @valid_review %Review{
    content: "Some content",
    rating: 4,
    book_id: Ecto.UUID.generate()
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

    test "requires content, rating and book_id" do
      valid_params = %{
        content: "Some content",
        rating: 4,
        book_id: Ecto.UUID.generate()
      }

      required = ~w[rating content book_id]a

      for f <- required do
        invalid =
          Map.put(valid_params, f, nil)

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
  end
end
