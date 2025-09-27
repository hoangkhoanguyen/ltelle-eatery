import ProductDetails from "@/components/web/features/products/ProductDetails";
import React, { FC } from "react";

const page: FC<{ params: Promise<{ slug: string }> }> = async ({ params }) => {
  const { slug } = await params;
  return <ProductDetails />;
};

export default page;
