"use client";

import React from "react";
import type { SiteConfig } from "@/lib/config";

interface HeroEditorProps {
  config: SiteConfig;
  onChange: (updated: Partial<SiteConfig>) => void;
}

export function HeroEditor({ config, onChange }: HeroEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">Hero & Kişisel Bilgiler</h2>
        <p className="text-xs text-slate-400">
          Anasayfa açılış ekranı (Hero), tanıtım başlıkları ve genel SEO yapılandırması.
        </p>
      </div>

      {/* Hero Başlıkları Kartı */}
      <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          Hero Başlık & Karşılama Alanı
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Üst Rozet Metni (Badge)
            </label>
            <input
              type="text"
              value={config.hero.badge ?? "15 yaşında geliştirici · Bursa"}
              onChange={(e) =>
                onChange({
                  hero: { ...config.hero, badge: e.target.value },
                })
              }
              placeholder="15 yaşında geliştirici · Bursa"
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Unvan / Rol
            </label>
            <input
              type="text"
              value={config.hero.role}
              onChange={(e) =>
                onChange({
                  hero: { ...config.hero, role: e.target.value },
                })
              }
              placeholder="Geliştirici"
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Büyük Başlık (İlk Satır)
            </label>
            <input
              type="text"
              value={config.hero.titlePrefix ?? "Merhaba,"}
              onChange={(e) =>
                onChange({
                  hero: { ...config.hero, titlePrefix: e.target.value },
                })
              }
              placeholder="Merhaba,"
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Vurgulu Başlık (Kırmızı Vurgulu İkinci Satır)
            </label>
            <input
              type="text"
              value={config.hero.titleHighlight ?? "Ben Yiğit."}
              onChange={(e) =>
                onChange({
                  hero: { ...config.hero, titleHighlight: e.target.value },
                })
              }
              placeholder="Ben Yiğit."
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Hero Açıklama Cümlesi
          </label>
          <textarea
            rows={2}
            value={
              config.hero.description ??
              "Go ve Next.js ile web ürünleri geliştiriyorum. Projelerimi kendi sunucularımda çalıştırıyorum."
            }
            onChange={(e) =>
              onChange({
                hero: { ...config.hero, description: e.target.value },
              })
            }
            className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Profil & İletişim Bilgileri */}
      <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          Kişisel Profil & İletişim
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Ad Soyad</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">E-Posta Adresi</label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">Konum</label>
            <input
              type="text"
              value={config.location}
              onChange={(e) => onChange({ location: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* SEO & Meta Bilgileri */}
      <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          SEO ve Arama Motoru Ayarları
        </h3>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">Site Ana URL'i</label>
          <input
            type="text"
            value={config.url}
            onChange={(e) => onChange({ url: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs font-mono text-white outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            SEO Açıklaması (Meta Description)
          </label>
          <textarea
            rows={2}
            value={config.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Anahtar Kelimeler (Keywords - Virgülle ayır)
          </label>
          <input
            type="text"
            value={config.keywords}
            onChange={(e) => onChange({ keywords: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-xs text-white outline-none focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );
}
