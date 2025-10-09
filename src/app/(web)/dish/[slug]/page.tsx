import ProductInformation from "@/components/web/features/products/ProductInformation";
import RelatedProducts from "@/components/web/features/products/RelatedProducts";
import { webRoutes } from "@/constants/route";
import {
  getMultipleProductsByIds,
  getProductDetailsBySlug,
} from "@/services/products";
import { redirect } from "next/navigation";
import React, { FC } from "react";

const page: FC<{ params: Promise<{ slug: string }> }> = async ({ params }) => {
  const { slug } = await params;

  const product = await getProductDetailsBySlug(slug);

  if (!product) {
    return redirect(webRoutes.menu(""));
  }

  const relatedProducts = await getMultipleProductsByIds(
    product.relatedProductIds,
  );

  console.log("okay", product);

  return (
    <div>
      <ProductInformation
        product={{
          id: product.id,
          title: product.title,
          slug: product.slug,
          images: product.images || [],
          description: product.description || "",
          allergenInfo: product.allergenInfo || "",
          price: product.price || 0,
          addons: product.addons || [],
          category: product.category.name,
          subDescription: product.subDescription || "",
        }}
      />
      <RelatedProducts
        products={relatedProducts.map((relatedProduct) => ({
          ...relatedProduct,
          images: relatedProduct.images || [],
          imageUrl: relatedProduct.images[0]?.url || "",
          subDescription: relatedProduct.subDescription || "",
          category: relatedProduct.category.name,
        }))}
      />
    </div>
  );
};

export default page;
