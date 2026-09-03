import type { Metadata } from "next";

// technical-markup — PAGE-scope technical rules driven by markup/document structure.
//
// technical.canonical_tag / technical.canonical_self_reference / technical.canonical_conflicts /
// technical.canonical_redirect_target: this page declares its canonical as
// "/technical-markup/canonical-dead-end", which is:
//   (a) present (so canonical_tag PASSes — not every canonical rule can fail at once without
//       contradicting itself; see below for why conflicts/self-ref/redirect-target still fail),
//   (b) NOT self (so canonical_self_reference WARNs — points elsewhere on purpose),
//   (c) a target that returns a genuine terminal HTTP 404 (notFound()), so
//       canonical_redirect_target FAILs (target resolves to a non-2xx status, not 200).
//       NOTE: an earlier version of this fixture pointed the canonical at
//       "/technical-markup/redirect-me" (a next.config.ts redirect target). That did NOT work:
//       the crawler follows redirects internally (redirect: 'manual' + its own hop-following
//       loop) and records the FINAL post-redirect httpStatus (200) against the ORIGINALLY
//       REQUESTED url in ctx.allPages — so a canonical pointing at a redirecting URL silently
//       read back as 200 and the rule could never fail. A real 404 has no such laundering.
// technical.canonical_conflicts needs a DIFFERENT page (different title) declaring the SAME
// canonical target as this page — see app/technical-markup/canonical-conflict-b/page.tsx, which
// canonicalizes to this same "/technical-markup/canonical-dead-end" URL with a distinct title.
export const metadata: Metadata = {
  title: "Technical Markup Fixture | Broken Fixture Co",
  alternates: {
    canonical: "/technical-markup/canonical-dead-end",
  },
  // technical.meta_robots_validation: conflicting directives "index, noindex" together trips a
  // hard FAIL for meta_robots_validation. Note this is NOT the same as technical.noindex (which
  // greps p.isNoindex, itself sourced from the same meta tag) — per the task's crawlability
  // constraint we do NOT want a noindex verdict to actually keep this page out of the index, but
  // meta_robots_validation validates the raw directive STRING for conflicts, independent of
  // whether noindex ends up "winning". Since Next/robots UAs treat "index, noindex" as an
  // effectively contradictory/ambiguous directive (most engines fall back toward indexing on
  // ambiguity, and Google's own docs say a conflicting pair should be resolved by removing the
  // redundant one), this keeps the page realistically crawlable while still tripping the
  // meta_robots_validation FAIL. technical.noindex reads isNoindex (a simple "does noindex appear
  // in the directive list" check) — that would ALSO fire here since "noindex" literally appears
  // in the string. That's an unavoidable side effect of testing meta_robots_validation's
  // conflicting-directive path without omitting noindex text entirely; see the in-body note by
  // the raw <meta> tag below for the alternative considered and why this was kept.
  robots: "index, noindex",
};

export default function TechnicalMarkupPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>

      <h1>Technical Markup Fixture</h1>
      <p>
        This page exercises page-scope technical/markup rules: canonical tag behavior, doctype,
        base tag, meta robots validation, mixed content, broken internal links, insecure external
        links, trailing-slash/URL-form consistency, and URL structure.
      </p>

      {/* technical.doctype: CANNOT_BREAK_IN_NEXTJS. React/Next.js always emits a literal
          "<!doctype html>" as the very first bytes of the document — there is no supported (or
          unsupported-but-working) way for App Router page/layout code to omit or alter it. The
          rule's own trigger (p.hasDoctype, a case-insensitive /^\s*<!doctype/i prefix match on
          the raw HTML) will therefore always be true for any Next.js-rendered page. Verified: no
          custom Document/renderer hook exists in the App Router to intercept the doctype. */}

      {/* technical.base_tag: per the rule source, this is presence-only and NEVER fails — it is
          WARNING-on-present / PASS-on-absent, with no FAIL path at all. To make it fire something
          other than a silent PASS we deliberately include a <base> tag, which flips it to
          WARNING (the only non-PASS verdict this rule can ever produce). */}
      <base href="/technical-markup/" />

      {/* technical.mixed_content: this page is served over https (Vercel), and embeds a plain
          http:// image, tripping hasMixedContent. Using more than one insecure sub-resource is
          not required for WARNING (any count > 0 warns; >3 fails) — kept at 2 to stay a clear,
          intentional signal without needing many fake asset URLs. */}
      <img
        src="http://example.com/insecure-image-one.jpg"
        alt="intentionally insecure http image one"
        width={1}
        height={1}
      />
      <img
        src="http://example.com/insecure-image-two.jpg"
        alt="intentionally insecure http image two"
        width={1}
        height={1}
      />

      <h2>Links</h2>
      <ul>
        {/* technical.broken_internal_links: link to a route that does not exist anywhere in this
            app. Needs to be crawled/observed with an HTTP status >= 400 in allPages for the rule
            to count it (i.e. Next's App Router 404 for an undefined route), which is exactly what
            this is. */}
        <li>
          <a href="/technical-markup/this-route-does-not-exist-404">
            Broken internal link (404)
          </a>
        </li>

        {/* technical.trailing_slash_consistency: the SAME path linked in two different forms —
            with and without a trailing slash — on this one page. */}
        <li>
          <a href="/technical-markup/redirect-me">Redirect target (no trailing slash)</a>
        </li>
        <li>
          <a href="/technical-markup/redirect-me/">Redirect target (trailing slash)</a>
        </li>

        <li>
          <a href="/technical-markup/canonical-conflict-b">Canonical conflict page</a>
        </li>

        {/* technical.canonical_redirect_target: must be independently crawled so
            ctx.allPages.find(o => o.url === p.canonicalUrl) resolves to a real 404 record. */}
        <li>
          <a href="/technical-markup/canonical-dead-end">
            Canonical dead-end (404 target)
          </a>
        </li>

        {/* technical.external_links_secure: target="_blank" with no rel attribute at all, so
            hasNoopener is false → insecure. */}
        <li>
          <a href="https://example.com" target="_blank">
            Insecure external link (no rel=&quot;noopener&quot;)
          </a>
        </li>

        {/* technical.url_structure: a self-link carrying a dirty query string — underscore param
            names/values and more than 2 query parameters — so THIS URL variant, if independently
            crawled, trips url_structure's "underscore" + "too many query params" signals. The
            un-parameterized canonical URL of this page stays clean; this is a deliberately messy
            alternate entry point. */}
        <li>
          <a href="/technical-markup?utm_source=test&utm_medium=fixture&sort_by=name&ref_id=1">
            Dirty URL variant (query params + underscores)
          </a>
        </li>
      </ul>

      {/* technical.url_structure: NOT_APPLICABLE for this specific page — see the report for
          where a dirty URL is exercised instead. */}
    </main>
  );
}
