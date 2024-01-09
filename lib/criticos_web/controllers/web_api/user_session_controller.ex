defmodule CriticosWeb.WebAPI.UserSessionController do
  use CriticosWeb, :controller

  alias Criticos.Accounts
  alias CriticosWeb.UserAuth

  require Logger

  action_fallback CriticosWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> UserAuth.log_in_user_web_api(user, user_params)
      |> render(:show, user: user)
    else
      Logger.error("Unsuccessful login attempt with email=#{inspect(email)}")
      {:error, :unauthorized}
    end
  end

  def delete(%{assigns: %{current_user: user}} = conn, _) do
    case user do
      %{id: id, username: username} ->
        Logger.info("Logout from username=#{username}, id=#{id}")

        conn
        |> UserAuth.log_out_user_web_api()
        |> send_resp(:no_content, "")

      _ ->
        Logger.error("Attempted to logout with no current user")
        {:error, :unauthorized}
    end
  end
end
