defmodule CriticosWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use CriticosWeb, :controller

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(json: CriticosWeb.ChangesetJSON)
    |> render(:error, changeset: changeset)
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(html: CriticosWeb.ErrorHTML, json: CriticosWeb.ErrorJSON)
    |> render(:"404")
  end

  # Unauthorized
  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> put_view(html: CriticosWeb.ErrorHTML, json: CriticosWeb.ErrorJSON)
    |> render(:"401")
  end

  # Generic
  def call(conn, {:error, error_code}) do
    conn
    |> put_status(error_code)
    |> put_view(html: CriticosWeb.ErrorHTML, json: CriticosWeb.ErrorJSON)
    |> render(error_code)
  end
end
