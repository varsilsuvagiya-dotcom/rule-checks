import type { Metadata } from "next";

// technical-headers — PAGE-scope technical rules driven by HTTP headers/response/redirect
// behavior (as opposed to markup-driven rules under /technical-markup). Every child route below
// is linked from here so the crawler discovers and scores each one (nothing here should be
// disallowed by robots.txt — /category/ is disallowed by app/robots.txt, which is why these
// fixtures live outside that prefix rather than reusing /category/technical).
//
// technical.cache_headers: see /technical-headers/no-cache (middleware strips Cache-Control).
// technical.content_type: see /technical-headers/no-charset-param (Content-Type header present
//   and declares text/html, but omits the charset parameter -> WARNING). The rule can only ever
//   be evaluated on pages the crawler classifies as HTML in the first place — the crawler itself
//   requires "text/html" in Content-Type before it will even parse a response as a page (anything
//   else is filed as a non-HTML "shell" and the rule then reports NOT_APPLICABLE) — so the
//   reachable failure mode here is "type present, charset missing", not "header absent".
// technical.http_status: see /technical-headers/status-500 (route handler returns a real 500).
// technical.indexability: see /technical-headers/indexability-blocked (meta robots noindex on a
//   page that IS linked/reachable, so it's a genuine "blocked but still discoverable" FAIL rather
//   than a robots.txt-disallowed page that never gets crawled at all).
// technical.page_size: see /technical-headers/huge (HTML source > 2MB of characters).
// technical.server_response_time: see /technical-headers/slow (artificial >3.5s server delay).
// technical.soft_404: see /technical-headers/soft-404 (HTTP 200, "page not found" copy, thin
//   content).
// technical.redirect_loops: /technical-headers/loop-a <-> /technical-headers/loop-b is a genuine
//   A->B->A redirect loop configured in next.config.ts. Only loop-a is linked below (needed so
//   the crawler discovers the URL at all) — loop-b is never linked anywhere, only reached as the
//   redirect target inside the loop itself, so no ordinary on-site navigation path can strand a
//   user in it.
export const metadata: Metadata = {
  title: "Technical Headers Fixture | Broken Fixture Co",
};

export default function TechnicalHeadersPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Technical Headers Fixture</h1>
      <p>
        This page links to a set of routes that exercise HTTP-header, response-code, and
        redirect-driven technical rules.
      </p>
      <ul>
        <li>
          <a href="/technical-headers/no-cache">No Cache-Control header</a>
        </li>
        <li>
          <a href="/technical-headers/no-charset-param">
            Content-Type present without a charset parameter
          </a>
        </li>
        <li>
          <a href="/technical-headers/status-500">Server error (500)</a>
        </li>
        <li>
          <a href="/technical-headers/indexability-blocked">
            Blocked from indexing (meta robots noindex)
          </a>
        </li>
        <li>
          <a href="/technical-headers/huge">Oversized HTML page</a>
        </li>
        <li>
          <a href="/technical-headers/slow">Artificially slow response</a>
        </li>
        <li>
          <a href="/technical-headers/soft-404">Soft 404 (200 status, "not found" content)</a>
        </li>
        <li>
          <a href="/technical-headers/loop-a">Redirect loop (A to B to A)</a>
        </li>
      </ul>
    </main>
  );
}
