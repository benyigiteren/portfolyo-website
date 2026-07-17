import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { config } from "@/lib/config";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  const { footer, nav } = config;
  return (
    <footer className="relative z-10 border-t border-white/8 bg-abyss/60">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* identity */}
          <div>
            <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {config.name}
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
              {footer.tagline}
            </p>
          </div>

          {/* nav */}
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
              {config.ui.footer.siteHeading}
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-mute transition-colors hover:text-ink"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      weight="light"
                      className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-60"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* social */}
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
              {config.ui.footer.socialHeading}
            </h2>
            <SocialLinks className="mt-5 flex-col items-start" size={18} withLabels />
          </div>
        </div>

        {/* bottom strip: credit + repo prompt */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/6 pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {footer.credit}
          </p>
          <a
            href={footer.repoLink}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-ink"
          >
            {footer.repoPrompt}
            <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent transition-all duration-500 group-hover:gap-1.5">
              {footer.repoLinkLabel}
              <ArrowUpRight size={12} weight="light" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
