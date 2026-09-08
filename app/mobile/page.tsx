// Mobile category page. Per user request, all fixable PAGE-scope `mobile.*` rules are now
// FIXED (no longer exercised as failures here or, for viewport rules, anywhere on the site):
// viewport_configured (fixed in app/layout.tsx, site-wide), viewport_meta,
// mobile_content_width, mobile_image_scaling, mobile_navigation_crawlability,
// mobile_table_handling, responsive_layout.
//
// touch_target_size, font_readability, horizontal_overflow are left as NEEDS_FIELD_DATA:
// their real rule source unconditionally returns NOT_APPLICABLE (they require rendered
// layout geometry / computed CSS a static-HTML crawl can never produce) -- nothing to fix,
// they were never actually failing verdicts.
export default function MobileFixturePage() {
  return (
    <main>
      <h1>TEST FIXTURE — intentionally broken, not a real business.</h1>
      <p>Broken Fixture Co — mobile category fixture page.</p>

      {/* mobile.viewport_configured / mobile.viewport_meta: FIXED site-wide in
          app/layout.tsx (device-width, no zoom lock). No local override here. */}

      {/* mobile.mobile_content_width: FIXED -- fluid width, no fixed-pixel container. */}
      <div style={{ maxWidth: "100%", background: "#eee", padding: 8 }}>
        This container uses a fluid max-width instead of a fixed pixel width, so it fits any
        mobile viewport without forcing horizontal scroll.
      </div>

      {/* mobile.mobile_image_scaling: FIXED -- responsive image with srcset/sizes, no fixed
          pixel width forced via inline style. */}
      <img
        src="/large-hero-image.jpg"
        srcSet="/large-hero-image-800.jpg 800w, /large-hero-image-1600.jpg 1600w"
        sizes="(max-width: 800px) 100vw, 50vw"
        alt="Responsive hero image with a real srcset"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      {/* mobile.mobile_table_handling: FIXED -- fluid table width, no fixed pixel width. */}
      <table style={{ width: "100%", maxWidth: "100%" }}>
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
            <td>Responsive table cell data</td>
            <td>Responsive table cell data</td>
            <td>Responsive table cell data</td>
            <td>Responsive table cell data</td>
          </tr>
        </tbody>
      </table>

      {/* mobile.mobile_navigation_crawlability: FIXED -- nav links use real, crawlable hrefs. */}
      <nav>
        <a href="/">Home</a>
        <a href="/on-page">About</a>
      </nav>

      {/* mobile.responsive_layout: FIXED site-wide -- root layout's viewport now declares
          width=device-width (no local override here), so hasDeviceWidthViewport is true. */}

      {/* mobile.touch_target_size: rule always returns NOT_APPLICABLE (requires rendered
          layout geometry unavailable to a static crawl) -- left as ordinary, real-sized
          buttons since there is no verdict to fix. */}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" style={{ minWidth: 44, minHeight: 44 }}>A</button>
        <button type="button" style={{ minWidth: 44, minHeight: 44 }}>B</button>
        <button type="button" style={{ minWidth: 44, minHeight: 44 }}>C</button>
        <button type="button" style={{ minWidth: 44, minHeight: 44 }}>D</button>
      </div>

      {/* mobile.font_readability: rule always returns NOT_APPLICABLE (requires computed CSS
          unavailable to a static crawl) -- left at a normal, readable font size. */}
      <p style={{ fontSize: "16px" }}>
        This paragraph renders at a normal, readable body font size.
      </p>

      {/* mobile.horizontal_overflow: rule always returns NOT_APPLICABLE (requires rendered
          layout comparison unavailable to a static crawl) -- left fluid, no fixed-width
          overflow-inducing block. */}
      <div style={{ maxWidth: "100%", height: 40, background: "#ccc" }}>
        This block uses a fluid max-width, so it never forces horizontal scrolling.
      </div>
    </main>
  );
}
