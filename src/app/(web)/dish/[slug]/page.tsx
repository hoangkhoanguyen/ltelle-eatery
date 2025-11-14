import ProductInformation from "@/components/web/features/products/ProductInformation";
import RelatedProducts from "@/components/web/features/products/RelatedProducts";
import { webRoutes } from "@/constants/route";
import { APP_URL } from "@/constants/app";
import {
  getMultipleProductsByIds,
  getProductDetailsBySlug,
} from "@/services/products";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { FC } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetailsBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | LTelle Eatery",
    };
  }

  const title = `${product.title} | LTelle Eatery`;
  const description =
    product.description || `Discover ${product.title} at LTelle Eatery`;
  const url = `${APP_URL}/dish/${slug}`;
  const imageUrl =
    product.images?.[0]?.url || "/assets/static/dish-og-image.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "LTelle Eatery",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

const page: FC<{ params: Promise<{ slug: string }> }> = async ({ params }) => {
  const { slug } = await params;

  const product = await getProductDetailsBySlug(slug);

  if (!product) {
    return redirect(webRoutes.menu(""));
  }

  const relatedProducts = await getMultipleProductsByIds(
    product.relatedProductIds,
  );

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
