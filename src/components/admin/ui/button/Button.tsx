import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "",
      soft: "btn-soft",
      outline: "btn-outline",
      dash: "btn-dash",
    },
    color: {
      default: "",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
  },
});

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
> = ({ variant, color, className = "", ...props }) => {
  return (
    <button
      className={cn(
        buttonVariants({
          color,
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
};
