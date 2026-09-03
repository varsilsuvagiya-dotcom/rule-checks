import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Broken Fixture Co",
};

export default function BlogPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Blog</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <p>Fixture blog index. No structured data on this page on purpose.</p>
      {/* Heavily links to /product, concentrating internal link equity there
          (internal_linking.link_equity_distribution — high Gini coefficient). */}
      <ul>
        <li>
          <a href="/product">Our Product</a>
        </li>
        <li>
          <a href="/product">Product Deep Dive</a>
        </li>
        <li>
          <a href="/product">Why Our Product Matters</a>
        </li>
        <li>
          <a href="/hub">Resources Hub</a>
        </li>
        {/* technical.pagination_discoverability: links to page 1 of the paginated archive so it
            gets crawled at all, but page 1 itself never links onward to page 2 (see
            /blog/page/1 and /blog/page/2) — the series exists and is directly reachable by URL,
            but is not discoverable via a "Next"/numbered pagination widget. */}
        <li>
          <a href="/blog/page/1">Older posts</a>
        </li>
      </ul>
    </main>
  );
}
