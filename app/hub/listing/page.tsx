import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Listing | Broken Fixture Co",
};

// technical.faceted_navigation: this listing page is linked with several filter/sort
// query-param variants below (?sort=price, ?sort=name, ?color=red, ...). Next.js serves the
// exact same route/markup for every query-string variant of /hub/listing (query params don't
// create distinct routes), so each crawled variant is a genuine near-duplicate-content page --
// none of them are robots-disallowed, noindexed, or canonicalized to the clean parent URL, which
// is exactly the "uncontrolled facet URL" condition the rule flags (isFacetLikeUrl matches
// params in FACET_PARAM_NAMES: sort/color/price; controlledCount stays 0 since no noindex/
// canonical/robots-disallow applies to any of them).
export default function HubListingPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Resource Listing</h1>
      <p>
        This listing page can be filtered and sorted, but none of the
        resulting facet URLs are controlled via robots.txt, noindex, or a
        canonical tag back to this clean parent URL.
      </p>
      <ul>
        <li>
          <a href="/hub/listing?sort=price">Sort by price</a>
        </li>
        <li>
          <a href="/hub/listing?sort=name">Sort by name</a>
        </li>
        <li>
          <a href="/hub/listing?color=red">Filter: color red</a>
        </li>
        <li>
          <a href="/hub/listing?color=blue">Filter: color blue</a>
        </li>
        <li>
          <a href="/hub/listing?color=red&sort=price">
            Filter: color red, sorted by price
          </a>
        </li>
      </ul>
    </main>
  );
}
