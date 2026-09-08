import type { Metadata } from "next";
import { FooterNav, SiteLogo, SiteNav } from "./site-nav";

export const SITE_NAME = "Broken Fixture Co";
export const SITE_URL = "https://rule-checks.vercel.app";
export const SITE_DESCRIPTION =
  "Broken Fixture Co builds the Fixture Scanner, a site-auditing tool that crawls a website and reports every technical, content, and structured-data issue it finds.";

/**
 * Consistent title / description / canonical / Open Graph / Twitter Card metadata
 * for a single page. Every page's metadata export should build off this so the
 * "Title | Broken Fixture Co" convention, OG tags, and Twitter Card are never
 * missed on a new route.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <SiteLogo />
        <SiteNav />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <FooterNav />
      </div>
      <div className="site-footer__bottom">
        <address style={{ fontStyle: "normal", display: "inline" }}>
          Broken Fixture Co, 148 Harbor Row, Suite 4B, Portland, ME 04101 ·{" "}
          <a href="mailto:hello@brokenfixture.example">
            hello@brokenfixture.example
          </a>{" "}
          · <a href="tel:+12075550142">+1 (207) 555-0142</a>
        </address>
        <p style={{ marginTop: 8 }}>
          © {new Date().getFullYear()} Broken Fixture Co. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 20, fontSize: "0.85rem", color: "var(--muted)" }}>
      <ol style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 6, padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={item.href} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <a href={item.href}>{item.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
