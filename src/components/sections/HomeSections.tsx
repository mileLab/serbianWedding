import { CandleReveal } from "@/components/sections/CandleReveal";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { PeskirReveal } from "@/components/sections/PeskirReveal";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { TrustBadges } from "@/components/sections/TrustBadges";

export function HomeSections() {
  return (
    <>
      <Hero />
      <CandleReveal />
      <PeskirReveal />
      <ProductShowcase />
      <Craftsmanship />
      <TrustBadges />
      <ContactSection />
    </>
  );
}
