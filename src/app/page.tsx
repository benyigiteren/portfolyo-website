import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons"
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { SocialLinks } from "@/components/SocialLinks";
import { featuredProjects, aboutBio, config } from "@/lib/config"

export default function HomePage() {
  const insta = config.social.find((s) => s.icon === "instagram");
  const home = config.pages.home;

  return (
    <>
      <Hero />

      {/* Tech logo marquee — real brand SVGs */}
      <TechMarquee />

      {/* Featured work */}
      <section id="projeler" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tighter text-ink sm:text-5xl lg:text-6xl">
              {home.featuredLabel}{" "}
              <span className="text-accent">{home.featuredLabelAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/projeler"
              className="group inline-flex items-center gap-2 text-sm font-medium text-mute transition-colors hover:text-ink"
            >
              {config.ui.buttons.allProjects}
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/12 transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10">
                <ArrowRight
                  size={14}
                  weight="light"
                  className="transition-transform duration-500 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-7">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} variant="feature" index={i} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <Link
            href="/projeler"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-transparent px-6 py-3 text-sm font-medium text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.03]"
          >
            {config.ui.buttons.otherProjects}
            <ArrowRight
              size={15}
              weight="light"
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </section>

      {/* About teaser */}
      <section className="relative overflow-hidden border-y border-white/8">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                {home.aboutTeaserLabel}
              </p>
              <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl">
                {home.aboutTeaserTitle}<span className="text-accent">{home.aboutTeaserTitleAccent}</span>{home.aboutTeaserTitleSuffix}
              </h2>
            </Reveal>
            <div className="space-y-6">
              <Reveal delay={0.08}>
                <p className="text-lg leading-relaxed text-ink/80">{aboutBio[0]}</p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-base leading-relaxed text-mute">{aboutBio[1]}</p>
              </Reveal>
              <Reveal delay={0.24}>
                <Link
                  href="/hakkimda"
                  className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-2"
                >
                  {home.aboutFullStory}
                  <ArrowRight
                    size={15}
                    weight="light"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact teaser */}
      <section className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32 lg:py-40">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            {home.contactLabel}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tighter text-ink sm:text-5xl lg:text-6xl">
            {home.contactTitle}<span className="text-accent">{home.contactTitleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base text-mute sm:text-lg">
            {home.contactDescription}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              href={`mailto:${config.email}`}
              className="bg-ink text-void hover:shadow-[0_24px_60px_-24px_rgba(237,234,244,0.45)]"
              ariaLabel={config.ui.aria.sendMail}
            >
              {config.email}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-void/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} weight="bold" />
              </span>
            </MagneticButton>
            {insta && (
              <MagneticButton
                href={insta.href}
                external
                className="border border-white/12 bg-transparent text-ink hover:border-accent/40 hover:bg-white/[0.03]"
                ariaLabel={config.ui.aria.instagramWrite}
              >
                {config.ui.buttons.instagramWrite}
              </MagneticButton>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <SocialLinks size={20} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
