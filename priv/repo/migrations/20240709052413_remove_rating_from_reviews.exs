defmodule Criticos.Repo.Migrations.RemoveRatingFromReviews do
  use Ecto.Migration

  def change do
    alter table("reviews") do
      remove :rating, :integer, null: false, default: 0
    end
  end
end
