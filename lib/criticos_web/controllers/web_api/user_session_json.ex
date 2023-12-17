defmodule CriticosWeb.WebAPI.UserSessionJSON do
  @moduledoc false

  @doc """
  Payload returned on user auth
  """
  def show(%{user: user}) do
    %{data: Map.take(user, [:id, :username, :email])}
  end
end
