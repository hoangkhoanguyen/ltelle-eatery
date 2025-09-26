import { ContactSection } from "@/components/web/features/home/ContactSection";
import { GallerySection } from "@/components/web/features/home/GallerySection";
import { HeroSection } from "@/components/web/features/home/HeroSection";
import { OurStorySection } from "@/components/web/features/home/OurStorySection";
import { ReviewsSection } from "@/components/web/features/home/ReviewsSection";
import { WhyChooseUsSection } from "@/components/web/shared/WhyChooseUsSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OurStorySection />
      <section className="bg-web-secondary-2">
        <WhyChooseUsSection />
      </section>
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
