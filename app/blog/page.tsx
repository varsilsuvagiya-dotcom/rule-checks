import type { Metadata } from "next";
import { Breadcrumbs, breadcrumbJsonLd, SITE_URL } from "../components";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read guides on technical SEO, accessibility, and site structure from the Broken Fixture Co team, drawn from real audits behind Fixture Scanner's rules.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

const posts = [
  {
    slug: "structured-data-checklist",
    title: "A structured data checklist that actually passes validation",
    excerpt:
      "Why most JSON-LD implementations fail silently, and a five-step checklist for shipping structured data that matches your page type and validates cleanly.",
    date: "2026-02-02",
  },
  {
    slug: "responsive-images-guide",
    title: "How to make images responsive without breaking Core Web Vitals",
    excerpt:
      "A practical guide to srcset, sizes, and modern image formats — and the three mistakes that quietly hurt LCP the most.",
    date: "2026-01-08",
  },
];

export default function BlogPage() {
  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <Breadcrumbs items={crumbs} />
      <h1>Guides on technical SEO, accessibility, and site structure</h1>
      <p>
        Every article on this blog starts from a real finding in a real
        audit — a rule that fired against an actual site, a fix that
        actually worked, and enough detail that you could apply it to your
        own pages this afternoon. We write about the same categories
        Fixture Scanner checks: technical SEO, on-page signals, structured
        data, accessibility, content depth, and how well a page holds up
        for an AI crawler trying to extract an answer from it.
      </p>
      <p>
        We keep the list short on purpose. Rather than publishing often for
        its own sake, each author writes when they have something specific
        worth explaining — usually after fixing the same issue for the
        third or fourth client and realizing it deserved a proper writeup
        instead of another one-off Slack message. That&rsquo;s also why
        each post carries a named author with their own background: the
        advice here comes from people who have actually done the work, not
        an anonymous editorial voice.
      </p>

      <h2>Latest articles</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.slug} style={{ marginBottom: 16 }}>
            <a href={`/blog/${p.slug}`}>
              <h3 style={{ margin: 0 }}>{p.title}</h3>
            </a>
            <p style={{ margin: "4px 0" }}>{p.excerpt}</p>
            <time dateTime={p.date} style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </li>
        ))}
      </ul>

      <h2>Why we write about our own audit findings</h2>
      <p>
        Most technical-SEO content on the web is written to rank for a
        keyword, not because the author fixed the problem themselves last
        week. We write the opposite way: someone on our team hits a real
        issue while auditing a client site or dogfooding Fixture Scanner
        against our own pages, fixes it, and only then decides whether the
        fix generalizes well enough to be worth a full writeup. That&rsquo;s
        a slower publishing cadence than most engineering blogs, but it
        means every recommendation here has actually shipped somewhere.
      </p>
      <p>
        The two categories we return to most are structured data and
        Core Web Vitals, because they share a property that makes them easy
        to get subtly wrong: the markup or the image tag looks correct at a
        glance, and the mistake only shows up once you check it against the
        actual validator or the actual field-measured metric. Our{" "}
        <a href="/blog/structured-data-checklist">
          structured data checklist
        </a>{" "}
        and{" "}
        <a href="/blog/responsive-images-guide">responsive images guide</a>{" "}
        both walk through exactly that kind of quiet failure.
      </p>

      <h2>What to expect from a post here</h2>
      <p>
        Every article follows the same shape: a short introduction stating
        the problem, a breakdown of the specific mistakes that cause it, a
        working pattern you can copy directly, and a short FAQ addressing
        the follow-up questions we actually get asked. We&rsquo;d rather
        publish four thorough guides a year than forty shallow ones, so the
        list above will stay short — check back periodically, or read the{" "}
        <a href="/hub">resource hub</a> in the meantime for the external
        standards we reference most.
      </p>

      <h2>Who writes these</h2>
      <p>
        Every post here carries a named author with their own background in
        the field, rather than an anonymous house voice. That&rsquo;s a
        deliberate choice: when an article says a particular fix worked, we
        want you to be able to see who made that claim and what they
        actually do day to day. Our current author roster works directly on
        the crawler and rule engine behind Fixture Scanner, so the guidance
        here reflects the same logic the product checks for automatically —
        nothing in a post here contradicts what the scanner itself would
        flag on your own site.
      </p>

      <div className="callout">
        <p>
          Looking for external standards instead of our own writing? The{" "}
          <a href="/hub">resource hub</a> links out to the W3C, MDN, and
          Google Search Central documentation we reference most often.
        </p>
      </div>
    </main>
  );
}
