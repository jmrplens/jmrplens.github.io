import type { APIRoute } from "astro";
import { site, projects, BUILD_DATE } from "../data/site";

// Hand-built sitemap (not @astrojs/sitemap) because it lists the two doc
// sub-sites — which are separate deployments, not pages of this Astro build —
// alongside the hub root. lastmod is the build/deploy date, so each deploy
// refreshes the freshness signal (also fed to Bing via IndexNow).
export const GET: APIRoute = () => {
  const lastmod = BUILD_DATE.slice(0, 10);
  const urls = [
    { loc: `${site.origin}/`, changefreq: "monthly", priority: "1.0" },
    ...projects.map((p) => ({ loc: p.docsUrl, changefreq: "weekly", priority: "0.9" })),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
          `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
