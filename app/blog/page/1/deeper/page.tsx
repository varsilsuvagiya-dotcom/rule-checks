import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deeper Archive | Broken Fixture Co",
};

// Reached at click-depth 2 from home (home -> /blog/page/1 -> here), and links onward to
// /pricing at depth 3 — see internal_linking.important_pages_reachability /
// internal_linking.important_page_inlinks on /pricing. Also continues the deep chain
// (d3 -> d4 -> ... -> d8 -> /product) that buries /product at click-depth 9, past the
// internal_linking.link_depth_distribution DEEP_THRESHOLD (4 clicks) and the
// important_pages_reachability MAX_KEY_PAGE_DEPTH (2 clicks) — see /product's own notes.
export default function DeeperPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Deeper Archive</h1>
      <p>A page that exists only to bury the pricing page a few clicks deep.</p>
      <p>
        <a href="/pricing">Pricing</a>
      </p>
      <p>
        <a href="/blog/page/1/deeper/d3">Continue deeper</a>
      </p>
    </main>
  );
}
