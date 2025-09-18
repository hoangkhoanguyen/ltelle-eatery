"use client";
import { useImgLibraryContext } from "@/components/admin/shared/image-library/ImageLibraryProvider";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useProductDetailsContext } from "../ProductDetailsProvider";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/admin/ui/button";
import { deleteProductImagesAction } from "@/actions/admin/product";
import { toast } from "sonner";

const ImagesEditor = () => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const [isDeleting, setDeleting] = useState(false);

  const { openLibrary } = useImgLibraryContext();

  const { control } = useProductDetailsContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
    keyName: "uid",
  });

  const onAddImages = (imgs: string[]) => {
    append(
      imgs.map((item) => ({
        url: item,
      })),
    );
  };

  const onOpenLibrary = () => {
    openLibrary(onAddImages);
  };

  const onDeleteSuccess = () => {
    toast.success("Xóa ảnh thành công");

    // reset
    setSelectedImages([]);

    // remove in control
    remove(selectedImages);
  };

  const onRemoveImages = async () => {
    const savedIds = fields
      .filter((item, index) => selectedImages.includes(index) && item.id)
      .map((item) => item.id!);

    if (savedIds.length === 0) {
      onDeleteSuccess();
      return;
    }
    setDeleting(true);
    // call server actions
    const result = await deleteProductImagesAction(savedIds);

    // on success
    if (result.result === "success") {
      onDeleteSuccess();
      setDeleting(false);
      return;
    }

    // TODO: toast

    // giữ lại image cũ
    setSelectedImages((p) => p.filter((item) => fields[item].id));

    // remove in control
    remove(selectedImages.filter((item) => !fields[item].id));
    setDeleting(false);
  };

  const onClickImage = (index: number) => {
    setSelectedImages((p) =>
      p.includes(index) ? p.filter((item) => item !== index) : [...p, index],
    );
  };

  const isProcessing = useMemo(() => isDeleting, [isDeleting]);

  return (
    <div className="card bg-white">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <p className="card-title">Hình ảnh sản phẩm</p>

          <Button
            disabled={selectedImages.length === 0 || isProcessing}
            onClick={onRemoveImages}
            color="error"
          >
            Xóa
          </Button>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
          {fields.map((field, index) => (
            <div
              key={field.uid}
              className={cn(
                "aspect-square",
                index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1",
              )}
            >
              <ImageItem
                url={field.url}
                onClick={() => {
                  if (!isProcessing) onClickImage(index);
                }}
                isSelected={selectedImages.includes(index)}
              />
            </div>
          ))}
          <div className="col-span-1 row-span-1 aspect-square">
            <button
              type="button"
              disabled={selectedImages.length > 0 || isProcessing}
              onClick={onOpenLibrary}
              className={cn(
                "w-full h-full border-dashed border border-gray-300 hover:bg-gray-200 duration-200",
                "rounded flex justify-center items-center",
              )}
            >
              <Icon icon="ph:plus" className="text-3xl text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesEditor;

function ImageItem({
  url,
  onClick,
  isSelected,
}: {
  url: string;
  onClick(): void;
  isSelected?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded overflow-hidden aspect-square duration-200 hover:bg-gray-300 relative group",
        "cursor-pointer w-full h-full",
      )}
    >
      <Image
        src={url}
        fill
        alt=""
        className="group-hover:brightness-75 duration-200 object-contain"
      />
      <span
        className={cn(
          "absolute top-2 start-2 duration-200",
          isSelected ? "" : "group-hover:opacity-100 opacity-0",
        )}
      >
        <input
          type="checkbox"
          checked={isSelected}
          className="checkbox checkbox-primary"
        />
      </span>
    </div>
  );
}
