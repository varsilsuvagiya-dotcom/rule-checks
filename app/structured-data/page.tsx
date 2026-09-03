import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Structured Data | Broken Fixture Co",
};

// structured_data category (16 PAGE-scope rules; structured_data.coverage is SITE-scope,
// handled elsewhere). Mechanism: this page emits ZERO JSON-LD (no
// <script type="application/ld+json"> anywhere) and lives at a path the crawler's classify()
// buckets as pageType "other" (not "/", not /blog|/product|/docs|/pricing|/landing).
//
// Per-rule outcome with zero schema + pageType "other" + not-homepage:
//   FAIL            jsonld_exists            (page.jsonLdBlocks.length === 0)
//   WARNING         schema_present           (page.hasSchema === false)
//   WARNING         webpage_schema           (pageType is not blog/product, so WebPage IS
//                                              expected here; none found)
//   WARNING/FAIL    faqpage_schema           (this page's headings below are deliberately
//                                              question-phrased so contentStructure.hasFaqPattern
//                                              is true, making the rule applicable; no FAQPage
//                                              schema exists to back it)
//   WARNING/FAIL    rich_results_eligibility (FAQ branch becomes relevant for the same reason;
//                                              no structured data qualifies for any rich result)
//   NOT_APPLICABLE  article_schema           (pageType !== 'blog')
//   NOT_APPLICABLE  breadcrumblist_schema    (pageType !== 'blog'/'product')
//   NOT_APPLICABLE  duplicate_structured_data(jsonLdBlocks.length === 0)
//   NOT_APPLICABLE  jsonld_valid_syntax      (jsonLdBlocks.length === 0 — nothing to parse)
//   NOT_APPLICABLE  organization_schema      (not homepage)
//   NOT_APPLICABLE  person_author_schema     (pageType !== 'blog')
//   NOT_APPLICABLE  product_schema           (pageType !== 'product')
//   NOT_APPLICABLE  required_properties      (no typed nodes at all)
//   NOT_APPLICABLE  schema_type_relevance    (pageType 'other' has no EXPECTED_TYPE entry)
//   NOT_APPLICABLE  valid_vocabulary         (no typed nodes at all)
//   NOT_APPLICABLE  website_schema           (not homepage)
//
// These NOT_APPLICABLE outcomes are correct-by-design for the underlying rules (they gate on
// page role/homepage-ness, which total schema absence can't override) — see PARSED_RULES.txt
// audit notes. The rules that CAN fire on this page (jsonld_exists, schema_present,
// webpage_schema, faqpage_schema, rich_results_eligibility) all genuinely fail here.
export default function StructuredDataPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Structured Data</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>

      <p>
        Broken Fixture Co publishes this page as a general reference on how we
        approach structured data across the site. It is not a blog post, not
        a product page, and not the homepage — just a plain informational
        page with no machine-readable markup describing it at all.
      </p>

      <section>
        <h2>What is structured data?</h2>
        <p>
          Structured data is a standardized format for providing information
          about a page and classifying its content. Search engines and AI
          answer engines read it to understand entities, relationships, and
          facts beyond what plain text conveys.
        </p>
      </section>

      <section>
        <h2>Why does this page have none?</h2>
        <p>
          This page intentionally omits any JSON-LD block — there is no
          Organization, WebSite, WebPage, Article, Product, or FAQPage schema
          anywhere in the document, and none of the properties those types
          would normally carry are declared here either.
        </p>
      </section>

      <section>
        <h2>How is this page classified?</h2>
        <p>
          It sits outside the blog, product, docs, pricing, and landing
          sections of the site, and it is not served from the root path, so
          it does not inherit the schema expectations tied to those page
          roles.
        </p>
      </section>

      <section>
        <h2>Are there any Q&A-style answers on this page?</h2>
        <p>
          Yes — for testing purposes this section is written as a question,
          and no FAQPage schema backs it, even though the surrounding text
          reads like an FAQ entry.
        </p>
      </section>

      <section>
        <h2>What should visitors take away from this page?</h2>
        <p>
          That structured data is absent here by design, as part of a fixture
          used to verify that an SEO/GEO audit tool correctly flags pages
          with no schema.org markup at all.
        </p>
      </section>
    </main>
  );
}
