import React from "react";
import { Gallery } from "./Gallery";
import Image from "next/image";

export interface IGalleryImage {
  src: string;
  alt: string;
  label: string;
  desc: string;
}

const galleryImages: IGalleryImage[] = [
  {
    src: "/assets/static/home-gallery-1.png",
    alt: "Gallery Image 1",
    label: "Gallery Image 1",
    desc: "Description for Gallery Image 1",
  },
  {
    src: "/assets/static/home-gallery-2.png",
    alt: "Gallery Image 2",
    label: "Gallery Image 2",
    desc: "Description for Gallery Image 2",
  },
  {
    src: "/assets/static/home-gallery-3.png",
    alt: "Gallery Image 3",
    label: "Gallery Image 3",
    desc: "Description for Gallery Image 3",
  },
  {
    src: "/assets/static/home-gallery-4.png",
    alt: "Gallery Image 4",
    label: "Gallery Image 4",
    desc: "Description for Gallery Image 4",
  },
];

export const GallerySection = () => {
  return (
    <section className="bg-web-background-3">
      <div className="container py-10">
        <div className="mb-5 md:mb-10 lg:mb-5 text-center">
          <h3 className="text-web-secondary-3 text-web-subtitle-mobile uppercase mb-5 lg:text-web-subtitle">
            L’AMBIANCE &bull; THE EXPERIENCE
          </h3>
          <h2 className="text-web-h2-mobile capitalize lg:text-web-h2 flex flex-col md:flex-row gap-x-2 justify-center">
            <span className="text-web-content-1">An Atmosphere</span>{" "}
            <span className="text-web-secondary-1">of Pure Romance</span>
          </h2>
        </div>
        <Gallery
          thumbs={galleryImages.map((item, index) => (
            <div
              key={index}
              className="relative w-full aspect-square rounded-lg"
            >
              <Image
                fill
                src={item.src}
                alt={item.alt}
                className="object-cover rounded-lg cursor-pointer"
              />
            </div>
          ))}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[9/16] md:aspect-square lg:aspect-[1037/691] rounded-xl overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h4 className="text-web-h2-mobile lg:text-web-h2 text-web-background-1 mb-2.5">
                  {image.label}
                </h4>
                <p className="text-web-subtitle-mobile lg:text-web-subtitle text-web-background-1">
                  {image.desc}
                </p>
              </div>
            </div>
          ))}
        </Gallery>
      </div>
    </section>
  );
};
