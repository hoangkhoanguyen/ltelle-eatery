import Image from "next/image";
import React from "react";
import ProductCard from "../../shared/ProductCard";
import Link from "next/link";

const NewFood = () => {
  return (
    <section className="bg-web-secondary-2">
      <div className="py-10 pb-6 container">
        <h3 className="section-subtitle mb-5 text-center">new flavor</h3>
        <h2 className="section-title text-center mb-2.5 text-web-content-1">
          New Food
        </h2>
        <p className="max-w-3xl text-center block mx-auto text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2 mb-10">
          Discover why travelers from around the world choose Le Bambou for
          their finest dining experience in Ninh Binh.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-5">
          <div className="col-span-1 md:col-span-2 relative border border-web-content-3 rounded-xl overflow-hidden">
            <div className="relative aspect-[3/2] lg:aspect-auto md:h-full">
              <Image
                src="/assets/static/product-image.png"
                alt="New Food"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative md:absolute md:bottom-0 md:left-0 md:w-full md:p-5 flex gap-5 items-start">
              <div className="bg-web-secondary-2 p-2.5 md:px-5 md:rounded-lg flex-1">
                <div className="flex">
                  <div className="flex-1 flex flex-col items-stretch gap-2.5">
                    <div>
                      <h3 className="text-web-h4-mobile lg:text-web-h4 text-web-content-1 mb-1">
                        Combo ABC
                      </h3>
                      <p className="text-web-caption-mobile lg:text-web-caption text-web-content-1">
                        Nestled against the dramatic backdrop of limestone
                        karsts and terraced fields.
                      </p>
                    </div>
                    <Link
                      href={"/"}
                      className="md:hidden bg-web-primary text-web-background-1 text-center rounded-lg py-4 text-web-button-mobile lg:text-web-button"
                    >
                      Discover
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                href={"/"}
                className="hidden md:block bg-web-primary text-web-background-1 text-center rounded-lg py-4 md:px-10 text-web-button-mobile lg:text-web-button"
              >
                Discover
              </Link>
            </div>
          </div>

          <ProductCard />
        </div>
      </div>
    </section>
  );
};

export default NewFood;
