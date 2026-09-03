"use client";

import { useRouter } from "next/navigation";

// This page is deliberately built to fail every PAGE-scope rule in the internal_linking
// category. See notes on each link below for which rule(s) it feeds.
//
// - internal_linking.link_count / internal_linking.links_present: only 2 real <a href>
//   internal links exist on the whole page (below the min-2 threshold and near-zero).
// - internal_linking.link_diversity: both real internal links point at the exact same
//   destination ("/internal-linking/same-target"), so distinct-destination ratio is ~0.
// - internal_linking.generic_anchor_text / internal_linking.anchor_text_quality: anchor text
//   is "click here" / "read more" / "here" — all in the generic-phrase set, and repeated
//   across links.
// - internal_linking.nofollow_internal_links: every internal <a> carries rel="nofollow".
// - internal_linking.broken_links: one internal link targets a route that does not exist.
// - internal_linking.redirecting_links: one internal link targets
//   /internal-linking/old-redirecting-target, which server-redirects elsewhere.
// - internal_linking.link_canonical_consistency: the link target
//   /internal-linking/same-target declares a canonical URL different from the link's own URL.
// - internal_linking.javascript_internal_links: a "navigation" element is implemented as a
//   <span onClick={...}> with no real href, invisible to a crawler that doesn't execute JS.
// - internal_linking.internal_link_followability: a placeholder href="#" anchor that never
//   navigates anywhere.
// - internal_linking.crawl_depth: this page itself is only reachable via a deeply nested,
//   unlinked-from-nav path, and nothing links back up shallowly.
function goToSameTargetViaJs() {
  // No real href anywhere — this only "works" if JavaScript runs and reads onClick, which a
  // crawler parsing static HTML cannot see or follow.
  window.location.href = "/internal-linking/same-target";
}

export default function InternalLinkingPage() {
  const router = useRouter();

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <h1>Internal Linking</h1>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <p>
        This page exists to fail every page-level internal-linking check: too few real links,
        all pointing at one destination, with generic nofollow anchors, a broken target, a
        redirecting target, a canonical mismatch, a JS-only pseudo-link, and a dead
        placeholder anchor.
      </p>

      <ul>
        <li>
          <a href="/internal-linking/same-target" rel="nofollow">
            click here
          </a>
        </li>
        <li>
          <a href="/internal-linking/same-target" rel="nofollow">
            read more
          </a>
        </li>
        <li>
          <a href="/this-page-does-not-exist-xyz" rel="nofollow">
            here
          </a>
        </li>
        <li>
          <a href="/internal-linking/old-redirecting-target" rel="nofollow">
            here
          </a>
        </li>
        <li>
          <a href="#" rel="nofollow">
            here
          </a>
        </li>
        <li>
          {/* No href at all — "navigation" only happens via onClick, which is invisible to a
              crawler reading static HTML. Deliberately not a real <a>. */}
          <span
            onClick={goToSameTargetViaJs}
            role="link"
            tabIndex={0}
            style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
          >
            click here
          </span>
        </li>
      </ul>

      {/* Also exercised via next/navigation's router.push from a non-anchor element, to
          reinforce the JS-only navigation pattern without a crawlable href. */}
      <button type="button" onClick={() => router.push("/internal-linking/same-target")}>
        more
      </button>
    </main>
  );
}
