import { GallerySection } from "@/components/web/features/home/GallerySection";
import { HeroSection } from "@/components/web/features/home/HeroSection";
import { OurStorySection } from "@/components/web/features/home/OurStorySection";
import { ReviewsSection } from "@/components/web/features/home/ReviewsSection";
import { WhyChooseUsSection } from "@/components/web/features/home/WhyChooseUsSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OurStorySection />
      <WhyChooseUsSection />
      <GallerySection />
      <ReviewsSection />
    </div>
  );
};

export default HomePage;
