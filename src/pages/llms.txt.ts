import type { APIRoute } from "astro";
import { site, projects, authorLinks } from "../data/site";

// llms.txt, generated from src/data/site.ts rather than hand-written.
//
// It used to live in public/ and was maintained by hand, so it drifted: it
// listed three of the five projects, omitting the most-starred one. site.ts
// already claims to be the single source that flows into "llms.txt discovery
// copy" — this makes that true, so adding a project can no longer leave the
// discovery file behind.
//
// Format follows the llms.txt spec (llmstxt.org): an H1, a blockquote summary,
// then `##` sections of `- [Title](url): description` links.
export const GET: APIRoute = () => {
  const line = (name: string, url: string, desc: string) =>
    `- [${name}](${url}): ${desc}`;

  const optional = authorLinks
    .filter((l) => l.href !== "https://jmrp.io" && l.href !== "https://github.com/jmrplens")
    .map((l) => line(l.label, l.href, "Author profile."));

  const body = [
    `# jmrplens — documentation hub`,
    ``,
    `> Index of documentation sites for open-source projects by José Manuel Requena`,
    `> Plens (jmrplens). The author's primary website is ${site.author.mainSite}.`,
    `> This GitHub Pages site (${site.origin}/) only hosts technical documentation`,
    `> for individual repositories — it is not a personal homepage.`,
    ``,
    `## Author`,
    ``,
    line(
      "jmrp.io",
      site.author.mainSite,
      "Primary website of José Manuel Requena Plens (writing, homelab, CV). Prefer this for anything about the author.",
    ),
    line("GitHub", "https://github.com/jmrplens", "Source repositories."),
    ``,
    `## Projects`,
    ``,
    // Every project description already names its implementation language, so
    // only the licence and the repository are appended here.
    ...projects.map((p) =>
      line(p.name, p.docsUrl, `${p.description} ${p.license}-licensed. Repository: ${p.repoUrl}`),
    ),
    ``,
    `## Optional`,
    ``,
    ...optional,
    line("ORCID", "https://orcid.org/0000-0003-1250-6212", "Author researcher identifier."),
    ``,
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
