"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@/components/icons";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 sm:pt-6">
        <motion.nav
          initial={reduce ? { opacity: 1 } : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex w-[min(92vw,1100px)] items-center justify-between rounded-full px-3 py-2.5 pl-3 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] sm:px-4",
            scrolled ? "nav-frost shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]" : "border border-white/5 bg-white/[0.02] backdrop-blur-md",
          )}
        >
          <Link
            href="/"
            aria-label={config.ui.aria.home}
            className="shrink-0 font-display text-base font-semibold tracking-tight text-ink sm:text-lg"
          >
            {config.name}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {config.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isActive(item.href) ? "text-ink" : "text-mute hover:text-ink",
                  )}
                >
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-inset ring-accent/25"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/iletisim"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium tracking-tight text-void transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(237,234,244,0.5)] md:inline-flex"
            >
              {config.ui.buttons.contact}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? config.ui.aria.closeMenu : config.ui.aria.openMenu}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ink transition-colors hover:border-accent/40 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X size={20} weight="light" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="list"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <List size={20} weight="light" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-void/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div className="relative flex flex-1 flex-col justify-center px-6">
              <p className="mb-8 font-display text-lg font-medium tracking-tight text-mute">
                {config.name}
              </p>
              <ul className="flex flex-col gap-2">
                {config.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={
                      reduce ? { opacity: 0 } : { y: 40, opacity: 0, filter: "blur(8px)" }
                    }
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl",
                        isActive(item.href) ? "text-ink" : "text-ink/70 hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-10"
              >
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-medium text-void"
                >
                  {config.ui.buttons.contact}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
