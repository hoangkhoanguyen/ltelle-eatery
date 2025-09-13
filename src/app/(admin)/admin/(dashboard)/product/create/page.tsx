"use client";
import { Button } from "@/components/admin/ui/button";
import useAddProduct from "@/hooks/admin/features/products/useAddProduct";
import React from "react";

const CreateProductPage = () => {
  const { isPending, action } = useAddProduct();

  const onSubmit = () => {
    action({
      title: "New Product 2",
      categoryId: 1,
      slug: "new-product-2",
    });
  };

  console.log("isPending", isPending);

  return (
    <div>
      CreateProductPage
      <Button onClick={onSubmit}>Add Product</Button>
    </div>
  );
};

export default CreateProductPage;
