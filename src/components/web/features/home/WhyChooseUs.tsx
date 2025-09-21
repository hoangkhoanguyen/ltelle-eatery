import Icon from "@/components/common/Icon";
import React from "react";

export const WhyChooseUs = () => {
  return (
    <section className="bg-web-secondary-2">
      <div className="container mx-auto px-3 md:px-5 pt-10 pb-10 md:pt-12">
        <h3 className="text-web-secondary-3 text-web-subtitle-mobile uppercase mb-5 lg:text-web-subtitle text-center">
          EXCELLENCE &bull; DISTINCTION &bull; QUALITY
        </h3>
        <h2 className="text-center flex flex-col items-center text-web-h2-mobile mb-5 lg:text-web-h2 capitalize">
          <span className="text-web-primary">Why customers</span>
          <span className="text-web-secondary-1">choose us</span>
        </h2>

        <div className="mb-10 lg:max-w-2xl mx-auto">
          <p className="text-center text-web-content-2 text-web-subtitle-mobile lg:text-web-subtitle">
            Discover what makes L’Telle Eater the premier French dining
            destination in Ha Giang, where every detail is crafted to exceed
            your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-5">
          <ReasonItem
            icon="ph:leaf"
            title="Clear & Clean Original Ingredients"
            desc="We are committed to using the freshest ingredients, carefully selected from reputable local farms, ensuring safety and natural flavors in every dish."
          />
          <ReasonItem
            icon="ph:users"
            title="Exceptional Service Quality"
            desc="A team of professional, dedicated and knowledgeable culinary staff are always ready to serve, bringing you the most complete and thoughtful dining experience."
          />
          <ReasonItem
            icon="ph:house"
            title="Elegant Space & Amenities"
            desc="A cozy, romantic space with sophisticated architecture, ideal for intimate dinners or special occasions with breathtaking mountain views.."
          />
        </div>
      </div>
    </section>
  );
};

function ReasonItem({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 aspect-square rounded-full bg-web-primary text-web-secondary-1 flex justify-center items-center mb-2">
        <Icon icon={icon} className="text-[40px]" />
      </div>
      <h4 className="text-web-h3-mobile lg:text-web-h3 text-web-primary capitalize mb-5">
        {title}
      </h4>
      <p className="text-web-body-mobile lg:text-web-body text-web-content-2">
        {desc}
      </p>
    </div>
  );
}
