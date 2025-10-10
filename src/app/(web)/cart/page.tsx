"use client";
import CartItems from "@/components/web/features/cart/CartItems";
import CartProvider from "@/components/web/features/cart/CartProvider";
import CartSummary from "@/components/web/features/cart/CartSummary";
import { useCartStore } from "@/hooks/web/cart/store";
import React, { useEffect } from "react";

const CartPage = () => {
  useEffect(() => {}, []);
  const cartLength = useCartStore((state) => state.context.length);

  return (
    <CartProvider>
      <div className="container py-10">
        <h1 className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 mb-5">
          Your Cart ({cartLength})
        </h1>

        <p className="text-web-body-mobile lg:text-web-body text-web-content-1 mb-10">
          Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing,
          Fresh mozzarella, Crisp romaine lettuce, parmesan cheese, croutons,
          Crisp romaine lettuce, parmesan cheese, croutons. Description Crisp
          romaine lettuce,
        </p>
        <CartItems />
        <CartSummary />
      </div>
    </CartProvider>
  );
};

export default CartPage;
