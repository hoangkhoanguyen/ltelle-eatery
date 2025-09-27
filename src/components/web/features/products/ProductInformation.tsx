import React from "react";
import ProductImagesSlider from "./ProductImagesSlider";
import Image from "next/image";
import ProductQuantityEditor from "./ProductQuantityEditor";
import ProductAddOns from "./ProductAddOns";
import AddToCartButton from "./AddToCartButton";

const images = [
  {
    id: 1,
    src: "/assets/static/product-image.png",
  },
  {
    id: 2,
    src: "/assets/static/product-image.png",
  },
  {
    id: 3,
    src: "/assets/static/product-image.png",
  },
  {
    id: 4,
    src: "/assets/static/product-image.png",
  },
  {
    id: 5,
    src: "/assets/static/product-image.png",
  },
  {
    id: 6,
    src: "/assets/static/product-image.png",
  },
  {
    id: 7,
    src: "/assets/static/product-image.png",
  },
  {
    id: 8,
    src: "/assets/static/product-image.png",
  },
];

const ProductInformation = () => {
  return (
    <>
      <section className="bg-web-background-1">
        <div className="container">
          <div className="pb-10 lg:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ProductImagesSlider
                thumbs={images.map((image) => (
                  <div
                    key={image.id}
                    className="relative w-full aspect-square rounded-xs overflow-hidden"
                  >
                    <Image
                      fill
                      src={image.src}
                      alt={`Product Image ${image.id}`}
                      className="object-cover"
                    />
                  </div>
                ))}
              >
                {images.map((image) => (
                  <div key={image.id} className="relative w-full aspect-square">
                    <Image
                      fill
                      src={image.src}
                      alt={`Product Image ${image.id}`}
                      className="object-cover"
                    />
                  </div>
                ))}
              </ProductImagesSlider>
              <div>
                <p className="text-web-body-mobile lg:text-web-body text-web-secondary-3 mb-2.5">
                  Starter
                </p>
                <h1 className="text-web-h3-mobile lg:text-web-h3 text-web-content-1 mb-5">
                  Caesar salad
                </h1>
                <p className="text-web-h2-mobile lg:text-web-h2 text-web-secondary-1 mb-5">
                  180.000 VND
                </p>
                <aside className="rounded-lg bg-web-secondary-2 p-3 mb-5">
                  <h2 className="text-web-h4-mobile lg:text-web-h4 text-web-content-2 mb-2">
                    Allergen Information
                  </h2>
                  <p className="text-web-content-2 text-web-caption-mobile lg:text-web-caption">
                    Contains: gluten, eggs, cheese, Crisp romain, luten, eggs,
                    cheese, Crisp romain, luten, eggs, cheese, Crisp romain
                  </p>
                </aside>
                <hr className="border-web-content-3 mb-5" />
                <div className="mb-10">
                  <ProductQuantityEditor />
                </div>

                <div className="mb-11">
                  <ProductAddOns />
                </div>

                <div>
                  <AddToCartButton />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-web-content-3" />
          <div className="py-10">
            <h2 className="text-web-h3-mobile lg:text-web-h3 mb-5 text-web-content-1">
              Description
            </h2>
            <p className="text-web-body-mobile lg:text-web-body text-web-content-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductInformation;
