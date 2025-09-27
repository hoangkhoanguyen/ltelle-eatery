import React from "react";
import CartSubmit from "./CartSubmit";

const CartSummary = () => {
  return (
    <div>
      <hr className="border-t border-web-content-3 mb-1" />
      <hr className="border-t border-web-content-3 mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="hidden lg:block"></div>
        <div className="">
          <div className="flex justify-between items-center gap-5">
            <span className="text-web-h2-mobile lg:text-web-h2 text-web-content-1">
              Subtotal
            </span>
            <span className="uppercase text-web-h2-mobile lg:text-web-h2 text-web-secondary-1">
              250.000 vnd
            </span>
          </div>
          <p className="text-web-caption-mobile lg:text-web-caption text-web-content-1">
            Shipping calculated at checkout
          </p>
          <div className="mt-10 hidden lg:block">
            <CartSubmit />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 lg:hidden p-3 border-t border-web-content-3 bg-web-background-1">
        <CartSubmit />
      </div>
    </div>
  );
};

export default CartSummary;
