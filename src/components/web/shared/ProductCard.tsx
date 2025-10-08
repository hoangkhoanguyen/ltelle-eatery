import Image from "next/image";
import React, { FC } from "react";
import QuickCartButton from "./QuickCartButton";
import Link from "next/link";
import { webRoutes } from "@/constants/route";
import { WebProduct } from "@/types/products";

const ProductCard: FC<{ product: WebProduct; categoryLabel?: string }> = ({
  product,
  categoryLabel,
}) => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-web-content-3 @container">
      <div className="w-full aspect-square bg-gray-300 relative">
        <Image src={product.imageUrl} alt={product.title} fill />
      </div>
      <div className="flex-1 bg-web-secondary-2 py-5 px-3 flex flex-col justify-between gap-5">
        <div>
          <p className="text-web-label-mobile lg:text-web-label text-web-secondary-3 mb-0.5 capitalize">
            {categoryLabel || product.category}
          </p>
          <Link
            href={webRoutes.dish("caesar-salad")}
            className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 mb-2.5 line-clamp-1"
          >
            {product.title}
          </Link>
          <p className="text-web-body-mobile lg:text-web-body text-web-content-1 line-clamp-3">
            {product.subDescription}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-web-h4-mobile lg:text-web-h4 text-web-primary">
            {product.price.toLocaleString()} VND
          </span>
          <QuickCartButton />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
