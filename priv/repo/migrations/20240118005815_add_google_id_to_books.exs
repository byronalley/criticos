defmodule Criticos.Repo.Migrations.AddGoogleIdToBooks do
  use Ecto.Migration

  def change do
    alter table("books") do
      add :google_volume_id, :string, size: 64
    end

    create unique_index("books", [:google_volume_id])
  end
end
