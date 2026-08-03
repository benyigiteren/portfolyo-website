import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { config } from "@/lib/config";
import { Reveal } from "@/components/Reveal";
import { TechIconInline } from "@/components/TechIcon";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Yiğit Eren — Go ve Next.js ile ürün geliştiren yazılımcı.",
};

export default function HakkimdaPage() {
  const primary = config.about.languages.slice(0, 4);
  const others = config.about.languages.slice(4);

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:px-10">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-16" aria-hidden />
        <div className="pointer-events-none absolute -right-48 top-0 h-96 w-96 rounded-full bg-accent/8 blur-[130px]" aria-hidden />
        <div className="relative mx-auto max-w-[86rem]">
          <Reveal><p className="section-kicker">Hakkımda</p></Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-20">
            <Reveal delay={.05}>
              <h1 className="text-[clamp(4.5rem,10vw,9rem)] font-semibold leading-[.82] tracking-[-.075em] text-ink">Ben Yiğit.</h1>
            </Reveal>

            <Reveal delay={.1}>
              <div className="border-t border-accent/65 pt-6">
                <p className="max-w-xl text-lg leading-relaxed text-ink/90 sm:text-xl">15 yaşındayım. Go ve Next.js ile web uygulamaları geliştiriyor, projelerimi kendi sunucularımda çalıştırıyorum.</p>
                <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 text-sm sm:grid-cols-3">
                  <div><dt className="text-[10px] uppercase tracking-[.18em] text-faint">Konum</dt><dd className="mt-2 text-ink">Bursa</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-[.18em] text-faint">Odak</dt><dd className="mt-2 text-ink">Web & Backend</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-[.18em] text-faint">Altyapı</dt><dd className="mt-2 text-ink">Self-hosted</dd></div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-white/8 bg-abyss py-24 sm:py-32">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8 lg:px-10">
          <Reveal>
            <p className="section-kicker">Teknolojiler</p>
            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-4xl font-semibold tracking-[-.05em] text-ink sm:text-6xl">Kullandıklarım.</h2>
              <p className="text-sm text-mute">Günlük kullandığım diller ve araçlar.</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <div className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-surface/60">
                {primary.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-white/8 p-5 last:border-0 sm:p-6">
                    <div className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[.04]"><TechIconInline item={item} size={25} /></span><span className="text-lg font-medium text-ink">{item.name}</span></div>
                    <span className="text-[10px] font-semibold tracking-[.18em] text-faint">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {others.map((item, index) => (
                <Reveal key={`${item.name}-${index}`} delay={index * .035}>
                  <div className="flex h-full min-h-28 flex-col justify-between rounded-2xl border border-white/8 bg-white/[.025] p-4 transition-colors hover:border-accent/30 hover:bg-accent/[.04]">
                    <TechIconInline item={item} size={23} />
                    <span className="mt-5 text-sm font-medium text-ink">{item.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={.08}>
            <div className="mt-12 border-t border-white/8 pt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-faint">Araçlar</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {config.about.tools.map((item) => (
                  <div key={item.slug} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/[.025] px-4 py-3.5">
                    <TechIconInline item={item} size={20} /><span className="truncate text-sm text-mute">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="section-kicker">Devam et</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] text-ink sm:text-5xl">Projelerime göz at.</h2></div>
            <div className="flex flex-wrap gap-3">
              <Link href="/projeler" className="group inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">Projeler <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
              <MagneticButton href={`mailto:${config.email}`} className="bg-accent text-white hover:bg-accent-2" ariaLabel={config.ui.aria.sendMail}>İletişim<ArrowUpRight size={16} /></MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}