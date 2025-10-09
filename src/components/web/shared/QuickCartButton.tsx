"use client";
import Icon from "@/components/common/Icon";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { useCartStore } from "@/hooks/web/cart/store";
import { WebProduct } from "@/types/products";
import { throttle } from "lodash";

const QuickCartButton: FC<{
  data: Pick<WebProduct, "id" | "title">;
}> = ({ data }) => {
  const onAddToCart = useCartStore((state) => state.actions.addToCart);
  return (
    <Button
      variant={"secondary1"}
      className="gap-3 px-4 py-3 rounded-lg duration-200 active:scale-95 text-web-button-mobile lg:text-web-button "
      onClick={throttle(() => {
        onAddToCart(
          { productId: data.id, quantity: 1, notes: "", addons: [] },
          data.title,
        );
      }, 500)}
      startIcon={<Icon icon={"ph:plus-circle"} className="text-2xl" />}
    >
      Quick cart
    </Button>
  );
};

export default QuickCartButton;
