import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { PeskirReveal } from "@/components/sections/PeskirReveal";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { ContactSection } from "@/components/sections/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PeskirReveal />
      <ProductShowcase />
      <Craftsmanship />
      <TrustBadges />
      <ContactSection />
    </>
  );
}
