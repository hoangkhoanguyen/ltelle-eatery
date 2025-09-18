import { cn } from "@/lib/utils";
import React, { FC, TextareaHTMLAttributes } from "react";

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <textarea
      className={cn("textarea w-full", className)}
      {...props}
    ></textarea>
  );
};
