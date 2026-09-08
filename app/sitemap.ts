import type { MetadataRoute } from "next";

const BASE_URL = "https://rule-checks.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/product",
    "/pricing",
    "/blog",
    "/blog/responsive-images-guide",
    "/blog/structured-data-checklist",
    "/hub",
    "/rules",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
