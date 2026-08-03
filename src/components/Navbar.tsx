"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, List, X } from "@/components/icons";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-all duration-300", scrolled ? "border-white/8 bg-void/85 backdrop-blur-xl" : "border-transparent bg-transparent")}>
        <motion.nav initial={reduce ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex h-[4.75rem] max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" aria-label={config.ui.aria.home} className="group flex items-center gap-3">
            <span className="relative h-9 w-9 overflow-hidden rounded-full bg-black">
              <Image src="/assets/yigit-brand.png" alt="" fill sizes="36px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="text-sm font-semibold tracking-[-.02em] text-ink sm:text-base">Yiğit Eren</span>
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {config.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cn("relative py-2 text-sm transition-colors", isActive(item.href) ? "text-ink" : "text-mute hover:text-ink")}>
                  {item.label}
                  {isActive(item.href) && <motion.span layoutId="nav-line" className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/iletisim" className="hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent md:flex">
              İletişim <ArrowUpRight size={14} />
            </Link>
            <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? config.ui.aria.closeMenu : config.ui.aria.openMenu} aria-expanded={open} className="grid h-10 w-10 place-items-center text-ink md:hidden">
              {open ? <X size={21} /> : <List size={21} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 bg-void px-5 pb-10 pt-28 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav className="flex h-full flex-col justify-center">
              <ul>
                {config.nav.map((item, index) => (
                  <motion.li key={item.href} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className="border-b border-white/8">
                    <Link href={item.href} className={cn("block py-4 text-4xl font-semibold tracking-[-.04em]", isActive(item.href) ? "text-accent" : "text-ink")}>{item.label}</Link>
                  </motion.li>
                ))}
              </ul>
              <a href={`mailto:${config.email}`} className="mt-8 text-sm text-mute">{config.email}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}