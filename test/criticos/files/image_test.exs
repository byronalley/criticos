defmodule Criticos.Files.ImageTest do
  use ExUnit.Case, async: true

  alias Ecto.Changeset
  alias Criticos.Files.Image

  # FIXME
  # 1. Check content type
  # 2. Create URL if there isn't one
  #   - Extract extension by content type
  #   - Prefix with UUID
  # 2. Don't allow changing url
  # 3. Images should only be created or deleted, no updating

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

    test "sets url" do
      assert %Changeset{} =
               changeset =
               Image.changeset(%Image{}, %{data: "fake_data", content_type: "image/png"})

      assert url = Changeset.get_field(changeset, :url)

      assert url =~ ~r(images/.*\.png)
    end
  end
end
