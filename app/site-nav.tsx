"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Site logo/home link. Renders as plain text on the homepage itself -- a
 * self-link to "/" with no fragment is exactly what
 * internal_linking.internal_link_followability flags as a dead-end anchor.
 */
export function SiteLogo() {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <span className="site-logo" aria-current="page">
        Broken Fixture Co
      </span>
    );
  }
  return (
    <Link href="/" className="site-logo">
      Broken Fixture Co
    </Link>
  );
}

const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/hub", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Primary nav. Renders the current page as plain text (aria-current, no href)
 * instead of a link to itself -- a self-link with no fragment is exactly what
 * internal_linking.internal_link_followability flags as a dead-end anchor.
 */
export function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="site-nav" aria-label="Primary">
      <ul>
        {NAV_LINKS.map((link) => {
          const isCurrent = pathname === link.href;
          return (
            <li key={link.href}>
              {isCurrent ? (
                <span aria-current="page">{link.label}</span>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const FOOTER_COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { href: "/product", label: "Fixturely overview" },
      { href: "/pricing", label: "Pricing" },
      { href: "/hub", label: "Resource hub" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions" },
    ],
  },
  {
    heading: "Reference",
    links: [{ href: "/rules", label: "Rule compliance report" }],
  },
];

const EXTERNAL_REFERENCE_LINKS = [
  { href: "https://www.w3.org/", label: "W3C" },
  { href: "https://developers.google.com/search", label: "Google Search Central" },
];

export function FooterNav() {
  const pathname = usePathname();
  return (
    <>
      {FOOTER_COLUMNS.map((col) => (
        <div key={col.heading}>
          <h2>{col.heading}</h2>
          <ul>
            {col.links.map((link) => {
              const isCurrent = pathname === link.href;
              return (
                <li key={link.href}>
                  {isCurrent ? (
                    <span aria-current="page">{link.label}</span>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              );
            })}
            {col.heading === "Reference" &&
              EXTERNAL_REFERENCE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
}
