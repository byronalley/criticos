defmodule Criticos.AccountsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Criticos.Accounts` context.
  """

  def unique_username, do: "user#{Enum.random(~w[a b c d e])}_#{System.unique_integer()}"
  def unique_user_email, do: "#{unique_username()}@example.com"
  def unique_user_email(username), do: "#{username}@example.com"
  def valid_user_password, do: "hello world!"

  def valid_user_attributes(attrs \\ %{}) do
    username = unique_username()

    Enum.into(attrs, %{
      username: username,
      email: unique_user_email(username),
      password: valid_user_password()
    })
  end

  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> valid_user_attributes()
      |> Criticos.Accounts.register_user()

    user
  end

  def extract_user_token(fun) do
    {:ok, captured_email} = fun.(&"[TOKEN]#{&1}[TOKEN]")
    [_, token | _] = String.split(captured_email.text_body, "[TOKEN]")
    token
  end
end
