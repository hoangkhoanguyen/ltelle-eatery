"use client";
import CartItem from "@/components/web/features/cart/CartItem";
import CartSummary from "@/components/web/features/cart/CartSummary";
import React from "react";

const page = () => {
  return (
    <div className="container py-10">
      <h1 className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 mb-5">
        Your Cart (3)
      </h1>

      <p className="text-web-body-mobile lg:text-web-body text-web-content-1 mb-10">
        Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing,
        Fresh mozzarella, Crisp romaine lettuce, parmesan cheese, croutons,
        Crisp romaine lettuce, parmesan cheese, croutons. Description Crisp
        romaine lettuce,
      </p>
      <div className="flex flex-col items-stretch gap-10 mb-10">
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <CartSummary />
    </div>
  );
};

export default page;
