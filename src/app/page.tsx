import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { ProductHighlights } from "@/components/home/ProductHighlights";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Segments } from "@/components/home/Segments";
import { TrustSection } from "@/components/home/TrustSection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { NotFoundCTA } from "@/components/home/NotFoundCTA";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductHighlights />
      <HowItWorks />
      <Segments />
      <TrustSection />
      <HomeFAQ />
      <NotFoundCTA />
    </>
  );
}
