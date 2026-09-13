"use client";

import React, { useRef } from "react";
import {
  FloppyDisk,
  RocketLaunch,
  DownloadSimple,
  UploadSimple,
  GitBranch,
  ArrowUpRight,
  Check,
  ArrowsClockwise,
} from "@/components/icons";

interface StudioHeaderProps {
  isDirty: boolean;
  isSaving: boolean;
  gitStatus: {
    branch: string;
    isDirty: boolean;
    unpushedCount: number;
    lastCommit: string;
  } | null;
  onSave: () => void;
  onOpenPushModal: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  onRefresh: () => void;
}

export function StudioHeader({
  isDirty,
  isSaving,
  gitStatus,
  onSave,
  onOpenPushModal,
  onExportJson,
  onImportJson,
  onRefresh,
}: StudioHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#090a0f]/90 px-4 backdrop-blur-xl sm:px-6">
      {/* Sol: Logo & Durum Bilgisi */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 font-bold text-white shadow-lg shadow-red-500/20">
            Y
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
                YİĞİT EREN STUDIO
              </span>
              <span className="rounded-md border border-red-500/30 bg-red-500/10 px-1.5 py-0.5 text-[10px] font-medium text-red-400">
                v1.0 Local CMS
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {isDirty ? (
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                  Kaydedilmemiş Değişiklikler Var
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check size={13} weight="bold" />
                  Tüm Değişiklikler Kaydedildi
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Git Durum Çipi */}
        {gitStatus && (
          <div className="ml-2 hidden items-center gap-2 rounded-lg border border-white/8 bg-white/[.03] px-2.5 py-1 text-xs text-slate-300 md:flex">
            <GitBranch size={14} className="text-slate-400" />
            <span className="font-mono text-[11px] text-red-400">{gitStatus.branch}</span>
            {gitStatus.isDirty && (
              <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-medium text-amber-300">
                Değişiklik var
              </span>
            )}
            {gitStatus.unpushedCount > 0 && (
              <span className="rounded-full bg-sky-500/20 px-1.5 py-0.2 text-[9px] font-medium text-sky-300">
                +{gitStatus.unpushedCount} push bekliyor
              </span>
            )}
          </div>
        )}
      </div>

      {/* Sağ: Aksiyon Butonları */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Gizli Dosya Girişi */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json,application/json"
          className="hidden"
        />

        {/* JSON İçe Aktar */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="JSON Dosyasından İçe Aktar"
          className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[.08] hover:text-white"
        >
          <UploadSimple size={14} />
          <span className="hidden sm:inline">İçe Aktar</span>
        </button>

        {/* JSON Dışa Aktar */}
        <button
          type="button"
          onClick={onExportJson}
          title="Mevcut Yapılandırmayı JSON Olarak İndir"
          className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[.08] hover:text-white"
        >
          <DownloadSimple size={14} />
          <span className="hidden sm:inline">Dışa Aktar</span>
        </button>

        {/* Yenile */}
        <button
          type="button"
          onClick={onRefresh}
          title="Diskteki son verileri tekrar yükle"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[.08] hover:text-white"
        >
          <ArrowsClockwise size={15} />
        </button>

        {/* Kaydet Butonu */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className={`flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-medium transition-all ${
            isDirty
              ? "bg-amber-500 text-black shadow-md shadow-amber-500/20 hover:bg-amber-400"
              : "border border-white/12 bg-white/[.06] text-slate-200 hover:bg-white/[.1]"
          }`}
        >
          <FloppyDisk size={15} weight={isDirty ? "bold" : "regular"} />
          <span>{isSaving ? "Kaydediliyor..." : "Kaydet"}</span>
          <kbd className="hidden rounded bg-black/30 px-1 py-0.5 text-[9px] opacity-70 lg:inline">
            Ctrl+S
          </kbd>
        </button>

        {/* GitHub'a Pushla Butonu */}
        <button
          type="button"
          onClick={onOpenPushModal}
          className="relative flex h-9 items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-red-600 via-rose-600 to-red-600 px-3.5 text-xs font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <RocketLaunch size={15} weight="fill" />
          <span>GitHub'a Pushla</span>
          <span className="hidden text-[10px] opacity-80 md:inline">& Canlıya Al</span>
        </button>

        {/* Siteyi Aç Linki */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="Siteyi Canlı Olarak Yeni Sekmede Aç"
          className="ml-1 hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-slate-400 transition-colors hover:border-white/20 hover:bg-white/[.08] hover:text-white sm:flex"
        >
          <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
  );
}
