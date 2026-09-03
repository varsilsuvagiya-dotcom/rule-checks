import type { Metadata } from "next";

// on_page.duplicate_title / on_page.duplicate_meta_description: this exact title and
// description are also reused verbatim on
// /on-page/Legacy_Section/thisisaveryveryverylongopaqueslugwithnowordbreaksatall.
//
// internal_linking.important_pages_reachability / important_page_inlinks /
// link_depth_distribution (SITE): /product matches the site's key-page pattern (/products?/)
// but is deliberately NOT linked from the homepage, /blog, or any shallow page -- its only
// inbound link anywhere on the site is from /blog/page/1/deeper/d8, at the end of an 8-hop
// burial chain (home -> /blog/page/1 -> deeper -> d3 -> d4 -> d5 -> d6 -> d7 -> d8 -> here),
// giving it click-depth 9 (past MAX_KEY_PAGE_DEPTH=2) and exactly 1 inbound link (below
// MIN_INLINKS_FOR_KEY_PAGE=2).
export const metadata: Metadata = {
  title: "Product | Broken Fixture Co",
  description:
    "Fixture product page. It declares a WebPage schema instead of the Product schema this page type should carry, and has no Product schema at all.",
};

export default function ProductPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      {/* structured_data.product_schema: pageType 'product' (URL matches /product), and this
          page declares NO Product schema anywhere -> hasType(page,'Product') is false -> FAIL.
          structured_data.schema_type_relevance: instead the page below declares a WebPage
          schema, which is NOT in EXPECTED_TYPE.product (['Product']) -> hasSchema is true,
          schemaTypes includes 'WebPage' but not 'Product' -> WARNING (wrong schema type for
          this page's role). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Product — Broken Fixture Co",
          }),
        }}
      />
      <h1>Product</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <p>
        Fixture product page. It declares a WebPage schema instead of the
        Product schema this page type should carry, and has no Product
        schema at all.
      </p>
      <ul>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/hub">Resources Hub</a>
        </li>
      </ul>
    </main>
  );
}
