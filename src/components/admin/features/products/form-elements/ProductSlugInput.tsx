"use client";
import React, { FC } from "react";
import { InputWithLabel } from "../../../ui/form";
import { Editor } from "@/types/common";
import { cn } from "@/lib/utils";
import WithError from "@/components/admin/ui/form/WithError";

const ProductSlugInput: FC<
  Editor & {
    onGenerateSlug(): void;
  }
> = ({ value, onChange, error, onGenerateSlug }) => {
  return (
    <InputWithLabel label="Đường dẫn sản phẩm" required>
      <WithError error={error}>
        <div className="join w-full">
          <input
            name="slug"
            type="email"
            className={cn(
              "flex-1 input w-full join-item",
              error ? "input-error" : "",
            )}
            placeholder="Đường dẫn sản phẩm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-neutral join-item"
            onClick={onGenerateSlug}
          >
            Tạo đường dẫn
          </button>
        </div>
      </WithError>
    </InputWithLabel>
  );
};

export default ProductSlugInput;
