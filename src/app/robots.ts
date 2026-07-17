import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

/**
 * Otomatik robots.txt. Config'den URL okur.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${config.url}/sitemap.xml`,
  };
}
