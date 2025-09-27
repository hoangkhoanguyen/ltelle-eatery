import React from "react";
import { QuantityButtons } from "../../ui/button";

const ProductQuantityEditor = () => {
  return (
    <div>
      <p className="text-web-h3-mobile lg:text-web-h3 mb-5 text-web-content-1">
        Amount
      </p>
      <div className="flex justify-between items-center gap-5">
        <QuantityButtons />
        <p className="text-web-h4-mobile lg:text-web-h4 text-web-secondary-1">
          180.000 VND
        </p>
      </div>
    </div>
  );
};

export default ProductQuantityEditor;
