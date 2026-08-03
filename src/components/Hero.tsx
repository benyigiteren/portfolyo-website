"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { config } from "@/lib/config";
import { MagneticButton } from "@/components/MagneticButton";
import { ViewCounter } from "@/components/ViewCounter";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div className="pointer-events-none absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[130px]" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-[86rem] items-center gap-12 lg:grid-cols-[1fr_.72fr] lg:gap-16">
        <div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-accent">15 yaşında geliştirici · Bursa</p>
            <ViewCounter />
          </motion.div>

          <h1 className="mt-6 max-w-4xl text-[clamp(4.2rem,10.5vw,9rem)] font-semibold leading-[.84] tracking-[-.075em] text-ink" aria-label="Merhaba, Ben Yiğit.">
            <span className="block overflow-hidden pb-[.08em]">
              <motion.span className="block" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .85, delay: .08, ease: [0.16, 1, 0.3, 1] }}>
                Merhaba,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[.08em]">
              <motion.span className="block text-accent" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: .85, delay: .16, ease: [0.16, 1, 0.3, 1] }}>
                Ben Yiğit.
              </motion.span>
            </span>
          </h1>

          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .36 }} className="mt-7 max-w-2xl border-l border-accent/60 pl-5">
            <p className="text-base leading-relaxed text-mute sm:text-lg">
              Go ve Next.js ile web ürünleri geliştiriyorum. Projelerimi kendi sunucularımda çalıştırıyorum.
            </p>
          </motion.div>

          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="/projeler" className="bg-accent text-white hover:bg-accent-2" ariaLabel={config.ui.aria.viewProjects}>
              Projelerim <ArrowRight size={16} weight="bold" />
            </MagneticButton>
            <MagneticButton href="/iletisim" className="border border-white/14 bg-white/[.035] text-ink hover:border-white/30" ariaLabel={config.ui.aria.contact}>
              İletişim <ArrowUpRight size={16} />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .2, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto hidden h-[27rem] w-[27rem] lg:block">
          <div className="relative h-full w-full">
            <div className="pointer-events-none absolute inset-0 scale-125 rounded-full bg-accent/15 blur-[70px]" aria-hidden />
            <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
              <Image src="/assets/yigit-brand.png" alt="Yiğit Eren logosu" fill priority sizes="(max-width: 1024px) 80vw, 38vw" className="object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}