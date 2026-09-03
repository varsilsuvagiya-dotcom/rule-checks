import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deep Chain d5 | Broken Fixture Co",
};

// Link-depth burial chain, hop 5 of 8 (home -> /blog/page/1 -> deeper -> d3 -> ... -> d8 ->
// /product). Exists solely to push /product's click-depth from home to 9 and keep its inbound
// link count at exactly 1 (only d8 links to it) — see internal_linking.link_depth_distribution,
// internal_linking.important_pages_reachability, internal_linking.important_page_inlinks.
export default function DeepChain5() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Deep Chain — Step 5</h1>
      <p>Part of a deliberately deep, single-file link chain burying /product.</p>
      <p>
        <a href="/blog/page/1/deeper/d6">Continue deeper</a>
      </p>
    </main>
  );
}
