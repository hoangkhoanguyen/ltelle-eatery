import { ContactSection } from "@/components/web/features/home/ContactSection";
import { GallerySection } from "@/components/web/features/home/GallerySection";
import { HeroSection } from "@/components/web/features/home/HeroSection";
import { OurStorySection } from "@/components/web/features/home/OurStorySection";
import { ReviewsSection } from "@/components/web/features/home/ReviewsSection";
import { WhyChooseUsSection } from "@/components/web/shared/WhyChooseUsSection";
import { getAdminProductDetailsById } from "@/services/products";
import { unstable_noStore } from "next/cache";
import React from "react";

export const revalidate = 300; // revalidate this page every 300 seconds

const HomePage = async () => {
  unstable_noStore();
  const product = await getAdminProductDetailsById(1);

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
