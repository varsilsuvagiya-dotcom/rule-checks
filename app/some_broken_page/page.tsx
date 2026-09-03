import type { Metadata } from "next";

// on_page.url_hyphen_usage: this route's slug uses an underscore ("/some_broken_page") instead
// of a hyphen, tripping the rule's path.includes('_') check. Linked from the homepage so it's
// actually crawled.
export const metadata: Metadata = {
  title: "Some Broken Page (Underscore URL) | Broken Fixture Co",
};

export default function SomeBrokenPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Some Broken Page</h1>
      <p>
        This page&apos;s URL slug (&quot;/some_broken_page&quot;) uses an underscore instead of
        a hyphen, which trips on_page.url_hyphen_usage.
      </p>
    </main>
  );
}
