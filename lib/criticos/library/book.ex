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
    |> validate_required([:title])
    |> assoc_constraint(:author)
    |> assoc_constraint(:creator)
  end
end
