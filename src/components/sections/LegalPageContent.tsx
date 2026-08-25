import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type LegalSection = { heading: string; text: string };

export function LegalPageContent({ namespace }: { namespace: "imprint" | "privacy" }) {
  const t = useTranslations(`legalPages.${namespace}`);
  const tBack = useTranslations("legalPages");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <section className="relative bg-ink-950 pb-24 pt-32 md:pt-40">
      <div className="section-container flex max-w-2xl flex-col gap-10">
        <Link href="/" className="text-xs uppercase tracking-[0.2em] text-gold-300 hover:text-gold-200">
          ← {tBack("back")}
        </Link>
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl text-cream-50 sm:text-5xl">{t("title")}</h1>
          <p className="text-sm leading-relaxed text-cream-100/60">{t("intro")}</p>
        </div>
        <div className="flex flex-col gap-8 border-t border-cream-100/10 pt-8">
          {sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-2">
              <h2 className="font-display text-lg text-gold-200">{s.heading}</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-cream-100/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
