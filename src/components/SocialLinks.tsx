"use client";

import {
  InstagramLogo,
  YoutubeLogo,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  XLogo,
  DiscordLogo,
  TiktokLogo,
  TelegramLogo,
  TwitchLogo,
  Globe,
  type Icon,
} from "@/components/icons";
import { site, type SocialIcon } from "@/lib/config";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialIcon, Icon> = {
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  mail: EnvelopeSimple,
  x: XLogo,
  discord: DiscordLogo,
  tiktok: TiktokLogo,
  telegram: TelegramLogo,
  twitch: TwitchLogo,
  website: Globe,
};

type SocialLinksProps = {
  filter?: SocialIcon[];
  className?: string;
  size?: number;
  withLabels?: boolean;
};

export function SocialLinks({
  filter,
  className,
  size = 20,
  withLabels = false,
}: SocialLinksProps) {
  const links = filter
    ? site.social.filter((s) => filter.includes(s.icon))
    : site.social;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {links.map((s) => {
        const Icon = ICONS[s.icon] ?? Globe;
        const isMail = s.icon === "mail";
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noreferrer"}
              aria-label={s.label}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-2.5 text-mute backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink hover:shadow-[0_18px_50px_-24px_rgba(223,38,54,0.6)]",
                withLabels && "pr-4",
              )}
            >
              <Icon
                weight="light"
                size={size}
                className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
              />
              {withLabels && (
                <span className="text-sm font-medium tracking-tight">{s.label}</span>
              )}
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-accent/20" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
