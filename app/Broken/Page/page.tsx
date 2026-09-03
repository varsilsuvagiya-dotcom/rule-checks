import type { Metadata } from "next";

// on_page.url_lowercase: this route's path segments are deliberately mixed-case
// ("/Broken/Page"), tripping the rule's /[A-Z]/.test(pathname) check. Linked from the homepage
// so it's actually crawled.
export const metadata: Metadata = {
  title: "Broken Page (Uppercase URL) | Broken Fixture Co",
};

export default function BrokenUppercasePage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Broken Page</h1>
      <p>
        This page&apos;s URL path (&quot;/Broken/Page&quot;) contains uppercase
        characters, which trips on_page.url_lowercase.
      </p>
    </main>
  );
}
