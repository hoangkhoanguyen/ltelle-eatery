import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { FC } from "react";

const variants = cva("", {
  variants: {
    size: {
      sm: "h-10",
      md: "h-[52px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const AdjustButton: FC<{ icon: string; onClick?(): void }> = ({
  icon,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="text-web-content-2 flex-1 h-full aspect-square flex justify-center items-center"
  >
    <Icon icon={icon} />
  </button>
);

export const QuantityButtons: FC<VariantProps<typeof variants>> = ({
  size,
}) => {
  return (
    <div
      className={cn(
        "flex items-center bg-web-background-1 border border-web-content-3 rounded-lg overflow-hidden",
        variants({ size }),
      )}
    >
      <AdjustButton icon="ph:minus" />
      <span className="text-web-content-1 flex-1 h-full aspect-square flex justify-center items-center box-content border-x border-web-content-3">
        1
      </span>
      <AdjustButton icon="ph:plus" />
    </div>
  );
};
