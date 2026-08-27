# Sveta Loza - Static GitHub Pages Site

A single-page contact site for Serbian Orthodox handcrafted devotional goods:
baptism candles, wedding candles, Svadbeni Peskir, baptism accessories, Slava
decor, and handmade gifts.

Built with Next.js App Router, React, Tailwind CSS v4, GSAP + ScrollTrigger,
Lenis, and React Three Fiber / drei.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default German landing
page is available at `/`, with static language variants at `/de/` and `/sr/`.

## GitHub Pages

This project is configured for static export with `output: "export"`. Running
the build creates the `out/` folder that GitHub Pages serves.

```bash
npm run build
npm run lint
```

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys `out/`
on every push to `main`.

For a normal project page such as `https://<user>.github.io/serbianWedding/`,
the workflow automatically sets the correct base path from the repository name.
For a custom domain or a `<user>.github.io` repository, the base path stays empty.

## Contact Form

GitHub Pages cannot run server API routes. The contact form therefore validates
in the browser and opens a prefilled email to the address configured in
`src/lib/constants.ts`.

If you need server-side email delivery later, deploy to a platform that supports
Next.js route handlers or connect the form to an external form service.

## Content

- Text: `src/messages/de.json`, `src/messages/sr.json`
- Contact details: `src/lib/constants.ts`
- Colors and typography: `src/app/globals.css`, `src/app/layout.tsx`
- Product media: `public/images`, `public/videos`, `public/models`

All current contact and legal details are placeholders and should be replaced
before publishing.

## Structure

```text
src/
  app/                 Static root page, metadata routes, global layout
  app/[locale]/        Static DE/SR language pages
  components/layout/   Header, footer, smooth scrolling, app shell
  components/sections/ Hero, peskir reveal, products, story, contact
  components/three/    Procedural 3D scenes
  components/ui/       Shared UI primitives
  i18n/, messages/     next-intl routing and translations
  lib/                 Constants, validation, public-path helpers
```
