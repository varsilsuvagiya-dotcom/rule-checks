import type { Metadata } from "next";

// This route's own URL is the fixture for four on_page rules the rest of the site's clean,
// hyphenated, lowercase, short URLs never trip:
// - on_page.url_hyphen_usage: the "Legacy_Section" path segment uses an underscore.
// - on_page.url_lowercase: "Legacy_Section" also contains uppercase letters.
// - on_page.url_readability: the final segment is one 55-char token with no hyphen/underscore
//   word breaks at all (words.length===1 && length>25) -> WARNING ("single long token").
// - on_page.url_length: the full path is 78 characters, over the 75-char ideal max -> WARNING.
//
// Also carries a real (non-empty, non-whitespace) title/description duplicated verbatim on
// /product, and an H1 far outside the 10-70 char band, to cover the remaining on_page gaps that
// /on-page's empty-title fixture can't reach at the same time:
// - on_page.duplicate_title: title below is identical to /product's title.
// - on_page.duplicate_meta_description: description below is identical to /product's description.
// - on_page.h1_length: H1 is 4 characters, under the 10-char minimum.
export const metadata: Metadata = {
  title: "Product | Broken Fixture Co",
  description:
    "Fixture product page. It declares a WebPage schema instead of the Product schema this page type should carry, and has no Product schema at all.",
};

export default function MessyUrlPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Old</h1>
      <p>
        This route&apos;s own URL — an uppercase, underscore-separated path
        segment followed by one long unbroken 55-character token, stretching
        the full path past 75 characters — is itself the on_page.url_*
        rule violation set. Its title and meta description are also
        deliberately duplicated verbatim from /product, and its H1 above is
        only 3 characters long.
      </p>
    </main>
  );
}
