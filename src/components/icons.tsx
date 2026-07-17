"use client";

/**
 * Icon boundary. @phosphor-icons/react 2.x calls React.createContext at
 * module load, which is undefined in the Server Components runtime. This
 * client wrapper keeps Phosphor on the client bundle only.
 */
export {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ArrowDown,
  List,
  X,
  Sparkle,
  PaperPlaneTilt,
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
} from "@phosphor-icons/react";

export type { Icon } from "@phosphor-icons/react";
