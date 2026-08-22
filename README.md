# jmrplens.github.io

**This site's root is a redirect.** Since 2026-08-22 the landing page at
[jmrplens.github.io](https://jmrplens.github.io) consolidates into
**[jmrp.io/projects](https://jmrp.io/projects/)** — the canonical home of these
projects — via a cross-domain `rel="canonical"`, an instant meta refresh and a
visible fallback link. The page is `noindex,follow` so it never competes with
jmrp.io for the same entity in search or AI answer engines (that competition was
finding A3 of the jmrp.io GEO audit; this repo's root used to be a standalone
landing with a self-referencing canonical).

Two things this repo does **not** do, to avoid confusion:

- **It does not host the per-project documentation.** Sites like
  [`/phonometry/`](https://jmrplens.github.io/phonometry/) or
  [`/gitlab-mcp-server/`](https://jmrplens.github.io/gitlab-mcp-server/) are
  GitHub *project pages*, built and published from each project's own
  repository. They are unaffected by anything here — and the stable
  `jmrp.io/docs/<project>` URLs (what the repos' homepage fields point at)
  redirect to them.
- **It is not the place to add a project.** Projects are listed and maintained
  at [jmrp.io/projects](https://jmrp.io/projects/), driven by jmrp.io's own
  data files.

## What is actually here

Still an [Astro](https://astro.build) site, deployed to GitHub Pages on push to
`main` (`.github/workflows/pages.yml`, which also pings IndexNow):

- `src/pages/index.astro` — the redirect page described above.
- `src/pages/old/index.astro` — the previous hub landing, preserved at
  [`/old/`](https://jmrplens.github.io/old/) for reference.
- `src/data/site.ts` — identity + project list consumed by the old landing and
  `llms.txt`.
- `public/` — `robots.txt`, `sitemap.xml`, `llms.txt`, icons, OG image, and the
  IndexNow key served at the domain root.

## Develop

```bash
pnpm install
pnpm dev       # local dev server
pnpm check     # astro type/diagnostics check
pnpm build     # static build → dist/
```
