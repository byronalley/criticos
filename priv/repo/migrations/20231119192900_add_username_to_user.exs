defmodule Criticos.Repo.Migrations.AddUsernameToUser do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :username, :string, size: 64, null: false
    end

    create unique_index("users", [:username])
  end
end
