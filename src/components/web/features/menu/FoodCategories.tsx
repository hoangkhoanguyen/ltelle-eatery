import { webRoutes } from "@/constants/route";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import ProductCard from "../../shared/ProductCard";

const categories = [
  {
    key: "all",
    name: "All",
  },
  {
    key: "main-course",
    name: "Main Course",
  },
  {
    key: "salad",
    name: "Salad",
  },
  {
    key: "noodles",
    name: "Noodles",
  },
  {
    key: "desserts",
    name: "Desserts",
  },
];

const FoodCategories = () => {
  return (
    <section className="pt-8 pb-24 bg-web-background-1">
      <div className="container">
        <h3 className="section-subtitle text-center mb-5">
          L&#39;TELLE EATERY &bull; DISCOVER
        </h3>
        <h2 className="text-center section-title flex gap-2 justify-center mb-5">
          <span className="text-web-content-1">Food</span>
          <span className="text-web-secondary-1">Categories</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-5 mb-10">
          {categories.map((category, index) => (
            <Link
              href={webRoutes.menu(category.key)}
              key={category.key}
              className={cn(
                "px-5 h-10 flex items-center text-web-content-2 border border-web-content-2 rounded-lg text-web-body-mobile lg:text-web-body",
                index === 0 &&
                  "text-web-background-1 bg-web-primary text-web-button-mobile lg:text-web-button",
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-2 md:gap-y-5 lg:gap-x-5 lg:gap-y-16">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
