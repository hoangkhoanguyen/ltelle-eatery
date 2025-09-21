import { GallerySection } from "@/components/web/features/home/GallerySection";
import { HeroSection } from "@/components/web/features/home/HeroSection";
import { OurStorySection } from "@/components/web/features/home/OurStorySection";
import { WhyChooseUsSection } from "@/components/web/features/home/WhyChooseUsSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OurStorySection />
      <WhyChooseUsSection />
      <GallerySection />
    </div>
  );
};

export default HomePage;
