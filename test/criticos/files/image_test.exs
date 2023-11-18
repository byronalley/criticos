defmodule Criticos.Files.ImageTest do
  use ExUnit.Case, async: true

  alias Ecto.Changeset
  alias Criticos.Files.Image

  describe "changeset/2" do
    test "sets filename for allowed content types" do
      for allowed <- [
            "image/png",
            "image/jpeg"
          ] do
        assert %Changeset{} =
                 changeset =
                 Image.changeset(%Image{}, %{data: "fake_data", content_type: allowed})

        assert [] = changeset.errors
      end

      for invalid <- [
            "application/json",
            "image/svg"
          ] do
        assert %Changeset{} =
                 changeset =
                 Image.changeset(%Image{}, %{data: "fake_data", content_type: invalid})

        assert changeset.errors == [
                 {:filename, {"can't be blank", [validation: :required]}},
                 {:content_type, {"Invalid content type, cannot set URL", []}}
               ]
      end
    end
  end

  describe "set_url/1" do
    test "sets url" do
      image = %Image{filename: "foo.jpg", content_type: "image/jpeg"}

      assert %Image{url: "images/foo.jpg"} = Image.set_url(image)
    end
  end
end
