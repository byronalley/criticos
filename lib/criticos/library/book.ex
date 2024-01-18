defmodule Criticos.Library.Book do
  @moduledoc """
  Book schema
  """
  use Ecto.Schema

  alias Criticos.Accounts.User
  alias Criticos.Library.Author

  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "books" do
    field :title, :string
    field :year, :integer
    field :summary, :string
    field :isbn, :string
    field :google_volume_id, :string
    field :image_url, :string

    belongs_to :author, Author
    belongs_to :creator, User

    timestamps()
  end

  @doc false
  def changeset(book, attrs) do
    book
    |> cast(attrs, [
      :title,
      :year,
      :isbn,
      :summary,
      :image_url,
      :author_id,
      :creator_id,
      :google_volume_id
    ])
    |> validate_one_required([:title, :isbn, :google_volume_id])
    |> assoc_constraint(:author)
    |> assoc_constraint(:creator)
  end

  defp validate_one_required(changeset, fields) do
    if Enum.any?(fields, &get_field(changeset, &1)) do
      changeset
    else
      Enum.reduce(fields, changeset, fn field, changeset ->
        add_error(
          changeset,
          field,
          "At least one of #{inspect(fields)} must not be blank"
        )
      end)
    end
  end
end
