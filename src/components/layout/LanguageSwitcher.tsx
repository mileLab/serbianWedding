"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import clsx from "clsx";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={clsx("flex items-center gap-1 rounded-full border border-cream-100/15 p-1", className)}
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? "true" : undefined}
          className={clsx(
            "rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
            loc === locale
              ? "bg-gold-400 text-ink-950"
              : "text-cream-100/60 hover:text-cream-50"
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
