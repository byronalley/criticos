defmodule Criticos.Accounts.UserTest do
  use Criticos.DataCase

  alias Criticos.Accounts.User
  alias Ecto.Changeset

  @valid_registration %{
    email: "foo@example.com",
    password: "some31337pa55werd",
    username: "foo"
  }

  describe "registration_changeset" do
    test "accepts valid registration" do
      assert changeset = %Changeset{} = User.registration_changeset(%User{}, @valid_registration)

      assert changeset.errors == []
    end

    test "errors on invalid registration" do
      registration = %{
        email: nil,
        password: nil,
        username: " "
      }

      assert changeset = %Changeset{} = User.registration_changeset(%User{}, registration)

      assert changeset.errors == [
               {:password, {"can't be blank", [validation: :required]}},
               {:email, {"can't be blank", [validation: :required]}},
               {:username, {"can't be blank", [validation: :required]}}
             ]
    end
  end
end
