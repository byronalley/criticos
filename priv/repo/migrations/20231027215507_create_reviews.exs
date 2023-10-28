defmodule Criticos.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :content, :string, size: 100, null: false
      add :rating, :integer, null: false
      add :private_notes, :text
      add :creator_id, references(:users, on_delete: :nothing, type: :binary_id)
      add :book_id, references(:books, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:reviews, [:creator_id])
    create index(:reviews, [:book_id])
  end
end
