// Single source of truth for the hub's content and identity.
// Add a project here and it flows into the page, the JSON-LD ItemList,
// the sitemap references, and llms.txt discovery copy.

export const site = {
  origin: "https://jmrplens.github.io",
  title: "jmrplens · documentation hub",
  tagline: "Documentation for my open-source projects",
  description:
    "Documentation hub for open-source projects by José M. Requena Plens (jmrplens). My primary website is jmrp.io — this GitHub Pages site only indexes the technical documentation of individual repositories.",
  author: {
    name: "José M. Requena Plens",
    alternateName: "jmrplens",
    mainSite: "https://jmrp.io",
    image: "https://github.com/jmrplens.png",
    sameAs: [
      "https://jmrp.io",
      "https://github.com/jmrplens",
      "https://www.linkedin.com/in/jmrplens",
      "https://scholar.google.com/citations?user=9b0kPaUAAAAJ",
    ],
  },
  // Bing Webmaster Tools verification for the host root (covers sub-path docs).
  bingVerify: "7574EB3B44624C239F14920DBC34EE25",
} as const;

export interface Project {
  /** Display name. */
  name: string;
  /** One-line role, shown as the card kicker. */
  kicker: string;
  /** Short description (1–2 sentences). */
  description: string;
  /** Published documentation URL (under this host). */
  docsUrl: string;
  /** Source repository URL. */
  repoUrl: string;
  /** Primary implementation language. */
  language: string;
  /** Short status label (text, never colour-only). */
  status: string;
}

export const projects: Project[] = [
  {
    name: "GitLab MCP Server",
    kicker: "MCP server · AI tooling",
    description:
      "A Model Context Protocol server that exposes GitLab's REST v4 and GraphQL APIs as 1,000+ tools for AI assistants — a single static Go binary over stdio or HTTP.",
    docsUrl: "https://jmrplens.github.io/gitlab-mcp-server/",
    repoUrl: "https://github.com/jmrplens/gitlab-mcp-server",
    language: "Go",
    status: "Active",
  },
  {
    name: "CrowdSec RouterOS Bouncer",
    kicker: "Security · networking",
    description:
      "A CrowdSec bouncer for MikroTik RouterOS — manages address lists and firewall rules through the RouterOS API.",
    docsUrl: "https://jmrplens.github.io/cs-routeros-bouncer/",
    repoUrl: "https://github.com/jmrplens/cs-routeros-bouncer",
    language: "Go",
    status: "Active",
  },
];

// The author's outbound identity links (footer + Person.sameAs), curated so no
// placeholder leaks into the page.
export const authorLinks = [
  { label: "jmrp.io", href: "https://jmrp.io" },
  { label: "GitHub", href: "https://github.com/jmrplens" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jmrplens" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=9b0kPaUAAAAJ" },
];
