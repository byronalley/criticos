defmodule CriticosWeb.WebAPI.UserController do
  use CriticosWeb, :controller

  action_fallback CriticosWeb.FallbackController

  def current_user(%{assigns: %{current_user: user}} = conn, _params) do
    render(conn, :show, user: user)
  end
end
