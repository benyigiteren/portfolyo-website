import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "@/components/icons"
import { projects, site, config } from "@/lib/config"
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";


export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // params is async in Next 15
  return params.then((p) => {
    const project = projects.find((x) => x.slug === p.slug);
    if (!project) return {};
    return {
      title: project.title,
      description: project.excerpt,
      openGraph: { title: project.title, description: project.excerpt },
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* hero / cover */}
      <section className="relative min-h-[100dvh] overflow-hidden pt-28 sm:pt-32">
        
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <Link
              href="/projeler"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-ink"
            >
              <ArrowLeft
                size={14}
                weight="light"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              {config.ui.buttons.backToProjects}
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-accent/60" />
              <span>{config.ui.statusLabels[project.status]}</span>
              <span className="h-1 w-1 rounded-full bg-accent/60" />
              <span>{project.tags.join(" / ")}</span>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="mt-6">
            <h1 className="font-display max-w-4xl text-ink text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.24} className="mt-6">
            <p className="max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.32} className="mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.6rem] border border-white/8 p-1.5">
              <div className="relative h-full w-full overflow-hidden rounded-[1.2rem]">
                <Image
                  src={project.cover}
                  alt={`${project.title} kapak`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="duotone object-cover"
                />
                
              </div>
            </div>
          </Reveal>

          {project.links && (project.links.live || project.links.source) && (
            <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-void transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
                >
                  {config.ui.buttons.viewLive}
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-void/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={15} weight="bold" />
                  </span>
                </a>
              )}
              {project.links.source && (
                <a
                  href={project.links.source}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-ink backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-accent/40"
                >
                  {config.ui.buttons.sourceCode}
                  <ArrowUpRight size={15} weight="light" className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </Reveal>
          )}
        </div>
      </section>

      {/* description */}
      <section className="relative z-10 mx-auto max-w-2xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            {config.pages.projectDetail.aboutHeading}
          </h2>
        </Reveal>
        <div className="mt-6 space-y-6">
          {project.description.map((para, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-lg leading-relaxed text-ink/80 sm:text-xl">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* next project + contact */}
      <section className="relative z-10 border-t border-white/8">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                {config.pages.projectDetail.nextLabel}
              </p>
              <Link
                href={`/projeler/${next.slug}`}
                className="group mt-4 block"
              >
                <h3 className="text-3xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-4xl">
                  {next.title}
                </h3>
                <p className="mt-2 text-mute">{next.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                  {config.ui.buttons.continue}
                  <ArrowRight
                    size={16}
                    weight="light"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                {config.pages.projectDetail.contactLabel}
              </p>
              <p className="mt-4 max-w-sm text-mute">
                {config.pages.projectDetail.contactDescription}
              </p>
              <div className="mt-6">
                <SocialLinks filter={["instagram", "mail"]} withLabels />
              </div>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-block font-mono text-sm text-accent transition-colors hover:text-accent-2"
              >
                {site.email}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
