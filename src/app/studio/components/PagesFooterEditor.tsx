"use client";

import React from "react";
import type { SiteConfig } from "@/lib/config";

interface PagesFooterEditorProps {
  config: SiteConfig;
  onChange: (updated: Partial<SiteConfig>) => void;
}

export function PagesFooterEditor({ config, onChange }: PagesFooterEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">Sayfa Metinleri & Altbilgi (Footer)</h2>
        <p className="text-xs text-slate-400">
          Hakkımda, İletişim, Projeler sayfalarındaki metinler ve altbilgi (footer) telif içerikleri.
        </p>
      </div>

      {/* Altbilgi (Footer) Kartı */}
      <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          Altbilgi (Footer) Ayarları
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Telif Yazısı (Credit)</label>
            <input
              type="text"
              value={config.footer.credit}
              onChange={(e) =>
                onChange({
                  footer: { ...config.footer, credit: e.target.value },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Repo Tanıtım Başlığı</label>
            <input
              type="text"
              value={config.footer.repoPrompt}
              onChange={(e) =>
                onChange({
                  footer: { ...config.footer, repoPrompt: e.target.value },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">Footer Biyografi / Tagline</label>
          <textarea
            rows={2}
            value={config.footer.tagline}
            onChange={(e) =>
              onChange({
                footer: { ...config.footer, tagline: e.target.value },
              })
            }
            className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Repo Buton Yazısı</label>
            <input
              type="text"
              value={config.footer.repoLinkLabel}
              onChange={(e) =>
                onChange({
                  footer: { ...config.footer, repoLinkLabel: e.target.value },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Repo Bağlantısı (URL)</label>
            <input
              type="text"
              value={config.footer.repoLink}
              onChange={(e) =>
                onChange({
                  footer: { ...config.footer, repoLink: e.target.value },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs font-mono text-white outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Projeler Sayfası Metinleri */}
      <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          Projeler Sayfası Metinleri (/projeler)
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Sayfa Başlığı</label>
            <input
              type="text"
              value={config.pages.projects.title}
              onChange={(e) =>
                onChange({
                  pages: {
                    ...config.pages,
                    projects: { ...config.pages.projects, title: e.target.value },
                  },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Etiket (Label)</label>
            <input
              type="text"
              value={config.pages.projects.label}
              onChange={(e) =>
                onChange({
                  pages: {
                    ...config.pages,
                    projects: { ...config.pages.projects, label: e.target.value },
                  },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">Giriş Paragrafı</label>
          <textarea
            rows={2}
            value={config.pages.projects.intro}
            onChange={(e) =>
              onChange({
                pages: {
                  ...config.pages,
                  projects: { ...config.pages.projects, intro: e.target.value },
                },
              })
            }
            className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Alt Çağrı (CTA) Başlığı</label>
            <input
              type="text"
              value={config.pages.projects.ctaTitle}
              onChange={(e) =>
                onChange({
                  pages: {
                    ...config.pages,
                    projects: { ...config.pages.projects, ctaTitle: e.target.value },
                  },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Alt Çağrı Açıklaması</label>
            <input
              type="text"
              value={config.pages.projects.ctaDescription}
              onChange={(e) =>
                onChange({
                  pages: {
                    ...config.pages,
                    projects: { ...config.pages.projects, ctaDescription: e.target.value },
                  },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* İletişim Sayfası Metinleri */}
      <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          İletişim Sayfası Metinleri (/iletisim)
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Sayfa Başlığı</label>
            <input
              type="text"
              value={config.pages.contact.title}
              onChange={(e) =>
                onChange({
                  pages: {
                    ...config.pages,
                    contact: { ...config.pages.contact, title: e.target.value },
                  },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Instagram Kullanıcı Adı</label>
            <input
              type="text"
              value={config.pages.contact.instagramHandle}
              onChange={(e) =>
                onChange({
                  pages: {
                    ...config.pages,
                    contact: { ...config.pages.contact, instagramHandle: e.target.value },
                  },
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs font-mono text-white outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">İletişim Giriş Cümlesi</label>
          <textarea
            rows={2}
            value={config.pages.contact.intro}
            onChange={(e) =>
              onChange({
                pages: {
                  ...config.pages,
                  contact: { ...config.pages.contact, intro: e.target.value },
                },
              })
            }
            className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );
}
