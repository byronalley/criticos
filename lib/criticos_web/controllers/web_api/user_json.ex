defmodule CriticosWeb.WebAPI.UserJSON do
  alias Criticos.Accounts.User

  @doc """
  Renders a list of users.
  """
  def index(%{users: users}) do
    %{data: for(user <- users, do: public_data(user))}
  end

  @doc """
  Renders the *current* user
  """
  def current_user(%{user: user}) do
    %{
      data: %{
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
  end

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: public_data(user)}
  end

  defp public_data(%User{} = user) do
    %{
      id: user.id,
      username: user.username
    }
  end
end
