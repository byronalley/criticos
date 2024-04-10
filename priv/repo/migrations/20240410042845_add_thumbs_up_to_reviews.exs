defmodule Criticos.Repo.Migrations.AddThumbsUpToReviews do
  use Ecto.Migration

  def change do
    alter table("reviews") do
      add :thumbs_up, :boolean, default: false, null: false
    end
  end
end
