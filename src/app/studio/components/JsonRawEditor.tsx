"use client";

import React, { useState, useEffect } from "react";
import type { SiteConfig } from "@/lib/config";
import { Check, DownloadSimple, WarningCircle, FloppyDisk } from "@/components/icons";

interface JsonRawEditorProps {
  config: SiteConfig;
  onApply: (parsed: SiteConfig) => void;
  onExport: () => void;
}

export function JsonRawEditor({ config, onApply, onExport }: JsonRawEditorProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setText(JSON.stringify(config, null, 2));
    setError(null);
  }, [config]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    try {
      JSON.parse(val);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Geçersiz JSON biçimi");
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text);
      onApply(parsed);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Geçersiz JSON");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Ham JSON Yapılandırması</h2>
          <p className="text-xs text-slate-400">
            Tüm içerik verisini doğrudan JSON olarak düzenleyebilir, kopyalayabilir veya
            yedekleyebilirsin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[.08] hover:text-white"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : null}
            <span>{copied ? "Kopyalandı!" : "Kopyala"}</span>
          </button>

          <button
            type="button"
            onClick={onExport}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[.08] hover:text-white"
          >
            <DownloadSimple size={14} />
            <span>JSON İndir</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={Boolean(error)}
            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 disabled:opacity-40"
          >
            <FloppyDisk size={14} />
            <span>Değişiklikleri Uygula</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
          <WarningCircle size={16} weight="fill" />
          <span>Sözdizimi Hatası: {error}</span>
        </div>
      )}

      <div className="relative rounded-2xl border border-white/10 bg-[#07080c] p-1 font-mono">
        <textarea
          rows={26}
          value={text}
          onChange={handleTextChange}
          spellCheck={false}
          className="w-full resize-y rounded-xl bg-transparent p-4 font-mono text-xs leading-relaxed text-slate-200 outline-none focus:ring-1 focus:ring-red-500/50"
        />
      </div>
    </div>
  );
}
