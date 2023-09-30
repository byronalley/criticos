defmodule Criticos.Repo do
  use Ecto.Repo,
    otp_app: :criticos,
    adapter: Ecto.Adapters.Postgres
end
