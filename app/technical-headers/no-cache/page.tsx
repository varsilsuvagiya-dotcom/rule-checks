import type { Metadata } from "next";

// technical.cache_headers: this route's Cache-Control/Expires headers are stripped by
// middleware.ts (matcher includes this path) so the crawler observes neither header ->
// WARNING ("no caching headers set").
export const metadata: Metadata = {
  title: "No Cache Headers Fixture | Broken Fixture Co",
};

export default function NoCachePage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>No Cache Headers Fixture</h1>
      <p>
        This static-looking page is served with both Cache-Control and Expires stripped by
        middleware, so browsers cannot cache it and must re-fetch it on every visit.
      </p>
    </main>
  );
}
