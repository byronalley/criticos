defmodule Criticos.FilesTest do
  use Criticos.DataCase

  alias Criticos.Files

  describe "images" do
    alias Criticos.Files.Image

    import Criticos.FilesFixtures

    @invalid_attrs %{data: nil, content_type: nil}

    test "list_images/0 returns all images" do
      image = image_fixture()
      assert Files.list_images() == [image]
    end

    test "get_image/1 returns the image with given filename" do
      image = image_fixture()

      assert {:ok, ^image} = Files.get_image(image.filename)
    end

    test "get_image!/1 returns the image with given filename" do
      image = image_fixture()

      assert Files.get_image!(image.filename) == image
    end

    test "create_image/1 with valid data creates a image" do
      valid_attrs = %{
        data: "some data",
        content_type: "image/jpeg"
      }

      assert {:ok, %Image{} = image} = Files.create_image(valid_attrs)
      assert image.data == "some data"
      assert image.filename
      assert image.content_type == "image/jpeg"
      assert image.url =~ image.filename
    end

    test "create_image/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Files.create_image(@invalid_attrs)
    end

    test "delete_image/1 deletes the image" do
      image = image_fixture()
      assert {:ok, %Image{}} = Files.delete_image(image)
      assert_raise Ecto.NoResultsError, fn -> Files.get_image!(image.filename) end
    end

    test "change_image/1 returns a image changeset" do
      image = image_fixture()
      assert %Ecto.Changeset{} = Files.change_image(image)
    end
  end
end
