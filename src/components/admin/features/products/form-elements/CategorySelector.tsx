"use client";
import React, { useCallback, useRef } from "react";
import { LayoutRef } from "@/components/admin/ui/layout";
import { Label, Select } from "@/components/admin/ui/form";
import CreateCategory from "../CreateCategory";
import useFetchAllCategories from "@/hooks/admin/features/categories/useFetchAllCategories";
import { useProductDetailsContext } from "../ProductDetailsProvider";
import { Controller, useController } from "react-hook-form";
import { IconButton } from "@/components/admin/ui/button";
import WithError from "@/components/admin/ui/form/WithError";

const CategorySelector = () => {
  const { control } = useProductDetailsContext();
  const modalRef = useRef<LayoutRef>(null);
  const { data = [] } = useFetchAllCategories();

  const {
    field: { onChange },
  } = useController({
    control,
    name: "categoryId",
  });

  const onSuccess = useCallback(
    (id: number) => {
      onChange(id);
      modalRef.current?.close();
    },
    [onChange],
  );

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>
            Nhóm món ăn <span className="text-error">*</span>
          </Label>
          <IconButton icon="ph:plus" onClick={() => modalRef.current?.open()} />
        </div>
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <WithError error={error}>
              <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={error ? "input-error" : ""}
              >
                {data.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </WithError>
          )}
        />
      </div>
      <CreateCategory ref={modalRef} onSuccess={onSuccess} />
    </>
  );
};

export default CategorySelector;
