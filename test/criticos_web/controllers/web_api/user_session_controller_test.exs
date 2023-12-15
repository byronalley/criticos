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
  end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user", %{conn: conn, user: _user} do
      conn = delete(conn, ~p"/web_api/users/log_out")
      assert response(conn, 204)

      # FIXME
      # assert_error_sent 404, fn ->
      #   get(conn, ~p"/web_api/users/#{user}")
      # end
    end
  end

  defp create_user(_) do
    user = user_fixture()
    %{user: user}
  end
end
