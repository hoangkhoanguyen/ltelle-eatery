import ProductDetailsHeader from "@/components/admin/features/products/ProductDetailsHeader";
import ProductDetailsProvider from "@/components/admin/features/products/ProductDetailsProvider";
import ProductEditForm from "@/components/admin/features/products/ProductEditForm";
import ImageLibraryModalProvider from "@/components/admin/shared/image-library/ImageLibraryProvider";
import { getAdminProductDetailsById } from "@/services/products";
import { pick } from "lodash";
import React from "react";

// export const revalidate = 60; // revalidate this page every 60 seconds

// export const dynamic = "force-dynamic";

const ProductDetailsPage = async () => {
  const product = await getAdminProductDetailsById(1);

  if (!product) return <>NoData</>;

  const convertedProduct = {
    title: product.title,
    slug: product.slug,
    categoryId: product.category.id,
    isActive: product.isActive,
    allergenInfo: product.allergenInfo || undefined,
    subDescription: product.subDescription || undefined,
    description: product.description || undefined,
    price: product.price,
    addons: product.addons.map((item) =>
      pick(item, "id", "name", "isActive", "price"),
    ),
    images: product.images.map((item) => pick(item, "id", "url")),
    relatedProducts: product.relatedProducts.map((item) =>
      pick(item, "id", "title"),
    ),
  };

  return (
    <ProductDetailsProvider initProduct={convertedProduct} id={product.id}>
      <ImageLibraryModalProvider>
        <ProductDetailsHeader />
        <ProductEditForm />
      </ImageLibraryModalProvider>
    </ProductDetailsProvider>
  );
};

export default ProductDetailsPage;
