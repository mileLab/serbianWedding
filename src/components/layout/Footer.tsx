import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { CONTACT, NAV_SECTION_IDS } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cream-100/[0.06] bg-ink-900">
      <RevealGroup className="section-container grid gap-12 py-16 md:grid-cols-3 md:py-20" y={16} start="top 90%">
        <div data-reveal-item className="flex flex-col gap-4">
          <span className="font-display text-2xl text-cream-50">Sveta Loza</span>
          <p className="max-w-xs text-sm leading-relaxed text-cream-100/60">{t("description")}</p>
        </div>

        <div data-reveal-item className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            {t("contactTitle")}
          </h3>
          <a href={`mailto:${CONTACT.email}`} className="text-sm text-cream-100/70 hover:text-gold-200">
            {CONTACT.email}
          </a>
          <a href={`tel:${CONTACT.phoneHref}`} className="text-sm text-cream-100/70 hover:text-gold-200">
            {CONTACT.phone}
          </a>
          <p className="text-sm text-cream-100/70">{CONTACT.addressLine}</p>
        </div>

        <div data-reveal-item className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
            {t("navTitle")}
          </h3>
          {[NAV_SECTION_IDS.candle, NAV_SECTION_IDS.peskir, NAV_SECTION_IDS.products, NAV_SECTION_IDS.contact].map(
            (id) => (
              <a key={id} href={`#${id}`} className="text-sm text-cream-100/70 hover:text-gold-200">
                {tNav(id)}
              </a>
            )
          )}
        </div>
      </RevealGroup>

      <GoldDivider className="pb-8" />

      <div className="section-container flex flex-col items-center justify-between gap-4 pb-10 text-xs text-cream-100/40 md:flex-row">
        <p>
          © {year} Sveta Loza. {t("rights")}
        </p>
        <div className="flex gap-6">
          <Link href="/impressum" className="hover:text-cream-100/70">
            {t("imprint")}
          </Link>
          <Link href="/datenschutz" className="hover:text-cream-100/70">
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
