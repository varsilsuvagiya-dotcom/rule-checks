import type { Metadata } from "next";

// Deliberately declares a canonical pointing at a DIFFERENT URL than the one every internal
// link on /internal-linking actually targets ("/internal-linking/same-target"), so those
// links are pointing at a non-canonical variant of this page. Feeds
// internal_linking.link_canonical_consistency.
export const metadata: Metadata = {
  title: "Same Target | Broken Fixture Co",
  alternates: {
    canonical: "/internal-linking/same-target/canonical-variant",
  },
};

export default function SameTargetPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Same Target</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <p>
        This is the single destination that nearly every internal link on the internal-linking
        fixture page points to, and it declares a canonical URL different from this address.
      </p>
    </main>
  );
}
