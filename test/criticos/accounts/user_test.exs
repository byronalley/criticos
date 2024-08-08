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

  describe "photo_url_changeset" do
    test "accepts valid url" do
      assert changeset =
               User.photo_url_changeset(%User{}, %{photo_url: "http://foo.bar/image.png"})

      assert changeset.errors == []
    end
  end

  test "rejects invalid url" do
    assert [{:photo_url, {"has invalid format", _}}] =
             User.photo_url_changeset(%User{}, %{photo_url: "123"}).errors
  end

  test "allows unsetting url" do
    assert User.photo_url_changeset(%User{}, %{photo_url: nil}).errors == []
  end
end
