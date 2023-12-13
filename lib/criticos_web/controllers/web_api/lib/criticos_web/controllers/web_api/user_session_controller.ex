defmodule CriticosWeb.WebAPI.UserSessionController do
  use CriticosWeb, :controller

  alias Criticos.Accounts
  alias Criticos.Accounts.User

  action_fallback CriticosWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/web_api/users/#{user}")
      |> render(:show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
