"use client";
// QA fixture page — intentionally violates every PAGE-scope rule in the `accessibility`
// category so the scanner's accessibility rules can be verified against a known-broken page.
// See per-rule comments below for exactly which real check each element trips.
// Marked "use client": it uses an inline event handler (onClick) below, which a Server
// Component cannot pass as a prop to a plain DOM element during static prerendering.
export default function AccessibilityFixturePage() {
  return (
    <main>
      <h1>TEST FIXTURE — intentionally broken, not a real business.</h1>
      <p>Broken Fixture Co — accessibility rule violations fixture page.</p>

      {/* accessibility.aria_attribute_validity: "aria-labl" is not a recognized WAI-ARIA
          attribute name (typo of aria-label) -> invalidAriaAttributes.length > 0. */}
      <div aria-labl="not a real aria attribute">Bogus aria-* attribute name on this div.</div>

      {/* accessibility.aria_role_validity: "role=banner-thing" is not a valid WAI-ARIA
          concrete role -> invalidAriaRoles.length > 0. */}
      <div role="banner-thing">Bogus role value on this div.</div>

      {/* accessibility.button_accessible_name: icon-only <button> with no text, no
          aria-label/aria-labelledby, no title, no img[alt] -> buttonsMissingAccessibleName > 0. */}
      <button type="button">
        <svg width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" />
        </svg>
      </button>

      {/* accessibility.color_contrast: this rule always returns NOT_APPLICABLE by design —
          it needs resolved/rendered CSS colors (browser/axe-core), which a static HTML crawl
          can never provide, so per the rule's own source it deliberately refuses to guess from
          inline styles. Nothing to break here; documented as NOT_APPLICABLE. */}

      {/* accessibility.duplicate_alt: two distinct images sharing identical, non-empty alt text
          -> duplicate alt value counted twice. */}
      <img src="/team-photo-1.jpg" alt="Our team at the office" />
      <img src="/team-photo-2.jpg" alt="Our team at the office" />

      {/* accessibility.duplicate_id: React normally warns/rewrites duplicate ids, so real
          duplicate id="..." attributes are injected via dangerouslySetInnerHTML to guarantee
          they land unmodified in the rendered/crawled HTML -> duplicateIds.length > 0. */}
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            <div id="dup-section">First element with a duplicated id.</div>
            <div id="dup-section">Second element reusing the same id.</div>
          `,
        }}
      />

      {/* accessibility.empty_alt: a non-decorative content image with alt="" (not missing,
          literally empty) -> emptyAlt.length > 0. */}
      <img src="/product-showcase.jpg" alt="" />

      {/* accessibility.form_label_association: text input with no <label for>, no wrapping
          <label>, no aria-label/aria-labelledby -> formControlsMissingLabel > 0. */}
      <form>
        <input type="text" name="newsletter-email" placeholder="Enter your email" />
      </form>

      {/* accessibility.image_alt: img with the alt attribute entirely absent (not empty)
          -> imagesMissingAlt > 0. */}
      <img src="/hero-banner.jpg" />

      {/* accessibility.image_filename_quality: generic camera/CMS-style filename matching
          GENERIC_PATTERN (img/dsc/photo/screenshot/untitled/scan + optional digits)
          -> generic.length > 0. Needs >50% of images on the page to be generic to WARN, so
          most images above intentionally also use generic-looking names. */}
      <img src="/IMG_4821.jpg" alt="Generic camera filename example" />
      <img src="/DSC00193.png" alt="Another generic camera filename example" />
      <img src="/Screenshot_2024.png" alt="Generic screenshot filename example" />

      {/* accessibility.keyboard_navigation: no "skip to content" link anywhere on the page
          -> hasSkipNavLink === false. (Intentionally no <a href="#main">Skip to content</a>.) */}

      {/* accessibility.lang_attribute: this signal is read from the document-level <html lang>
          attribute, which this app sets once in app/layout.tsx (shared by every route, including
          non-fixture pages). Removing/breaking it there would falsely break every other page's
          scan too, so it is left CANNOT_BREAK_STATICALLY from this page-scoped fixture file. */}

      {/* accessibility.link_accessible_name: anchor containing only a decorative icon, no text,
          no aria-label/aria-labelledby, no title, no alt on a contained image
          -> linksMissingAccessibleName > 0. */}
      <a href="/contact">
        <svg width="16" height="16" aria-hidden="true">
          <path d="M2 2 L14 14" />
        </svg>
      </a>

      {/* accessibility.keyboard_navigation (interactive-div note): also included for good
          measure though not separately scored beyond skip-nav — a clickable div with no
          tabIndex/keyboard handler, unreachable by keyboard. */}
      <div onClick={() => {}}>Click me (not keyboard accessible)</div>

      {/* accessibility.responsive_images: content image with no srcset/sizes attribute at all
          -> withoutSrcset.length > 0. */}
      <img src="/large-hero-image.jpg" alt="Large hero image with no responsive srcset" width={2400} height={1200} />
    </main>
  );
}
