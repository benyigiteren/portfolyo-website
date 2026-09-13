"use client";

import React, { useState } from "react";
import type { TechItem } from "@/lib/config";
import { Plus, Trash, CaretUp, CaretDown } from "@/components/icons";

interface TechEditorProps {
  languages: TechItem[];
  tools: TechItem[];
  onChangeLanguages: (languages: TechItem[]) => void;
  onChangeTools: (tools: TechItem[]) => void;
}

export function TechEditor({
  languages,
  tools,
  onChangeLanguages,
  onChangeTools,
}: TechEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">Teknolojiler & Beceriler</h2>
        <p className="text-xs text-slate-400">
          Kullandığın programlama dilleri, kütüphaneler ve araçlar. İkonlar simpleicons.org
          üzerinden slug adına göre otomatik çekilir.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Diller & Çatılar */}
        <TechGroup
          title="Diller & Teknolojiler"
          description="Hakkımda sayfasında ve anasayfa kayan şeritte gösterilen diller."
          items={languages}
          onChange={onChangeLanguages}
        />

        {/* Araçlar */}
        <TechGroup
          title="Araçlar & Servisler"
          description="Geliştirme sürecinde kullandığın araç ve altyapılar."
          items={tools}
          onChange={onChangeTools}
        />
      </div>
    </div>
  );
}

function TechGroup({
  title,
  description,
  items,
  onChange,
}: {
  title: string;
  description: string;
  items: TechItem[];
  onChange: (items: TechItem[]) => void;
}) {
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const handleAdd = () => {
    if (!newName.trim() || !newSlug.trim()) return;
    onChange([
      ...items,
      {
        name: newName.trim(),
        slug: newSlug.trim().toLowerCase(),
      },
    ]);
    setNewName("");
    setNewSlug("");
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    onChange(copy);
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#10121a]/80 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-[11px] text-slate-400">{description}</p>
      </div>

      {/* Yeni Ekleme Girişi */}
      <div className="flex gap-2 rounded-xl border border-white/8 bg-[#090a0f] p-2 text-xs">
        <input
          type="text"
          value={newName}
          onChange={(e) => {
            const v = e.target.value;
            setNewName(v);
            if (!newSlug) {
              setNewSlug(v.toLowerCase().replace(/[^a-z0-9]/g, ""));
            }
          }}
          placeholder="Ad (Örn: Go)"
          className="flex-1 rounded-lg bg-white/[.04] px-2.5 py-1.5 text-white outline-none placeholder-slate-500"
        />
        <input
          type="text"
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          placeholder="Slug (Örn: go)"
          className="w-28 rounded-lg bg-white/[.04] px-2.5 py-1.5 font-mono text-white outline-none placeholder-slate-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newName.trim() || !newSlug.trim()}
          className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-500 disabled:opacity-30"
        >
          <Plus size={14} weight="bold" />
          Ekle
        </button>
      </div>

      {/* Öğe Listesi */}
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[.02] p-2 text-xs hover:border-white/12 hover:bg-white/[.04]"
          >
            <div className="flex items-center gap-2.5">
              {/* İkon Önizleme */}
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 p-1">
                <img
                  src={`https://cdn.simpleicons.org/${item.slug}/white`}
                  alt=""
                  className="h-4 w-4 opacity-80"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <span className="font-medium text-white">{item.name}</span>
              <span className="font-mono text-[10px] text-slate-500">({item.slug})</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => move(index, "up")}
                className="rounded p-1 text-slate-500 hover:bg-white/10 hover:text-white disabled:opacity-20"
              >
                <CaretUp size={12} weight="bold" />
              </button>
              <button
                type="button"
                disabled={index === items.length - 1}
                onClick={() => move(index, "down")}
                className="rounded p-1 text-slate-500 hover:bg-white/10 hover:text-white disabled:opacity-20"
              >
                <CaretDown size={12} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="rounded p-1 text-slate-500 hover:bg-red-500/20 hover:text-red-400"
              >
                <Trash size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
