defmodule Criticos.Library.Author do
  @moduledoc """
  Author schema
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias Criticos.Accounts.User

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "authors" do
    field :name, :string
    field :birthdate, :date
    field :birthplace, :string
    field :biography, :string
    belongs_to :creator, User

    timestamps()
  end

  @doc false
  def changeset(author, attrs) do
    author
    |> cast(attrs, [:name, :birthdate, :birthplace, :biography, :creator_id])
    |> validate_required([:name])
    |> assoc_constraint(:creator)
  end
end
