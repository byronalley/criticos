defmodule CriticosWeb.WebAPI.UserController do
  use CriticosWeb, :controller

  alias Criticos.Accounts

  action_fallback CriticosWeb.FallbackController

  def show(conn, %{"id" => id}) do
    with {:ok, user} <- Accounts.get_user(id) do
      render(conn, :show, user: user)
    end
  end

  def current_user(%{assigns: %{current_user: user}} = conn, _params) when is_map(user) do
    render(conn, :current_user, user: user)
  end

  def current_user(_, _params), do: {:error, :unauthorized}
end
