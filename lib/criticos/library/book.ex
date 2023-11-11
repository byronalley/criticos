defmodule Criticos.Library.Book do
  @moduledoc """
  Book schema
  """
  use Ecto.Schema

  alias Criticos.Accounts.User
  alias Criticos.Library.Author
  alias Criticos.Files.Image

  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "books" do
    field :title, :string
    field :year, :integer
    field :summary, :string
    field :isbn, :string

    belongs_to :author, Author
    belongs_to :creator, User
    belongs_to :image_url, Image, references: :url, type: :string

    timestamps()
  end

  @doc false
  def changeset(book, attrs) do
    book
    |> cast(attrs, [:title, :year, :isbn, :summary])
    |> validate_required([:title])
    |> assoc_constraint(:author)
    |> assoc_constraint(:creator)
  end
end
