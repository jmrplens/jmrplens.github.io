// Single source of truth for the hub's content and identity.
// Add a project here and it flows into the page, the JSON-LD graph, the
// sitemap, llms.txt discovery copy, and the FAQ.
//
// The Person entity mirrors the canonical node published at https://jmrp.io
// (same @id: https://jmrp.io/#person) so AI knowledge-graph pipelines merge
// both sites into one entity. Keep it in sync with jmrp.io — do not invent
// fields here.

// Injected at build time; used as the freshness signal (dateModified + sitemap lastmod).
export const BUILD_DATE = new Date().toISOString();

export const site = {
  origin: "https://jmrplens.github.io",
  title: "jmrplens · documentation hub",
  tagline: "Documentation for my open-source projects",
  // Full description for structured data / OG.
  description:
    "Documentation hub for open-source projects by José Manuel Requena Plens (jmrplens). My primary website is jmrp.io — this GitHub Pages site only indexes the technical documentation of individual repositories.",
  // Trimmed to ~155 chars so search snippets don't truncate.
  metaDescription:
    "Documentation hub for open-source projects by José Manuel Requena Plens (jmrplens). Primary site: jmrp.io. Indexes the docs of each repository.",
  author: {
    // Canonical name (matches jmrp.io); display name is the shorter form.
    name: "José Manuel Requena Plens",
    displayName: "José M. Requena Plens",
    alternateName: ["jmrplens", "José M. Requena Plens"],
    jobTitle: "R&D Engineer",
    bio: "R&D Engineer specializing in software development, cloud infrastructure, and security.",
    mainSite: "https://jmrp.io",
    image: "https://github.com/jmrplens.png",
    knowsAbout: [
      "Model Context Protocol",
      "GitLab API",
      "Go",
      "Developer tooling",
      "Embedded Systems",
      "Firmware",
      "Cryptography",
      "Network Security",
      "MikroTik RouterOS",
      "WireGuard",
      "IPv6",
      "Acoustics",
      "Signal Processing",
    ],
    // Mirrors jmrp.io/#person sameAs (verified identity profiles only).
    sameAs: [
      "http://www.wikidata.org/entity/Q140455276",
      "https://github.com/jmrplens",
      "https://www.linkedin.com/in/jmrplens",
      "https://mstdn.jmrp.io/@jmrplens",
      "https://matrix.to/#/@jmrplens:matrix.jmrp.io",
      "https://keyoxide.org/0A993B268654DBBA52B7E8D3FCF653391E2C91FC",
      "https://scholar.google.com/citations?user=9b0kPaUAAAAJ",
      "https://orcid.org/0000-0003-1250-6212",
      "https://www.researchgate.net/profile/Jose-Requena-Plens-2",
      "https://www.mathworks.com/matlabcentral/profile/authors/5890853",
    ],
  },
  // Bing Webmaster Tools verification for the host root (covers sub-path docs).
  bingVerify: "7574EB3B44624C239F14920DBC34EE25",
  // Google Search Console verification for the host root (covers sub-path docs).
  googleVerify: "4Hx_PJ1seU_BgKfWpo_FA7_Hkh7GeYVNrvnvzqCjF0Q",
} as const;

export interface Project {
  /** Display name. */
  name: string;
  /** One-line role, shown as the card kicker. */
  kicker: string;
  /** Short description (1–2 sentences, self-contained incl. language). */
  description: string;
  /** Published documentation URL (under this host). */
  docsUrl: string;
  /** Source repository URL. */
  repoUrl: string;
  /** Primary implementation language. */
  language: string;
  /** Short status label (text, never colour-only). */
  status: string;
  /** SPDX license id. */
  license: string;
  /** License URL for structured data. */
  licenseUrl: string;
  /** Topic keywords for structured data. */
  keywords: string[];
  /** Target operating systems. */
  operatingSystem: string;
  /** Extra sameAs targets (registries, knowledge-graph entities). */
  sameAs?: string[];
  /** Wikidata Q-id, when the project has a knowledge-graph entity. */
  wikidata?: string;
}

const MIT_URL = "https://opensource.org/license/mit";

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
    license: "MIT",
    licenseUrl: MIT_URL,
    keywords: ["Model Context Protocol", "MCP", "GitLab", "AI tooling", "Go"],
    operatingSystem: "Linux, macOS, Windows",
    wikidata: "Q140389426",
    sameAs: [
      "https://www.wikidata.org/wiki/Q140389426",
      "https://github.com/jmrplens/gitlab-mcp-server",
      "https://glama.ai/mcp/servers/jmrplens/gitlab-mcp-server",
      "https://smithery.ai/servers/jmrp/gitlab-mcp-server",
      "https://mcp.so/server/gitlab-mcp-server/jmrplens",
      "https://www.pulsemcp.com/servers/jmrplens-gitlab",
    ],
  },
  {
    name: "CrowdSec RouterOS Bouncer",
    kicker: "Security · networking",
    description:
      "A CrowdSec bouncer for MikroTik RouterOS — manages address lists and firewall rules through the RouterOS API. Written in Go.",
    docsUrl: "https://jmrplens.github.io/cs-routeros-bouncer/",
    repoUrl: "https://github.com/jmrplens/cs-routeros-bouncer",
    language: "Go",
    status: "Active",
    license: "MIT",
    licenseUrl: MIT_URL,
    keywords: ["CrowdSec", "MikroTik", "RouterOS", "firewall", "security", "Go"],
    operatingSystem: "Linux, macOS, Windows, FreeBSD",
    wikidata: "Q140393352",
    sameAs: [
      "https://www.wikidata.org/wiki/Q140393352",
      "https://github.com/jmrplens/cs-routeros-bouncer",
      "https://app.crowdsec.net/hub/author/jmrplens/remediation-components/cs-routeros-bouncer",
    ],
  },
  {
    name: "phonometry",
    kicker: "Acoustics · DSP",
    description:
      "Acoustic measurement toolkit for Python: fractional octave-band filter banks, A/C/Z and time weighting, and sound level metrology — conformance-tested against IEC 61260-1 and IEC 61672-1. Formerly PyOctaveBand.",
    docsUrl: "https://jmrplens.github.io/phonometry/",
    repoUrl: "https://github.com/jmrplens/phonometry",
    language: "Python",
    status: "Active",
    license: "MIT",
    licenseUrl: MIT_URL,
    keywords: ["acoustics", "DSP", "octave bands", "IEC 61672", "sound level", "Python"],
    operatingSystem: "Linux, macOS, Windows",
    wikidata: "Q140455472",
    sameAs: [
      "https://www.wikidata.org/wiki/Q140455472",
      "https://github.com/jmrplens/phonometry",
      "https://pypi.org/project/phonometry/",
      "https://doi.org/10.5281/zenodo.21215280",
    ],
  },
  {
    name: "Cloudflare DNS Updater",
    kicker: "Networking · DDNS",
    description:
      "Dynamic DNS for Cloudflare in pure Bash — creates, updates or deletes IPv4/IPv6 records with per-record settings, notifications, and no runtime dependencies.",
    docsUrl: "https://jmrplens.github.io/Cloudflare-DNS-Updater/",
    repoUrl: "https://github.com/jmrplens/Cloudflare-DNS-Updater",
    language: "Bash",
    status: "Active",
    license: "MIT",
    licenseUrl: MIT_URL,
    keywords: ["Cloudflare", "DNS", "DDNS", "dynamic DNS", "Bash", "IPv6"],
    operatingSystem: "Linux, macOS, BSD",
    wikidata: "Q140447586",
    sameAs: [
      "https://www.wikidata.org/wiki/Q140447586",
      "https://github.com/jmrplens/Cloudflare-DNS-Updater",
    ],
  },
];

// The author's outbound identity links (footer). Curated subset of sameAs.
export const authorLinks = [
  { label: "jmrp.io", href: "https://jmrp.io" },
  { label: "GitHub", href: "https://github.com/jmrplens" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jmrplens" },
  { label: "Mastodon", href: "https://mstdn.jmrp.io/@jmrplens" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=9b0kPaUAAAAJ" },
];

// Citable Q&A units — rendered visibly and as FAQPage structured data.
export const faqs = [
  {
    q: "What is this site?",
    a: "A documentation hub that indexes the technical documentation for José Manuel Requena Plens's open-source projects. The author's primary website is jmrp.io; this GitHub Pages site only points at each repository's docs.",
  },
  {
    q: "Who is jmrplens?",
    a: "jmrplens is José Manuel Requena Plens, an R&D engineer and the author of the GitLab MCP Server and the CrowdSec RouterOS Bouncer.",
  },
  {
    q: "Where is the main website?",
    a: "jmrp.io is the primary website (writing, homelab, CV). This hub exists only to index documentation for individual repositories.",
  },
];
