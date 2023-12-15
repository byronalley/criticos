defmodule CriticosWeb.WebAPI.UserControllerTest do
  use CriticosWeb.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "current_user" do
    setup :register_and_log_in_user

    test "renders user when data is valid", %{conn: conn, user: user} do
      conn = get(conn, ~p"/web_api/current_user")

      %{email: email, id: id, username: username} = user

      assert %{
               "id" => ^id,
               "email" => ^email,
               "username" => ^username
             } = json_response(conn, 200)["data"]
    end
  end

  describe "show user" do
    setup :register_and_log_in_user

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
  end
end
