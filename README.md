# Broken Fixture Co — GeoRank AI QA Fixture

A deliberately-broken Next.js site used to verify that a 249-rule SEO/GEO
audit scanner actually detects violations instead of returning canned
output. Every page shows: **"TEST FIXTURE — intentionally broken, not a
real business."** Not a real site, no real people, no real claims.

Ground truth checklist: **`/rules`** — all 249 rule IDs with page,
mechanism, and verdict (`BROKEN`, `NOT_APPLICABLE`, a `CANNOT_BREAK_*`
platform/framework constraint, or `NEEDS_FIELD_DATA`).

## Status breakdown (249 total)

| Status | Count | Meaning |
|---|---|---|
| `BROKEN` | 167 | Genuinely violates the rule's real `evaluate()` logic. |
| `NOT_APPLICABLE` | 56 | The rule itself returns not-applicable for this content shape (verified from source, not a fixture gap). |
| `CANNOT_BREAK_ON_VERCEL` | 7 | Vercel/platform-edge behavior prevents triggering a real failure. Would need a self-hosted origin. |
| `CANNOT_BREAK_IN_NEXTJS` | 3 | Next.js/React always emits the compliant output; no app-level override exists. |
| `CANNOT_BREAK_CRAWLER_ARCHITECTURE` | 2 | Not hosting-specific — the scanner's own BFS crawl-discovery design makes the condition structurally unreachable, on any origin. |
| `NEEDS_FIELD_DATA` | 14 | Rule is permanently stubbed/disabled in the codebase, or requires real browser-rendered/PageSpeed-Insights measurement data no static-HTML crawler can produce. |

## CANNOT_BREAK list (12 of 249)

Rules that genuinely cannot be forced to fail without faking the violation:

| Rule ID | Reason |
|---|---|
| `technical.https` | Vercel serves every deployment over HTTPS by default. |
| `technical.http_to_https_redirect` | Vercel auto-redirects http→https at the edge. |
| `technical.http2_support` | Vercel terminates TLS and negotiates HTTP/2 via ALPN for every deployment. |
| `technical.ssl_certificate` | Vercel auto-provisions a trusted, valid TLS cert. |
| `technical.www_redirect` | www/non-www resolution is controlled by Vercel's domain/DNS config, not app code. |
| `technical.compression` | Vercel's edge always gzip/brotli-compresses text responses; no app-level override exists. |
| `internal_linking.link_to_5xx_ratio` | Requires a same-site link that returns a real 5xx; Vercel/Next.js only ever serve 200 or a clean 404. |
| `technical.doctype` | Next.js/React always emits `<!doctype html>` as the literal first bytes. |
| `technical.charset` | Next.js always injects its own `<meta charSet="utf-8">` first in `<head>`; a later manual override has no effect on the first-match parser, and the rule only fails on a *missing* charset anyway, never a mismatch. |
| `mobile.viewport_meta` | Next.js always injects a `<meta name="viewport">` tag; a route can only overwrite its content, never remove it. |
| `internal_linking.orphan_pages` | Not Vercel-specific — verified from `crawler.service.ts`: the crawler builds its whole-crawl page set (`ctx.allPages`) purely via same-origin BFS over real `<a href>` links from the homepage, with no independent sitemap-based discovery feeding this rule. A page with truly zero inbound links can, by construction, never enter that set, so it can never be scored as an orphan — a self-hosted origin crawled the same way hits the identical wall. |
| `internal_linking.inbound_links` | Same crawler-architecture constraint as `orphan_pages`: this coarser rule can only FAIL when literally zero internal links exist anywhere in the whole crawl, incompatible with any navigable site, regardless of hosting. |

`accessibility.lang_attribute` is genuinely BROKEN, not platform-blocked:
the root layout sets `<html lang="">` (empty string), and the crawler reads
`lang` via `$('html').attr('lang')?.trim() || null` — an empty string trims
to falsy and becomes `null`, so every page on the site reports no lang
attribute.

## NEEDS_FIELD_DATA list (14 of 249)

Rules verified (by reading their current `evaluate()` source, not the rule
name) to be either permanently disabled stubs or dependent on real
browser-rendered / PageSpeed-Insights measurement data no static-HTML
crawler can ever produce — genuinely not exercisable by any fixture content:

| Rule ID | Reason |
|---|---|
| `content.search_intent_match` | Permanently disabled stub (`enabled:false`, `evaluate()` unconditionally returns not-applicable). Needs a target-keyword/query input added to the scan API. |
| `content.semantic_keyword_coverage` | Same permanent-stub shape. Needs a target-keyword input. |
| `content.topic_completeness` | Same permanent-stub shape. Needs a content-brief/subtopic-checklist input. |
| `accessibility.color_contrast` | Unconditionally returns NOT_APPLICABLE — needs resolved CSS colors after cascade, unavailable to a static-HTML crawl. |
| `mobile.touch_target_size` | Unconditionally returns NOT_APPLICABLE — needs rendered layout/box geometry. |
| `mobile.font_readability` | Unconditionally returns NOT_APPLICABLE — needs resolved/computed CSS font-size. |
| `mobile.horizontal_overflow` | Unconditionally returns NOT_APPLICABLE — needs rendered layout width comparison. |
| `performance.lcp` / `performance.fcp` / `performance.cls` / `performance.inp` / `performance.speed_index` | Graded from real PageSpeed Insights lab data; no static crawl can produce these timings. |
| `performance.unused_css` | Needs real CSSOM coverage data from a rendered browser. |
| `performance.unused_js` | Needs real code-execution coverage data from a rendered browser. |

56 additional rules are `NOT_APPLICABLE` for other, page-shape-specific
reasons — the real rule's own designed behavior (e.g. a rule that only
evaluates FAQ content when FAQ intent is detected at all). Each is
documented with its actual triggering condition in `/rules` and
`lib/rule-status.ts`.

## Deploy to Vercel

```bash
npm install
vercel deploy --prod
```

No environment variables or extra configuration needed. `next.config.ts`
carries the redirect chains/loops used by several `technical.*` rules,
`middleware.ts` carries the header-level violations (X-Robots-Tag, missing
Cache-Control, insecure cookie). `app/robots.txt` and `public/sitemap.xml`
are deleted entirely (not merely malformed) so no robots.txt/sitemap is
served at all — `technical.robots_txt` and `technical.sitemap` read
"missing" and FAIL. This has a disclosed side effect: `technical.robots_txt_validity`,
`technical.sitemap_valid`, `technical.sitemap_urls_reachable`, and
`technical.robots_important_pages_blocked` all depended on these files
existing with specific broken content and now correctly read
NOT_APPLICABLE ("not found") instead — see `/rules` for the full
before/after reasoning on each.

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
  `/hub`, `/hub/listing` (faceted-navigation filter/sort URLs),
  `/pricing`, `/product`, `/blog`, `/blog/page/1`, `/blog/page/1/deeper`,
  `/blog/page/1/deeper/d3` through `.../d8` (an 8-hop burial chain that
  places `/product` at click-depth 9 with exactly 1 inbound link),
  `/blog/page/2`, `/blog/stale-content` (freshness + external-references),
  `/Broken/Page` and `/some_broken_page` (dirty on-page URL rules).
- `/on-page/Legacy_Section/thisisaveryveryverylongopaqueslugwithnowordbreaksatall`
  — a deliberately bad URL shape (uppercase, underscore, opaque long
  segment, over-length) for the four `on_page.url_*` rules, plus a short H1
  and a title/description duplicated from `/product`.
- `/rules` — the full 249-row verification table.
- `lib/rule-status.ts` — the data backing `/rules`, generated from reading
  each rule's real `evaluate()` implementation in the georank-ai
  `apps/backend` source, not guessed from rule names.
