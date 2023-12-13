defmodule CriticosWeb.WebAPI.UserSessionControllerTest do
  use CriticosWeb.ConnCase

  import Criticos.AccountsFixtures

  alias Criticos.Accounts.User

  @create_attrs %{
    email: "some email",
    password: "some password",
    username: "some username"
  }
  @update_attrs %{
    email: "some updated email",
    password: "some updated password",
    username: "some updated username"
  }
  @invalid_attrs %{email: nil, password: nil, username: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/users", user: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/web_api/users/#{id}")

      assert %{
               "id" => ^id,
               "email" => "some email",
               "password" => "some password",
               "username" => "some username"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/web_api/users", user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user", %{conn: conn, user: user} do
      conn = delete(conn, ~p"/web_api/users/#{user}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/web_api/users/#{user}")
      end
    end
  end

  defp create_user(_) do
    user = user_fixture()
    %{user: user}
  end
end
