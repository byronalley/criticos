defmodule Criticos.Repo.Migrations.CreateAuthors do
  use Ecto.Migration

  def change do
    create table(:authors, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :text
      add :birthdate, :date
      add :birthplace, :text
      add :biography, :text
      add :creator_id, references(:users, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:authors, [:creator_id])
  end
end
