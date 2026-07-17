import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { config } from "@/lib/config";

const display = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  themeColor: "#08070d",
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
      className={display.variable}
    >
      <body className="font-sans antialiased selection:text-white">
        <div className="grain-overlay" aria-hidden />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
