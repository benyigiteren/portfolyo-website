import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { featuredProjects, config } from "@/lib/config";

export default function HomePage() {
  const technologies = [...config.about.languages.slice(0, 6), ...config.about.tools.slice(0, 4)];

  return (
    <>
      <Hero />

      <div className="relative border-y border-white/8 bg-black/30 py-1">
        <TechMarquee className="marquee-mask border-none" />
      </div>

      <section id="projeler" className="relative mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-36">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-9 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="section-kicker">Projeler</p>
            <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.06em] text-ink">Yaptığım işler.</h2>
          </Reveal>
          <Reveal delay={.08}>
            <div className="sm:text-right">
              <p className="text-sm text-mute">Yayınladığım ve üzerinde çalıştığım projeler.</p>
              <Link href="/projeler" className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">Tümünü gör <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} variant="feature" index={index} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/8 bg-abyss py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/8 blur-[120px]" aria-hidden />
        <div className="relative mx-auto grid max-w-[86rem] gap-14 px-5 sm:px-8 lg:grid-cols-[.65fr_1.35fr] lg:items-center lg:gap-20 lg:px-10">
          <Reveal className="mx-auto w-full max-w-[16rem] sm:max-w-xs">
            <div className="relative aspect-square overflow-hidden rounded-full bg-black">
              <Image src="/assets/yigit-brand.png" alt="Yiğit Eren logosu" fill sizes="(max-width: 1024px) 64vw, 28vw" className="object-cover" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="section-kicker">Hakkımda</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.06em] text-ink">15 yaşındayım.<br /><span className="text-accent">Ürün geliştiriyorum.</span></h2>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">Go ve Next.js ağırlıklı çalışıyorum. Web uygulamaları geliştiriyor, Docker ile kendi sunucularımda yayınlıyorum.</p>
            </Reveal>

            <Reveal delay={.08}>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-3">
                <div className="bg-surface p-5"><p className="text-[10px] uppercase tracking-[.18em] text-faint">Yaş</p><p className="mt-2 text-lg font-medium text-ink">15</p></div>
                <div className="bg-surface p-5"><p className="text-[10px] uppercase tracking-[.18em] text-faint">Alan</p><p className="mt-2 text-lg font-medium text-ink">Web & Backend</p></div>
                <div className="bg-surface p-5"><p className="text-[10px] uppercase tracking-[.18em] text-faint">Konum</p><p className="mt-2 text-lg font-medium text-ink">Bursa</p></div>
              </div>
            </Reveal>

            <Reveal delay={.14}>
              <div className="mt-7 flex flex-wrap gap-2">
                {technologies.map((item) => <span key={`${item.name}-${item.slug}`} className="rounded-full border border-white/10 bg-white/[.03] px-3.5 py-2 text-xs text-mute">{item.name}</span>)}
              </div>
              <Link href="/hakkimda" className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">Daha fazla <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-36">
        <Reveal>
          <div className="rounded-[2rem] border border-white/9 bg-surface p-7 sm:p-10 lg:flex lg:items-end lg:justify-between lg:p-14">
            <div>
              <p className="section-kicker">İletişim</p>
              <h2 className="mt-5 text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.055em] text-ink">Bir şey konuşalım mı?</h2>
              <p className="mt-5 text-sm text-mute sm:text-base">Proje, soru veya iş birliği için yazabilirsin.</p>
            </div>
            <div className="mt-8 lg:mt-0">
              <MagneticButton href={`mailto:${config.email}`} className="bg-accent text-white hover:bg-accent-2" ariaLabel={config.ui.aria.sendMail}>{config.email}<ArrowUpRight size={16} /></MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}