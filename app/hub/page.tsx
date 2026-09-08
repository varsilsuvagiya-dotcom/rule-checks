import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, SITE_URL } from "../components";

export const metadata: Metadata = {
  title: "Resource Hub",
  description:
    "Explore curated guides and reference material on technical SEO, accessibility, and structured data — the standards behind every Fixture Scanner rule.",
  alternates: { canonical: `${SITE_URL}/hub` },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Resource Hub", href: "/hub" },
];

const resources = [
  {
    title: "Technical SEO fundamentals",
    description: "Robots directives, sitemaps, canonicals, redirects, and response headers.",
    href: "https://developers.google.com/search/docs/crawling-indexing",
  },
  {
    title: "Web Content Accessibility Guidelines",
    description: "The WCAG 2.2 standard for keyboard navigation, alt text, and ARIA usage.",
    href: "https://www.w3.org/WAI/standards-guidelines/wcag/",
  },
  {
    title: "Schema.org structured data",
    description: "The vocabulary behind JSON-LD markup for Organization, Product, and Article types.",
    href: "https://schema.org/",
  },
  {
    title: "Core Web Vitals",
    description: "Google's real-user performance metrics: LCP, INP, and CLS.",
    href: "https://web.dev/articles/vitals",
  },
  {
    title: "Our blog",
    description: "Guides on building accessible, well-structured sites, written by our team.",
    href: "/blog",
  },
  {
    title: "Product overview",
    description: "How Fixture Scanner checks a site against these standards automatically.",
    href: "/product",
  },
];

export default function HubPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Resource Hub</h1>
      <p>
        A curated set of references we point our own team to when building
        or reviewing a site. Some are external standards, some are our own
        guides — all of them inform the rules Fixture Scanner checks for.
      </p>

      <h2>Guides and standards</h2>
      <ul>
        {resources.map((r) => (
          <li key={r.href} style={{ marginBottom: 12 }}>
            <a
              href={r.href}
              {...(r.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {r.title}
            </a>
            <p style={{ margin: "4px 0 0" }}>{r.description}</p>
          </li>
        ))}
      </ul>

      <h2>How we use these references</h2>
      <p>
        Every rule in Fixture Scanner traces back to one of the standards
        above, or to a specific real-world failure we&rsquo;ve seen a rule
        catch. When we design a new check, we start from the relevant spec
        — WCAG for accessibility, Schema.org for structured data, the Core
        Web Vitals documentation for performance — rather than inventing a
        threshold from intuition. That&rsquo;s also why a rule in our{" "}
        <a href="/rules">compliance report</a> always cites the exact
        condition it checks instead of a vague pass/fail label.
      </p>

      <h2>New to auditing your own site?</h2>
      <p>
        If you&rsquo;re just getting started, we&rsquo;d recommend reading
        the Technical SEO fundamentals and Core Web Vitals guides above
        first — together they cover the two areas that most commonly break
        silently after a redesign or a framework migration. From there, the{" "}
        <a href="/blog">blog</a> walks through specific patterns (responsive
        images, structured data) in more depth than a reference page can.
      </p>
    </main>
  );
}
