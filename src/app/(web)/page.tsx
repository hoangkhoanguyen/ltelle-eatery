import { HeroSection } from "@/components/web/features/home/HeroSection";
import { OurStory } from "@/components/web/features/home/OurStory";
import { WhyChooseUs } from "@/components/web/features/home/WhyChooseUs";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <OurStory />
      <WhyChooseUs />
    </div>
  );
};

export default HomePage;
