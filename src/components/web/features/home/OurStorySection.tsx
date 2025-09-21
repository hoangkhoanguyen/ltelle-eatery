import Image from "next/image";
import React from "react";

export const OurStorySection = () => {
  return (
    <section className="bg-web-background-3">
      <div className="container pt-6 md:pt-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-8">
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden bg-web-secondary-2 py-4.5 px-4 md:px-6 md:py-8 lg:px-5 lg:py-6 lg:mt-11">
              <div className="relative aspect-[5/6] rounded-2xl overflow-hidden">
                <Image
                  src={"/assets/static/our-story.png"}
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-1">
            <div>
              <h3 className="text-web-secondary-3 text-web-subtitle-mobile uppercase mb-5 lg:text-web-subtitle">
                L&#39;Telle Eater &bull; OUR STORY
              </h3>
              <h2 className="text-web-h2-mobile capitalize mb-2 md:mb-9 lg:mb-5 lg:text-web-h2">
                <span className="text-web-content-1">A Love Letter To</span>{" "}
                <span className="text-web-secondary-1">Frech Gastronomy</span>
              </h2>
              <div className="text-web-content-2 text-web-subtitle-mobile lg:text-web-subtitle flex flex-col gap-5">
                <p>
                  In 2012, Chef Laurent Dubois brought his Parisian dream to the
                  mystical mountains of Ha Giang. Trained in Lyon&#39;s most
                  prestigious culinary schools and seasoned in Michelin-starred
                  kitchens, he envisioned a place where French sophistication
                  would dance with Vietnamese warmth.
                </p>
                <p>
                  Every morning, our team sources the finest local ingredients
                  from Ha Giang&#39;s mountain farmers, combining them with
                  carefully imported French specialties. Each plate is a canvas
                  where culinary artistry meets heartfelt storytelling.
                </p>
                <p>
                  Every morning, our team sources the finest local ingredients
                  from Ha Giang&#39;s mountain farmers, combining them with
                  carefully imported French specialties. Each plate is a canvas
                  where culinary artistry meets heartfelt storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
