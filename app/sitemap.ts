import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://qurany.me", changeFrequency: "monthly", priority: 1 },
    { url: "https://qurany.me/cv", changeFrequency: "monthly", priority: 0.8 },
  ];
}
