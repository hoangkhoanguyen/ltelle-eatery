"use client";
import { LayoutRef, LayoutWithRef, Modal } from "@/components/admin/ui/layout";
import useCreateCategoryForm from "@/hooks/admin/features/categories/useCreateCategoryForm";
import React, { forwardRef, memo, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/admin/ui/button";
import { Input, InputWithLabel } from "../../ui/form";
import WithError from "../../ui/form/WithError";
import { AdminCreateProductCategoryForm } from "@/types/products";
import useAddProductCategory from "@/hooks/admin/features/categories/useAddProductCategory";
import { toast } from "sonner";

interface Props {
  onSuccess(id: number): void;
}

const CreateCategory = memo(
  forwardRef<LayoutRef, Props>(({ onSuccess }, ref) => {
    const { control, reset, handleSubmit } = useCreateCategoryForm();
    const { mutate } = useAddProductCategory();

    const onAfterClose = useCallback(() => {
      reset();
    }, [reset]);

    const onSubmit = (data: AdminCreateProductCategoryForm) => {
      mutate(data, {
        onSuccess(result) {
          toast.success("Thêm nhóm món ăn thành công");
          onSuccess(result.newCategory.id);
        },
        onError() {
          toast.success("Có lỗi xảy ra");
        },
      });
    };

    return (
      <LayoutWithRef ref={ref} Component={Modal} afterClose={onAfterClose}>
        <div className="card bg-white grid grid-cols-1 gap-4 w-sm">
          <div className="card-body">
            <p className="card-title">Thêm nhóm món ăn</p>
            <Controller
              control={control}
              name="name"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <WithError error={error}>
                  <InputWithLabel label="Tên danh mục" required>
                    <Input
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className={error ? "input-error" : ""}
                    />
                  </InputWithLabel>
                </WithError>
              )}
            />
            <div className="card-actions justify-end mt-2">
              <Button onClick={handleSubmit(onSubmit)} color="success">
                Thêm
              </Button>
            </div>
          </div>
        </div>
      </LayoutWithRef>
    );
  }),
);

export default CreateCategory;

CreateCategory.displayName = "CreateCategory";
