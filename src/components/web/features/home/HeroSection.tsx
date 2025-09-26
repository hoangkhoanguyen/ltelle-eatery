import Icon from "@/components/common/Icon";
import React from "react";
import { Button } from "../../ui/button";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative pt-[149px] lg:pt-[146px] min-h-screen">
      <div className="absolute w-full h-full top-0 left-0 -z-10">
        <Image
          src="/assets/static/hero.png"
          fill
          className="object-cover"
          alt="Hero Image"
        />
      </div>
      <div className="relative container h-[calc(100vh-149px)] lg:h-[calc(100vh-146px)]">
        <div className="h-full flex flex-col items-center justify-center md:px-10 lg:max-w-2xl mx-auto pt-2.5 pb-6 md:pt-10 lg:pt-6">
          <h1 className="flex flex-col items-center text-web-h1-mobile lg:text-web-h1 text-web-background-1 text-center mb-2.5 md:mb-10">
            <span>Where Frech</span>
            <span className="text-web-secondary-1">Culinary Art</span>
            <span>Meet Vietnamese Soul</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-5 md:gap-11 items-stretch w-full md:px-2 mb-5 md:mb-20">
            <Button
              startIcon={<Icon icon="ph:shopping-bag" className="text-2xl" />}
              className="border border-web-background-1 flex-1 capitalize text-web-button-mobile lg:text-web-button"
            >
              order take away
            </Button>
            <Button
              className="flex-1 text-web-content-1 capitalize text-web-button-mobile lg:text-web-button"
              startIcon={<Icon icon="ph:calendar-blank" className="text-2xl" />}
              variant={"secondary2"}
            >
              Reserve your table
            </Button>
          </div>
        </div>
        <div className="invisible lg:visible absolute bottom-7 left-1/2 -translate-x-1/2">
          <Icon icon="ph:mouse-simple" className="text-5xl animate-bounce" />
        </div>
      </div>
    </section>
  );
};
