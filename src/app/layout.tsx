import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import deMessages from "@/messages/de.json";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: deMessages.meta.title,
  description: deMessages.meta.description,
  metadataBase: new URL("https://svetaloza-beispiel.rs"),
  openGraph: {
    title: deMessages.meta.title,
    description: deMessages.meta.description,
    type: "website",
    siteName: SITE_NAME,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: SITE_NAME,
  description: deMessages.meta.description,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.addressLine,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-ink-950 text-cream-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
