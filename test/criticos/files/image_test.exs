defmodule Criticos.Files.ImageTest do
  use ExUnit.Case, async: true

  alias Criticos.Files.Image

  #FIXME
  # 1. Check content type
  # 2. Create URL if there isn't one
  #   - Extract extension by content type
  #   - Prefix with UUID
  # 2. Don't allow changing url
  # 3. Images should only be created or deleted, no updating

  describe "changeset/2" do
    test "sets url for allowed content types" do
      for allowed <- [
        "image/png",
        "image/jpeg"
      ] do
        assert changeset = Image.changeset(%Image{}, %{data: "fake_data", content_type: allowed})

        assert [] = changeset.errors
      end

      for invalid <- [
        "application/json",
        "image/svg"
      ] do
        assert changeset = Image.changeset(%Image{}, %{data: "fake_data", content_type: invalid})

        assert changeset.errors == [
          {:url, {"can't be blank", [validation: :required]}},
          {:content_type, {"Invalid content type, cannot set URL", []}}
        ]
      end
    end
  end
end
