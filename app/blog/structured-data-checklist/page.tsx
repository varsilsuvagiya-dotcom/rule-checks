import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, SITE_URL } from "../../components";

export const metadata: Metadata = {
  title: "A Structured Data Checklist That Actually Passes Validation",
  description:
    "Why most JSON-LD implementations fail silently, and a five-step checklist for shipping structured data that matches your page type and validates cleanly.",
  alternates: { canonical: "/blog/structured-data-checklist" },
  openGraph: {
    type: "article",
    title: "A Structured Data Checklist That Actually Passes Validation",
    description:
      "Why most JSON-LD implementations fail silently, and a five-step checklist for shipping structured data that matches your page type and validates cleanly.",
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Structured data checklist", href: "/blog/structured-data-checklist" },
];

const PUBLISHED = "2026-02-02";
const MODIFIED = "2026-02-02";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "A Structured Data Checklist That Actually Passes Validation",
  description:
    "Why most JSON-LD implementations fail silently, and a five-step checklist for shipping structured data that matches your page type and validates cleanly.",
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: {
    "@type": "Person",
    name: "Priya Chandran",
    url: `${SITE_URL}/blog/structured-data-checklist#author`,
    jobTitle: "Senior Frontend Engineer",
  },
  publisher: {
    "@type": "Organization",
    name: "Broken Fixture Co",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
  },
  mainEntityOfPage: `${SITE_URL}/blog/structured-data-checklist`,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why doesn't my JSON-LD show up as a rich result?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Valid JSON-LD is necessary but not sufficient — the search engine also decides whether your page qualifies for a rich result based on content quality and eligibility rules that vary by type. Passing validation only confirms the markup is well-formed, not that it will be displayed.",
      },
    },
    {
      "@type": "Question",
      name: "Can a page have more than one schema type?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and it usually should. A blog post page commonly carries both a BlogPosting node and a BreadcrumbList node; a product page often pairs a Product node with an Organization node for the seller. What it should not have is two competing nodes of the same type describing the same entity differently.",
      },
    },
  ],
};

export default function StructuredDataChecklist() {
  return (
    <main className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={breadcrumbs} />

      <article>
        <header>
          <h1>A Structured Data Checklist That Actually Passes Validation</h1>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            By <a href="#author">Priya Chandran</a> · Published{" "}
            <time dateTime={PUBLISHED}>February 2, 2026</time> · Updated{" "}
            <time dateTime={MODIFIED}>February 2, 2026</time>
          </p>
        </header>

        <p>
          Most structured-data problems we find in audits aren&rsquo;t
          syntax errors — they&rsquo;re a schema type that doesn&rsquo;t
          match what the page actually is, or required properties left
          empty. Fixing both takes five concrete steps, not a rewrite.
        </p>

        <h2>What is JSON-LD, exactly?</h2>
        <p>
          JSON-LD is a way of embedding machine-readable facts about a page
          — its type, author, price, publish date — directly in the HTML as
          a script tag, using the shared vocabulary defined at{" "}
          <a href="https://schema.org/" target="_blank" rel="noopener noreferrer">
            schema.org
          </a>. Search engines and AI crawlers read it to understand what a
          page is without having to guess from the visible text.
        </p>

        <h2>Step 1: pick the type that matches the page, not the ideal</h2>
        <p>
          A pricing page is a WebPage, not a Product — the product is what
          you sell, the pricing page is a page about it. Choosing the
          closest matching real type avoids a validator warning for
          properties that don&rsquo;t apply to your content.
        </p>

        <h2>Step 2: fill every required property for that type</h2>
        <p>
          Each schema.org type defines a small set of properties search
          engines expect to see: <code>headline</code> and{" "}
          <code>datePublished</code> for an Article, <code>name</code> and{" "}
          <code>offers</code> for a Product. A type with none of its
          required properties is barely better than no schema at all.
        </p>

        <h2>Step 3: use a real Person or Organization for authorship</h2>
        <p>
          An <code>author</code> field written as a plain string
          (<code>&quot;author&quot;: &quot;Priya&quot;</code>) is a common
          shortcut that discards an authorship signal search engines and AI
          systems increasingly weight. Structuring it as{" "}
          <code>{`{"@type": "Person", "name": "..."}`}</code> instead links
          the content to a real, identifiable author.
        </p>

        <h2>Step 4: don&apos;t duplicate the same type twice</h2>
        <p>
          Two Organization nodes on one page with different names or logos
          reads as inconsistent data, not extra information. If a page
          needs both a publisher reference and a broader company profile,
          reuse the same node with an <code>@id</code> rather than
          declaring it twice.
        </p>

        <h2>Step 5: validate before you ship</h2>
        <p>Run every new schema block through a real validator, not just a linter:</p>
        <ul>
          <li>
            <a href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer">
              Schema.org validator
            </a>{" "}
            for pure schema-shape correctness.
          </li>
          <li>
            <a href="https://developers.google.com/search/docs/appearance/structured-data/sd-policies" target="_blank" rel="noopener noreferrer">
              Google&rsquo;s structured data policies
            </a>{" "}
            for eligibility rules on top of valid markup.
          </li>
        </ul>

        <div className="callout">
          <p>
            <strong>Tip:</strong> Fixture Scanner checks JSON-LD syntax,
            required properties, type relevance to the page, and duplicate
            nodes automatically — see the{" "}
            <a href="/product">product overview</a>.
          </p>
        </div>

        <h2>Key takeaways</h2>
        <ul>
          <li>Match the schema type to what the page really is.</li>
          <li>Fill every property that type requires, not just the easy ones.</li>
          <li>Structure authorship as a real Person entity, not a string.</li>
          <li>Reuse shared entities with @id instead of duplicating a type.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        <h3>Why doesn&apos;t my JSON-LD show up as a rich result?</h3>
        <p>
          Valid JSON-LD is necessary but not sufficient — the search engine
          also decides whether your page qualifies for a rich result based
          on content quality and eligibility rules that vary by type.
          Passing validation only confirms the markup is well-formed, not
          that it will be displayed.
        </p>
        <h3>Can a page have more than one schema type?</h3>
        <p>
          Yes, and it usually should. A blog post commonly carries both a
          BlogPosting node and a BreadcrumbList node; a product page often
          pairs a Product node with an Organization node for the seller.
          What it should not have is two competing nodes of the same type
          describing the same entity differently.
        </p>

        <footer id="author" style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <h2>About the author</h2>
          <p>
            <strong>Priya Chandran</strong> is a Senior Frontend Engineer at
            Broken Fixture Co with 8+ years of experience in web
            development, where she works on the crawler that powers Fixture
            Scanner&rsquo;s structured-data checks. She has reviewed
            structured data on several hundred production sites, is a
            published author on structured-data topics, and writes about
            performance and rendering on this blog roughly once a month.
          </p>
        </footer>

        <p>
          Related reading: see our{" "}
          <a href="/blog/responsive-images-guide">responsive images guide</a>{" "}
          for another common source of avoidable audit failures.
        </p>
      </article>
    </main>
  );
}
