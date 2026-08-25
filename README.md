# Sveta Loza — Premium 3D Landingpage

Eine Awwwards-taugliche Kontaktseite für einen serbisch-orthodoxen Devotionalien-Shop
(Taufkerzen, Hochzeitskerzen, Svadbeni Peškir, Taufzubehör, Slava-Dekoration,
handgefertigte Geschenke). **Reine Kontaktaufnahme — kein Warenkorb, kein Checkout.**

Gebaut mit Next.js (App Router), React, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis
und React Three Fiber / drei.

## Erste Schritte

```bash
npm install
cp .env.local.example .env.local   # siehe unten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) — die Seite leitet automatisch
auf `/de` weiter (Sprachumschalter oben rechts für `/sr`).

## Kontaktformular konfigurieren (Resend)

Das Formular sendet Anfragen über [Resend](https://resend.com) per E-Mail.

1. Kostenlosen Account bei Resend erstellen, API-Key generieren.
2. In `.env.local` eintragen:
   ```
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=kontakt@ihre-domain.de
   ```
3. Für den produktiven Einsatz empfiehlt sich eine eigene, in Resend verifizierte
   Domain (`CONTACT_FROM_EMAIL`) statt des Test-Absenders `onboarding@resend.dev`.

Ohne gesetzten `RESEND_API_KEY`/`CONTACT_TO_EMAIL` gibt die API-Route `503
EMAIL_NOT_CONFIGURED` zurück und loggt die Anfrage serverseitig — die Seite bleibt
also lauffähig, versendet aber keine E-Mails.

## Inhalte anpassen

- **Texte (DE/SR):** `src/messages/de.json`, `src/messages/sr.json`
- **Shop-/Kontaktdaten:** `src/lib/constants.ts`
- **Farben, Typografie:** `src/app/globals.css` (`@theme`-Block), Fonts in
  `src/app/[locale]/layout.tsx`

Alle aktuell hinterlegten Kontaktdaten (Adresse, Telefon, E-Mail) sind Platzhalter
und müssen vor Livegang ersetzt werden.

## Echte 3D-Modelle einbinden

Aktuell laufen alle 3D-Szenen (Taufkerze, Peškir, Produktplattformen) mit sauber
gebauten, rein prozeduralen Geometrien — kein externer Asset-Download nötig, die
Seite funktioniert sofort ohne `.glb`-Dateien.

Sobald echte 3D-Modelle von einem Artist vorliegen: `public/models/README.md`
befolgen und die Flags in `src/components/three/modelConfig.ts` umschalten.

## Rechtliches

`/impressum` und `/datenschutz` enthalten Platzhaltertexte
(`legalPages` in den Messages-Dateien) und müssen vor Veröffentlichung durch
rechtsgeprüfte Inhalte ersetzt werden (Impressumspflicht, DSGVO).

## Projektstruktur

```
src/
  app/[locale]/        Next.js App Router Seiten (next-intl Locale-Routing)
  app/api/contact/      Kontaktformular API-Route
  components/layout/    Header, Footer, Smooth-Scroll (Lenis), Canvas-Layer
  components/sections/  Hero, Peškir-Reveal, Produkte, Story, Kontakt, ...
  components/three/     Prozedurale 3D-Szenen (Kerze, Peškir, Produkte, Licht)
  components/ui/        Wiederverwendbare UI-Bausteine
  lib/                  Konstanten, Validierung (zod), E-Mail-Templates, GSAP-Setup
  i18n/, messages/       next-intl Konfiguration & Übersetzungen (de, sr)
```

## Performance & Zugänglichkeit

- Ein einziger, fixed-position R3F `<Canvas>` (dynamisch importiert, `ssr:false`)
  wird von allen Sektionen über drei's `<View>`-Mehrfachansicht geteilt — vermeidet
  mehrere teure WebGL-Kontexte.
- `prefers-reduced-motion` deaktiviert Lenis, GSAP-ScrollTrigger-Animationen und
  die komplette 3D-Ebene zugunsten eines statischen, weiterhin voll nutzbaren Layouts.
- `PerformanceMonitor`/`AdaptiveDpr` passen die Renderqualität automatisch an die
  Gerätleistung an.
- Schriften werden über `next/font` selbst gehostet (kein Render-blockierender
  Google-Fonts-Request).

## Build

```bash
npm run build
npm run lint
```
