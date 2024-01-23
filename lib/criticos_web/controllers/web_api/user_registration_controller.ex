defmodule CriticosWeb.WebAPI.UserRegistrationController do
  use CriticosWeb, :controller

  alias Criticos.Accounts
  alias CriticosWeb.UserAuth

  action_fallback CriticosWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    with {:ok, user} <- Accounts.register_user(user_params) do
      {:ok, _} =
        Accounts.deliver_user_confirmation_instructions(
          user,
          &url(~p"/users/confirm/#{&1}")
        )

      conn
      |> UserAuth.log_in_user_web_api(user)
      |> put_status(:created)
      |> put_view(CriticosWeb.WebAPI.UserJSON)
      |> render(:current_user, user: user)
    end
  end
end
