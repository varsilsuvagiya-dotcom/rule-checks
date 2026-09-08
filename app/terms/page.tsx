import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, pageMetadata, SITE_URL } from "../components";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Read the terms governing your use of Fixture Scanner and this website, covering accounts, billing, trials, acceptable use, and liability limits.",
  path: "/terms",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Terms & Conditions", href: "/terms" },
];

export default function TermsPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Terms &amp; Conditions</h1>
      <p>Last updated: January 2026</p>

      <h2>Using our service</h2>
      <p>
        By creating an account you agree to use Fixture Scanner only to
        audit sites you own or have permission to scan. Automated abuse of
        the scanning infrastructure, including excessive concurrent scans
        outside your plan limits, may result in account suspension.
      </p>

      <h2>Billing</h2>
      <p>
        Paid plans are billed monthly or annually in advance. You can
        cancel at any time; access continues until the end of the current
        billing period, and we do not offer partial refunds for unused time.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Fixture Scanner is provided &ldquo;as is.&rdquo; We work to keep
        rule results accurate but do not guarantee that a passing report
        means a site fully complies with any particular standard or law.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Material changes will
        be announced by email to active account holders at least 14 days
        before taking effect.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You may not use Fixture Scanner to scan a site you don&rsquo;t own
        or have explicit permission to audit, attempt to circumvent plan
        page limits through automation, or resell scan results as your own
        product without a partnership agreement. We reserve the right to
        suspend an account that violates these terms while we investigate.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Fixture Scanner, its rule definitions, and the Fixture Scanner name
        are the property of Broken Fixture Co. Scan reports generated from
        your own sites belong to you, and you&rsquo;re free to share or
        publish them however you like.
      </p>

      <h2>Termination</h2>
      <p>
        You may close your account at any time from your account settings.
        We may suspend or terminate an account for a material breach of
        these terms, non-payment after a reasonable grace period, or
        activity that puts the scanning infrastructure or other customers
        at risk.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Maine, United
        States, without regard to its conflict-of-laws principles. Any
        dispute arising from these terms will be resolved in the state or
        federal courts located in Cumberland County, Maine.
      </p>

      <div className="callout">
        <p>
          Questions about these terms? <a href="/contact">Contact us</a>.
        </p>
      </div>
    </main>
  );
}
