import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, SITE_URL } from "../components";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Broken Fixture Co by email, phone, or mail — reach our team about Fixture Scanner support, billing, partnerships, or a security report.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Contact us</h1>
      <p>
        Reach out with a question about Fixture Scanner, a partnership idea,
        a billing issue, or anything else — we read every message and route
        it to the right person on our small team ourselves, rather than
        sending it through a support queue.
      </p>

      <h2>Email</h2>
      <p>
        <a href="mailto:hello@brokenfixture.example">hello@brokenfixture.example</a> — we
        typically reply within one business day. This is the fastest way to
        reach us for support questions, billing changes, or general
        inquiries about the product.
      </p>

      <h2>Phone</h2>
      <p>
        <a href="tel:+12075550142">+1 (207) 555-0142</a>, Monday–Friday, 9am–5pm Eastern. Phone
        support is best for urgent account issues or a scan that appears
        stuck — for anything non-urgent, email usually gets a faster answer
        since it does not depend on someone being at their desk.
      </p>

      <h2>Mailing address</h2>
      <p>
        <address style={{ fontStyle: "normal" }}>
          Broken Fixture Co
          <br />
          148 Harbor Row, Suite 4B
          <br />
          Portland, ME 04101
          <br />
          United States
        </address>
      </p>

      <h2>What to include in your message</h2>
      <p>
        If you are reporting a bug in a scan result, include the URL you
        scanned and the specific rule ID that looked wrong — that lets us
        reproduce the issue immediately instead of going back and forth on
        details. For billing questions, include the email address on your
        account so we can find it quickly.
      </p>

      <h2>Partnerships and press</h2>
      <p>
        We occasionally work with agencies who want to run Fixture Scanner
        across a portfolio of client sites, and with writers covering
        technical SEO tooling. Mention that context in your email and
        we&rsquo;ll loop in the right person on the team.
      </p>

      <h2>Response times</h2>
      <p>
        We&rsquo;re a small team, so we read and respond to every message
        ourselves rather than routing it through a ticketing system. Most
        emails get a reply within one business day; urgent account issues
        raised by phone are typically handled the same day. If you
        haven&rsquo;t heard back after two business days, feel free to
        follow up — it usually means the message landed in the wrong inbox
        rather than being ignored.
      </p>
    </main>
  );
}
