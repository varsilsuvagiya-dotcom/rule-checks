// QA fixture page — intentionally violates every PAGE-scope rule in the `performance`
// category that is derivable from static HTML/markup so the scanner's performance rules can
// be verified against a known-broken page. See per-rule comments below for exactly which real
// check each element trips.
//
// Rules that are NOT triggerable here (documented, not silently skipped):
//   performance.browser_caching   -> reads HTTP response headers (cache-control/expires), not
//                                     page markup. Cannot be broken from within a page component.
//   performance.compression       -> reads HTTP response header content-encoding. Same as above.
//   performance.ttfb              -> reads crawler wall-clock response time, not markup.
//   performance.cls               -> requires real PageSpeed Insights lab data (ctx.pageSpeed);
//                                     rule source returns NOT_APPLICABLE without a PSI measurement.
//   performance.fcp               -> same: graded from PSI lab data, not derivable from markup.
//   performance.inp               -> rule always returns NOT_APPLICABLE (no interaction timeline
//                                     from a static crawl).
//   performance.lcp               -> graded from PSI lab data.
//   performance.speed_index       -> graded from PSI lab data.
//   performance.unused_css        -> rule always returns NOT_APPLICABLE (needs CSSOM coverage).
//   performance.unused_js         -> rule always returns NOT_APPLICABLE (needs code coverage).
//
// Everything below targets a rule that IS evaluated from static HTML.

const BLOCKING_DATA_BLOB = Array.from({ length: 2000 }, (_, i) => `item-${i}-${'x'.repeat(40)}`).join(',');

export default function PerformanceFixturePage() {
  return (
    <>
      {/* performance.render_blocking_js: a synchronous <script src> in <head> (via next/script
          equivalent — plain <script> tag rendered into <head> by Next's metadata-less head
          injection isn't reliable in the App Router, so we instead place a classic blocking
          <script src> at the very top of <body>, and ALSO an inline blocking script with a
          large data blob + busy-loop to simulate parse-blocking cost) trips
          isRenderBlockingScript: src!==null && inHead && !async && !defer && !module.
          We additionally render an equivalent tag with an explicit src and no async/defer so the
          crawler's headScripts capture (which reads <head> markup) sees a real blocking script. */}
      <script src="https://broken-fixture-co-cdn.example.com/legacy/analytics-sync.js" />
      <script
        // Deliberately blocking inline script: no type="module", no defer/async — parses and
        // executes synchronously during HTML parsing, holding up first paint.
        dangerouslySetInnerHTML={{
          __html: `
            // performance.render_blocking_js support: large blocking payload + busy loop,
            // simulating a heavy synchronous script parsed/executed before first paint.
            var BROKEN_FIXTURE_BLOB = "${BLOCKING_DATA_BLOB}";
            var __bfBusy = 0;
            for (var __bfI = 0; __bfI < 200000; __bfI++) { __bfBusy += __bfI % 7; }
            console.log("Broken Fixture Co blocking script executed", BROKEN_FIXTURE_BLOB.length, __bfBusy);
          `,
        }}
      />

      {/* performance.render_blocking_css: multiple <link rel="stylesheet"> with no media attr
          (or media="all"/"screen") -> isBlockingStylesheet() true for each -> blocking.length > 2
          triggers FAIL. Three blocking stylesheets below, none deferred/preloaded. */}
      <link rel="stylesheet" href="https://broken-fixture-co-cdn.example.com/css/vendor-grid.css" />
      <link rel="stylesheet" href="https://broken-fixture-co-cdn.example.com/css/vendor-animations.css" media="all" />
      <link rel="stylesheet" href="https://broken-fixture-co-cdn.example.com/css/theme-legacy.css" media="screen" />

      {/* performance.font_optimization: >4 font resources (TOO_MANY_FONTS=4), none preloaded,
          and a font stylesheet loaded render-blocking with no rel="preload" -> WARNING with both
          "N font resources loaded" and "font stylesheet(s) loaded render-blocking with no
          preload" problems. Six distinct font-related <link> tags, zero preload. */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700" />
      <link rel="stylesheet" href="https://use.typekit.net/broken-fixture-co-legacy.css" />

      {/* performance.third_party_impact: >6 distinct third-party origins (TOO_MANY_THIRD_PARTIES=6)
          -> WARNING/FAIL depending on count (>12 => FAIL). Eight distinct cross-origin hosts
          across analytics/ads/chat/font/CDN categories, none preconnected. */}
      <script src="https://www.google-analytics.com/analytics.js" async />
      <script src="https://www.googletagmanager.com/gtag/js" async />
      <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async />
      <script src="https://www.googlesyndication.com/pagead/js/adsbygoogle.js" async />
      <script src="https://widget.intercom.io/widget/broken-fixture" async />
      <script src="https://embed.tawk.to/broken-fixture-co/default" async />
      <script src="https://cdn.jsdelivr.net/npm/some-legacy-widget@1.0.0/dist/widget.js" async />
      <script src="https://static.hotjar.com/c/hotjar.js" async />

      {/* Heavy, unminified, redundant inline CSS blocks. Not independently scored by a
          dedicated rule (unused_css is NOT_APPLICABLE), but kept as page weight/DOM-bloat
          context supporting the render-blocking-css and general "unoptimized page" fixture. */}
      <style>{`
        .bf-wrap-0 { display: block; margin: 0; padding: 0; }
        .bf-wrap-1 { display: block; margin: 0; padding: 0; }
        .bf-wrap-2 { display: block; margin: 0; padding: 0; }
        .bf-wrap-3 { display: block; margin: 0; padding: 0; }
        .bf-wrap-4 { display: block; margin: 0; padding: 0; }
        .bf-wrap-5 { display: block; margin: 0; padding: 0; }
        .bf-wrap-6 { display: block; margin: 0; padding: 0; }
        .bf-wrap-7 { display: block; margin: 0; padding: 0; }
        .bf-wrap-8 { display: block; margin: 0; padding: 0; }
        .bf-wrap-9 { display: block; margin: 0; padding: 0; }
        .bf-unused-a { color: red; background: yellow; border: 3px dashed purple; }
        .bf-unused-b { color: blue; background: green; border: 3px dotted orange; }
        .bf-unused-c { color: pink; background: cyan; border: 3px solid brown; }
      `}</style>
      <style>{`
        .bf-legacy-theme-1 { font-family: "Times New Roman", serif; }
        .bf-legacy-theme-2 { font-family: "Times New Roman", serif; }
        .bf-legacy-theme-3 { font-family: "Times New Roman", serif; }
        .bf-legacy-theme-4 { font-family: "Times New Roman", serif; }
        .bf-legacy-theme-5 { font-family: "Times New Roman", serif; }
      `}</style>

      <main>
        <h1>TEST FIXTURE — intentionally broken, not a real business.</h1>
        <p>Broken Fixture Co — performance rule violations fixture page.</p>

        {/* performance.image_optimization + performance.image_bloat: plain <img> tags (no
            next/image), legacy formats (.jpg/.png/.gif — isLegacyImageFormat true,
            isModernImageFormat false), no srcset/sizes (hasSrcset false), no width/height (CLS
            proxy), no loading="lazy", and several missing alt entirely (imagesMissingAlt > 0
            for image_bloat's untagged-image ratio). Eight large unoptimized images below. */}
        <img src="https://broken-fixture-co-cdn.example.com/img/hero-full-res.jpg" />
        <img src="https://broken-fixture-co-cdn.example.com/img/team-photo-uncompressed.png" />
        <img src="https://broken-fixture-co-cdn.example.com/img/product-banner-1.jpg" alt="" />
        <img src="https://broken-fixture-co-cdn.example.com/img/product-banner-2.jpg" />
        <img src="https://broken-fixture-co-cdn.example.com/img/office-photo.gif" />
        <img src="https://broken-fixture-co-cdn.example.com/img/testimonial-bg.jpg" />
        <img src="https://broken-fixture-co-cdn.example.com/img/footer-logo-huge.png" />
        <img src="https://broken-fixture-co-cdn.example.com/img/background-texture.bmp" />

        {/* performance.link_bloat: >100 total internal+external links on the page ->
            WARNING. 110 generated anchor links below, deeply nested to also pad DOM depth. */}
        <nav aria-label="Broken Fixture Co bloated link list">
          <div className="bf-wrap-0"><div className="bf-wrap-1"><div className="bf-wrap-2">
            <div className="bf-wrap-3"><div className="bf-wrap-4"><div className="bf-wrap-5">
              <div className="bf-wrap-6"><div className="bf-wrap-7"><div className="bf-wrap-8">
                <div className="bf-wrap-9">
                  <ul>
                    {Array.from({ length: 110 }, (_, i) => (
                      <li key={i}>
                        <a href={`/performance/bloated-link-${i}`}>Broken Fixture Co link {i}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div></div></div>
            </div></div></div>
          </div></div></div>
        </nav>
      </main>
    </>
  );
}
