defmodule Criticos.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images, primary_key: false) do
      add :filename, :string, primary_key: true
      add :content_type, :string
      add :data, :binary
      add :creator_id, references(:users, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:images, [:creator_id])
  end
end
