import AboutMenu from "@/components/web/features/menu/AboutMenu";
import BannerSlider from "@/components/web/features/menu/BannerSlider";
import FoodCategories from "@/components/web/features/menu/FoodCategories";
import NewFood from "@/components/web/features/menu/NewFood";
import { WhyChooseUsSection } from "@/components/web/shared/WhyChooseUsSection";
import { getUIConfigsByKey } from "@/services/configs";
import Image from "next/image";
import React from "react";

// export const dynamic = "force-dynamic";

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  const dbConfigs = await getUIConfigsByKey("menu_page");

  console.log("configsssssssssss", category, dbConfigs);

  const configs = dbConfigs?.value as any;

  return (
    <div className="bg-web-background-3">
      <section className="relative">
        <BannerSlider autoplay={configs?.hero.autoplay}>
          {configs?.hero.images.map((item: any, index: number) => (
            <div className="relative w-full aspect-[21/9]" key={index}>
              <Image src={item.url} fill alt={item.alt} />
            </div>
          ))}
        </BannerSlider>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <h1 className="flex flex-col items-center text-web-h1-mobile lg:text-web-h1 text-web-background-1 text-center mb-2.5 md:mb-10">
            {configs.hero.title.map((item: any, index: number) => (
              <span
                key={index}
                className={index % 2 === 0 ? "" : "text-web-secondary-1"}
              >
                {item.text}
              </span>
            ))}
          </h1>
        </div>
      </section>
      <AboutMenu configs={configs?.introduction} />
      <FoodCategories
        configs={configs?.food_categories}
        activeCategoryKey={category}
      />
      <NewFood configs={configs?.new_product} />
      <section className="bg-web-secondary-2">
        <WhyChooseUsSection configs={configs?.why_choose_us} />
      </section>
    </div>
  );
};

export default page;
