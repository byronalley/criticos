defmodule CriticosWeb.WebAPI.UserSessionController do
  use CriticosWeb, :controller

  alias Criticos.Accounts
  alias CriticosWeb.UserAuth

  action_fallback CriticosWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> UserAuth.log_in_user_web_api(user, user_params)
      |> render(:show, user: user)
    else
      {:error, :unauthorized}
    end
  end

  def delete(conn, _) do
    conn
    |> UserAuth.log_out_user_web_api()
    |> send_resp(:no_content, "")
  end
end
