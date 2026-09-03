import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Broken Fixture Co",
};

// Not linked from the homepage or primary navigation — its only inbound link is buried 3
// clicks deep (home -> /blog/page/1 -> /blog/page/1/deeper -> here). internal_linking rules
// need a page to actually be crawled (this crawler discovers pages purely via BFS over real
// <a href> links, with no sitemap in this fixture) to be evaluated at all, so a truly
// zero-inbound, never-crawled page could never be scored as an orphan by definition — instead
// this page is reachable but deliberately buried: exactly 1 inbound link (below the
// internal_linking.important_page_inlinks minimum of 2) at click-depth 3 (past the
// internal_linking.important_pages_reachability maximum of 2).
//
// on_page.missing_h2: wordCount is pushed past the rule's 150-word threshold below while
// deliberately using zero <h2> tags anywhere on the page (only the single <h1>), which is the
// one PAGE-scope on_page condition that cannot coexist with the heading_hierarchy/missing_h2
// tension documented on /on-page (that page needs a non-H1 first heading for
// heading_hierarchy's WARNING path, which unavoidably supplies an H2 and satisfies missing_h2).
export default function PricingPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Pricing</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <p>
        This page exists but is buried several clicks deep with only one
        inbound link, and it deliberately organizes all of its content under
        a single H1
        with no H2 subheadings anywhere, so a reader scanning the page for
        section breaks finds none: pricing tiers, billing cadence, contract
        terms, support levels, and add-on options are all described in an
        undivided sequence of paragraphs rather than being broken into
        clearly labeled subsections the way a well-structured pricing page
        normally would be.
      </p>
      <p>
        The basic tier covers a small monthly allotment of usage at a flat
        rate, the standard tier scales that allotment up considerably for a
        higher flat rate, and the enterprise tier removes the allotment cap
        entirely in exchange for a negotiated annual contract, none of which
        is broken out under its own heading here — it is simply narrated in
        paragraph form, one tier after another, with no structural markers a
        scanner or a skimming reader could use to jump directly to the tier
        that matters to them.
      </p>
    </main>
  );
}
