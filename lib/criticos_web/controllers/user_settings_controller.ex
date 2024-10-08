defmodule CriticosWeb.UserSettingsController do
  use CriticosWeb, :controller

  alias Criticos.Accounts
  alias Criticos.Files
  alias Criticos.Files.Image
  alias CriticosWeb.UserAuth

  plug :assign_user_changesets

  def edit(conn, _params) do
    render(conn, :edit)
  end

  def update(conn, %{"action" => "update_email"} = params) do
    %{"current_password" => password, "user" => user_params} = params
    user = conn.assigns.current_user

    case Accounts.apply_user_email(user, password, user_params) do
      {:ok, applied_user} ->
        Accounts.deliver_user_update_email_instructions(
          applied_user,
          user.email,
          &url(~p"/users/settings/confirm_email/#{&1}")
        )

        conn
        |> put_flash(
          :info,
          "A link to confirm your email change has been sent to the new address."
        )
        |> redirect(to: ~p"/users/settings")

      {:error, changeset} ->
        render(conn, :edit, email_changeset: changeset)
    end
  end

  def update(conn, %{"action" => "update_password"} = params) do
    %{"current_password" => password, "user" => user_params} = params
    user = conn.assigns.current_user

    case Accounts.update_user_password(user, password, user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Password updated successfully.")
        |> put_session(:user_return_to, ~p"/users/settings")
        |> UserAuth.log_in_user(user)

      {:error, changeset} ->
        render(conn, :edit, password_changeset: changeset)
    end
  end

  def update(
        conn,
        %{
          "action" => "update_photo",
          "user" => %{
            "photo" => %Plug.Upload{path: path, content_type: content_type}
          }
        }
      ) do
    user = conn.assigns.current_user

    file_data = File.read!(path)

    image_params = %{data: file_data, content_type: content_type, creator_id: user.id}

    with {:ok, %Image{} = image} <-
           Files.create_image(image_params),
         {:ok, _user} <- Accounts.update_user_photo_url(user, image.url) do
      conn
      |> put_flash(:info, "Photo updated successfully.")
      |> redirect(to: ~p"/users/settings")
    else
      {:error, _changeset} ->
        conn
        |> put_flash(:error, "Error uploading file.")
        |> redirect(to: ~p"/users/settings")
    end
  end

  def confirm_email(conn, %{"token" => token}) do
    case Accounts.update_user_email(conn.assigns.current_user, token) do
      :ok ->
        conn
        |> put_flash(:info, "Email changed successfully.")
        |> redirect(to: ~p"/users/settings")

      :error ->
        conn
        |> put_flash(:error, "Email change link is invalid or it has expired.")
        |> redirect(to: ~p"/users/settings")
    end
  end

  defp assign_user_changesets(conn, _opts) do
    user = conn.assigns.current_user

    conn
    |> assign(:email_changeset, Accounts.change_user_email(user))
    |> assign(:password_changeset, Accounts.change_user_password(user))
    |> assign(:photo_url_changeset, Accounts.change_user_photo_url(user))
  end
end
