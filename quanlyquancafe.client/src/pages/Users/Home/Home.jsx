import React from "react";
import HomeItemDisplay from "../../../components/Users/HomeItemDisplay/HomeItemDisplay";
import HeroHeaderSection from "../../../components/Users/Home/HeroHeaderSection/HeroHeaderSection";
import HowItWorkSection from "../../../components/Users/Home/HowItWorkSection/HowItWorkSection";
import TestimonialSection from "../../../components/Users/Home/TestimonialSection/TestimonialSection";
import FeatureProductsSection from "../../../components/Users/Home/FeatureProductsSection/FeatureProductsSection";
import HeroCarouselSection from "../../../components/Users/Home/HeroCarouselSection/HeroCarouselSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-cream">
      <main className="container mx-auto px-4 py-12 gap-24 flex flex-col">
        <HeroHeaderSection />
        <HeroCarouselSection />
        <HowItWorkSection />
        <FeatureProductsSection />
        <TestimonialSection />
      </main>
    </div>
  );
};

export default Home;
