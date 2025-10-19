"use client";
import Icon from "@/components/common/Icon";
import React, { FC, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useCartStore } from "@/hooks/web/cart/store";
import { WebProduct } from "@/types/products";
import { throttle } from "lodash";

const QuickCartButton: FC<{
  data: Pick<WebProduct, "id" | "title">;
}> = ({ data }) => {
  const onAddToCart = useCartStore((state) => state.actions.addToCart);

  const throttledAddRef = useRef(
    throttle(
      (payload: Parameters<typeof onAddToCart>[0], title: string) => {
        onAddToCart(payload, title);
      },
      500,
      { leading: true, trailing: false },
    ),
  );

  useEffect(() => {
    return () => {
      throttledAddRef.current.cancel?.();
    };
  }, []);

  return (
    <Button
      variant={"secondary1"}
      className="gap-3 px-4 py-3 rounded-lg duration-200 active:scale-95 text-web-button-mobile lg:text-web-button "
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        throttledAddRef.current(
          { productId: data.id, quantity: 1, notes: "", addons: [] },
          data.title,
        );
        e.preventDefault();
      }}
      startIcon={<Icon icon={"ph:plus-circle"} className="text-2xl" />}
    >
      Quick cart
    </Button>
  );
};

export default QuickCartButton;
