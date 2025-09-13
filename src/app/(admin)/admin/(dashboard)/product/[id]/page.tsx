import { getAdminProductById } from "@/services/products";
import React from "react";

const ProductDetailsPage = async () => {
  const product = await getAdminProductById(1);
  console.log("first", product);
  return <div>ProductDetailsPage</div>;
};

export default ProductDetailsPage;
