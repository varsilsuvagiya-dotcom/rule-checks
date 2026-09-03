import type { Metadata } from "next";

// technical.canonical_conflicts: declares the SAME canonical target as
// /technical-markup ("/technical-markup/canonical-dead-end") while carrying a genuinely
// different <title> — the exact "different content collapsed into one canonical" trigger the
// rule checks for (two pages, same canonicalUrl, different p.title).
//
// technical.url_structure: linked from /technical-markup as
// "/Technical-Markup/Canonical-Conflict-B" (uppercase path) — Next's App Router is
// case-sensitive, so that specific link would 404 rather than reach this component; it is kept
// only as a case-variant link target for technical.trailing_slash_consistency's additive
// case-mismatch check (two internal links to what's nominally "the same" path differing only by
// letter case), not to make this page's own URL dirty. Its canonical lowercase URL is clean.
export const metadata: Metadata = {
  title: "Canonical Conflict B | Broken Fixture Co",
  alternates: {
    canonical: "/technical-markup/canonical-dead-end",
  },
};

export default function CanonicalConflictBPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Canonical Conflict B</h1>
      <p>
        This page declares the same canonical target as /technical-markup
        (&quot;/technical-markup/canonical-dead-end&quot;) but has a different title, which is
        the exact condition technical.canonical_conflicts flags.
      </p>
    </main>
  );
}
