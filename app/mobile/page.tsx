import type { Viewport } from "next";

// QA fixture page — intentionally violates every PAGE-scope rule in the `mobile` category
// so the scanner's mobile rules can be verified against a known-broken page.
// See per-rule comments below for exactly which real check each element trips.

// mobile.viewport_configured: fixed pixel width (not device-width) AND userScalable=false
// (maximum-scale=1 style zoom lock) -> ZOOM_LOCK_PATTERN and FIXED_WIDTH_PATTERN both match
// on the rendered content string -> WARNING with both issues reported.
// mobile.viewport_meta: CANNOT_BREAK_ON_NEXTJS — Next.js always injects a
// <meta name="viewport" ...> tag as a "Default Field" even when no viewport is configured
// (see node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md,
// "Default Fields" section), and a page-level `viewport` export only overwrites its *content*,
// it cannot remove the tag entirely. So hasViewportMeta is always true and this rule always PASSes.
export const viewport: Viewport = {
  width: 980,
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function MobileFixturePage() {
  return (
    <main>
      <h1>TEST FIXTURE — intentionally broken, not a real business.</h1>
      <p>Broken Fixture Co — mobile rule violations fixture page.</p>

      {/* mobile.mobile_content_width: generic div with inline style="width:NNNpx" where
          NNN (900) exceeds the 400px mobile-viewport proxy threshold used by
          page.mobileSignals.fixedWidthElementsOverMobileViewport -> WARNING. Also visually
          induces horizontal scroll well past any real mobile viewport width. */}
      <div style={{ width: "900px", background: "#eee", padding: 8 }}>
        This container is fixed at 900px wide, far exceeding common mobile viewport widths
        (390-430px) and the crawler&apos;s 400px proxy threshold, forcing horizontal scroll.
      </div>

      {/* mobile.mobile_image_scaling: <img> with a fixed pixel width attribute (900) over the
          400px threshold, no srcset/sizes -> imagesFixedWidthTotal counted -> WARNING. */}
      <img
        src="/large-hero-image.jpg"
        alt="Fixed width hero image with no responsive srcset"
        width={900}
        height={450}
        style={{ width: "900px" }}
      />

      {/* mobile.mobile_table_handling: <table> with inline style="width:NNNpx" (960) over the
          400px threshold -> tablesFixedWidthTotal counted -> WARNING. */}
      <table style={{ width: "960px" }}>
        <thead>
          <tr>
            <th>Column A</th>
            <th>Column B</th>
            <th>Column C</th>
            <th>Column D</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fixed-width table cell data</td>
            <td>Fixed-width table cell data</td>
            <td>Fixed-width table cell data</td>
            <td>Fixed-width table cell data</td>
          </tr>
        </tbody>
      </table>

      {/* mobile.mobile_navigation_crawlability: <nav> with links using bare "#" / javascript:
          hrefs instead of real crawlable URLs. 2 of 2 nav links uncrawlable (ratio 1.0 >= 0.5)
          -> FAIL. */}
      <nav>
        <a href="#">Home</a>
        <a href="javascript:void(0)">About</a>
      </nav>

      {/* mobile.responsive_layout: rule checks page.viewportContent for width=device-width.
          The page-level viewport export above sets width:980 (no device-width), so
          hasDeviceWidthViewport is false -> FAIL regardless of image srcset usage. */}

      {/* mobile.touch_target_size: NOT_APPLICABLE by design (real rule source) — requires
          rendered layout geometry (computed box size after CSS cascade) unavailable from a
          static HTML crawl. Still included below for a genuinely bad mobile UX: many tiny
          (18x18px) buttons packed with zero spacing between them. */}
      <div style={{ display: "flex", gap: 0 }}>
        <button type="button" style={{ width: 18, height: 18, padding: 0, margin: 0, fontSize: 8 }}>
          A
        </button>
        <button type="button" style={{ width: 18, height: 18, padding: 0, margin: 0, fontSize: 8 }}>
          B
        </button>
        <button type="button" style={{ width: 18, height: 18, padding: 0, margin: 0, fontSize: 8 }}>
          C
        </button>
        <button type="button" style={{ width: 18, height: 18, padding: 0, margin: 0, fontSize: 8 }}>
          D
        </button>
      </div>

      {/* mobile.font_readability: NOT_APPLICABLE by design (real rule source) — requires
          computed CSS font-size unavailable from a static HTML crawl. Still included below for
          a genuinely unreadable mobile font: 8px inline font-size, well under the 12px
          Google-recommended minimum. */}
      <p style={{ fontSize: "8px" }}>
        This paragraph renders at 8px, far below the 12px minimum computed body font-size
        Google recommends for mobile readability.
      </p>

      {/* mobile.horizontal_overflow: NOT_APPLICABLE by design (real rule source) — requires
          rendered layout comparison unavailable from a static HTML crawl. Still included below
          as a genuine overflow inducer: a 1400px-wide fixed block with no wrapping/scroll
          container, guaranteed to force horizontal scrolling on any mobile viewport. */}
      <div style={{ width: "1400px", height: 40, background: "#ccc" }}>
        1400px wide fixed block — forces real horizontal scrolling on mobile viewports.
      </div>
    </main>
  );
}
