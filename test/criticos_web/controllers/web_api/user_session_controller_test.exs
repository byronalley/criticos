defmodule CriticosWeb.WebAPI.UserSessionControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.AccountsFixtures

  setup do
    %{user: user_fixture()}
  end

  @invalid_attrs %{email: "xyz", password: "foo", username: "bar"}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "login user" do
    test "logs in user when data is valid", %{conn: conn, user: user} do
      %{id: id, email: email, username: username} = user
      password = valid_user_password()

      conn = post(conn, ~p"/web_api/users/log_in", user: %{email: email, password: password})

      assert %{
               "id" => ^id,
               "email" => ^email,
               "username" => ^username
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when login credentials are invalid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/users/log_in", user: @invalid_attrs)
      assert json_response(conn, 401)["errors"] == %{"detail" => "Unauthorized"}
    end

    test "logs the user in with remember me", %{conn: conn, user: user} do
      conn =
        post(conn, ~p"/web_api/users/log_in", %{
          "user" => %{
            "email" => user.email,
            "password" => valid_user_password(),
            "remember_me" => "true"
          }
        })

      assert conn.resp_cookies["_criticos_web_user_remember_me"]
    end
  end

  describe "DELETE /users/log_out" do
    test "logs the user out", %{conn: conn, user: user} do
      session =
        conn
        |> log_in_user(user)
        |> delete(~p"/web_api/users/log_out")
        |> get_session(:user_token)

      refute session
    end

    test "succeeds even if the user is not logged in", %{conn: conn} do
      conn = delete(conn, ~p"/web_api/users/log_out")

      refute get_session(conn, :user_token)
    end
  end
end
