import { getAdminProductTable } from "@/services/products";
import React from "react";

const ProductPage = async () => {
  const products = await getAdminProductTable({
    limit: 20,
    page: 1,
  });
  console.log(products);
  return <div>ProductPage</div>;
};

export default ProductPage;
