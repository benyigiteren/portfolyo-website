"use client";

import React, { useState } from "react";
import type { SiteConfig, Project } from "@/lib/config";
import {
  Desktop,
  DeviceTablet,
  DeviceMobile,
  ArrowsClockwise,
  PencilSimple,
  Sparkle,
  ArrowUpRight,
  Plus,
  Trash,
  Check,
} from "@/components/icons";

interface VisualEditorProps {
  config: SiteConfig;
  onChange: (updated: Partial<SiteConfig>) => void;
  onEditProject: (project: Project) => void;
}

export function VisualEditor({ config, onChange, onEditProject }: VisualEditorProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [viewMode, setViewMode] = useState<"canvas" | "iframe">("canvas");
  const [iframeKey, setIframeKey] = useState(0);

  // Doğrudan inline düzenleme yardımcıları
  const updateHero = (key: string, val: string) => {
    onChange({
      hero: { ...config.hero, [key]: val },
    });
  };

  const updateProfile = (key: string, val: string) => {
    onChange({ [key]: val });
  };

  const toggleFeaturedProject = (index: number) => {
    const updated = [...config.projects];
    updated[index] = { ...updated[index], featured: !updated[index].featured };
    onChange({ projects: updated });
  };

  return (
    <div className="space-y-4">
      {/* Üst Cihaz & Mod Araç Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#10121a]/90 p-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Görünüm Modu: Görsel Tuval vs Canlı Web Sitesi */}
          <div className="flex items-center rounded-xl bg-white/[.04] p-1 border border-white/6 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("canvas")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                viewMode === "canvas"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              ✏️ Görsel Düzenleme Tuvali (Tıkla & Yaz)
            </button>
            <button
              type="button"
              onClick={() => setViewMode("iframe")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                viewMode === "iframe"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🌐 Tam Canlı Site Çerçevesi (Iframe)
            </button>
          </div>
        </div>

        {/* Cihaz Boyutları */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-xl bg-white/[.04] p-1 border border-white/6 text-xs text-slate-400">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              title="Masaüstü (100%)"
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-colors ${
                device === "desktop" ? "bg-white/10 text-white" : "hover:text-white"
              }`}
            >
              <Desktop size={15} />
              <span className="hidden sm:inline">Masaüstü</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice("tablet")}
              title="Tablet (768px)"
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-colors ${
                device === "tablet" ? "bg-white/10 text-white" : "hover:text-white"
              }`}
            >
              <DeviceTablet size={15} />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              title="Mobil (390px)"
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-colors ${
                device === "mobile" ? "bg-white/10 text-white" : "hover:text-white"
              }`}
            >
              <DeviceMobile size={15} />
              <span className="hidden sm:inline">Mobil</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIframeKey((k) => k + 1)}
            title="Önizlemeyi Yenile"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[.04] text-slate-300 hover:bg-white/[.08] hover:text-white"
          >
            <ArrowsClockwise size={15} />
          </button>
        </div>
      </div>

      {/* Önizleme Konteyneri */}
      <div className="flex justify-center transition-all duration-300">
        <div
          className={`w-full transition-all duration-300 ${
            device === "desktop"
              ? "max-w-full"
              : device === "tablet"
              ? "max-w-[768px]"
              : "max-w-[390px]"
          }`}
        >
          {viewMode === "iframe" ? (
            /* IFRAME CANLI SİTE */
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-black shadow-2xl">
              <iframe
                key={iframeKey}
                src="/"
                className="h-[82vh] w-full border-0"
                title="Canlı Site Önizleme"
              />
            </div>
          ) : (
            /* ETKİLEŞİMLİ GÖRSEL DÜZENLEME TUVALİ (WYSIWYG TIKLA & YAZ) */
            <div className="relative space-y-12 overflow-hidden rounded-2xl border border-white/12 bg-[#070707] p-6 sm:p-10 shadow-2xl">
              {/* Bilgilendirme Notu */}
              <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs text-red-200">
                <span className="flex items-center gap-2">
                  <PencilSimple size={15} className="text-red-400" />
                  Metinlerin üzerine tıklayarak doğrudan yazabilir ve düzenleyebilirsin.
                </span>
                <span className="text-[10px] opacity-70">Canlı Senkronize</span>
              </div>

              {/* 1. HERO ALANI CANLI ÖNİZLEME & DÜZENLEME */}
              <section className="relative rounded-2xl border border-dashed border-white/15 p-6 transition-all hover:border-red-500/50">
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                  <PencilSimple size={10} />
                  Hero Bölümü
                </div>

                {/* Rozet */}
                <div className="group relative inline-block">
                  <input
                    type="text"
                    value={config.hero.badge ?? "15 yaşında geliştirici · Bursa"}
                    onChange={(e) => updateHero("badge", e.target.value)}
                    className="rounded border border-transparent bg-transparent text-xs font-semibold uppercase tracking-[.2em] text-red-500 outline-none hover:border-white/20 focus:border-red-500 focus:bg-white/5 px-1"
                  />
                </div>

                {/* Başlık */}
                <div className="mt-4 space-y-1">
                  <div>
                    <input
                      type="text"
                      value={config.hero.titlePrefix ?? "Merhaba,"}
                      onChange={(e) => updateHero("titlePrefix", e.target.value)}
                      className="w-full rounded border border-transparent bg-transparent text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight tracking-tight text-white outline-none hover:border-white/20 focus:border-red-500 focus:bg-white/5"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={config.hero.titleHighlight ?? `Ben ${config.name}.`}
                      onChange={(e) => updateHero("titleHighlight", e.target.value)}
                      className="w-full rounded border border-transparent bg-transparent text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight tracking-tight text-red-500 outline-none hover:border-white/20 focus:border-red-500 focus:bg-white/5"
                    />
                  </div>
                </div>

                {/* Hero Açıklama */}
                <div className="mt-5 max-w-2xl border-l-2 border-red-500/60 pl-4">
                  <textarea
                    rows={2}
                    value={
                      config.hero.description ??
                      "Go ve Next.js ile web ürünleri geliştiriyorum. Projelerimi kendi sunucularımda çalıştırıyorum."
                    }
                    onChange={(e) => updateHero("description", e.target.value)}
                    className="w-full resize-none rounded border border-transparent bg-transparent text-sm leading-relaxed text-slate-300 outline-none hover:border-white/20 focus:border-red-500 focus:bg-white/5"
                  />
                </div>

                {/* Butonlar */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-600/20">
                    Projelerim <ArrowUpRight size={14} />
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white">
                    İletişim <ArrowUpRight size={14} />
                  </div>
                </div>
              </section>

              {/* 2. PROJELER ALANI CANLI ÖNİZLEME */}
              <section className="relative rounded-2xl border border-dashed border-white/15 p-6 transition-all hover:border-red-500/50">
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                  <PencilSimple size={10} />
                  Projeler Bölümü
                </div>

                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">
                    Projeler
                  </span>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
                    Yaptığım işler.
                  </h2>
                </div>

                {/* Proje Kartları Izgarası */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {config.projects.map((project, index) => (
                    <div
                      key={project.slug}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#12141c] p-4 transition-all hover:border-red-500/40 hover:bg-[#161924]"
                    >
                      <div>
                        {/* Kapak Görseli */}
                        <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                          {project.cover ? (
                            <img
                              src={project.cover}
                              alt={project.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center text-xs text-slate-600">
                              Kapak Yok
                            </div>
                          )}

                          {/* Öne Çıkarılan Butonu */}
                          <button
                            type="button"
                            onClick={() => toggleFeaturedProject(index)}
                            title={
                              project.featured
                                ? "Öne Çıkarılanlardan Kaldır"
                                : "Öne Çıkarılan Olarak İşaretle"
                            }
                            className={`absolute right-2 top-2 rounded-lg p-1.5 shadow backdrop-blur-md transition-colors ${
                              project.featured
                                ? "bg-red-500 text-white"
                                : "bg-black/60 text-slate-400 hover:text-white"
                            }`}
                          >
                            <Sparkle size={13} weight={project.featured ? "fill" : "regular"} />
                          </button>
                        </div>

                        {/* Başlık & Yıl */}
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-white text-sm">{project.title}</h4>
                          <span className="text-[10px] text-slate-500">{project.year}</span>
                        </div>

                        {/* Tagline */}
                        <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Kart Altı: Düzenle Butonu */}
                      <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
                        <span
                          className={`rounded px-1.5 py-0.2 text-[9px] font-medium ${
                            project.status === "shipped"
                              ? "text-emerald-400"
                              : project.status === "geliştiriliyor"
                              ? "text-sky-400"
                              : "text-amber-400"
                          }`}
                        >
                          ● {project.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => onEditProject(project)}
                          className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                        >
                          <PencilSimple size={12} />
                          Kartı Düzenle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. HAKKIMDA BÖLÜMÜ CANLI ÖNİZLEME */}
              <section className="relative rounded-2xl border border-dashed border-white/15 p-6 transition-all hover:border-red-500/50">
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                  <PencilSimple size={10} />
                  Hakkımda Bölümü
                </div>

                <span className="text-[10px] uppercase tracking-widest text-slate-500">
                  Hakkımda
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  15 yaşındayım. <span className="text-red-500">Ürün geliştiriyorum.</span>
                </h2>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/8 bg-white/[.02] p-3">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Konum</p>
                    <input
                      type="text"
                      value={config.location}
                      onChange={(e) => updateProfile("location", e.target.value)}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-white outline-none focus:text-red-400"
                    />
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[.02] p-3">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">E-Posta</p>
                    <input
                      type="text"
                      value={config.email}
                      onChange={(e) => updateProfile("email", e.target.value)}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-white outline-none focus:text-red-400"
                    />
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[.02] p-3">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Geliştirici</p>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => updateProfile("name", e.target.value)}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-white outline-none focus:text-red-400"
                    />
                  </div>
                </div>

                {/* Teknolojiler Etiketleri */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {config.about.languages.map((item) => (
                    <span
                      key={item.name}
                      className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-xs text-slate-300"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </section>

              {/* 4. FOOTER / ALTBİLGİ CANLI ÖNİZLEME */}
              <footer className="relative rounded-2xl border border-dashed border-white/15 p-6 transition-all hover:border-red-500/50">
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                  <PencilSimple size={10} />
                  Altbilgi (Footer)
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <input
                      type="text"
                      value={config.footer.credit}
                      onChange={(e) =>
                        onChange({
                          footer: { ...config.footer, credit: e.target.value },
                        })
                      }
                      className="w-full bg-transparent text-sm font-bold text-white outline-none hover:border-b hover:border-white/20 focus:border-red-500"
                    />
                    <textarea
                      rows={2}
                      value={config.footer.tagline}
                      onChange={(e) =>
                        onChange({
                          footer: { ...config.footer, tagline: e.target.value },
                        })
                      }
                      className="mt-1 w-full resize-none bg-transparent text-xs text-slate-400 outline-none hover:border-b hover:border-white/20 focus:border-red-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {config.social.map((s) => (
                      <span
                        key={s.label}
                        className="rounded-lg border border-white/10 bg-white/[.03] px-2.5 py-1 text-slate-300"
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              </footer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
