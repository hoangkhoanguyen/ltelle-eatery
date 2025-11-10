"use client";
import Icon from "@/components/common/Icon";
import React, { FC } from "react";
import { Button } from "../../ui/button";
import { WebProduct } from "@/types/products";
import { useQuickCartModalStore } from "@/hooks/web/quick-cart";

const QuickCartButton: FC<{
  data: Pick<WebProduct, "id" | "title">;
}> = ({ data }) => {
  const openQuickCartModal = useQuickCartModalStore((state) => state.openModal);

  return (
    <Button
      variant={"secondary1"}
      className="gap-3 px-4 py-3 rounded-lg duration-200 active:scale-95 text-web-button-mobile lg:text-web-button hover:bg-web-primary hover:text-web-background-1"
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        openQuickCartModal(data.id);
        e.preventDefault();
      }}
      startIcon={<Icon icon={"ph:plus-circle"} className="text-2xl" />}
    >
      Quick cart
    </Button>
  );
};

export default QuickCartButton;
