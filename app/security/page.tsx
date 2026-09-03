import type { Metadata } from "next";

// security.* (scoring-engine/rules/security/*.rule.ts) — all 5 rules are broken purely via HTTP
// response headers, driven by next.config.ts (no headers() config at all -> CSP, X-Frame-Options,
// Referrer-Policy, Permissions-Policy, X-Content-Type-Options, and Strict-Transport-Security are
// never sent) and middleware.ts (an insecure Set-Cookie on this exact path).
//
// security.headers_full / security.response_headers: none of the 5 checked headers are ever
//   sent by this app — Vercel/Next.js do not inject any of them by default.
// security.hsts_header / security.hsts_preload_readiness: no Strict-Transport-Security header
//   is ever sent (Vercel forces HTTPS transport itself but does not add an HSTS response header
//   on your behalf — that remains the app's responsibility).
// security.secure_cookies: middleware.ts appends a Set-Cookie on this route with neither
//   Secure nor HttpOnly.
export const metadata: Metadata = {
  title: "Security Headers Fixture | Broken Fixture Co",
};

export default function SecurityPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Security Headers Fixture</h1>
      <p>
        This response deliberately sends none of the standard security
        response headers — no Content-Security-Policy, no
        X-Frame-Options, no Referrer-Policy, no Permissions-Policy, no
        X-Content-Type-Options, and no Strict-Transport-Security — and sets
        an insecure cookie (missing both Secure and HttpOnly) via
        middleware.
      </p>
      <p>Inspect this page&apos;s response headers to confirm each is absent.</p>
    </main>
  );
}
