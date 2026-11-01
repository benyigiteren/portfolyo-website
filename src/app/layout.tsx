import type { Metadata, Viewport } from "next";
import { config } from "@/lib/config";

import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL(config.url),
  title: {
    default: `${config.name} — ${config.hero.role}`,
    template: `%s · ${config.name}`,
  },
  description: config.description,
  keywords: config.keywords.split(", ").map((k) => k.trim()),
  authors: [{ name: config.name }],
  creator: config.name,
  openGraph: {
    title: config.name,
    description: config.description,
    type: "website",
    locale: "tr_TR",
    url: config.url,
  },
  twitter: { card: "summary_large_image", title: config.name, description: config.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
    >
      <body className="font-sans antialiased selection:text-white">
        <div className="grain-overlay" aria-hidden />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
