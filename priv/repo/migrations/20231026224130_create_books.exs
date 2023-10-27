defmodule Criticos.Repo.Migrations.CreateBooks do
  use Ecto.Migration

  def change do
    create table(:books, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :string
      add :year, :integer
      add :isbn, :string
      add :summary, :text
      add :author_id, references(:authors, on_delete: :nothing, type: :binary_id)
      add :creator_id, references(:users, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:books, [:author_id])
    create index(:books, [:creator_id])
  end
end
