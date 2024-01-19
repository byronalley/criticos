defmodule Criticos.Timeline.Review do
  @moduledoc """
  Review schema
  """
  use Ecto.Schema

  alias Criticos.Accounts.User
  alias Criticos.Library.Book

  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "reviews" do
    field :content, :string
    field :rating, :integer
    field :private_notes, :string

    field :google_volume_id, :string, virtual: true

    belongs_to :creator, User
    belongs_to :book, Book

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    review
    |> cast(attrs, [:content, :rating, :private_notes, :book_id])
    |> validate_required([:content, :rating, :book_id])
    |> validate_number(:rating,
      greater_than_or_equal_to: 0,
      less_than: 5,
      message: "must be between 0 and 4"
    )
    |> assoc_constraint(:creator)
    |> assoc_constraint(:book)
  end
end
