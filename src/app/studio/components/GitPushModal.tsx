"use client";

import React, { useState } from "react";
import {
  RocketLaunch,
  X,
  Check,
  WarningCircle,
  GitBranch,
  GitCommit,
  ArrowsClockwise,
} from "@/components/icons";

interface GitPushModalProps {
  isOpen: boolean;
  onClose: () => void;
  branch: string;
  onSuccess: () => void;
}

export function GitPushModal({ isOpen, onClose, branch, onSuccess }: GitPushModalProps) {
  const [commitMessage, setCommitMessage] = useState("site: içerik ve ayarlar güncellendi [Studio]");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handlePush = async () => {
    setStatus("loading");
    setLogs(["İşlem başlatılıyor...", `Hedef Branch: ${branch}`]);
    setErrorMessage("");

    try {
      // Önce diske güncel config yazılması sağlanır (Studio'daki onSave zaten kaydediyor ama emin olalım)
      const res = await fetch("/api/studio/git", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: commitMessage }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "GitHub push işlemi başarısız oldu.");
        if (data.logs) setLogs((prev) => [...prev, data.logs]);
        if (data.details) setLogs((prev) => [...prev, `Hata detayı: ${data.details}`]);
        return;
      }

      setStatus("success");
      setLogs((prev) => [
        ...prev,
        data.logs || "Değişiklikler GitHub'a başarıyla pushlandı.",
        `Commit Hash: ${data.commitHash || "HEAD"}`,
        "Vercel / Cloudflare otomatik dağıtım (deploy) tetiklendi!",
      ]);
      onSuccess();
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Bilinmeyen ağ veya sunucu hatası.";
      setErrorMessage(msg);
      setLogs((prev) => [...prev, `Kritik Hata: ${msg}`]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/12 bg-[#10121a] p-6 shadow-2xl shadow-black/80">
        {/* Üst Başlık */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <RocketLaunch size={20} weight="fill" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">GitHub'a Pushla & Dağıt</h3>
              <p className="text-xs text-slate-400">
                Yapılan değişiklikleri yerel Git'e commitler ve repoya pushlar.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={status === "loading"}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* İçerik */}
        <div className="mt-5 space-y-4">
          {/* Branch Bilgisi */}
          <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[.03] p-3 text-xs">
            <span className="flex items-center gap-2 text-slate-300">
              <GitBranch size={16} className="text-slate-400" />
              Hedef Branch:
            </span>
            <span className="rounded-md bg-red-500/20 px-2 py-0.5 font-mono text-red-300">
              origin/{branch}
            </span>
          </div>

          {/* Commit Mesajı Girişi */}
          {status !== "success" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">
                Commit Mesajı
              </label>
              <div className="relative flex items-center">
                <GitCommit size={16} className="absolute left-3 text-slate-500" />
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  disabled={status === "loading"}
                  placeholder="Örn: Proje listesi güncellendi"
                  className="w-full rounded-xl border border-white/10 bg-[#090a0f] py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>
          )}

          {/* Durum Mesajları */}
          {status === "loading" && (
            <div className="flex items-center gap-3 rounded-xl border border-sky-500/30 bg-sky-500/10 p-3.5 text-xs text-sky-200">
              <ArrowsClockwise size={18} className="animate-spin text-sky-400" />
              <div>
                <p className="font-semibold">GitHub'a Gönderiliyor...</p>
                <p className="text-[11px] text-sky-300/80">
                  `git add`, `git commit` ve `git push` komutları çalıştırılıyor.
                </p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
              <div className="flex items-center gap-2 font-semibold text-emerald-300">
                <Check size={18} weight="bold" />
                GitHub'a Başarıyla Gönderildi!
              </div>
              <p className="mt-1.5 text-[11px] text-emerald-300/80">
                GitHub repon güncellendi. Vercel veya bağlı hosting sağlayıcın otomatik olarak yeni
                sürümü derleyip yayına alacaktır.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-200">
              <div className="flex items-center gap-2 font-semibold text-red-400">
                <WarningCircle size={18} weight="fill" />
                Hata Oluştu
              </div>
              <p className="mt-1 text-[11px] text-red-300/90">{errorMessage}</p>
            </div>
          )}

          {/* Terminal / Log Penceresi */}
          {logs.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-black/60 p-3">
              <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                <span>Git İşlem Logları</span>
                <span>{branch}</span>
              </div>
              <div className="max-h-36 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 space-y-0.5">
                {logs.map((log, index) => (
                  <div key={index} className="break-all">
                    <span className="text-slate-600 mr-1.5">&gt;</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Butonlar */}
        <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-white/10 pt-4">
          {status === "success" ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500"
            >
              Tamam
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                disabled={status === "loading"}
                className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/[.08] hover:text-white"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handlePush}
                disabled={status === "loading" || !commitMessage.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/30 hover:brightness-110 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <ArrowsClockwise size={14} className="animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <RocketLaunch size={14} weight="fill" />
                    Onayla ve Pushla
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
