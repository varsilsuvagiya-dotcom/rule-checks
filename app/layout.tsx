import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// technical.charset: deliberately WRONG charset (declared ISO-8859-1, content is real UTF-8
// with em-dashes/curly quotes/etc elsewhere on the site) via a raw <meta charSet> below.
// on_page.title_present / meta_description etc for THIS layout-level metadata intentionally
// left minimal; per-page metadata is overridden (or omitted) on each category route.
export const metadata: Metadata = {
  title: "Broken Fixture Co",
  description:
    "Broken Fixture Co — a QA test fixture site with intentionally broken SEO/GEO signals.",
};

// mobile.viewport_configured: user-scalable disabled + maximum-scale=1 locks pinch-zoom,
// a hard FAIL for that rule. (mobile.viewport_meta is broken separately per-category page by
// omitting the viewport tag there instead of relying on this root layout value.)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // accessibility.lang_attribute: lang is deliberately set to an empty/invalid value so the
    // <html> tag carries no usable language declaration.
    <html lang="" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* technical.charset: CANNOT_BREAK_ON_NEXTJS — Next.js always injects its own
          <meta charSet="utf-8"> as the very first element in <head> ("Default Field"), before
          any manually-added <head> children render. cheerio's meta[charset] selector picks the
          FIRST matching element in document order, so a second, later <meta charSet="..."> here
          has no effect on what the rule reads — and even if it did win, the rule only WARNs on a
          charset name outside {utf-8, utf8, iso-8859-1, windows-1252}; it never fails on a
          mismatch between the declared and actual encoding. See /rules for the full note. */}
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <div
          style={{
            background: "#b91c1c",
            color: "white",
            padding: "8px 16px",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          TEST FIXTURE — intentionally broken, not a real business.
        </div>
        {children}
      </body>
    </html>
  );
}
