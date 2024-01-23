defmodule CriticosWeb.WebAPI.UserRegistrationControllerTest do
  use CriticosWeb.ConnCase

  alias Criticos.Accounts

  import Criticos.AccountsFixtures

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create" do
    test "creates a new users", %{conn: conn} do
      %{email: email, username: username} = user_attrs = valid_user_attributes()

      conn =
        post(conn, ~p"/web_api/users/register", %{user: user_attrs})

      assert %{
               "id" => id,
               "email" => ^email,
               "username" => ^username
             } = json_response(conn, 201)["data"]

      assert {:ok, _user} = Accounts.get_user(id)

      # Check that we also get logged in
      conn = get(conn, ~p"/web_api/current_user")

      assert json_response(conn, 200)["data"]
    end
  end
end
