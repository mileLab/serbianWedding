import { setRequestLocale } from "next-intl/server";
import { AppShell } from "@/components/layout/AppShell";
import { HomeSections } from "@/components/sections/HomeSections";
import { routing } from "@/i18n/routing";

export default function RootPage() {
  setRequestLocale(routing.defaultLocale);

  return (
    <AppShell locale={routing.defaultLocale}>
      <HomeSections />
    </AppShell>
  );
}
