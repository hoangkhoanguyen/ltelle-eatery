import React from "react";
import RelatedProductsSlider from "./RelatedProductsSlider";

const RelatedProducts = () => {
  return (
    <section className="bg-web-background-2">
      <div className="container py-10">
        <h2 className="capitalize text-web-h3-mobile lg:text-web-h3 text-web-content-1 mb-5">
          You also like
        </h2>
        <div>
          <RelatedProductsSlider />
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
