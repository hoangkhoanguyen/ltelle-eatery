import React from "react";
import { Button } from "../../ui/button";

const CartSubmit = () => {
  return (
    <Button
      className="w-full text-web-button-mobile lg:text-web-button text-web-background-1 py-4.5"
      variant={"secondary1"}
    >
      Checkout &bull; 250.000 VND
    </Button>
  );
};

export default CartSubmit;
