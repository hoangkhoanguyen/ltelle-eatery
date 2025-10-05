import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const OrderItem = () => {
  return (
    <div className="pb-5 border-b border-web-content-3">
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-1.5">
          <div className="relative pt-3 pe-2">
            <span
              className={cn(
                "w-8 aspect-square rounded-full bg-web-secondary-1 text-web-content-1 flex justify-center items-center text-web-h4-mobile lg:text-web-h4",
                "absolute z-10 end-0 top-0",
              )}
            >
              3
            </span>
            <div className="relative w-20 aspect-square rounded-sm overflow-hidden">
              <Image
                src="/assets/static/product-image.png"
                alt="Product Demo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 flex-1 line-clamp-1 pt-3">
            Caesar salad Caesar salad Caesar salad Caesar salad
          </p>
        </div>
        <p className="text-web-h4-mobile lg:text-web-h4 text-web-secondary-1 shrink-0 pt-3">
          180.000 VND
        </p>
      </div>
      <ul className="mt-2.5">
        <li className="flex justify-between items-center gap-2.5">
          <span className="flex-1 text-web-body-mobile lg:text-web-body text-web-content-1">
            +2 Extra Vegetables
          </span>
          <span className="text-web-h4-mobile lg:text-web-h4 text-web-secondary-1 shrink-0">
            40.000 VND
          </span>
        </li>
        <li className="flex justify-between items-center gap-3">
          <span className="flex-1 text-web-body-mobile lg:text-web-body text-web-content-1">
            +2 Extra Vegetables
          </span>
          <span className="text-web-h4-mobile lg:text-web-h4 text-web-secondary-1 shrink-0">
            40.000 VND
          </span>
        </li>
      </ul>
    </div>
  );
};

export default OrderItem;
