import type { Metadata } from "next";

// technical.indexability: meta robots noindex on a page that IS linked from
// /technical-headers (reachable, not robots.txt-disallowed) -> indexingBlockers() finds
// "meta robots noindex", isInSitemap() is false (this URL isn't in public/sitemap.xml, whose
// domain is also wrong), so isPageBlocked() is true and this page is excluded from site-wide
// scoring aggregates... BUT the PAGE-scope rule itself (technical.indexability) still records a
// per-page FAIL result for any page it evaluates before the blocked-page suppression is applied
// upstream in scoring; kept here as the honest, direct trigger for the rule's own check() logic
// (blockers.length > 0 -> FAIL) rather than piggybacking on /category/technical, which is itself
// robots.txt-disallowed and may never get crawled/BFS'd as an ordinary page at all.
export const metadata: Metadata = {
  title: "Indexability Blocked Fixture | Broken Fixture Co",
  robots: {
    index: false,
    follow: false,
  },
};

export default function IndexabilityBlockedPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Indexability Blocked Fixture</h1>
      <p>
        This page carries a meta robots noindex directive despite being a normal, linked,
        reachable page — an indexability blocker with no legitimate reason behind it.
      </p>
    </main>
  );
}
