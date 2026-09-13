import rawConfig from "@/data/config.json";

// ============================================================
//  SİTE İÇERİK AYARLARI VE TİPLERİ
//  Veriler src/data/config.json dosyasından okunur ve Studio
//  üzerinden anlık olarak düzenlenebilir.
// ============================================================

export type SocialIcon =
  | "instagram"
  | "youtube"
  | "github"
  | "linkedin"
  | "mail"
  | "x"
  | "discord"
  | "tiktok"
  | "telegram"
  | "twitch"
  | "website";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type NavLink = {
  label: string;
  href: string;
};

export type ProjectStatus = "shipped" | "geliştiriliyor" | "kavram";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  tags: string[];
  cover: string;
  excerpt: string;
  description: string[];
  featured: boolean;
  status: ProjectStatus;
  links?: {
    live?: string;
    source?: string;
  };
};

/** Dil / araç — slug = simpleicons.org slug (bkz. https://simpleicons.org) */
export type TechItem = {
  name: string;
  slug: string;
};

export interface SiteConfig {
  name: string;
  email: string;
  location: string;
  url: string;
  keywords: string;
  description: string;
  social: SocialLink[];
  nav: NavLink[];
  hero: {
    role: string;
    badge?: string;
    titlePrefix?: string;
    titleHighlight?: string;
    description?: string;
  };
  about: {
    title?: string;
    bio?: string;
    age?: string;
    focus?: string;
    infra?: string;
    languages: TechItem[];
    tools: TechItem[];
  };
  projects: Project[];
  footer: {
    credit: string;
    tagline: string;
    repoPrompt: string;
    repoLink: string;
    repoLinkLabel: string;
  };
  ui: {
    statusLabels: Record<ProjectStatus, string>;
    buttons: {
      viewProjects: string;
      contact: string;
      allProjects: string;
      otherProjects: string;
      contactMe: string;
      backToProjects: string;
      viewLive: string;
      sourceCode: string;
      continue: string;
      sendMail: string;
      backHome: string;
      instagramWrite: string;
    };
    aria: {
      home: string;
      openMenu: string;
      closeMenu: string;
      viewProjects: string;
      contact: string;
      sendMail: string;
      instagramWrite: string;
      mailWrite: string;
    };
    footer: {
      siteHeading: string;
      socialHeading: string;
    };
    notFound: {
      code: string;
      title: string;
      description: string;
    };
  };
  pages: {
    projects: {
      metadata: {
        description: string;
      };
      label: string;
      title: string;
      intro: string;
      countSuffix: string;
      ctaTitle: string;
      ctaDescription: string;
    };
    projectDetail: {
      aboutHeading: string;
      nextLabel: string;
      contactLabel: string;
      contactDescription: string;
    };
    contact: {
      metadata: {
        description: string;
      };
      label: string;
      title: string;
      intro: string;
      mailLabel: string;
      mailDescription: string;
      instagramLabel: string;
      instagramHandle: string;
      instagramDescription: string;
    };
  };
}

export const config = rawConfig as unknown as SiteConfig;

// --- Türetilmiş yardımcılar ---
export const featuredProjects: Project[] = config.projects.filter((p) => p.featured);
export const projects: Project[] = config.projects;
export const site: SiteConfig = config;