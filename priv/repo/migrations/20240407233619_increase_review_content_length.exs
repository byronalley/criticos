defmodule Criticos.Repo.Migrations.IncreaseReviewContentLength do
  use Ecto.Migration

  def change do
    alter table("reviews") do
      modify :content, :string, size: 256, null: false, from: {:string, size: 100, null: false}
    end
  end
end
