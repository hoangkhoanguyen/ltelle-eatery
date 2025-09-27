import AboutMenu from "@/components/web/features/menu/AboutMenu";
import BannerSlider from "@/components/web/features/menu/BannerSlider";
import FoodCategories from "@/components/web/features/menu/FoodCategories";
import NewFood from "@/components/web/features/menu/NewFood";
import { WhyChooseUsSection } from "@/components/web/shared/WhyChooseUsSection";
import React from "react";

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  return (
    <div className="bg-web-background-3">
      <section className="relative">
        <BannerSlider></BannerSlider>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <h1 className="flex flex-col items-center text-web-h1-mobile lg:text-web-h1 text-web-background-1 text-center mb-2.5 md:mb-10">
            <span>Where Frech</span>
            <span className="text-web-secondary-1">Culinary Art</span>
            <span>Meet Vietnamese Soul</span>
          </h1>
        </div>
      </section>
      <AboutMenu />
      <FoodCategories activeCategoryKey={category} />
      <NewFood />
      <section className="bg-web-background-1">
        <WhyChooseUsSection />
      </section>
    </div>
  );
};

export default page;
