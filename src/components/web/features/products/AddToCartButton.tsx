import React from "react";
import { Button } from "../../ui/button";

const AddToCartButton = () => {
  return (
    <Button
      variant={"secondary1"}
      className="w-full text-web-background-1 text-web-button-mobile lg:text-web-button py-4.5"
    >
      Add to Cart &bull; 180.000 VND
    </Button>
  );
};

export default AddToCartButton;
