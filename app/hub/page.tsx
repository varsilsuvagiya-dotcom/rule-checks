import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources Hub | Broken Fixture Co",
};

// Receives inbound links from home and blog, making it an inbound-link outlier / hub candidate
// on this small site, but it only links back out to one page — internal_linking.hub_page_detection
// expects a real hub to also fan out to >=5 pages in its topic cluster.
export default function HubPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Resources Hub</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <p>
        A page that accumulates many inbound links but does not fan back out
        to a topic cluster.
      </p>
      <ul>
        <li>
          <a href="/blog">Blog</a>
        </li>
      </ul>
    </main>
  );
}
