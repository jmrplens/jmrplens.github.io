# jmrplens.github.io

Documentation hub for my open-source projects. My primary website is
**[jmrp.io](https://jmrp.io)** — this GitHub Pages site only indexes the
technical documentation of individual repositories.

Built with [Astro](https://astro.build) using the jmrp.io "Lab / Engineering"
design system (dark-first, amber + teal, self-hosted fonts).

## Develop

```bash
pnpm install
pnpm dev       # local dev server
pnpm check     # astro type/diagnostics check
pnpm build     # static build → dist/
```

## Structure

- `src/data/site.ts` — single source of truth (identity + project list). Add a
  project here and it flows into the page, JSON-LD, and `llms.txt`.
- `src/pages/index.astro` — the hub page.
- `src/layouts/Base.astro` — head, SEO/OG, JSON-LD `@graph`, theme handling.
- `public/` — `robots.txt`, `sitemap.xml`, `llms.txt`, icons, OG image, and the
  IndexNow key served at the domain root.

Deploys automatically to GitHub Pages on push to `main`
(`.github/workflows/pages.yml`), which also pings IndexNow.
