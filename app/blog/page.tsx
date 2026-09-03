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
      {/* Heavily links to /hub, concentrating internal link equity on ONE page
          (internal_linking.link_equity_distribution — high Gini coefficient). NOTE: this used
          to link 3x to /product instead, but /product is now deliberately buried 9 clicks deep
          with exactly 1 inbound link (see /product's notes) -- concentrating equity there too
          would contradict important_page_inlinks/important_pages_reachability, so the
          concentration target was moved to /hub, which is not a key-page-pattern URL. */}
      <ul>
        <li>
          <a href="/hub">Resources Hub</a>
        </li>
        <li>
          <a href="/hub">Explore Our Resources</a>
        </li>
        <li>
          <a href="/hub">Hub Deep Dive</a>
        </li>
        {/* technical.pagination_discoverability: links to page 1 of the paginated archive so it
            gets crawled at all, but page 1 itself never links onward to page 2 (see
            /blog/page/1 and /blog/page/2) — the series exists and is directly reachable by URL,
            but is not discoverable via a "Next"/numbered pagination widget. */}
        <li>
          <a href="/blog/page/1">Older posts</a>
        </li>
        <li>
          <a href="/blog/eeat">How We Cut Server Costs by 40%</a>
        </li>
        <li>
          <a href="/blog/stale-content">Why We Chose Our Stack in 2022</a>
        </li>
      </ul>
    </main>
  );
}
