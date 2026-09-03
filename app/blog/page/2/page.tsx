import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Page 2 | Broken Fixture Co",
};

// See /blog/page/1 — this second series member is likewise not linked to from page 1 (or from
// anywhere else on the site), so the series is undiscoverable via internal navigation.
export default function BlogPageTwo() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Blog — Page 2</h1>
      <p>
        This is the second page of a paginated blog archive, reachable only
        by direct URL entry.
      </p>
    </main>
  );
}
