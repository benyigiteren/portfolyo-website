"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "@/components/icons";
import { config } from "@/lib/config";
import { MagneticButton } from "@/components/MagneticButton";

/**
 * Hero — editorial layout matching other pages.
 * Name fills the width on all viewports. On desktop, role/description/CTAs
 * sit to the RIGHT of the name (grid) so no empty space.
 * On mobile, everything stacks vertically with a bigger name.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yName = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const lines = config.hero.title.split(" ");
  const d = (i: number) => 0.1 + i * 0.06;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden px-5 pt-28 sm:px-8 sm:pt-32"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      {/* MAIN — grid: name left, info right on desktop */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 content-center gap-8 lg:grid-cols-[1fr_24rem] lg:gap-16">
        {/* LEFT — the name, fills width */}
        <motion.h1
          style={{ y: reduce ? 0 : yName, opacity: reduce ? 1 : opacity }}
          className="font-display font-semibold leading-[0.95] tracking-tighter text-ink"
          aria-label={config.hero.title}
        >
          {lines.map((word, wi) => (
            <span key={wi} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span
                className="block"
                style={{ fontSize: "clamp(4rem, 20vw, 17rem)" }}
                initial={reduce ? { opacity: 1 } : { y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: d(wi),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* RIGHT — role, description, CTAs (desktop sidebar, mobile below) */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: reduce ? 1 : opacity }}
          className="flex flex-col justify-end gap-6 pb-2 lg:pb-0"
        >
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
              {config.hero.role}
            </p>
            <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">
              {config.hero.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              href="/projeler"
              className="bg-ink text-void hover:shadow-[0_24px_60px_-24px_rgba(237,234,244,0.45)]"
              ariaLabel={config.ui.aria.viewProjects}
            >
              {config.ui.buttons.viewProjects}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-void/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight size={15} weight="bold" />
              </span>
            </MagneticButton>
            <MagneticButton
              href="/iletisim"
              className="border border-white/12 bg-transparent text-ink hover:border-accent/40 hover:bg-white/[0.03]"
              ariaLabel={config.ui.aria.contact}
            >
              {config.ui.buttons.contact}
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* bottom metadata strip */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ opacity: reduce ? 1 : opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl border-t border-white/8 pt-5 pb-6 sm:pb-8"
      >
        <div className="flex items-center justify-between gap-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-faint">
            {config.location}
          </p>
          <div className="flex items-center gap-4">
            {config.hero.focus.map((f, i) => (
              <span key={f} className="hidden text-[11px] uppercase tracking-[0.18em] text-faint sm:inline">
                {f}{i < config.hero.focus.length - 1 && <span className="ml-4 text-accent/30">/</span>}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
