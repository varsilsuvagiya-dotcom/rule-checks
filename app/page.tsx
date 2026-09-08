import type { Metadata } from "next";
import { SITE_NAME } from "./components";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Website Auditing Software`,
  description:
    "Fixture Scanner crawls a website and reports every technical, on-page, and structured-data issue it finds, with plain-language fixes for each one.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Website Auditing Software`,
    description:
      "Fixture Scanner crawls a website and reports every technical, on-page, and structured-data issue it finds, with plain-language fixes for each one.",
    url: "/",
  },
};

const faqs = [
  {
    question: "What does Fixture Scanner actually check?",
    answer:
      "Fixture Scanner audits technical SEO (headers, redirects, canonicals, robots directives), on-page signals (titles, headings, meta descriptions), structured data validity, accessibility basics, and content depth — roughly 250 individual checks grouped into a dozen categories, each with its own pass/fail explanation.",
  },
  {
    question: "How is Fixture Scanner different from a generic SEO checker?",
    answer:
      "Most checkers hand back a single numeric score. Fixture Scanner instead names the exact rule that failed, quotes the offending markup, and explains the fix in plain language — so an engineer can act on the report without translating a grade into a task.",
  },
  {
    question: "Can I try Fixture Scanner before paying?",
    answer:
      "Yes. Every plan on the Pricing page includes a 14-day trial with the full rule set enabled, including structured-data validation and scheduled re-scans. No credit card is required to start a trial.",
  },
  {
    question: "Does Fixture Scanner support scheduled re-scans?",
    answer:
      "Fixture Scanner can re-crawl a site on a schedule and alert your team by email or Slack the moment a previously-passing rule regresses — useful for catching a broken deploy before a customer does. See the Product page for the full monitoring feature set.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="container container--wide">
        <h1>Find every SEO issue before your customers do</h1>
        <p>
          This page explains what {SITE_NAME} builds: <strong>Fixture Scanner</strong> is a
          website-auditing tool that crawls a site and reports every
          technical, on-page, and structured-data issue it finds, with a
          plain-language fix for each one. We started building it in 2021
          after watching a client&rsquo;s redesign quietly ship with a broken
          canonical tag that cost them three weeks of search traffic before
          anyone noticed — every feature we&rsquo;ve added since traces back
          to a real audit gap like that one.
        </p>

        <h2>What Fixture Scanner checks</h2>
        <p>
          Fixture Scanner groups its checks into a dozen categories so a
          report reads like a checklist, not a wall of jargon:
        </p>
        <ul>
          <li>
            <strong>Technical SEO</strong> — redirects, canonicals, robots
            directives, sitemap validity, and response headers.
          </li>
          <li>
            <strong>On-page signals</strong> — titles, meta descriptions,
            heading hierarchy, and Open Graph/Twitter Card metadata.
          </li>
          <li>
            <strong>Structured data</strong> — JSON-LD presence, required
            properties, and schema type validity for every page type.
          </li>
          <li>
            <strong>Content depth &amp; accessibility</strong> — word count,
            readability, alt text, and keyboard navigation basics.
          </li>
        </ul>

        <h2>Who uses Fixture Scanner</h2>
        <p>
          Marketing and engineering teams run Fixture Scanner before a launch
          and again on a recurring schedule afterward, so a regression is
          caught by an alert instead of a support ticket. Most teams connect
          their first site and get a full report in under five minutes. Read
          the <a href="/product">product overview</a> for the complete
          feature list, or compare plans on the{" "}
          <a href="/pricing">pricing page</a>.
        </p>

        <h2>Frequently asked questions</h2>
        <div>
          {faqs.map((f) => (
            <div key={f.question} style={{ marginBottom: 20 }}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}
        </div>

        <div className="callout">
          <p>
            <strong>Tip:</strong> new to Fixture Scanner? Start with the{" "}
            <a href="/hub">resource hub</a> for setup guides, or read{" "}
            <a href="/blog">our blog</a> for the auditing practices we use
            internally.
          </p>
        </div>
      </section>
    </main>
  );
}
