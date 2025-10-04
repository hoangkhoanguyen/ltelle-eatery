import { ContactSection } from "@/components/web/features/home/ContactSection";
import { GallerySection } from "@/components/web/features/home/GallerySection";
import { HeroSection } from "@/components/web/features/home/HeroSection";
import { OurStorySection } from "@/components/web/features/home/OurStorySection";
import { ReviewsSection } from "@/components/web/features/home/ReviewsSection";
import { WhyChooseUsSection } from "@/components/web/shared/WhyChooseUsSection";
import { getUIConfigsByKey } from "@/services/ui-configs";
import React from "react";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const homeConfig = await getUIConfigsByKey("homepage");

  return (
    <div>
      <HeroSection configs={homeConfig?.value.hero} />
      <OurStorySection configs={homeConfig?.value.our_story} />
      <section className="bg-web-secondary-2">
        <WhyChooseUsSection configs={homeConfig?.value.why_choose_us} />
      </section>
      <GallerySection configs={homeConfig?.value.gallery} />
      <ReviewsSection configs={homeConfig?.value.reviews} />
      <ContactSection configs={homeConfig?.value.contact} />
    </div>
  );
};

export default HomePage;
