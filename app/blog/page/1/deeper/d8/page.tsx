import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deep Chain d8 | Broken Fixture Co",
};

// Final hop of the burial chain (home -> /blog/page/1 -> deeper -> d3 -> ... -> d8 -> /product).
// This is the ONLY link to /product anywhere on the site, placing /product at click-depth 9 from
// home with exactly 1 inbound internal link — see internal_linking.important_pages_reachability
// (MAX_KEY_PAGE_DEPTH=2) and internal_linking.important_page_inlinks (MIN_INLINKS=2) on
// /product's own notes, and internal_linking.link_depth_distribution site-wide.
export default function DeepChain8() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Deep Chain — Step 8</h1>
      <p>The last stop before the deliberately buried product page.</p>
      <p>
        <a href="/product">Product</a>
      </p>
    </main>
  );
}
