defmodule Criticos.Files.Image do
  use Ecto.Schema
  import Ecto.Changeset
  alias Criticos.Accounts.User

  @derive {Phoenix.Param, key: :url}

  @primary_key {:url, :string, autogenerate: false}
  @foreign_key_type :binary_id
  schema "images" do
    field :data, :binary
    field :content_type, :string

    belongs_to :creator, User

    timestamps()
  end

  @doc false
  def changeset(image, attrs) do
    image
    |> cast(attrs, [:creator_id, :content_type, :data])
    |> set_url()
    |> validate_required([:url, :content_type, :data])
    |> unique_constraint(:url)
  end

  defp set_url(changeset) do
    case get_change(changeset, :content_type) do
      "image/" <> t when t in ~w[png jpeg] ->
        url = Ecto.UUID.generate() <> ".#{t}"
        put_change(changeset, :url, url)

      _ ->
        add_error(changeset, :content_type, "Invalid content type, cannot set URL")
    end
  end
end
