import type { MetadataRoute } from "next";
import { config, projects } from "@/lib/config";

/**
 * Otomatik sitemap. Config ve projelerden üretilir.
 * Yeni sayfa/proje eklediğinde otomatik güncellenir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projeler`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/hakkimda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projeler/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
