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

    test "returns an error with messages when params are wrong", %{conn: conn} do
      email = "1234"
      username = "%%%"
      password = "1234"

      user_attrs = %{
        email: email,
        username: username,
        password: password
      }

      conn =
        post(conn, ~p"/web_api/users/register", %{user: user_attrs})

      assert %{
               "email" => _,
               "password" => _,
               "username" => _
             } =
               json_response(conn, 422)["errors"]
    end

    test "fails when user already exists", %{conn: conn} do
      user_attrs = valid_user_attributes()
      user_fixture(user_attrs)

      conn =
        post(conn, ~p"/web_api/users/register", %{user: user_attrs})

      assert %{"email" => ["has already been taken"]} = json_response(conn, 422)["errors"]
    end

    test "fails if user is logged in", %{conn: conn} do
      user = user_fixture()

      conn =
        conn
        |> log_in_user(user)
        |> post(~p"/web_api/users/register", %{user: valid_user_attributes()})

      assert %{
               "error" => "Conflict",
               "message" => "User is already registered and authenticated."
             } =
               json_response(conn, 409)["errors"]
    end
  end
end
