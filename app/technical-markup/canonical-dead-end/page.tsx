import { notFound } from "next/navigation";

// technical.canonical_redirect_target: this route always 404s (a genuine terminal, non-2xx
// status) rather than redirecting. It replaces the earlier "/technical-markup/redirect-me"
// target: that target was itself a next.config.ts redirect, but the crawler follows redirects
// internally with `redirect: 'manual'` + its own hop-following loop and records the FINAL
// (post-redirect) httpStatus against the ORIGINALLY REQUESTED url -- so a canonical pointing at
// a redirecting URL was silently resolving to 200 in ctx.allPages and this rule could never
// fail. A real 404 has no such laundering: httpStatus stays 404 for this exact URL.
export default function CanonicalDeadEnd() {
  notFound();
}
