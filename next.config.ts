import type { NextConfig } from "next";

// Broken Fixture Co — QA fixture. No security headers are added on purpose:
// security.headers_full / security.response_headers / security.hsts_header /
// security.hsts_preload_readiness are all broken by simply never sending
// Content-Security-Policy, X-Frame-Options, Referrer-Policy, Permissions-Policy,
// X-Content-Type-Options, or Strict-Transport-Security. Vercel/Next.js do not
// inject any of these by default, so omitting them here is sufficient.
//
// technical.redirect_chains / technical.redirect_target_relevance: a 2-hop
// redirect chain that also lands somewhere unrelated to the original path.
//
// technical.canonical_redirect_target: /technical-markup and /technical-markup/canonical-conflict-b
// both canonicalize to "/technical-markup/redirect-me", which itself 302-redirects rather than
// resolving 200 directly — the exact "canonical target redirects/errors" trigger the rule checks.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/redirect-hop-2",
        permanent: false,
      },
      {
        source: "/redirect-hop-2",
        destination: "/entity-richness",
        permanent: false,
      },
      {
        // technical.canonical_redirect_target: the canonical target declared by
        // /technical-markup and /technical-markup/canonical-conflict-b actually redirects
        // instead of resolving 200 directly.
        source: "/technical-markup/redirect-me",
        destination: "/technical-markup",
        permanent: false,
      },
      {
        source: "/technical-markup/redirect-me/",
        destination: "/technical-markup",
        permanent: false,
      },
      {
        // technical.redirect_loops: a genuine A->B->A cycle, isolated under /technical-headers
        // and only reachable via the single inbound link on /technical-headers (loop-b itself is
        // never linked anywhere — only ever reached as the redirect target inside this loop).
        source: "/technical-headers/loop-a",
        destination: "/technical-headers/loop-b",
        permanent: false,
      },
      {
        source: "/technical-headers/loop-b",
        destination: "/technical-headers/loop-a",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
