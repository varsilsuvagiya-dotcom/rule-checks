import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SiteFooter, SiteHeader } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Website Auditing Software`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Website Auditing Software`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Website Auditing Software`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: SITE_DESCRIPTION,
  email: "hello@brokenfixture.example",
  telephone: "+1-207-555-0142",
  address: {
    "@type": "PostalAddress",
    streetAddress: "148 Harbor Row, Suite 4B",
    addressLocality: "Portland",
    addressRegion: "ME",
    postalCode: "04101",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/varsilsuvagiya-dotcom/rule-checks",
    "https://www.linkedin.com/company/broken-fixture-co",
    "https://x.com/brokenfixture",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}>
        {/* accessibility.keyboard_navigation: site-wide skip-to-content link, the first
            focusable element in <body>. Visually hidden until focused (globals.css
            .skip-nav-link) — never display:none, which would remove it from the tab order. */}
        <a href="#main-content" className="skip-nav-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SiteHeader />
        <div id="main-content" style={{ flex: 1 }}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
