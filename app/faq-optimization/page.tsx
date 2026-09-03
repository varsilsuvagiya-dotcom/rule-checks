import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Broken Fixture Co",
};

// faq_optimization category (10 PAGE-scope rules). Every rule gates on hasAnyFaqSignal(schema,
// visible) = schema.present || visible.hasSection || questionHeadings.length>=2 — with NO FAQ
// intent at all, every rule short-circuits to NOT_APPLICABLE by design (see faq-helpers.ts).
// So genuinely failing this whole category requires REAL FAQ intent that is then done badly:
//
// - faq_optimization.section_exists: 2 question-phrased H2 headings (>=2 satisfies
//   hasAnyFaqSignal) but BELOW minQuestionHeadings (3) and no "Frequently Asked Questions"
//   labelled section, no FAQPage schema hasSection -> hasCluster false, hasSchema handled below
//   -> see the schema note: we deliberately give the schema BAD pairs (malformed), which keeps
//   schema.present true but produces its own FAIL path on faq_optimization.schema while
//   section_exists still reads hasSchema as informational presence, not quality — so a
//   present-but-broken schema plus 2 question headings gives section_exists real signal to
//   evaluate against.
// - faq_optimization.count: 2 duplicate questions (via schema, deduped) -> unique=1 < min(3)
//   -> FAIL.
// - faq_optimization.schema: FAQPage present with mainEntity entries that are malformed
//   (missing acceptedAnswer text) -> FAIL (malformedPct exceeds maxMalformedPct).
// - faq_optimization.answer_quality: the two answers that DO have text are far outside the
//   20-150 word band (one 4 words, one 300+ words) -> FAIL.
// - faq_optimization.extractability: schema.pairs.length===0 after malformed entries are
//   dropped in the answer/question-presence sense -> NOT_APPLICABLE is the honest outcome here
//   IF pairs end up empty; we keep at least one syntactically valid (non-malformed) pair with a
//   multi-topic, overlong answer so extractablePct stays low instead -> FAIL/WARNING.
// - faq_optimization.freshness: no modified/published date, no version reference anywhere
//   -> FAIL.
// - faq_optimization.internal_linking: the one valid answer contains zero internal links
//   -> WARNING.
// - faq_optimization.placement: 2 question headings appear as the FIRST two headings on a page
//   with >=4 total headings -> positionPct near 0% -> FAIL.
// - faq_optimization.question_diversity: both questions fall in the same intent bucket
//   ("pricing") -> distinct=1 < minBuckets(2) -> FAIL.
// - faq_optimization.question_quality: both questions are marketing-style ("Why choose us?")
//   rather than genuine search-intent phrasing -> genuinePct low -> FAIL.

export default function FaqOptimizationPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Why choose us for pricing?",
                acceptedAnswer: { "@type": "Answer", text: "Because." },
              },
              {
                "@type": "Question",
                name: "Why choose us for pricing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our pricing covers a wide range of considerations including but not limited to base fees, usage-based charges, optional add-ons, volume discounts, contract length adjustments, regional variations, currency conversion handling, promotional periods, renewal terms, cancellation policies, proration rules, and a long list of other billing-related factors that this single overlong answer tries to cram into one paragraph rather than breaking any of it into a separate, cleanly extractable question of its own, which is exactly the kind of multi-topic sprawl that makes an FAQ answer hard for an AI system to lift cleanly and quote back to a user asking one specific, narrow question about one specific, narrow aspect of how pricing actually works in practice for any given account tier.",
                },
              },
              {
                "@type": "Question",
                acceptedAnswer: { "@type": "Answer" },
              },
            ],
          }),
        }}
      />
      <h1>Why choose us for pricing?</h1>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h2>Why choose us for pricing?</h2>
      <p>Because.</p>
      <h2>Why choose us for pricing?</h2>
      <p>
        Our pricing covers a wide range of considerations including but not
        limited to base fees, usage-based charges, optional add-ons, volume
        discounts, contract length adjustments, regional variations,
        currency conversion handling, promotional periods, renewal terms,
        cancellation policies, proration rules, and a long list of other
        billing-related factors crammed into one answer instead of being
        split into separate, cleanly extractable questions.
      </p>
      <h2>Delivery Approach</h2>
      <p>
        We start every engagement with a short discovery phase to align on
        scope, constraints, and success criteria. From there, work proceeds
        in weekly increments with a demo at the end of each cycle.
      </p>
      <h2>Areas of Focus</h2>
      <p>
        Our teams specialize in platform migrations, performance
        remediation, and long-term maintenance contracts.
      </p>
      <h2>Engagement Structure</h2>
      <p>
        Contracts are structured around outcomes rather than hours, with a
        fixed price agreed up front for the defined deliverable.
      </p>
    </main>
  );
}
