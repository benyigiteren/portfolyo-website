"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <div className="min-h-screen bg-[#090a0f] text-slate-100">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
