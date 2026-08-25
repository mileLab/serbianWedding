import { useTranslations } from "next-intl";
import { RevealGroup } from "@/components/ui/RevealGroup";

export function TrustBadges() {
  const t = useTranslations("trust");
  const items = t.raw("items") as Array<{ title: string; text: string }>;

  return (
    <section className="relative border-y border-cream-100/[0.06] bg-ink-950 py-16 md:py-20">
      <div className="section-container">
        <h2 className="sr-only">{t("title")}</h2>
        <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4" y={20}>
          {items.map((item, i) => (
            <div key={i} data-reveal-item className="flex flex-col gap-2 border-l border-gold-400/30 pl-5">
              <h3 className="font-display text-lg text-cream-50">{item.title}</h3>
              <p className="text-sm leading-relaxed text-cream-100/60">{item.text}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
