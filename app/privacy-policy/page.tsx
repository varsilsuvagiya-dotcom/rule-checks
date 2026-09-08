import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, SITE_URL } from "../components";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Broken Fixture Co collects, uses, retains, and protects personal data when you use Fixture Scanner or visit this website. Updated September 2026.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Privacy Policy</h1>
      <p>Last updated: January 2026</p>

      <h2>What we collect</h2>
      <p>
        When you use Fixture Scanner we collect the URLs you submit for
        scanning, your account email address, and standard server logs
        (IP address, timestamp, user agent). We do not sell this data to
        third parties.
      </p>

      <h2>How we use it</h2>
      <p>
        Scan data is used to generate your reports and, in aggregate and
        anonymized form, to improve rule accuracy. Account data is used for
        billing, support, and product notifications you can opt out of at
        any time.
      </p>

      <h2>Data retention</h2>
      <p>
        Scan reports are retained for 12 months after your last login,
        after which they are permanently deleted. You can request earlier
        deletion by contacting us.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request a copy of your data or its deletion at any time by
        emailing <a href="mailto:hello@brokenfixture.example">hello@brokenfixture.example</a>.
        We respond to access and deletion requests within 30 days, and we
        will confirm in writing once a deletion request has been completed
        so you have a record of it.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        The marketing site uses a minimal, first-party analytics setup to
        understand which pages are read and which links are followed — it
        does not use third-party advertising cookies or cross-site
        tracking. The application itself uses a session cookie strictly
        required to keep you signed in; it is not used for tracking beyond
        your own account.
      </p>

      <h2>Sub-processors</h2>
      <p>
        We use a small number of infrastructure providers to run Fixture
        Scanner — cloud hosting for the application, a transactional email
        provider for account notifications, and a payment processor for
        billing. Each is bound by a data processing agreement, and none of
        them are permitted to use your data for their own purposes.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we make a material change to how we handle your data, we will
        email active account holders before the change takes effect and
        update the &ldquo;last updated&rdquo; date at the top of this page.
      </p>

      <div className="callout">
        <p>
          Questions about this policy? <a href="/contact">Contact us</a>.
        </p>
      </div>
    </main>
  );
}
