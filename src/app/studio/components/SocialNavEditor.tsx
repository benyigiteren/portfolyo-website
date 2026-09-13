"use client";

import React, { useState } from "react";
import type { SocialLink, NavLink, SocialIcon } from "@/lib/config";
import { Plus, Trash, Globe } from "@/components/icons";

const ICON_OPTIONS: SocialIcon[] = [
  "github",
  "youtube",
  "instagram",
  "mail",
  "linkedin",
  "x",
  "discord",
  "tiktok",
  "telegram",
  "twitch",
  "website",
];

interface SocialNavEditorProps {
  social: SocialLink[];
  nav: NavLink[];
  onChangeSocial: (social: SocialLink[]) => void;
  onChangeNav: (nav: NavLink[]) => void;
}

export function SocialNavEditor({
  social,
  nav,
  onChangeSocial,
  onChangeNav,
}: SocialNavEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">Sosyal Medya & Menü</h2>
        <p className="text-xs text-slate-400">
          Sitedeki sosyal medya hesap bağlantıları ve üst navigasyon menüsü.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sosyal Medya Bağlantıları */}
        <SocialLinksEditor social={social} onChange={onChangeSocial} />

        {/* Menü Linkleri */}
        <NavLinksEditor nav={nav} onChange={onChangeNav} />
      </div>
    </div>
  );
}

function SocialLinksEditor({
  social,
  onChange,
}: {
  social: SocialLink[];
  onChange: (social: SocialLink[]) => void;
}) {
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");
  const [newIcon, setNewIcon] = useState<SocialIcon>("github");

  const handleAdd = () => {
    if (!newLabel.trim() || !newHref.trim()) return;
    onChange([...social, { label: newLabel.trim(), href: newHref.trim(), icon: newIcon }]);
    setNewLabel("");
    setNewHref("");
  };

  const handleRemove = (index: number) => {
    onChange(social.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">Sosyal Medya Hesapları</h3>
        <p className="text-[11px] text-slate-400">
          Altbilgide ve iletişim alanlarında görünen profiller.
        </p>
      </div>

      {/* Yeni Ekle */}
      <div className="space-y-2 rounded-xl border border-white/8 bg-[#090a0f] p-3 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Etiket (Örn: GitHub)"
            className="rounded-lg bg-white/[.04] p-2 text-white outline-none placeholder-slate-500"
          />
          <select
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value as SocialIcon)}
            className="rounded-lg bg-white/[.04] p-2 text-white outline-none"
          >
            {ICON_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[#10121a]">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newHref}
            onChange={(e) => setNewHref(e.target.value)}
            placeholder="URL (https://github.com/...)"
            className="flex-1 rounded-lg bg-white/[.04] p-2 font-mono text-white outline-none placeholder-slate-500"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!newLabel.trim() || !newHref.trim()}
            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 font-medium text-white hover:bg-red-500 disabled:opacity-30"
          >
            <Plus size={14} weight="bold" />
            Ekle
          </button>
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {social.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[.02] p-2.5 text-xs hover:border-white/12"
          >
            <div className="min-w-0 flex-1 pr-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{item.label}</span>
                <span className="rounded bg-white/6 px-1.5 py-0.2 text-[9px] font-mono text-slate-400">
                  {item.icon}
                </span>
              </div>
              <p className="truncate font-mono text-[11px] text-slate-500 mt-0.5">{item.href}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="rounded p-1 text-slate-500 hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavLinksEditor({
  nav,
  onChange,
}: {
  nav: NavLink[];
  onChange: (nav: NavLink[]) => void;
}) {
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");

  const handleAdd = () => {
    if (!newLabel.trim() || !newHref.trim()) return;
    onChange([...nav, { label: newLabel.trim(), href: newHref.trim() }]);
    setNewLabel("");
    setNewHref("");
  };

  const handleRemove = (index: number) => {
    onChange(nav.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">Üst Menü Bağlantıları</h3>
        <p className="text-[11px] text-slate-400">
          Sitenin üst gezinti çubuğundaki (Navbar) linkler.
        </p>
      </div>

      {/* Yeni Ekle */}
      <div className="flex gap-2 rounded-xl border border-white/8 bg-[#090a0f] p-2.5 text-xs">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Menü Adı (Örn: Blog)"
          className="flex-1 rounded-lg bg-white/[.04] p-2 text-white outline-none placeholder-slate-500"
        />
        <input
          type="text"
          value={newHref}
          onChange={(e) => setNewHref(e.target.value)}
          placeholder="Yol (/blog)"
          className="w-32 rounded-lg bg-white/[.04] p-2 font-mono text-white outline-none placeholder-slate-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newLabel.trim() || !newHref.trim()}
          className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 font-medium text-white hover:bg-red-500 disabled:opacity-30"
        >
          <Plus size={14} weight="bold" />
          Ekle
        </button>
      </div>

      {/* Liste */}
      <div className="space-y-2">
        {nav.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[.02] p-2.5 text-xs hover:border-white/12"
          >
            <div>
              <span className="font-semibold text-white">{item.label}</span>
              <span className="ml-2 font-mono text-[11px] text-slate-400">{item.href}</span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="rounded p-1 text-slate-500 hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
