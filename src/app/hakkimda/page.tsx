import type { Metadata } from "next";
import { ArrowRight } from "@/components/icons"
import { config, aboutBio, skills } from "@/lib/config"
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "@/components/TechIcon";
import { SocialLinks } from "@/components/SocialLinks";
import { MagneticButton } from "@/components/MagneticButton";

const about = config.pages.about;

export const metadata: Metadata = {
  title: "Hakkımda",
  description: about.metadata.description,
};

export default function HakkimdaPage() {
  return (
    <>
      {/* header */}
      <section className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
              {about.label}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-5 max-w-4xl text-ink text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
              {about.title}<br className="hidden sm:block" />
              {about.titleSuffix}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* bio */}
      <section className="relative z-10 mx-auto max-w-2xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="space-y-7">
          {aboutBio.map((para, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <p
                className={
                  i === 0
                    ? "text-xl leading-relaxed text-ink sm:text-2xl"
                    : "text-lg leading-relaxed text-mute"
                }
              >
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LANGUAGES — real SVG logos */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-tighter text-ink sm:text-4xl">
              {about.languagesHeading}
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {config.about.languages.length} {about.languagesCountSuffix}
            </p>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-5 sm:gap-6">
          {config.about.languages.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06}>
              <TechIcon item={item} size={36} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TOOLS — real SVG logos */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-tighter text-ink sm:text-4xl">
              {about.toolsHeading}
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {config.about.tools.length} {about.toolsCountSuffix}
            </p>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-5 sm:gap-6">
          {config.about.tools.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06}>
              <TechIcon item={item} size={36} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS — text grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-28">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tighter text-ink sm:text-4xl">
            {about.skillsHeading}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/[0.02] sm:grid-cols-2">
          {skills.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.08} className="bg-surface/40">
              <div className="h-full p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  {group.group}
                </p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-ink/85"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* quote */}
      <section className="relative z-10 overflow-hidden border-y border-white/8">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal>
            <blockquote className="text-balance text-2xl font-medium leading-[1.3] tracking-tight text-ink sm:text-3xl lg:text-4xl">
              &ldquo;{config.about.quote}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tighter text-ink sm:text-4xl">
            {about.ctaTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-12 flex justify-center">
            <SocialLinks size={20} withLabels />
          </div>
        </Reveal>
      </section>
    </>
  );
}
