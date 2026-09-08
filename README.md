# Broken Fixture Co

The marketing site for **Fixture Scanner**, a website-auditing tool. This
repository previously served as a deliberately-broken QA fixture used to
verify that the GeoRank AI audit scanner (249 rules: 179 SEO + 70 GEO)
correctly detected real violations. It has since been fully rebuilt as a
genuinely clean, compliant reference site — a rescan should show every rule
passing except a small, honest set that cannot produce a verdict from a
static crawl at all (see below).

Ground truth checklist: **`/rules`** — every one of the 249 rule IDs, its
scope, the real page(s) it was checked against, and its verdict (`PASS`,
`NOT_APPLICABLE`, or `NEEDS_FIELD_DATA`), grouped by category.

## Status breakdown (249 total)

| Status | Count | Meaning |
|---|---|---|
| `PASS` | 222 | The site genuinely satisfies the rule's real `evaluate()`/`check()` logic. |
| `NOT_APPLICABLE` | 13 | A Vercel platform guarantee, a Next.js framework guarantee, or a structurally-unfireable crawler-architecture/opportunity-only rule makes the condition this rule checks for impossible to observe either way on a real, fully-linked site. |
| `NEEDS_FIELD_DATA` | 14 | The rule is permanently stubbed pending a scan-API input it doesn't currently accept, or requires real browser-rendered/PageSpeed-Insights measurement data that no static HTML crawl can produce. |

`222 + 13 + 14 = 249`. No rule fails.

## The 27 non-`PASS` rules and why

### `NOT_APPLICABLE` — platform/framework guarantees (8)

| Rule ID | Reason |
|---|---|
| `technical.https` | Vercel serves every deployment over HTTPS by default. |
| `technical.http_to_https_redirect` | Vercel auto-redirects http→https at the edge. |
| `technical.http2_support` | Vercel terminates TLS and negotiates HTTP/2 via ALPN for every deployment. |
| `technical.ssl_certificate` | Vercel auto-provisions a trusted, valid TLS cert. |
| `technical.www_redirect` | www/non-www resolution is controlled by Vercel's domain/DNS config, not app code. |
| `technical.compression` | Vercel's edge always gzip/brotli-compresses text responses; no app-level override exists. |
| `technical.doctype` | Next.js/React always emits `<!doctype html>` as the literal first bytes. |
| `technical.charset` | Next.js always injects its own `<meta charSet="utf-8">` first in `<head>`. |

### `NOT_APPLICABLE` — structurally unfireable on any real site (3)

| Rule ID | Reason |
|---|---|
| `internal_linking.inbound_links` | Only FAILs when literally zero internal links exist anywhere in the whole crawl — incompatible with any navigable site. |
| `internal_linking.orphan_pages` | The crawler builds its page set purely via same-origin BFS over real `<a href>` links; a page with truly zero inbound links can never enter that set to begin with. |
| `internal_linking.link_to_5xx_ratio` | Requires a same-site link that returns a real 5xx; Vercel/Next.js only ever serve a valid 200 or a clean 404 in production. |

### `NOT_APPLICABLE` — opportunity-only, no trigger condition present (2)

| Rule ID | Reason |
|---|---|
| `technical.pagination_discoverability` | WARNING-only; never fires without a paginated URL series, which this site has no need for. |
| `technical.robots_important_pages_blocked` | robots.txt disallows nothing, so there is nothing blocked to flag. |

### `NEEDS_FIELD_DATA` — permanently disabled stubs (3)

| Rule ID | Reason |
|---|---|
| `content.search_intent_match` | `enabled:false`; `evaluate()` unconditionally returns not-applicable. Needs a target-keyword/query input the scan API doesn't accept. |
| `content.semantic_keyword_coverage` | Same permanent-stub shape. Needs a target-keyword input. |
| `content.topic_completeness` | Same permanent-stub shape. Needs a content-brief/subtopic-checklist input. |

### `NEEDS_FIELD_DATA` — requires rendered-browser/lab measurement (11)

| Rule ID | Reason |
|---|---|
| `accessibility.color_contrast` | Needs resolved CSS colors after cascade, unavailable to a static-HTML crawl. |
| `mobile.touch_target_size` | Needs rendered layout/box geometry. |
| `mobile.font_readability` | Needs resolved/computed CSS font-size. |
| `mobile.horizontal_overflow` | Needs rendered layout width comparison. |
| `performance.lcp` / `.fcp` / `.cls` / `.inp` / `.speed_index` | Graded from real PageSpeed Insights lab data; no static crawl can produce these timings. |
| `performance.unused_css` | Needs real CSSOM coverage data from a rendered browser. |
| `performance.unused_js` | Needs real code-execution coverage data from a rendered browser. |

Every other rule — all 222 — genuinely passes against the real, current
site content: real E-E-A-T pages (`/about`, `/contact`, `/privacy-policy`,
`/terms`), a real product/pricing/blog, valid page-type-appropriate JSON-LD,
complete on-page metadata, site-wide security headers, and lean,
render-blocking-free markup.

## Deploy to Vercel

```bash
npm install
vercel deploy --prod
```

No environment variables or extra configuration needed. `next.config.ts`
sets site-wide security headers (CSP, X-Frame-Options, X-Content-Type-Options,
Referrer-Policy, Permissions-Policy, HSTS) and no redirect rules are needed —
there are no redirect chains or loops anywhere on the site. `app/robots.txt`
and `app/sitemap.ts` are both present and valid.

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Structure

- `/` — homepage with the product pitch, feature list, and a homepage FAQ (FAQPage JSON-LD).
- `/product` — Fixture Scanner product overview (Product JSON-LD with offers).
- `/pricing` — plan comparison table and pricing FAQ.
- `/hub` — curated links to external standards (W3C, MDN, Google Search Central) and internal pages.
- `/blog` — blog index; `/blog/responsive-images-guide` and `/blog/structured-data-checklist` are full articles with a named author, bio, Person schema, and BlogPosting + BreadcrumbList JSON-LD.
- `/about`, `/contact`, `/privacy-policy`, `/terms` — the site-wide E-E-A-T trust pages, linked from the footer on every page.
- `/rules` — the full 249-row rule compliance report.
- `lib/rule-status.ts` — the data backing `/rules`, generated from reading each rule's real `evaluate()`/`check()` implementation in the georank-ai `apps/backend` source, not guessed from rule names.
