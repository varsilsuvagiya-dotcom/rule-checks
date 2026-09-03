import type { Metadata } from "next";

// technical.page_size: FAIL_THRESHOLD_CHARS is 2,000,000 characters. This page embeds a large
// repeated inline text blob comfortably over that threshold so the rendered HTML source
// (p.htmlLength) exceeds 2MB of characters -> FAIL.
export const metadata: Metadata = {
  title: "Oversized Page Fixture | Broken Fixture Co",
};

// ~40 chars per line x 60,000 repetitions ≈ 2.4M characters, well past the 2,000,000 FAIL
// threshold once wrapped in the surrounding page markup.
const FILLER_LINE =
  "Padding content repeated purely to inflate the HTML document size past the page size threshold. ";
const bloat = FILLER_LINE.repeat(60_000);

export default function HugePage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Oversized Page Fixture</h1>
      <p>
        This page&apos;s HTML source is artificially inflated well past the page-size FAIL
        threshold with repeated inline filler text.
      </p>
      <div style={{ display: "none" }}>{bloat}</div>
    </main>
  );
}
