import Link from "next/link";

export const SITE_NAME = "Broken Fixture Co";
export const SITE_URL = "https://rule-checks.vercel.app";
export const SITE_DESCRIPTION =
  "Broken Fixture Co builds the Fixture Scanner, a site-auditing tool that crawls a website and reports every technical, content, and structured-data issue it finds.";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo">
          Broken Fixture Co
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <ul>
            <li>
              <a href="/product">Product</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/hub">Resources</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <h2>Product</h2>
          <ul>
            <li>
              <a href="/product">Fixturely overview</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/hub">Resource hub</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li>
              <a href="/about">About us</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Legal</h2>
          <ul>
            <li>
              <a href="/privacy-policy">Privacy policy</a>
            </li>
            <li>
              <a href="/terms">Terms &amp; conditions</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Reference</h2>
          <ul>
            <li>
              <a href="/rules">Rule compliance report</a>
            </li>
            <li>
              <a
                href="https://www.w3.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                W3C
              </a>
            </li>
            <li>
              <a
                href="https://developers.google.com/search"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Search Central
              </a>
            </li>
          </ul>
        </div>
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
