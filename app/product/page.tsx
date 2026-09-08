import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, SITE_URL } from "../components";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Fixture Scanner audits your site against hundreds of technical, on-page, and structured-data rules, with plain-language fixes for anything it finds.",
  alternates: { canonical: `${SITE_URL}/product` },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Fixture Scanner",
  description:
    "A website-auditing tool that crawls a site and reports every technical, on-page, and structured-data issue it finds.",
  brand: { "@type": "Brand", name: "Broken Fixture Co" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "499",
    offerCount: "3",
    url: `${SITE_URL}/pricing`,
  },
};

export default function ProductPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Fixture Scanner</h1>
      <p>
        Fixture Scanner crawls your site page by page and checks it against
        a large, versioned rule set covering technical SEO, on-page signals,
        structured data, accessibility basics, and content depth. Each
        result names the exact rule that failed and shows the offending
        markup, so a developer can fix it without translating a score into
        a task.
      </p>

      <h2>How scanning works</h2>
      <ol>
        <li>Add your site&apos;s URL and we crawl it, following real links.</li>
        <li>Every page is checked against the full rule set.</li>
        <li>You get a report grouped by category, worst issues first.</li>
        <li>Optional scheduled re-scans alert you the moment something regresses.</li>
      </ol>

      <h2>What makes a good audit tool</h2>
      <p>
        A useful audit report does two things a raw score can&apos;t: it
        points at the exact element that failed, and it explains the fix in
        terms a developer can act on immediately. Fixture Scanner is built
        around that idea — every check links back to the rule&apos;s
        real definition, not a vague category label.
      </p>

      <h2>What&apos;s included</h2>
      <p>
        Every scan covers technical SEO (redirects, canonicals, robots
        directives, response headers), on-page signals (titles, headings,
        meta descriptions), structured data validity for every page type,
        accessibility basics, and content-depth checks. Higher plans add
        scan frequency and team seats, not additional rule coverage — see{" "}
        <a href="/pricing">pricing</a> for the full comparison.
      </p>

      <h2>Built for engineering teams</h2>
      <p>
        Fixture Scanner is designed to slot into a normal release process:
        connect a site once, then let scheduled re-scans catch a regression
        the same day it ships rather than weeks later when organic traffic
        drops. Reports are shareable links, so a finding can go straight
        into a ticket without a screenshot.
      </p>

      <div className="callout">
        <p>
          See <a href="/pricing">pricing</a> for plan details, or browse the{" "}
          <a href="/rules">full rule reference</a> this scanner is built on.
        </p>
      </div>
    </main>
  );
}
