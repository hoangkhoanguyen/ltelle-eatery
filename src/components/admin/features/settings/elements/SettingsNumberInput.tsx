import { Input } from "@/components/admin/ui/form";
import { cn } from "@/lib/utils";
import React, { FC, InputHTMLAttributes } from "react";

const SettingsNumberInput: FC<
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange?: (value: string) => void;
  }
> = ({ className, onChange, ...props }) => {
  return (
    <Input
      type="number"
      className={cn("input w-full", className)}
      onChange={
        onChange &&
        ((e) => {
          onChange(e.target.value);
        })
      }
      {...props}
    />
  );
};

export default SettingsNumberInput;
