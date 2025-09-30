import { cn } from "@/lib/utils";
import React, { FC, TextareaHTMLAttributes } from "react";

const SettingsTextareaInput: FC<
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    onChange?: (value: string) => void;
  }
> = ({ className, onChange, ...props }) => {
  return (
    <textarea
      className={cn("input w-full", className)}
      onChange={
        onChange &&
        ((e) => {
          onChange(e.target.value);
        })
      }
      {...props}
    ></textarea>
  );
};

export default SettingsTextareaInput;
