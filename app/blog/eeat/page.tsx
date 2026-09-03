import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Cut Server Costs by 40% | Broken Fixture Co",
};

export default function EeatFixturePage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>

      <h1>How We Cut Server Costs by 40%</h1>

      {/* No byline, no meta[name=author], no rel=author anywhere in the VISIBLE markup —
          eeat.author_information and eeat.author_bio still fail. eeat.author_schema is
          covered below via a deliberately incomplete BlogPosting JSON-LD block (present, but
          with a plain-string author rather than a Person entity), which is what genuinely
          exercises structured_data.article_schema / person_author_schema / breadcrumblist_schema
          on a blog-typed page as well: */}
      {/* structured_data.article_schema: BlogPosting present with headline+author, but
          datePublished OMITTED -> missingProps(['headline','author','datePublished']) finds
          "datePublished" missing -> WARNING (not PASS, not the cleaner FAIL, but a genuine
          rule-graded failure via a real missing required property). */}
      {/* structured_data.person_author_schema: author is a plain string ("Broken Fixture
          Editorial Team"), not {"@type":"Person","name":...} -> WARNING. */}
      {/* structured_data.breadcrumblist_schema: pageType is 'blog' and this is not the
          homepage, but no BreadcrumbList node exists anywhere -> WARNING. */}
      {/* structured_data.jsonld_valid_syntax: a SECOND script block below is deliberately
          malformed JSON (trailing comma, unquoted key) -> FAIL (blocks.length>0, not all valid). */}
      {/* structured_data.duplicate_structured_data: two separate WebPage-family singleton-type
          nodes both declare "@type":"WebPage" -> multiple WebPage nodes -> WARNING. */}
      {/* structured_data.valid_vocabulary / required_properties / schema_type_relevance: the
          malformed second block's surviving (parseable-adjacent) sibling below uses the
          misspelled "@type":"Artikle" -> not a recognized schema.org type -> WARNING/FAIL. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "How We Cut Server Costs by 40%",
            author: "Broken Fixture Editorial Team",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "How We Cut Server Costs by 40%",
            "datePublished": "2026-09-03",
          }`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Duplicate WebPage node (structured_data.duplicate_structured_data)",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Artikle",
            name: "Misspelled schema.org @type (structured_data.valid_vocabulary)",
          }),
        }}
      />
      <p>Published September 3, 2026</p>

      <p>
        Last quarter our infrastructure bill was spiraling out of control. This post walks
        through the exact changes we made to bring it back down without sacrificing
        performance or reliability for our customers.
      </p>

      <h2>Step 1: Right-sizing compute</h2>
      <p>
        We audited every instance in our fleet and found dozens running at under 10%
        average utilization. Consolidating workloads onto fewer, better-matched instance
        types was the single biggest lever we pulled.
      </p>

      <h2>Step 2: Caching aggressively</h2>
      <p>
        Adding a caching layer in front of our most expensive database queries cut read
        load dramatically, which let us downsize our database tier as well.
      </p>

      <h2>Step 3: Cleaning up storage</h2>
      <p>
        Old build artifacts, logs, and orphaned snapshots were quietly costing us more than
        we expected. A simple lifecycle policy took care of most of it automatically.
      </p>

      <p>
        None of these changes required a rewrite or a migration — just careful measurement
        and a willingness to turn things off that nobody was using anymore.
      </p>
    </main>
  );
}
