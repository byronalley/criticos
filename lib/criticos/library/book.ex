defmodule Criticos.Library.Book do
  use Ecto.Schema
  alias Criticos.Library.Author
  alias Criticos.Accounts.User
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
