import Image from "next/image";
import React from "react";
import CartItemQuantity from "./CartItemQuantity";
import CardItemAddons from "./CardItemAddons";
import CartItemTotalPrice from "./CartItemTotalPrice";
import CartItemNote from "./CartItemNote";

const CartItem = () => {
  return (
    <div className="border-t border-web-content-3 pt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="flex items-start gap-5">
          <div className="w-40 aspect-square relative overflow-hidden">
            <Image
              src="/assets/static/product-image.png"
              alt="Product Image"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <h3 className="text-web-body-mobile lg:text-web-body text-web-secondary-3 capitalize">
              Starter
            </h3>
            <h2 className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 capitalize">
              Caesar Salad
            </h2>
            <p className="text-web-h4-mobile lg:text-web-h4">
              <span className="text-web-content-1">Price:</span>{" "}
              <span className="text-web-secondary-1 uppercase">
                180.000 vnd
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-5">
          <CartItemQuantity />
          <CardItemAddons />
          <hr className="border-web-content-3" />
          <CartItemTotalPrice />
        </div>
      </div>
      <CartItemNote />
    </div>
  );
};

export default CartItem;
