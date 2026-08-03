import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { config } from "@/lib/config";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/8 bg-abyss">
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-4">
              <span className="relative h-12 w-12 overflow-hidden rounded-full bg-black">
                <Image src="/assets/yigit-brand.png" alt="" fill sizes="48px" className="object-cover transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
              </span>
              <span>
                <span className="block text-lg font-semibold tracking-[-.03em] text-ink">YİĞİT EREN</span>
                <span className="mt-1 block text-[9px] uppercase tracking-[.2em] text-faint">Developer · Vibecoder · Builder</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mute">{config.footer.tagline}</p>
            <a href={`mailto:${config.email}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent">{config.email}<ArrowUpRight size={14} /></a>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-faint">Sayfalar</p>
            <ul className="mt-5 space-y-3.5">
              {config.nav.map((item, index) => (
                <li key={item.href}><Link href={item.href} className="group inline-flex items-center gap-3 text-sm text-mute transition-colors hover:text-ink"><span className="text-[9px] text-accent/70">0{index + 1}</span>{item.label}<ArrowUpRight size={12} className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" /></Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-faint">Sosyal</p>
            <SocialLinks className="mt-5 flex-col items-start" size={18} withLabels />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/8 pt-7 text-[10px] font-medium uppercase tracking-[.18em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{config.footer.credit} · Bursa, Türkiye</p>
          <a href={config.footer.repoLink} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 transition-colors hover:text-ink">Açık kaynak portfolyo <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white"><ArrowUpRight size={12} /></span></a>
        </div>
      </div>
    </footer>
  );
}