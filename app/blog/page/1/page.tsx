import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Page 1 | Broken Fixture Co",
};

// technical.pagination_discoverability: this is page 1 of a /blog/page/N series (matches the
// rule's "/page/N" pattern). It deliberately does NOT link to /blog/page/2 (no "Next"/numbered
// pagination widget at all), so the series is undiscoverable via on-site navigation even though
// both pages are directly reachable by URL and get crawled.
export default function BlogPageOne() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Blog — Page 1</h1>
      <p>
        This is the first page of a paginated blog archive. There is no
        link to the next page anywhere on this page.
      </p>
      {/* internal_linking.important_pages_reachability / important_page_inlinks (SITE):
          /pricing is buried behind an extra hop here rather than linked from the homepage or
          primary navigation, so its click-depth from home ends up > 2 and its inbound-link
          count stays at 1 (< the 2-link minimum) once reached via /blog/page/1/deeper. */}
      <p>
        <a href="/blog/page/1/deeper">Continue browsing</a>
      </p>
    </main>
  );
}
