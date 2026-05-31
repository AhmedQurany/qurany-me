import type { MetadataRoute } from "next";

const ROUTES = ["/", "/work", "/process", "/services", "/manifesto"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `https://qurany.me${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
