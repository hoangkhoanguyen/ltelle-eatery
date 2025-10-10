import Image from "next/image";
import React, { FC } from "react";
import CartItemQuantity from "./CartItemQuantity";
import CardItemAddons from "./CardItemAddons";
import CartItemTotalPrice from "./CartItemTotalPrice";
import CartItemNote from "./CartItemNote";
import { CartItemDisplay } from "@/types/cart";
import { formatCurrencyWebsite } from "@/lib/utils";

const CartItem: FC<{ item: CartItemDisplay }> = ({ item }) => {
  return (
    <div className="border-t border-web-content-3 pt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="flex items-start gap-5">
          <div className="w-40 aspect-square relative overflow-hidden">
            <Image
              src={item.imageUrl}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <h3 className="text-web-body-mobile lg:text-web-body text-web-secondary-3 capitalize">
              {item.category}
            </h3>
            <h2 className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 capitalize">
              {item.title}
            </h2>
            <p className="text-web-h4-mobile lg:text-web-h4">
              <span className="text-web-content-1">Price:</span>{" "}
              <span className="text-web-secondary-1 uppercase">
                {formatCurrencyWebsite(item.price)}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-5">
          <CartItemQuantity
            price={item.price}
            quantity={item.quantity}
            id={item.id}
          />
          <CardItemAddons cartId={item.id} cartAddons={item.addons} />
          <hr className="border-web-content-3" />
          <CartItemTotalPrice totalPrice={item.totalPrice} />
        </div>
      </div>
      <CartItemNote cartId={item.id} note={item.notes} />
    </div>
  );
};

export default CartItem;
