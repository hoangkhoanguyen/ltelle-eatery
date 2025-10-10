"use client";
import React from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { webRoutes } from "@/constants/route";

const CartSubmit = () => {
  const router = useRouter();

  const onGoCheckout = () => {
    router.push(webRoutes.checkout());
  };

  return (
    <Button
      className="w-full text-web-button-mobile lg:text-web-button text-web-background-1 py-4.5"
      variant={"secondary1"}
      onClick={onGoCheckout}
    >
      Checkout &bull; 250.000 VND
    </Button>
  );
};

export default CartSubmit;
