import type { Metadata } from "next";

// on_page category — PAGE-scope rules. This route deliberately overrides the root layout's
// metadata with broken values so per-page on_page checks fail for real, rather than inheriting
// the (comparatively) clean root layout metadata.
//
// on_page.title_present / on_page.empty_title: title is whitespace-only, so Next renders an
// effectively empty <title> text node (crawler trims + nulls whitespace-only titles).
// on_page.title_length: "   " is far under the 30-60 char ideal range (also moot once empty,
// but the rule chain treats an empty/whitespace title as the empty_title/title_present failure).
// on_page.duplicate_title: NOT achievable simultaneously with empty title (duplicate_title
// requires p.title to be truthy) — see body-level workaround below via a second raw <title> tag,
// which instead trips on_page.multiple_title_tags.
//
// on_page.meta_description / on_page.empty_meta_description: description omitted entirely here
// (root layout's description is intentionally NOT inherited because we set our own metadata
// object without a description key — Next does not merge missing description from the parent
// once a page-level metadata export exists without it... actually Next DOES merge per-field, so
// we must explicitly set description to an empty string to force emptiness).
export const metadata: Metadata = {
  title: "   ",
  description: "",
  // on_page.open_graph_metadata: only og:title present (1/3) — WARNING, partial coverage.
  openGraph: {
    title: "On-Page Fixture",
  },
  // on_page.twitter_card_metadata: no twitter metadata exported at all → twitter:card missing.
};

export default function OnPagePage() {
  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      {/* Visible even though heading structure below is broken. */}
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>

      {/* on_page.multiple_title_tags: a second raw <title> tag in the body. React/Next will
          hoist this into <head>, producing two <title> elements in the rendered document
          alongside the one from the metadata export above. */}
      <title>Welcome</title>
      {/* ^ Also deliberately reuses the exact title text of the home page ("Welcome") so that,
          were title non-empty, on_page.duplicate_title would also fire. Because the primary
          metadata title is whitespace/empty, empty_title/title_present take precedence for the
          "official" title, but this duplicate raw tag still creates the multiple-title-tags
          condition and a same-text collision with home. */}

      {/* on_page.multiple_meta_descriptions: a second raw meta description tag, duplicating text
          used elsewhere is not required for this rule — just presence of >1 tag. */}
      <meta
        name="description"
        content="Broken Fixture Co — a QA test fixture site with intentionally broken SEO/GEO signals."
      />
      {/* ^ identical to the root layout's description text — also sets up
          on_page.duplicate_meta_description (shared with home, which inherits the root layout's
          description verbatim) once a non-empty description is present via this raw tag. */}

      {/* on_page.h1_present: zero <h1> elements anywhere on this page (WARNING is for >1; FAIL
          is for 0). We render no <h1> at all — only an <h2> as the first heading. */}

      {/* on_page.heading_hierarchy: first heading on the page is H2, not H1 → WARNING
          ("first heading is H2"). */}
      <h2>Broken Heading Structure</h2>

      {/* on_page.skipped_heading_levels: H2 → H4 skips H3. */}
      <h4>Skipped Level Section</h4>

      <p>
        This page is a QA fixture for the on_page rule category. It exists
        solely to exercise page-scoped SEO checks such as title, meta
        description, heading, Open Graph, and Twitter Card metadata rules so
        an automated scanner can verify each rule fires correctly against a
        real, rendered Next.js page rather than a synthetic fixture. The
        content below intentionally opens without any topical alignment to
        the (empty) title or (absent) H1, and continues only long enough to
        cross the word-count thresholds that gate several of the on_page
        rules, such as first-paragraph alignment, subheading structure, and
        the main-content landmark check, all of which require a minimum
        amount of body text before they activate and evaluate this page.
      </p>

      {/* on_page.missing_h2: h2Count is actually 1 here (the "Broken Heading Structure" H2
          above), so missing_h2 would PASS. To keep this rule genuinely failing, no <h2> should
          exist. But heading_hierarchy needs the *first* heading to not be H1 -- an H2 satisfies
          both "first heading isn't H1" AND would normally pass missing_h2. To force missing_h2
          to FAIL as well we'd need zero H2s, which conflicts with heading_hierarchy's own need
          for a real heading. Resolution: keep the H2 above (needed for heading_hierarchy) and
          instead don't rely on missing_h2 firing from this section — see NOT_APPLICABLE note in
          the report; missing_h2 cannot simultaneously fail alongside heading_hierarchy's WARNING
          path using a non-H1 first heading. */}

      {/* on_page.first_paragraph_content: first substantive paragraph (>=25 words, above) shares
          no meaningful token with the title ("   " / empty) or H1 (none present) — WARNING. */}

      {/* on_page.main_content_presence: deliberately no <main>, [role="main"], or <article>
          landmark anywhere on this page — this outer element is a plain <div>. */}

      <p>
        Additional filler paragraph content to keep the total word count on
        this page comfortably above the various length thresholds used by
        the on_page rules, ensuring every length-gated check actually
        evaluates this page instead of returning NOT_APPLICABLE for being
        too short. None of this text is topically related to any heading on
        the page, which is intentional for the alignment checks above.
      </p>
    </div>
  );
}
