import Icon from "@/components/common/Icon";
import { webRoutes } from "@/constants/route";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const CartButton = () => {
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
        9+
      </span>
    </Link>
  );
};

export default CartButton;
