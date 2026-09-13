"use client";

import React, { useState, useEffect, useCallback } from "react";
import initialConfig from "@/data/config.json";
import type { SiteConfig, Project } from "@/lib/config";
import { StudioHeader } from "./components/StudioHeader";
import { VisualEditor } from "./components/VisualEditor";
import { ProjectsManager } from "./components/ProjectsManager";
import { HeroEditor } from "./components/HeroEditor";
import { TechEditor } from "./components/TechEditor";
import { SocialNavEditor } from "./components/SocialNavEditor";
import { PagesFooterEditor } from "./components/PagesFooterEditor";
import { JsonRawEditor } from "./components/JsonRawEditor";
import { GitPushModal } from "./components/GitPushModal";
import {
  Eye,
  Sliders,
  Article,
  BracketsCurly,
  Globe,
  Sparkle,
  Check,
  WarningCircle,
} from "@/components/icons";

type StudioTab = "visual" | "projects" | "hero" | "tech" | "social" | "pages" | "json";

export default function StudioPage() {
  const [config, setConfig] = useState<SiteConfig>(initialConfig as unknown as SiteConfig);
  const [savedConfigStr, setSavedConfigStr] = useState(JSON.stringify(initialConfig));
  const [activeTab, setActiveTab] = useState<StudioTab>("visual");
  const [isSaving, setIsSaving] = useState(false);
  const [isPushModalOpen, setIsPushModalOpen] = useState(false);
  const [gitStatus, setGitStatus] = useState<{
    branch: string;
    isDirty: boolean;
    unpushedCount: number;
    lastCommit: string;
  } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const isDirty = JSON.stringify(config) !== savedConfigStr;

  // Git Durumunu Sorgula
  const fetchGitStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/studio/git");
      const data = await res.json();
      if (data.success) {
        setGitStatus({
          branch: data.branch || "main",
          isDirty: data.isDirty,
          unpushedCount: data.unpushedCount,
          lastCommit: data.lastCommit,
        });
      }
    } catch {}
  }, []);

  // Sunucudaki son config.json'ı oku
  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/studio/config");
      const data = await res.json();
      if (data.success && data.data) {
        setConfig(data.data);
        setSavedConfigStr(JSON.stringify(data.data));
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchConfig();
    fetchGitStatus();
  }, [fetchConfig, fetchGitStatus]);

  // Kaydetme İşlemi (Ctrl+S veya Buton)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/studio/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSavedConfigStr(JSON.stringify(config));
        showToast("Tüm değişiklikler başarıyla kaydedildi! 🎉");
        fetchGitStatus();
      } else {
        showToast(data.error || "Kaydetme başarısız oldu.", "error");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Ağ hatası";
      showToast(msg, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Klavye Kısayolları (Ctrl+S / Ctrl+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setIsPushModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [config, savedConfigStr]);

  // JSON Dışa Aktar (Yedek İndir)
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement("a");
    const date = new Date().toISOString().split("T")[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `yigiteren-config-backup-${date}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Yapılandırma JSON dosyası indirildi.");
  };

  // JSON İçe Aktar (Yedek Yükle)
  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.name || !parsed.projects) {
          showToast("Geçersiz yapılandırma dosyası: name veya projects eksik.", "error");
          return;
        }
        setConfig(parsed);
        showToast("JSON dosyası başarıyla yüklendi! Kaydetmeyi unutmayın.");
      } catch {
        showToast("Dosya okunamadı veya geçersiz JSON biçimi.", "error");
      }
    };
    reader.readAsText(file);
  };

  // Config Güncelleme Yardımcısı
  const updateConfig = (updated: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const tabs: { id: StudioTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "visual", label: "Görsel Editör", icon: <Eye size={16} /> },
    { id: "projects", label: "Projeler", icon: <Article size={16} />, badge: config.projects.length },
    { id: "hero", label: "Hero & Profil", icon: <Sparkle size={16} /> },
    { id: "tech", label: "Teknolojiler", icon: <Sliders size={16} /> },
    { id: "social", label: "Sosyal Medya", icon: <Globe size={16} /> },
    { id: "pages", label: "Sayfa Metinleri", icon: <Article size={16} /> },
    { id: "json", label: "Ham JSON", icon: <BracketsCurly size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-red-500 selection:text-white">
      {/* Üst Yönetim Çubuğu */}
      <StudioHeader
        isDirty={isDirty}
        isSaving={isSaving}
        gitStatus={gitStatus}
        onSave={handleSave}
        onOpenPushModal={() => setIsPushModalOpen(true)}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onRefresh={fetchConfig}
      />

      {/* Ana Çalışma Alanı */}
      <div className="mx-auto max-w-[1720px] px-4 py-5 sm:px-6">
        {/* Sekme Menüsü */}
        <div className="mb-6 flex items-center gap-1 overflow-x-auto rounded-2xl border border-white/8 bg-[#10121a]/90 p-1.5 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:bg-white/[.04] hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.badge === "number" && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeTab === tab.id ? "bg-white/25 text-white" : "bg-white/10 text-slate-400"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sekme İçerikleri */}
        <main>
          {activeTab === "visual" && (
            <VisualEditor
              config={config}
              onChange={updateConfig}
              onEditProject={() => setActiveTab("projects")}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsManager
              projects={config.projects}
              onChange={(projects) => updateConfig({ projects })}
            />
          )}

          {activeTab === "hero" && <HeroEditor config={config} onChange={updateConfig} />}

          {activeTab === "tech" && (
            <TechEditor
              languages={config.about.languages}
              tools={config.about.tools}
              onChangeLanguages={(languages) =>
                updateConfig({
                  about: { ...config.about, languages },
                })
              }
              onChangeTools={(tools) =>
                updateConfig({
                  about: { ...config.about, tools },
                })
              }
            />
          )}

          {activeTab === "social" && (
            <SocialNavEditor
              social={config.social}
              nav={config.nav}
              onChangeSocial={(social) => updateConfig({ social })}
              onChangeNav={(nav) => updateConfig({ nav })}
            />
          )}

          {activeTab === "pages" && <PagesFooterEditor config={config} onChange={updateConfig} />}

          {activeTab === "json" && (
            <JsonRawEditor
              config={config}
              onApply={(newConfig) => {
                setConfig(newConfig);
                showToast("JSON değişiklikleri uygulandı.");
              }}
              onExport={handleExportJson}
            />
          )}
        </main>
      </div>

      {/* Git Push Modalı */}
      <GitPushModal
        isOpen={isPushModalOpen}
        onClose={() => setIsPushModalOpen(false)}
        branch={gitStatus?.branch || "main"}
        onSuccess={() => {
          setSavedConfigStr(JSON.stringify(config));
          fetchGitStatus();
          showToast("GitHub'a başarıyla pushlandı! 🚀");
        }}
      />

      {/* Bildirim Toast'ı */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-white/15 bg-[#12141c] px-4 py-3 text-xs font-medium text-white shadow-2xl backdrop-blur-xl">
          {toast.type === "success" ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check size={12} weight="bold" />
            </span>
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <WarningCircle size={12} weight="fill" />
            </span>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
