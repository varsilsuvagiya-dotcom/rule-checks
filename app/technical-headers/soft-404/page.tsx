import type { Metadata } from "next";

// technical.soft_404: HTTP 200 (default for a normal page.tsx render) + title/h1 matching a
// "not found" phrase + word count under the 80-word minWords threshold -> FAIL
// (looksLikeNotFound && isThin).
export const metadata: Metadata = {
  title: "Page Not Found | Broken Fixture Co",
};

export default function SoftNotFoundPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Page Not Found</h1>
      <p>Sorry, this page does not exist.</p>
    </main>
  );
}
