// QA fixture page for the `accessibility` category. Per user request, the following rules
// are now FIXED (no longer exercised as failures here): keyboard_navigation, lang_attribute
// (fixed site-wide in app/layout.tsx), responsive_images, image_alt, empty_alt,
// form_label_association, duplicate_alt, link_accessible_name, button_accessible_name,
// duplicate_id, aria_attribute_validity, aria_role_validity.
//
// Still intentionally broken (not requested to be fixed): image_filename_quality.
// Left as-is (rule always returns NOT_APPLICABLE by design): color_contrast.
export default function AccessibilityFixturePage() {
  return (
    <main>
      <h1>TEST FIXTURE — intentionally broken, not a real business.</h1>
      <p>Broken Fixture Co — accessibility rule violations fixture page.</p>

      {/* accessibility.aria_attribute_validity: FIXED -- valid aria-label attribute name. */}
      <div aria-label="Descriptive label using a real ARIA attribute name.">
        Valid aria-* attribute name on this div.
      </div>

      {/* accessibility.aria_role_validity: FIXED -- valid WAI-ARIA concrete role. */}
      <div role="region" aria-label="Example region">
        Valid role value on this div.
      </div>

      {/* accessibility.button_accessible_name: FIXED -- icon button now has aria-label. */}
      <button type="button" aria-label="Close dialog">
        <svg width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="8" r="6" />
        </svg>
      </button>

      {/* accessibility.color_contrast: rule always returns NOT_APPLICABLE by design --
          it needs resolved/rendered CSS colors (browser/axe-core), which a static HTML crawl
          can never provide. Nothing to fix or break here. */}

      {/* accessibility.duplicate_alt: FIXED -- each image has distinct, descriptive alt text. */}
      <img src="/team-photo-1.jpg" alt="Engineering team standing outside the office entrance" />
      <img src="/team-photo-2.jpg" alt="Support team gathered around a conference table" />

      {/* accessibility.duplicate_id: FIXED -- unique ids, no dangerouslySetInnerHTML injection. */}
      <div id="team-section-1">First element with a unique id.</div>
      <div id="team-section-2">Second element with a different unique id.</div>

      {/* accessibility.empty_alt: FIXED -- non-decorative content image has descriptive alt text. */}
      <img src="/product-showcase.jpg" alt="Product showcase display in the demo showroom" />

      {/* accessibility.form_label_association: FIXED -- input has an associated label. */}
      <form>
        <label htmlFor="newsletter-email">Email address</label>
        <input type="text" id="newsletter-email" name="newsletter-email" placeholder="Enter your email" />
      </form>

      {/* accessibility.image_alt: FIXED -- alt attribute present. */}
      <img src="/hero-banner.jpg" alt="Hero banner for the fixture homepage" />

      {/* accessibility.image_filename_quality: left intentionally broken (not requested). */}
      <img src="/IMG_4821.jpg" alt="Generic camera filename example" />
      <img src="/DSC00193.png" alt="Another generic camera filename example" />
      <img src="/Screenshot_2024.png" alt="Generic screenshot filename example" />

      {/* accessibility.keyboard_navigation: FIXED site-wide in app/layout.tsx -- a real
          skip-to-content link is the first focusable element in <body> on every page. */}

      {/* accessibility.lang_attribute: FIXED in app/layout.tsx (<html lang="en">), site-wide. */}

      {/* accessibility.link_accessible_name: FIXED -- link has an accessible name via aria-label. */}
      <a href="/icon-link-no-name" aria-label="Learn more about this example">
        <svg width="16" height="16" aria-hidden="true">
          <path d="M2 2 L14 14" />
        </svg>
      </a>

      {/* keyboard_navigation (interactive-element note): FIXED -- clickable element is a real
          <button>, natively focusable and keyboard-activatable, not a div with onClick. */}
      <button type="button">Click me (keyboard accessible)</button>

      {/* accessibility.responsive_images: FIXED -- content image now has srcset/sizes. */}
      <img
        src="/large-hero-image.jpg"
        srcSet="/large-hero-image-800.jpg 800w, /large-hero-image-1600.jpg 1600w, /large-hero-image-2400.jpg 2400w"
        sizes="(max-width: 800px) 100vw, (max-width: 1600px) 50vw, 33vw"
        alt="Large hero image with a responsive srcset"
        width={2400}
        height={1200}
      />
    </main>
  );
}
