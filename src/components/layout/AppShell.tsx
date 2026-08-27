import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactRequestProvider } from "@/components/ContactRequestContext";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Preloader } from "@/components/sections/Preloader";
import deMessages from "@/messages/de.json";
import srMessages from "@/messages/sr.json";
import type { AppLocale } from "@/i18n/routing";

const messagesByLocale = {
  de: deMessages,
  sr: srMessages,
} satisfies Record<AppLocale, typeof deMessages>;

export async function AppShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: AppLocale;
}) {
  const t = await getTranslations({ locale });
  const skipLabel = t("skipToContent");

  return (
    <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-ink-950"
      >
        {skipLabel}
      </a>
      <ContactRequestProvider>
        <SmoothScrollProvider>
          <Preloader />
          <Header />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </ContactRequestProvider>
    </NextIntlClientProvider>
  );
}
