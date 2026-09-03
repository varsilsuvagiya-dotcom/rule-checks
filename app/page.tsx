import type { Metadata } from "next";

// on_page.title_brand_consistency (SITE): intentionally does NOT follow the "Page | Broken
// Fixture Co" title convention every other page on the site follows once that pattern is
// established.
export const metadata: Metadata = {
  title: "Welcome",
};

const categories = [
  ["accessibility", "Accessibility"],
  ["ai-readability", "AI Readability"],
  ["ai-summarization", "AI Summarization"],
  ["content", "Content"],
  ["conversational-structure", "Conversational Structure"],
  ["entity-richness", "Entity Richness"],
  ["faq-optimization", "FAQ Optimization"],
  ["internal-linking", "Internal Linking"],
  ["mobile", "Mobile"],
  ["on-page", "On-Page"],
  ["performance", "Performance"],
  ["security", "Security"],
  ["semantic-depth", "Semantic Depth"],
  ["structured-data", "Structured Data"],
  ["eeat-signals", "GEO E-E-A-T Signals"],
];

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Broken Fixture Co</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <p>
        This site is a QA fixture built to verify that the GeoRank AI
        scanner correctly flags every one of its 249 automated SEO/GEO
        checks. Every category page below genuinely violates every
        PAGE-scope rule in its category. SITE-scope rules are broken
        site-wide — see <a href="/rules">/rules</a> for the full
        rule-by-rule breakdown.
      </p>

      {/* Site-wide E-E-A-T / trust signals are deliberately absent: no About page, no Privacy
          Policy, no Terms & Conditions, no Contact page, no mailto:/tel: link, and no
          <address> anywhere on this site — eeat.about_page, eeat.privacy_policy,
          eeat.terms_conditions, eeat.contact_information, eeat.business_trust_signals all fail. */}

      <nav>
        <ul>
          {categories.map(([slug, label]) => (
            <li key={slug}>
              <a href={`/${slug}`}>{label}</a>
            </li>
          ))}
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/product">Product</a>
          </li>
          <li>
            <a href="/hub">Resources Hub</a>
          </li>
          <li>
            <a href="/technical-markup">Technical Markup Fixture</a>
          </li>
          <li>
            <a href="/technical-headers">Technical Headers Fixture</a>
          </li>
          <li>
            <a href="/rules">Full rule list (/rules)</a>
          </li>
        </ul>
      </nav>

      {/* technical.broken_external_links: outbound link to a non-resolving domain. */}
      <p>
        Read more on{" "}
        <a href="https://this-domain-does-not-exist-broken-fixture-qa.invalid/dead-link">
          our partner site
        </a>
        .
      </p>

      {/* technical.pagination_discoverability: both series members are reached via separate
          direct links from here rather than via a "Next" widget connecting them to each other,
          so /blog/page/1 never links onward to /blog/page/2 — see /blog/page/1 and
          /blog/page/2. /blog/page/1 also leads on (via /blog/page/1/deeper) to /pricing, giving
          pricing its one buried inbound link at click-depth 3. */}
      <p>
        <a href="/blog/page/1">Blog archive, page 1</a>{" "}
        <a href="/blog/page/2">Blog archive, page 2</a>
      </p>

      {/* internal_linking.important_page_inlinks / important_pages_reachability (SITE):
          /pricing is deliberately not linked from here (or any nav/primary page) directly —
          its only inbound link is buried 3 clicks deep via /blog/page/1 -> .../deeper, see
          /pricing. The category pages also never link back to each other or to this home page,
          so inbound concentration for most of the site sits entirely on this one page. */}

      {/* internal_linking.orphan_pages / internal_linking.inbound_links (SITE):
          CANNOT_BREAK_ON_VERCEL — the crawler discovers pages purely by following <a href>
          links from the homepage (BFS crawl), so a page with literally zero inbound links from
          anywhere is by construction never crawled at all and never appears in the rule's page
          set to be scored — see /rules. */}
    </main>
  );
}
