import type { Metadata } from "next";
import {
  InstagramLogo,
  EnvelopeSimple,
  ArrowUpRight,
  PaperPlaneTilt,
} from "@/components/icons";
import { site, config } from "@/lib/config"
import { Reveal } from "@/components/Reveal";

import { MagneticButton } from "@/components/MagneticButton";

const page = config.pages.contact;

export const metadata: Metadata = {
  title: "İletişim",
  description: page.metadata.description,
};

const insta = site.social.find((s) => s.icon === "instagram")!;

export default function IletisimPage() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 pt-32 pb-20 sm:px-8">

      <div className="tech-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            {page.label}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 text-ink text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
            {page.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-lg text-mute sm:text-xl">
            {page.intro}
          </p>
        </Reveal>

        {/* two primary contact channels — the only links on this page */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Mail */}
          <Reveal delay={0.24}>
            <a
              href={`mailto:${site.email}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.02] p-7 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_40px_90px_-50px_rgba(139,92,246,0.55)] sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-accent/10 text-accent">
                  <EnvelopeSimple size={22} weight="light" />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-ink transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <ArrowUpRight size={16} weight="light" />
                </span>
              </div>
              <div className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                  {page.mailLabel}
                </p>
                <p className="mt-2 break-all text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {site.email}
                </p>
                <p className="mt-3 text-sm text-mute">
                  {page.mailDescription}
                </p>
              </div>
            </a>
          </Reveal>

          {/* Instagram */}
          <Reveal delay={0.32}>
            <a
              href={insta.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.02] p-7 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-accent-2/30 hover:shadow-[0_40px_90px_-50px_rgba(232,121,249,0.45)] sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-accent-2/10 text-accent-2">
                  <InstagramLogo size={22} weight="light" />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-ink transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent-2/40 group-hover:bg-accent-2/10">
                  <ArrowUpRight size={16} weight="light" />
                </span>
              </div>
              <div className="mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                  {page.instagramLabel}
                </p>
                <p className="mt-2 text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {page.instagramHandle}
                </p>
                <p className="mt-3 text-sm text-mute">
                  {page.instagramDescription}
                </p>
              </div>
            </a>
          </Reveal>
        </div>

        {/* mailto compose CTA */}
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href={`mailto:${site.email}`}
              className="bg-ink text-void hover:shadow-[0_24px_60px_-24px_rgba(237,234,244,0.5)]"
              ariaLabel={config.ui.aria.mailWrite}
            >
              <PaperPlaneTilt size={15} weight="fill" />
              {config.ui.buttons.sendMail}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
