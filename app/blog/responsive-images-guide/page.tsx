import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, pageMetadata, SITE_URL } from "../../components";

export const metadata: Metadata = pageMetadata({
  title: "Responsive Images Without Breaking LCP",
  description:
    "Learn how srcset, sizes, and modern image formats keep pages fast, plus the three mistakes that quietly hurt Largest Contentful Paint the most.",
  path: "/blog/responsive-images-guide",
  type: "article",
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Responsive images guide", href: "/blog/responsive-images-guide" },
];

const PUBLISHED = "2026-01-08";
const MODIFIED = "2026-02-14";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Make Images Responsive Without Breaking Core Web Vitals",
  description:
    "A practical guide to srcset, sizes, and modern image formats, and the three mistakes that quietly hurt LCP the most.",
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: {
    "@type": "Person",
    name: "Priya Chandran",
    url: `${SITE_URL}/blog/responsive-images-guide#author`,
    jobTitle: "Senior Frontend Engineer",
  },
  publisher: {
    "@type": "Organization",
    name: "Broken Fixture Co",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
  },
  mainEntityOfPage: `${SITE_URL}/blog/responsive-images-guide`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need srcset if I already use next/image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Next.js's Image component generates the srcset and sizes attributes for you automatically based on the sizes prop you pass, so you rarely need to hand-write srcset in a Next.js app. The guidance in this article matters most when you're working with plain <img> tags outside a framework that handles it for you.",
      },
    },
    {
      "@type": "Question",
      name: "Which image format should I default to in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AVIF gives the smallest file size for photographic content and is now supported in every major browser, so it's a reasonable default with a WebP fallback for older clients. For simple graphics with flat colors, SVG usually beats both.",
      },
    },
  ],
};

export default function ResponsiveImagesGuide() {
  return (
    <main className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={breadcrumbs} />

      <article>
        <header>
          <h1>How to Make Images Responsive Without Breaking Core Web Vitals</h1>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            By <a href="#author">Priya Chandran</a> · Published{" "}
            <time dateTime={PUBLISHED}>January 8, 2026</time> · Updated{" "}
            <time dateTime={MODIFIED}>February 14, 2026</time>
          </p>
        </header>

        <p>
          Responsive images fix the wrong problem when you only add
          <code> srcset</code> and stop there. The real goal is serving the
          right image, at the right size, in the right format, for the
          device requesting it — and getting that wrong is one of the most
          common causes of a poor Largest Contentful Paint score. This guide
          walks through the three mistakes we see most often in real
          audits, then a working pattern you can copy directly.
        </p>

        <h2>What srcset and sizes actually do</h2>
        <p>
          The <code>srcset</code> attribute lists multiple versions of the
          same image at different widths, and <code>sizes</code> tells the
          browser how much horizontal space the image will occupy at
          different viewport widths. Together they let the browser pick the
          smallest file that still looks sharp on the visitor&rsquo;s actual
          screen, before layout even happens. Get sizes wrong — or omit it —
          and the browser falls back to downloading the largest image in
          the set, defeating the entire point.
        </p>

        <h2>Mistake one: fixed pixel dimensions without a sizes attribute</h2>
        <p>
          A common pattern is writing srcset with three widths and then
          setting a fixed <code>width</code> and <code>height</code> in CSS
          without a matching <code>sizes</code> value. Without sizes, the
          browser assumes the image is 100% of the viewport width and
          downloads accordingly, which on a narrow card layout means
          shipping two or three times more image data than the page
          actually needs.
        </p>

        <h2>Mistake two: skipping width and height attributes</h2>
        <p>
          Omitting explicit <code>width</code> and <code>height</code>{" "}
          attributes (or an aspect-ratio in CSS) means the browser cannot
          reserve space for the image before it loads, so the page jumps
          when it finally arrives. That layout jump is exactly what
          Cumulative Layout Shift measures, and it is one of the easiest
          regressions to avoid entirely — the fix costs two attributes.
        </p>

        <h2>Mistake three: shipping the hero image as a legacy format</h2>
        <p>
          A large above-the-fold JPEG or PNG is routinely two to four times
          larger than the same visual quality delivered as WebP or AVIF.
          Since the hero image is very often the{" "}
          <a href="https://web.dev/articles/lcp" target="_blank" rel="noopener noreferrer">
            Largest Contentful Paint
          </a>{" "}
          element itself, this single choice can single-handedly move a
          page from a good LCP score to a poor one. See{" "}
          <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">
            web.dev&rsquo;s Core Web Vitals guide
          </a>{" "}
          for how LCP is measured in the field.
        </p>

        <h2>A pattern that avoids all three</h2>
        <p>Here is the checklist we hold every image against during an audit:</p>
        <ul>
          <li>Serve modern formats (AVIF or WebP) with a JPEG/PNG fallback.</li>
          <li>Set explicit width and height (or CSS aspect-ratio) on every image.</li>
          <li>Write a sizes attribute that matches the image&apos;s real rendered width at each breakpoint.</li>
          <li>Mark the LCP candidate image as high priority and skip lazy-loading it.</li>
        </ul>

        <div className="callout">
          <p>
            <strong>Tip:</strong> if you&rsquo;re on Next.js, the built-in{" "}
            <code>next/image</code> component handles srcset generation,
            lazy loading, and layout reservation for you — see the official{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset"
              target="_blank"
              rel="noopener noreferrer"
            >
              MDN documentation on srcset
            </a>{" "}
            for the underlying browser behavior it wraps.
          </p>
        </div>

        <h2>Key takeaways</h2>
        <ul>
          <li>A missing sizes attribute silently defeats a correct srcset.</li>
          <li>Reserve layout space with width/height to avoid a CLS penalty.</li>
          <li>Modern formats cut hero-image weight dramatically, which helps LCP directly.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        <h3>Do I need srcset if I already use next/image?</h3>
        <p>
          No. Next.js&rsquo;s Image component generates the srcset and
          sizes attributes for you automatically based on the sizes prop
          you pass, so you rarely need to hand-write srcset in a Next.js
          app. The guidance in this article matters most when you&rsquo;re
          working with plain <code>&lt;img&gt;</code> tags outside a
          framework that handles it for you.
        </p>
        <h3>Which image format should I default to in 2026?</h3>
        <p>
          AVIF gives the smallest file size for photographic content and is
          now supported in every major browser, so it&rsquo;s a reasonable
          default with a WebP fallback for older clients. For simple
          graphics with flat colors, SVG usually beats both.
        </p>

        <footer id="author" style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <h2>About the author</h2>
          <p>
            <strong>Priya Chandran</strong> is a Senior Frontend Engineer at
            Broken Fixture Co with 8+ years of experience building
            e-commerce storefronts, where she now works on the crawler that
            powers Fixture Scanner&apos;s performance-related checks. She has
            personally chased down more layout-shift regressions than
            she&apos;d like to admit, and is a published author on web performance
            topics. She writes about performance and rendering on this blog
            roughly once a month.
          </p>
        </footer>

        <p>
          Related reading: see our{" "}
          <a href="/blog/structured-data-checklist">
            structured data checklist
          </a>{" "}
          for another common source of avoidable audit failures, or the{" "}
          <a href="/product">Fixture Scanner product page</a> for how these
          checks run automatically against your own site.
        </p>
      </article>
    </main>
  );
}
