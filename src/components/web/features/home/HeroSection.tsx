import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../../ui/button";
import { Stats } from "./Stats";

export const HeroSection = () => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-top"
      style={{
        backgroundImage: "url('/assets/static/hero.png')",
      }}
    >
      <div className="min-h-screen container md:max-w-[526px] lg:max-w-2xl mx-auto px-3 lg:px-4">
        <div className="flex flex-col items-center pt-2.5 pb-6 md:pt-10 lg:pt-6">
          <div
            className={cn(
              "flex items-center gap-1 bg-white/10 rounded-full py-2 px-5",
              "mb-2.5 md:mb-10 lg:mb-14",
            )}
          >
            <Icon
              icon="ph:binoculars-fill"
              className="text-web-secondary-1 text-2xl"
            />
            <span className="text-web-subtitle text-web-background-1">
              ✨Mã Pí Lèng Mountain Pass✨
            </span>
          </div>

          <h1 className="flex flex-col items-center text-web-h1-mobile lg:text-web-h1 text-web-background-1 text-center mb-2.5 md:mb-10">
            <span>Where Frech</span>
            <span className="text-web-secondary-1">Culinary Art</span>
            <span>Meet Vietnamese Soul</span>
          </h1>

          <p className="text-web-body-mobile md:text-web-body text-web-background-1 text-center mb-5 md:mb-10">
            Experience the romance of Paris nestled in the dramatic mountains of
            Ha Giang. Each dish tells a story of tradition, passion, and the
            perfect fusion of two cultures.
          </p>

          <div className="flex flex-col md:flex-row gap-5 md:gap-11 items-stretch w-full md:px-2 mb-5 md:mb-20">
            <Button
              startIcon={<Icon icon="ph:shopping-bag" className="text-2xl" />}
              className="border border-web-background-1 flex-1 capitalize"
            >
              order take away
            </Button>
            <Button
              className="flex-1 text-web-background-1 capitalize"
              startIcon={<Icon icon="ph:calendar-blank" className="text-2xl" />}
              variant={"secondary1"}
            >
              Reserve your table
            </Button>
          </div>

          <div className="w-full md:mb-28">
            <Stats />
          </div>
          <Icon
            icon="ph:mouse-simple"
            className="text-5xl animate-bounce invisible lg:visible"
          />
        </div>
      </div>
    </section>
  );
};
