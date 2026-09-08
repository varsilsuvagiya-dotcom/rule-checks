import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, pageMetadata, SITE_URL } from "../components";

export const metadata: Metadata = pageMetadata({
  title: "Pricing & Plans",
  description:
    "Compare Fixture Scanner's Starter, Team, and Enterprise plans and start a 14-day free trial today — every tier includes the full website audit rule set.",
  path: "/pricing",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pricing",
  url: `${SITE_URL}/pricing`,
};

export default function PricingPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Get started with a plan that fits your site</h1>
      <p>
        Fixture Scanner is priced by how many pages you scan each month, not
        by feature gating — every plan, including Starter, includes the full
        rule check set covering technical SEO, on-page signals, structured
        data, content depth, accessibility basics, and GEO/AI-readiness
        checks. Higher tiers add scan frequency, team seats, and API access
        rather than withholding checks a smaller team would need most.
      </p>

      <h2>Compare plans</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Plan</th>
            <th scope="col">Price</th>
            <th scope="col">Pages per scan</th>
            <th scope="col">Re-scans</th>
            <th scope="col">Team seats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Starter</th>
            <td>$29/month</td>
            <td>Up to 500</td>
            <td>Manual</td>
            <td>1</td>
          </tr>
          <tr>
            <th scope="row">Team</th>
            <td>$99/month</td>
            <td>Up to 5,000</td>
            <td>Weekly</td>
            <td>10</td>
          </tr>
          <tr>
            <th scope="row">Enterprise</th>
            <td>$199+/month</td>
            <td>Unlimited</td>
            <td>Daily</td>
            <td>Unlimited</td>
          </tr>
        </tbody>
      </table>

      <h2>What&apos;s in each plan</h2>
      <p>
        <strong>Starter</strong> covers up to 500 pages per manual scan and
        suits a single site and a small team just getting started with
        automated audits — most marketing sites and early-stage products fit
        comfortably within this tier.
      </p>
      <p>
        <strong>Team</strong> raises the page limit to 5,000, adds scheduled
        weekly re-scans so regressions surface automatically, and shares
        reports across up to 10 team members. Most growing product teams
        start here once a single manual scan a month is no longer enough.
      </p>
      <p>
        <strong>Enterprise</strong> removes the page limit entirely, runs
        daily re-scans, exposes API access for CI/CD integration so a scan
        can gate a deploy, and includes a dedicated account contact for
        teams auditing many properties at once.
      </p>

      <h2>Frequently asked questions</h2>
      <h3>Can I switch plans later?</h3>
      <p>Yes — upgrades and downgrades take effect on your next billing cycle, and you can change plans as often as you need from your account settings.</p>
      <h3>Is there a free trial?</h3>
      <p>Yes, every plan includes a 14-day trial with no credit card required, covering the full rule set at that plan&apos;s page-limit tier.</p>
      <h3>What happens if I go over my page limit?</h3>
      <p>We&apos;ll notify you before the scan completes and let you upgrade mid-cycle with a prorated charge for the difference — a scan is never silently cut short.</p>
      <h3>Do all plans get the same rule coverage?</h3>
      <p>Yes — every plan runs the full rule set covering technical SEO, on-page signals, structured data, accessibility, content depth, and AI-readiness checks. We never gate a specific rule behind a higher tier; the differences between plans are scan frequency, page volume, team seats, and API access.</p>
      <h3>Can I get an invoice for my finance team?</h3>
      <p>Yes — every plan generates a proper invoice automatically after each billing cycle, available from your account settings, and Enterprise customers can request net-30 terms and a custom purchase order process.</p>

      <div className="callout">
        <p>
          Ready to try it? Start your 14-day trial today, or{" "}
          <a href="/contact">contact us</a> if you have a question we
          haven&apos;t answered above.
        </p>
      </div>
    </main>
  );
}
