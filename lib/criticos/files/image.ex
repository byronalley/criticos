defmodule Criticos.Files.Image do
  use Ecto.Schema
  import Ecto.Changeset
  alias Criticos.Accounts.User

  @derive {Phoenix.Param, key: :filename}

  @primary_key {:filename, :string, autogenerate: false}
  @foreign_key_type :binary_id

  schema "images" do
    field :data, :binary
    field :content_type, :string
    field :url, :string, virtual: true

    belongs_to :creator, User

    timestamps()
  end

  @doc false
  def changeset(image, attrs) do
    image
    |> cast(attrs, [:creator_id, :content_type, :data])
    |> set_filename()
    |> set_url_for_changeset()
    |> validate_required([:filename, :content_type, :data])
    |> unique_constraint(:url)
  end

  defp set_filename(changeset) do
    case get_change(changeset, :content_type) do
      "image/" <> t when t in ~w[png jpeg gif] ->
        filename = Ecto.UUID.generate() <> ".#{t}"
        put_change(changeset, :filename, filename)

      _ ->
        add_error(changeset, :content_type, "Invalid content type")
    end
  end

  defp set_url_for_changeset(changeset) do
    case get_field(changeset, :filename) do
      nil -> changeset
      filename -> put_change(changeset, :url, to_url(filename))
    end
  end

  @doc """
  Set the virtual field url for an image
  """
  def set_url(%__MODULE__{filename: filename} = image), do: %{image | url: to_url(filename)}

  defp to_url(filename), do: "/images/" <> filename
end
