"use client";
import CartIntro from "@/components/web/features/cart/CartIntro";
import CartItems from "@/components/web/features/cart/CartItems";
import CartProvider from "@/components/web/features/cart/CartProvider";
import CartSummary from "@/components/web/features/cart/CartSummary";
import React from "react";

const CartPage = () => {
  return (
    <CartProvider>
      <div className="container py-10">
        <CartIntro />
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
