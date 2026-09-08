import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, SITE_URL } from "../components";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn who builds Fixture Scanner: a small, Portland-based software team founded in 2021 after a real broken-canonical incident cost a client search traffic.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Broken Fixture Co",
  url: `${SITE_URL}/about`,
};

export default function AboutPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>About Broken Fixture Co</h1>
      <p>
        Broken Fixture Co is a small software company founded in 2021 to
        build Fixture Scanner, a site-auditing tool. We started after
        watching a client&apos;s redesign quietly ship with a broken
        canonical tag that cost them three weeks of search traffic before
        anyone noticed — most of what the product checks today traces back
        to a real audit gap like that one.
      </p>

      <h2>Our team</h2>
      <p>
        We&apos;re a small, distributed engineering team based primarily in
        Portland, Maine, with contributors working remotely across North
        America. Every team member runs Fixture Scanner against their own
        side projects, which is where most of our rule ideas come from.
      </p>

      <h2>How we work</h2>
      <p>
        We ship a new rule to the scanner roughly every two weeks, always
        backed by a real, documented failure mode we&apos;ve seen in
        production — never a guess at what &ldquo;good SEO&rdquo; should look
        like in the abstract. Before a rule ships, at least two of us have
        seen the exact failure mode on a real site, and we write down the
        precise detection logic so the rule stays honest about what it can
        and cannot measure from a crawl alone.
      </p>

      <h2>What we believe about audit tools</h2>
      <p>
        Most auditing tools hand back a single score and leave you to guess
        what it means. We think that&rsquo;s backwards: a report should name
        the exact element that failed, quote the offending markup, and
        explain the fix well enough that a developer can act on it without
        translating a number into a task. Every rule in Fixture Scanner is
        built to that standard, including the ones that honestly report
        &ldquo;not applicable&rdquo; rather than fabricate a verdict when the
        data needed to check something reliably.
      </p>

      <h2>Where we&apos;re headed</h2>
      <p>
        We&rsquo;re currently expanding the rule set to cover how well a page
        holds up for an AI system trying to extract or summarize an answer
        from it, alongside the traditional technical and on-page checks. If
        there&rsquo;s a category of issue you keep hitting that we
        don&rsquo;t check yet, that&rsquo;s exactly the kind of feedback that
        turns into our next rule — tell us about it on the{" "}
        <a href="/contact">contact page</a>.
      </p>

      <div className="callout">
        <p>
          Questions about the company or the product? <a href="/contact">Get in touch</a>.
        </p>
      </div>
    </main>
  );
}
