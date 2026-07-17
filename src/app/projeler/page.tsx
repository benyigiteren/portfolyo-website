import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons"
import { projects, config } from "@/lib/config"
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";

const page = config.pages.projects;

export const metadata: Metadata = {
  title: "Projeler",
  description: page.metadata.description,
};

export default function ProjelerPage() {
  return (
    <>
      {/* page header */}
      <section className="relative overflow-hidden pt-32 sm:pt-40">

        <div className="tech-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
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
            <p className="mt-6 max-w-xl text-lg text-mute">
              {page.intro}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.18em] text-faint">
              {projects.length} {page.countSuffix}
            </p>
          </Reveal>
        </div>
      </section>

      {/* full grid — asymmetric bento via mixed variants */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          {projects.map((p, i) => {
            // rhythm: first two are feature (wide), rest compact
            const wide = i < 2;
            return (
              <div
                key={p.slug}
                className={wide ? "lg:col-span-6" : "lg:col-span-4"}
              >
                <ProjectCard
                  project={p}
                  variant={wide ? "feature" : "compact"}
                  index={i}
                />
              </div>
            );
          })}
        </div>

        {/* closing CTA */}
        <Reveal className="mt-20 border-t border-white/8 pt-16">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div>
            <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tighter text-ink sm:text-4xl">
                {page.ctaTitle}
              </h2>
              <p className="mt-3 max-w-md text-mute">
                {page.ctaDescription}
              </p>
            </div>
            <Link
              href="/iletisim"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-void transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
            >
              {config.ui.buttons.contactMe}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-void/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight size={15} weight="bold" />
              </span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
