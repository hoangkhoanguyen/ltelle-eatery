import Image from "next/image";
import React from "react";
import QuickCartButton from "./QuickCartButton";
import Link from "next/link";
import { webRoutes } from "@/constants/route";

const ProductCard = () => {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-web-content-3">
      <div className="w-full aspect-square bg-gray-300 relative">
        <Image src="/assets/static/product-image.png" alt="ldkvnmlksf" fill />
      </div>
      <div className="flex-1 bg-web-secondary-2 py-5 px-3 flex flex-col justify-between gap-5">
        <div>
          <p className="text-web-label-mobile lg:text-web-label text-web-secondary-3 mb-0.5">
            Caesar Salad
          </p>
          <Link
            href={webRoutes.dish("caesar-salad")}
            className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 mb-2.5 line-clamp-1"
          >
            Caesar Salad Caesar Salad Caesar Salad Caesar Salad
          </Link>
          <p className="text-web-body-mobile lg:text-web-body text-web-content-1 line-clamp-3">
            Crisp romaine lettuce, parmesan cheese, croutons, and Caesar
            dressing, Fresh mozzarella Crisp romaine lettuce, parmesan cheese,
            croutons, and Caesar dressing, Fresh mozzarella
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-web-h4-mobile lg:text-web-h4 text-web-primary">
            120.000 VND
          </span>
          <QuickCartButton />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
