# Broken Fixture Co — GeoRank AI QA Fixture

A deliberately-broken Next.js site used to verify that a 249-rule SEO/GEO
audit scanner actually detects violations instead of returning canned
output. Every page shows: **"TEST FIXTURE — intentionally broken, not a
real business."** Not a real site, no real people, no real claims.

Ground truth checklist: **`/rules`** — all 249 rule IDs with page,
mechanism, and verdict (`BROKEN`, `NOT_APPLICABLE`, or a `CANNOT_BREAK_*`
platform/framework constraint).

## CANNOT_BREAK list (12 of 249)

Rules that genuinely cannot be forced to fail without faking the violation,
because the platform, the framework, or the crawler's own scope prevents it:

| Rule ID | Reason |
|---|---|
| `technical.https` | Vercel serves every deployment over HTTPS by default. |
| `technical.http_to_https_redirect` | Vercel auto-redirects http→https at the edge. |
| `technical.http2_support` | Vercel terminates TLS and negotiates HTTP/2 via ALPN for every deployment. |
| `technical.ssl_certificate` | Vercel auto-provisions a trusted, valid TLS cert. |
| `technical.www_redirect` | www/non-www resolution is controlled by Vercel's domain/DNS config, not app code. |
| `technical.compression` | Vercel's edge always gzip/brotli-compresses text responses; no app-level override exists. |
| `technical.doctype` | Next.js/React always emits `<!doctype html>` as the literal first bytes. |
| `technical.charset` | Next.js always injects its own `<meta charSet="utf-8">` first in `<head>`; a later manual override has no effect on the first-match parser, and the rule only fails on a *missing* charset anyway, never a mismatch. |
| `mobile.viewport_meta` | Next.js always injects a `<meta name="viewport">` tag; a route can only overwrite its content, never remove it. |
| `internal_linking.link_to_5xx_ratio` | Requires a same-site link that returns a real 5xx; Vercel/Next.js only ever serve 200 or a clean 404. |
| `internal_linking.orphan_pages` | The crawler discovers pages purely by following real `<a href>` links via BFS from the homepage — a page with zero inbound links is, by construction, never crawled at all, so it can never be scored as an orphan. |
| `internal_linking.inbound_links` | Same constraint as `orphan_pages`: this coarser rule can only FAIL when literally zero internal links exist anywhere in the crawl, incompatible with any navigable site. |

`accessibility.lang_attribute` is genuinely BROKEN, not platform-blocked:
the root layout sets `<html lang="">` (empty string), and the crawler reads
`lang` via `$('html').attr('lang')?.trim() || null` — an empty string trims
to falsy and becomes `null`, so every page on the site reports no lang
attribute.

78 additional rules are `NOT_APPLICABLE` — not fixture gaps, but the real
rule's own designed behavior (e.g. a rule that only evaluates FAQ content
when FAQ intent is detected at all, or a lab-metric rule like CLS/LCP that
requires live PageSpeed Insights data unavailable to static-markup
analysis). Each is documented with its actual triggering condition in
`/rules` and `lib/rule-status.ts`.

## Deploy to Vercel

```bash
npm install
vercel deploy --prod
```

No environment variables or extra configuration needed. `next.config.ts`
carries the redirect chains/loops used by several `technical.*` rules,
`middleware.ts` carries the header-level violations (X-Robots-Tag, missing
Cache-Control, insecure cookie), `app/robots.txt` stays crawlable overall
(no blanket `Disallow: /`, just malformed syntax and one disallowed
low-value page), and `public/sitemap.xml` is present but deliberately
malformed (`<urlsetx>` root, one unreachable listed URL).

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build, used to verify all 249 rules are wired
```

## Structure

- `/` — violates the SITE-scope rules that apply to the homepage.
- One route per rule category (`/accessibility`, `/on-page`,
  `/technical-markup`, `/technical-headers`, `/performance`, `/mobile`,
  `/content`, `/ai-readability`, `/ai-summarization`,
  `/conversational-structure`, `/semantic-depth`, `/entity-richness`,
  `/eeat-signals`, `/faq-optimization`, `/structured-data`,
  `/internal-linking`, `/security`, plus `/blog/eeat` for the two
  PAGE-scope EEAT author rules that require `pageType: 'blog'`).
- Supporting pages for SITE-scope rules that need real site structure:
  `/hub`, `/pricing`, `/product`, `/blog`, `/blog/page/1`,
  `/blog/page/1/deeper`, `/blog/page/2`.
- `/on-page/Legacy_Section/thisisaveryveryverylongopaqueslugwithnowordbreaksatall`
  — a deliberately bad URL shape (uppercase, underscore, opaque long
  segment, over-length) for the four `on_page.url_*` rules, plus a short H1
  and a title/description duplicated from `/product`.
- `/rules` — the full 249-row verification table.
- `lib/rule-status.ts` — the data backing `/rules`, generated from reading
  each rule's real `evaluate()` implementation in the georank-ai
  `apps/backend` source, not guessed from rule names.
