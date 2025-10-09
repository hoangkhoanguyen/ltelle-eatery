import React, { FC } from "react";
import QuantityEditor from "../../shared/QuantityEditor";

const CartItemQuantity: FC<{ price: number }> = ({ price }) => {
  return (
    <QuantityEditor price={price} quantity={1} onChangeQuantity={() => {}} />
  );
};

export default CartItemQuantity;
