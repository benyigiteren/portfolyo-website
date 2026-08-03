// ============================================================
//  SİTE İÇERİK AYARLARI
//  Buradan her şeyi düzenle: isim, sosyal medya, menü, diller,
//  araçlar, projeler, hero açılışı ve footer. Kodun geri kalanı
//  buralardan okur.
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

export type NavLink = { label: string; href: string };

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
  status: "shipped" | "geliştiriliyor" | "kavram";
  links?: { live?: string; source?: string };
};

/** Dil / araç — slug = simpleicons.org slug (bkz. https://simpleicons.org) */
export type TechItem = { name: string; slug: string };

const NAME = "Yiğit Eren";

export const config = {
  // --- KİŞİSEL BİLGİLER ---
  name: NAME,
  email: "merhaba@yigiteren.org",
  location: "Bursa, Türkiye",

  // --- SEO ---
  // Site URL (sitemap ve robots için)
  url: "https://yigiteren.org",
  // Anahtar kelimeler (virgülle ayır)
  keywords: "yigiteren, yigit, yigitdev, yigiteren org, yazılım, yapay zeka, portfolyo, geliştirici, Go, Next.js, vibecoding, backend",
  // Site açıklaması (SEO meta description)
  description: "Yiğit Eren — 15 yaşında, Go ve Next.js ile web ürünleri ve açık kaynak projeler geliştiren yazılımcı.",

  // --- SOSYAL MEDYA ---
  social: [
    { label: "YouTube", href: "https://youtube.com/@benyigiteren", icon: "youtube" },
    { label: "GitHub", href: "https://github.com/benyigiteren", icon: "github" },
    { label: "Instagram", href: "https://instagram.com/benyigiteren", icon: "instagram" },
    { label: "Mail", href: "mailto:merhaba@yigiteren.org", icon: "mail" },
  ] as SocialLink[],

  nav: [
    { label: "Anasayfa", href: "/" },
    { label: "Projeler", href: "/projeler" },
    { label: "Hakkımda", href: "/hakkimda" },
    { label: "İletişim", href: "/iletisim" },
  ] as NavLink[],

  // --- HERO ---
  hero: { role: "Geliştirici" },

  // --- HAKKIMDA ---
  about: {
    // Kullandığın diller — slug = simpleicons.org slug
    languages: [
      { name: "Go", slug: "go" },
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Python", slug: "python" },
      { name: "SQLite", slug: "sqlite" },
      { name: "Rust", slug: "rust" },
      { name: "React Native", slug: "react" },
      { name: "Kotlin", slug: "kotlin" },
      { name: "Flutter", slug: "flutter" },
      { name: "PHP", slug: "php" },
    ] as TechItem[],
    // Kullandığın araçlar
    tools: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Supabase", slug: "supabase" },
      { name: "Canva", slug: "canva" },
      { name: "Docker", slug: "docker" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "Appwrite", slug: "appwrite" },
    ] as TechItem[],
  },

  // --- PROJELER ---
  projects: [
    {
      slug: "menukolay",
      title: "MenüKolay",
      tagline: "Yapay Zeka Destekli Akıllı QR Menü",
      year: "2026",
      tags: ["Next.js", "AI", "SaaS", "Kapalı Kaynak"],
      cover: "https://bin.yigiteren.org/yigit/menukolay.png", 
      excerpt:
        "Mevzuata tam uyumlu, doğal dil işleme ile yönetilebilen profesyonel dijital QR menü platformu.",
      description: [
        "MenüKolay, sıradan bir QR menünün ötesine geçerek işletmelere yapay zeka destekli bir yönetim paneli sunuyor. Menüyü doğal dil komutlarıyla (örneğin 'Tüm kahvelere %10 zam yap') düzenleme imkanı sağlıyor.",
        "Mevzuata uygun kalori ve alerjen bilgisi ekleme özelliklerinin yanı sıra, istenildiğinde tek tıkla fiziksel baskı için A4 formatında menü PDF'i oluşturabiliyor. Canlıda aktif olarak yüzlerce müşteriye hizmet veren kapalı kaynaklı bir SaaS projesi."
      ],
      featured: true,
      status: "shipped",
      links: { live: "https://menukolay.tr" },
    },
    {
      slug: "linklik",
      title: "Linklik",
      tagline: "Go tabanlı yüksek performanslı URL Kısaltıcı",
      year: "2026",
      tags: ["Go", "SQLite", "Open Source"],
      cover: "https://github.com/benyigiteren/linklik/raw/main/readmegorsel.png",
      excerpt:
        "Go dilinin hızı ve sadeliğiyle geliştirdiğim açık kaynaklı, hafif ve güçlü link yönetim aracı.",
      description: [
        "Düşük bellek tüketimi ve yüksek performans hedefiyle tamamen Go ve SQLite kullanarak sıfırdan geliştirdiğim URL kısaltma motoru.",
        "Açık kaynak olarak GitHub'da paylaştım. Kendi sunucusunda barındırmak (self-host) isteyenler için Docker uyumlu, kurulumu saniyeler süren minimalist bir mimariye sahip."
      ],
      featured: true,
      status: "shipped",
      links: { source: "https://github.com/benyigiteren/linklik" },
    },
    {
      slug: "bigpocket",
      title: "BigPocket",
      tagline: "Telefonunuzu Donanıma Dönüştürün",
      year: "2026",
      tags: ["Android", "Windows", "Utility"],
      cover: "https://github.com/benyigiteren/bigpocket/raw/main/bigpocket.png",
      excerpt:
        "Android cihazınızı bilgisayarınız için mikrofon, kamera, streamdeck veya fareye dönüştüren çok yönlü araç.",
      description: [
        "Telefonun donanım potansiyelini bilgisayara taşıyan kapsamlı bir köprü uygulaması. Android cihazınızı Windows bilgisayarınızda anında web kamerası, mikrofon, StreamDeck veya klavye/mouse olarak kullanmanızı sağlıyor.",
        "Ekstra olarak sunduğu hızlı dosya aktarımı sayesinde cihazlar arası etkileşimi tek bir uygulamada topluyor. Şimdilik Windows ve Android ekosistemini destekliyor."
      ],
      featured: true,
      status: "shipped",
      links: { source: "https://github.com/benyigiteren/bigpocket" },
    },
    {
      slug: "bingo",
      title: "Bingo",
      tagline: "Go tabanlı Pastebin Alternatifi",
      year: "2026",
      tags: ["Go", "Open Source"],
      cover: "https://github.com/benyigiteren/bingo/raw/main/assets/bingo-banner.webp",
      excerpt:
        "Hızlı, hafif ve self-hosted kullanıma uygun Go tabanlı açık kaynak Pastebin alternatifi.",
      description: [
        "Kod parçacıklarını ve metinleri güvenli bir şekilde paylaşıp depolamak için geliştirdiğim Pastebin alternatifi.",
        "Tamamen Go ile yazıldığı için çok düşük kaynak tüketiyor. Karmaşık platformlara bağlı kalmak istemeyenler için hızlı ve minimal bir çözüm."
      ],
      featured: false,
      status: "shipped",
      links: { source: "https://github.com/benyigiteren/bingo" },
    },
    {
      slug: "gotree",
      title: "GoTree",
      tagline: "Self-hosted Modern Linktree Alternatifi",
      year: "2026",
      tags: ["Go", "Routing"],
      cover: "https://github.com/benyigiteren/gotree/raw/master/gotreegithub.png",
      excerpt:
        "Standart link platformlarına bağlı kalmadan kendi sunucunda koşturabileceğin performanslı link rehberi.",
      description: [
        "Linktree gibi servislere alternatif olarak geliştirdiğim, native Go mimarisine sahip açık kaynak projem.",
        "Arka planda özel bir router kurulumu var. Profili kendi sunucunda barındırıp (self-hosted) tam kontrol sahibi olmak isteyenler için tasarlandı."
      ],
      featured: false,
      status: "shipped",
      links: { source: "https://github.com/benyigiteren/gotree" },
    },
    {
      slug: "goform",
      title: "GoForm",
      tagline: "Go Tabanlı Google Form Alternatifi",
      year: "2026",
      tags: ["Go", "Open Source"],
      cover: "https://picsum.photos/seed/googleform/1200/800",
      excerpt:
        "Dışa bağımlılığı ortadan kaldıran, hızlı ve mobil uyumlu açık kaynak form altyapısı.",
      description: [
        "Geliştirdiğim projelerde kendi verimi kendi sunucumda tutmak için yazıp açık kaynak hale getirdiğim Google Form alternatifi.",
        "Özellikle mobil render tarafındaki sorunsuz çalışması ve sistem performansını etkilemeden stabil veri akışı sağlaması üzerine odaklandım."
      ],
      featured: false,
      status: "shipped",
      links: { source: "https://github.com/benyigiteren/goform" },
    },
    {
      slug: "uptimego",
      title: "UptimeGo",
      tagline: "Go Tabanlı Uptime Monitörü",
      year: "2026",
      tags: ["Go", "Monitoring"],
      cover: "https://github.com/benyigiteren/uptimego/raw/main/uptimegogithub.png",
      excerpt:
        "Kendi servis ve projelerinin ayakta olup olmadığını izlemeni sağlayan hafif sunucu takip aracı.",
      description: [
        "MenüKolay ve diğer servislerimin uptime durumunu anlık takip etmek için geliştirdiğim Go tabanlı izleme (monitoring) uygulaması.",
        "Sürekli arka planda çalışarak sitelerin durumunu kontrol ediyor ve sistem çökmelerinde hızlı aksiyon almanı sağlıyor."
      ],
      featured: false,
      status: "shipped",
      links: { source: "https://github.com/benyigiteren/uptimego" },
    },
    {
      slug: "goascii",
      title: "GoAscii",
      tagline: "Terminalde Hareketli ASCII Sanatı",
      year: "2026",
      tags: ["Go", "Terminal"],
      cover: "https://picsum.photos/seed/terminalparrot/1200/800",
      excerpt:
        "Terminal üzerinden eğlenceli ve hareketli ASCII animasyonları izlemenizi sağlayan ascii.live alternatifi.",
      description: [
        "ascii.live projesinden ilham alarak tamamen Go dili ile geliştirdiğim, terminal ekranında hareketli animasyonlar oynatan eğlenceli bir araç.",
        "Terminal arayüzlerinde (CLI) neler yapılabileceğini görmek için yazdığım keyifli bir deney projesi."
      ],
      featured: false,
      status: "shipped",
      links: { source: "https://github.com/benyigiteren/goascii" },
    },
  ] as Project[],

  footer: {
    credit: "© 2026 Yiğit Eren",
    tagline:
      "Vibecoding ile SaaS ürünleri ve açık kaynak araçlar geliştiren, kendi sunucusunda projeler koşturan 15 yaşında bir geliştirici.",
    repoPrompt: "Websitemi beğendin mi?",
    repoLink: "https://github.com/benyigiteren/portfolyo-website",
    repoLinkLabel: "Al Github Reposu",
  },

  // --- ARAYÜZ METİNLERİ (butonlar, etiketler, 404) ---
  ui: {
    // Proje durum etiketleri (ProjectCard ve proje detay sayfasında kullanılır)
    statusLabels: {
      shipped: "Yayında",
      "geliştiriliyor": "Geliştiriliyor",
      kavram: "Kavram",
    } as Record<Project["status"], string>,
    buttons: {
      viewProjects: "Projeleri gör",
      contact: "İletişim",
      allProjects: "Tümünü gör",
      otherProjects: "Diğer projelere göz at",
      contactMe: "İletişime geç",
      backToProjects: "Tüm projeler",
      viewLive: "Canlı görün",
      sourceCode: "Kaynak kodu",
      continue: "Devam et",
      sendMail: "Mail yaz",
      backHome: "Ana sayfa",
      instagramWrite: "Instagram'dan yaz",
    },
    aria: {
      home: `${NAME} — ana sayfa`,
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      viewProjects: "Projeleri gör",
      contact: "İletişim",
      sendMail: "Mail gönder",
      instagramWrite: "Instagram'dan yaz",
      mailWrite: "Mail yaz",
    },
    footer: {
      siteHeading: "Site",
      socialHeading: "Bağlantılar",
    },
    notFound: {
      code: "404",
      title: "Burada bir şey yok.",
      description:
        "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Ana sayfaya dönüp yeniden başlayalım.",
    },
  },

  // --- SAYFA METİNLERİ ---
  pages: {
    projects: {
      metadata: {
        description:
          "Yiğit Eren'in yapay zekâ, web ve otomasyon üzerine geliştirdiği projeler.",
      },
      label: "Arşiv",
      title: "Projeler",
      intro:
        "Üzerinde çalıştığım, yayına aldığım ve henüz kâğıt üstündeki her şey. Bir projeye dokununca hikâyesinin tamamına ulaşabilirsin.",
      countSuffix: "proje",
      ctaTitle: "Aklında bir proje mi var?",
      ctaDescription:
        "Birlikte bir şeyler üretmek istersen, bir mesaj uzaklıkta.",
    },
    projectDetail: {
      aboutHeading: "Proje hakkında",
      nextLabel: "Sırada",
      contactLabel: "Bağlantıda kal",
      contactDescription:
        "Bir fikir, bir soru veya bir iş birliği için bana ulaşmak istersen:",
    },
    contact: {
      metadata: {
        description: "Yiğit Eren ile iletişim — mail ve Instagram.",
      },
      label: "İletişim",
      title: "Selam ver.",
      intro:
        "Hızlı ve doğrudan. İki kapım var: mail ya da Instagram. Hangisinden yazarsan yaz, en kısa sürede dönerim.",
      mailLabel: "Mail",
      mailDescription:
        "Bir fikir, soru veya iş birliği için en doğru kanal.",
      instagramLabel: "Instagram",
      instagramHandle: "@benyigiteren",
      instagramDescription:
        "Hızlı yanıt için en kısa yol. DM'e yazman yeterli.",
    },
  },
};

// --- Türetilmiş yardımcılar ---
export const featuredProjects = config.projects.filter((p) => p.featured);
export const projects = config.projects;
export const site = config;