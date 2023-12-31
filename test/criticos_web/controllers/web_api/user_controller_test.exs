defmodule CriticosWeb.WebAPI.UserControllerTest do
  use CriticosWeb.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "current_user" do
    test "renders user when data is valid", %{conn: conn} do
      %{conn: conn, user: user} = register_and_log_in_user(%{conn: conn})

      conn = get(conn, ~p"/web_api/current_user")

      %{email: email, id: id, username: username} = user

      assert %{
               "id" => ^id,
               "email" => ^email,
               "username" => ^username
             } = json_response(conn, 200)["data"]
    end

    test "returns 401 when not logged in", %{conn: conn} do
      conn = get(conn, ~p"/web_api/current_user")

      assert %{} = json_response(conn, 401)
    end
  end

  describe "show user" do
    setup [:user]

    test "renders public data for an existing user", %{conn: conn, user: user} do
      %{id: id, username: username} = user

      conn = get(conn, ~p"/web_api/users/#{user}")

      data = json_response(conn, 200)["data"]

      assert %{
               "id" => ^id,
               "username" => ^username
             } = data

      # Should not include private data
      refute data["email"]
    end

    test "returns 404 not found if user doesn't exist", %{conn: conn} do
      conn = get(conn, ~p"/web_api/users/#{Ecto.UUID.generate()}")

      assert %{"detail" => "Not Found"} = json_response(conn, 404)["errors"]
    end
  end
end
