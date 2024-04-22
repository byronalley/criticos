defmodule Criticos.Repo.Migrations.MakeRatingsNullable do
  use Ecto.Migration

  def change do
    alter table(:reviews) do
      modify :rating, :integer, null: true, from: {:integer, null: false}
    end
  end
end
