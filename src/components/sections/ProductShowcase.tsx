"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { PRODUCT_CATEGORY_KEYS, NAV_SECTION_IDS, type ProductCategoryKey } from "@/lib/constants";
import { useContactRequest } from "@/components/ContactRequestContext";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { publicPath } from "@/lib/publicPath";

const CATEGORY_IMAGES: Record<ProductCategoryKey, string> = {
  baptismCandles: publicPath("/images/cat/taufkerze.jpg"),
  weddingCandles: publicPath("/images/cat/Hochzeitskerze.jpg"),
  weddingTowels: publicPath("/images/cat/peskir.jpg"),
  baptismAccessories: publicPath("/images/cat/Taufzubehör.jpg"),
  slavaDecor: publicPath("/images/cat/Slavazubehör.jpg"),
  giftware: publicPath("/images/cat/geschenke.jpg"),
};

// These two source photos are portrait (candles shot tall); object-cover in the wide
// card frame would crop the candle itself, so they need object-contain instead.
const PORTRAIT_CATEGORIES = new Set<ProductCategoryKey>(["baptismCandles", "weddingCandles"]);

function ProductCard({ category }: { category: ProductCategoryKey }) {
  const t = useTranslations(`products.categories.${category}`);
  const { requestCategory } = useContactRequest();
  const scrollToSection = useScrollToSection();
  const isPortrait = PORTRAIT_CATEGORIES.has(category);

  return (
    <div
      data-reveal-item
      className="group flex flex-col overflow-hidden rounded-2xl border border-cream-100/[0.08] bg-cream-100/[0.02] transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:border-gold-400/40"
    >
      <div className="relative h-56 w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.1),transparent_70%)] sm:h-64">
        <img
          src={CATEGORY_IMAGES[category]}
          alt={t("title")}
          className={`h-full w-full transition-transform duration-500 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 ${
            isPortrait ? "object-contain" : "object-cover"
          }`}
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl text-cream-50">{t("title")}</h3>
        <p className="flex-1 text-sm leading-relaxed text-cream-100/65">{t("description")}</p>
        <button
          onClick={() => {
            requestCategory(category);
            scrollToSection(NAV_SECTION_IDS.contact);
          }}
          className="mt-2 inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.2em] text-gold-300 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-gold-200"
        >
          {t("cta")}
          <span
            aria-hidden="true"
            className="transition-transform [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const t = useTranslations("products");

  return (
    <section id="products" className="relative bg-ink-950 py-24 md:py-32">
      <div className="section-container flex flex-col gap-16">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" y={40}>
          {PRODUCT_CATEGORY_KEYS.map((key) => (
            <ProductCard key={key} category={key} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
