"use client";
import useFetchProducts from "@/hooks/admin/features/products/useFetchProducts";
import useProductsParams from "@/hooks/admin/features/products/useProductsParams";
import React from "react";

const ProductPage = () => {
  const { query } = useProductsParams();

  const { data } = useFetchProducts(query);
  console.log("data", data);
  return <div>ProductPage</div>;
};

export default ProductPage;
