"use client";
import { checkCartLengthAction } from "@/actions/web/cart";
import Icon from "@/components/common/Icon";
import { webRoutes } from "@/constants/route";
import { useCartStore } from "@/hooks/web/cart/store";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";

const CartButton = () => {
  const cart = useCartStore((state) => state.context.cart);

  const productIds = useMemo(() => cart.map((item) => item.productId), [cart]);

  const { mutate, data = 0 } = useMutation({
    mutationKey: ["check-cart-length", { productIds }],
    mutationFn: checkCartLengthAction,
  });

  useEffect(() => {
    if (productIds.length > 0) {
      mutate({ productIds });
    }
  }, [productIds, mutate]);

  return (
    <Link href={webRoutes.cart()} className="relative">
      <Icon icon={"ph:shopping-bag"} className="text-web-content-1 w-11 h-11" />
      <span
        className={cn(
          "absolute -top-1 -right-2",
          "w-8 aspect-square rounded-full flex justify-center items-center",
          "bg-web-secondary-3  text-web-background-1 text-web-h4",
        )}
      >
        {data > 9 ? "9+" : data}
      </span>
    </Link>
  );
};

export default CartButton;
