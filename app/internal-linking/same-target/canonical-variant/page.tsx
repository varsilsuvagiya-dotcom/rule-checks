import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Same Target Canonical Variant | Broken Fixture Co",
};

// The declared canonical target of /internal-linking/same-target. Nothing on the site
// actually links here directly — that mismatch is the point (see
// internal_linking.link_canonical_consistency).
export default function CanonicalVariantPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Same Target — Canonical Variant</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
    </main>
  );
}
