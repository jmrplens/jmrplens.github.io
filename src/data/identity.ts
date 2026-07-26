// The canonical `#person` entity, fetched at build time from its single
// source of truth on jmrp.io.
//
// This hub used to hand-copy jobTitle, description, image, alternateName and
// sameAs from the portfolio, with a comment asking future editors to keep them
// in sync. Across the five other project sites doing the same thing, that
// convention failed twice: two ended up publishing values that contradicted
// the canonical node, one an avatar URL that had started returning 404. Values
// that must not diverge should not be copied at all.
//
// Fetched from raw.githubusercontent.com rather than https://jmrp.io on
// purpose: this build runs on a CI runner, and jmrp.io sits behind Cloudflare,
// CrowdSec and a MikroTik bouncer, where a blocked runner IP would silently
// degrade this site to a stale snapshot. GitHub serves the same bytes and is
// already a hard dependency of the build — the checkout comes from it.
import snapshot from "./person.snapshot.json";

const CANONICAL_IDENTITY_URL =
  "https://raw.githubusercontent.com/jmrplens/jmrp.io/main/public/identity/person.jsonld";

/** A `knowsAbout` entry: a bare label, or a Wikidata-linked `Thing`. */
type Topic = string | { "@type": "Thing"; name: string; "@id": string };

/** The shape this module needs from the canonical document. */
interface CanonicalPerson {
  "@context"?: string;
  knowsAbout?: Topic[];
  [key: string]: unknown;
}

/**
 * Topics specific to this hub, kept alongside the canonical expertise list
 * rather than replacing it. `knowsAbout` is multi-valued, so the two sets merge
 * instead of conflicting — which is why these may stay local while the
 * single-valued properties may not.
 */
const projectTopics: Topic[] = [
  {
    "@type": "Thing",
    name: "GitLab",
    "@id": "http://www.wikidata.org/entity/Q16639197",
  },
  {
    "@type": "Thing",
    name: "Programming tool",
    "@id": "http://www.wikidata.org/entity/Q1077784",
  },
];

/** Reads a topic's label, which may be a string or a Thing. */
const topicName = (topic: Topic): string =>
  typeof topic === "string" ? topic : (topic.name ?? "");

// Committed fallback, only reached if the fetch fails — which, given the URL is
// on the same host as the checkout, effectively means GitHub is down and there
// is no build anyway. The warning is deliberately loud so a stale identity
// never ships unnoticed. Refresh with `pnpm run identity:sync`.
const fetched: CanonicalPerson = await fetch(CANONICAL_IDENTITY_URL, {
  signal: AbortSignal.timeout(10_000),
})
  .then((response) =>
    response.ok
      ? (response.json() as Promise<CanonicalPerson>)
      : Promise.reject(new Error(`HTTP ${response.status}`)),
  )
  .catch((error: Error) => {
    console.warn(
      `\n⚠ [identity] Could not fetch the canonical Person entity (${error.message}).\n` +
        `  Falling back to src/data/person.snapshot.json — this build may ship a stale identity.\n`,
    );
    return snapshot as CanonicalPerson;
  });

// `@context` is stripped: the document is standalone, but here it becomes one
// node of a graph that already declares the context once. Filtered rather than
// rest-destructured so no unused binding is left for linters to flag.
const canonicalPerson: CanonicalPerson = Object.fromEntries(
  Object.entries(fetched).filter(([key]) => key !== "@context"),
);

/**
 * The canonical Person node, ready to splice into this site's `@graph`.
 * Canonical topics first, then this hub's own, de-duplicated by label
 * (case-insensitively). Canonical entries win a collision because they carry a
 * verified Wikidata `@id`.
 */
export const personNode = (() => {
  const canonical = canonicalPerson.knowsAbout ?? [];
  const seen = new Set(canonical.map((t) => topicName(t).toLowerCase()));
  return {
    ...canonicalPerson,
    knowsAbout: [
      ...canonical,
      ...projectTopics.filter((t) => !seen.has(topicName(t).toLowerCase())),
    ],
  };
})();
