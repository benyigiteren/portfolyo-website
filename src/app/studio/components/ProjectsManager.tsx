"use client";

import React, { useState } from "react";
import type { Project, ProjectStatus } from "@/lib/config";
import {
  Plus,
  Trash,
  PencilSimple,
  CaretUp,
  CaretDown,
  Sparkle,
  ArrowUpRight,
  GithubLogo,
  Globe,
  X,
  Check,
} from "@/components/icons";

interface ProjectsManagerProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsManager({ projects, onChange }: ProjectsManagerProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Sıralama Değiştir (Yukarı / Aşağı)
  const moveProject = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  // Öne Çıkarılan Durumunu Değiştir
  const toggleFeatured = (index: number) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], featured: !updated[index].featured };
    onChange(updated);
  };

  // Proje Sil
  const deleteProject = (index: number) => {
    const p = projects[index];
    if (confirm(`"${p.title}" projesini silmek istediğine emin misin?`)) {
      const updated = projects.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  // Yeni Proje Oluştur
  const handleAddNew = () => {
    const newProj: Project = {
      slug: `yeni-proje-${Date.now().toString().slice(-4)}`,
      title: "Yeni Proje",
      tagline: "Proje alt başlığı buraya gelecek",
      year: new Date().getFullYear().toString(),
      tags: ["Next.js", "TypeScript"],
      cover: "https://picsum.photos/seed/yeni/1200/800",
      excerpt: "Kısa tanıtım metni buraya yazılacak.",
      description: ["Projenin detaylı açıklaması birinci paragrafı.", "İkinci paragraf metni."],
      featured: false,
      status: "geliştiriliyor",
      links: {
        live: "",
        source: "",
      },
    };
    setEditingProject(newProj);
    setIsNew(true);
  };

  // Proje Klonla
  const cloneProject = (index: number) => {
    const source = projects[index];
    const cloned: Project = {
      ...source,
      slug: `${source.slug}-kopya`,
      title: `${source.title} (Kopya)`,
      featured: false,
    };
    const updated = [...projects];
    updated.splice(index + 1, 0, cloned);
    onChange(updated);
  };

  // Proje Kaydet (Modal)
  const saveProjectModal = (proj: Project) => {
    if (isNew) {
      onChange([proj, ...projects]);
    } else {
      const updated = projects.map((p) => (p.slug === editingProject?.slug ? proj : p));
      onChange(updated);
    }
    setEditingProject(null);
    setIsNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Üst Kısım */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Projeler Yönetimi</h2>
          <p className="text-xs text-slate-400">
            Toplam {projects.length} proje listeleniyor. Sürükleyip bırakarak veya oklara basarak
            sıralamayı değiştirebilirsin.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 active:scale-95"
        >
          <Plus size={16} weight="bold" />
          Yeni Proje Ekle
        </button>
      </div>

      {/* Projeler Tablosu / Kart Listesi */}
      <div className="space-y-3">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className="group flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#10121a]/80 p-4 backdrop-blur-sm transition-all hover:border-white/16 hover:bg-[#141722] sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Sol: Sıralama Okları + Görsel + Başlık */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              {/* Sıralama Butonları */}
              <div className="flex flex-col gap-1 text-slate-500">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveProject(index, "up")}
                  className="rounded p-1 hover:bg-white/10 hover:text-white disabled:opacity-25"
                  title="Yukarı Taşı"
                >
                  <CaretUp size={14} weight="bold" />
                </button>
                <button
                  type="button"
                  disabled={index === projects.length - 1}
                  onClick={() => moveProject(index, "down")}
                  className="rounded p-1 hover:bg-white/10 hover:text-white disabled:opacity-25"
                  title="Aşağı Taşı"
                >
                  <CaretDown size={14} weight="bold" />
                </button>
              </div>

              {/* Kapak Önizleme */}
              <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                {project.cover ? (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/120x80/161616/white?text=No+Img";
                    }}
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-[10px] text-slate-500">
                    Görsel yok
                  </div>
                )}
              </div>

              {/* Başlık ve Bilgiler */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-white">{project.title}</h3>
                  <span className="rounded bg-white/6 px-1.5 py-0.5 text-[10px] text-slate-400">
                    {project.year}
                  </span>
                  {/* Durum Rozeti */}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      project.status === "shipped"
                        ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                        : project.status === "geliştiriliyor"
                        ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                        : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {project.status === "shipped"
                      ? "Yayında"
                      : project.status === "geliştiriliyor"
                      ? "Geliştiriliyor"
                      : "Kavram"}
                  </span>

                  {project.featured && (
                    <span className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/15 px-2 py-0.5 text-[10px] font-medium text-red-300">
                      <Sparkle size={11} weight="fill" />
                      Öne Çıkan
                    </span>
                  )}
                </div>

                <p className="mt-1 truncate text-xs text-slate-400">{project.tagline}</p>

                {/* Etiketler */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/6 bg-white/[.02] px-1.5 py-0.5 text-[10px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] text-slate-500">
                      +{project.tags.length - 4} daha
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sağ: Aksiyonlar */}
            <div className="flex items-center gap-1.5 self-end sm:self-center">
              {/* Featured Toggle */}
              <button
                type="button"
                onClick={() => toggleFeatured(index)}
                title={project.featured ? "Öne Çıkarılanlardan Kaldır" : "Öne Çıkarılan Yap"}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                  project.featured
                    ? "border-red-500/40 bg-red-500/20 text-red-400"
                    : "border-white/8 bg-white/[.03] text-slate-500 hover:border-white/20 hover:text-slate-300"
                }`}
              >
                <Sparkle size={15} weight={project.featured ? "fill" : "regular"} />
              </button>

              {/* Düzenle */}
              <button
                type="button"
                onClick={() => {
                  setEditingProject(project);
                  setIsNew(false);
                }}
                title="Projeyi Düzenle"
                className="flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-2.5 text-xs text-slate-200 hover:border-white/20 hover:bg-white/[.08] hover:text-white"
              >
                <PencilSimple size={14} />
                <span>Düzenle</span>
              </button>

              {/* Klonla */}
              <button
                type="button"
                onClick={() => cloneProject(index)}
                title="Projeyi Klonla"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/[.03] text-slate-400 hover:border-white/20 hover:bg-white/[.08] hover:text-white"
              >
                +
              </button>

              {/* Sil */}
              <button
                type="button"
                onClick={() => deleteProject(index)}
                title="Projeyi Sil"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/[.03] text-slate-500 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proje Düzenleme / Ekleme Modalı */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          isNew={isNew}
          onSave={saveProjectModal}
          onCancel={() => {
            setEditingProject(null);
            setIsNew(false);
          }}
        />
      )}
    </div>
  );
}

// Proje Düzenleme Modalı
function ProjectEditModal({
  project,
  isNew,
  onSave,
  onCancel,
}: {
  project: Project;
  isNew: boolean;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Project>({ ...project });
  const [tagsText, setTagsText] = useState(form.tags.join(", "));
  const [descText, setDescText] = useState(form.description.join("\n\n"));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (isNew) {
      // Başlıktan otomatik slug üret
      const slug = title
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setForm((prev) => ({ ...prev, title, slug: slug || prev.slug }));
    } else {
      setForm((prev) => ({ ...prev, title }));
    }
  };

  const handleSave = () => {
    const updatedTags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const updatedDesc = descText
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    onSave({
      ...form,
      tags: updatedTags,
      description: updatedDesc.length ? updatedDesc : [form.excerpt],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/12 bg-[#10121a] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-base font-bold text-white">
            {isNew ? "✨ Yeni Proje Ekle" : `✏️ Projeyi Düzenle: ${project.title}`}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs">
          {/* Başlık ve Slug */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-slate-300">Proje Başlığı</label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-white outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block font-medium text-slate-300">Slug (URL Kısa Adı)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 font-mono text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Tagline ve Yıl */}
          <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
            <div>
              <label className="mb-1 block font-medium text-slate-300">Alt Başlık (Tagline)</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-white outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block font-medium text-slate-300">Yıl</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Durum ve Öne Çıkarılan */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-slate-300">Yayın Durumu</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-white outline-none focus:border-red-500"
              >
                <option value="shipped">Yayında (shipped)</option>
                <option value="geliştiriliyor">Geliştiriliyor</option>
                <option value="kavram">Kavram (concept)</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <label className="flex cursor-pointer items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded accent-red-600"
                />
                <span>Anasayfada Öne Çıkarılan Proje Olarak Göster</span>
              </label>
            </div>
          </div>

          {/* Kapak Görseli URL */}
          <div>
            <label className="mb-1 block font-medium text-slate-300">Kapak Görseli URL</label>
            <input
              type="text"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder="https://..."
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 font-mono text-white outline-none focus:border-red-500"
            />
          </div>

          {/* Etiketler */}
          <div>
            <label className="mb-1 block font-medium text-slate-300">
              Etiketler (Virgülle ayır)
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="Next.js, AI, Go, SQLite"
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-white outline-none focus:border-red-500"
            />
          </div>

          {/* Kısa Özet (Excerpt) */}
          <div>
            <label className="mb-1 block font-medium text-slate-300">
              Kısa Özet (Kartlarda görünen açıklama)
            </label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-white outline-none focus:border-red-500"
            />
          </div>

          {/* Detaylı Açıklama Paragrafları */}
          <div>
            <label className="mb-1 block font-medium text-slate-300">
              Detaylı Açıklama (Paragrafları 2 satır boşlukla ayır)
            </label>
            <textarea
              rows={4}
              value={descText}
              onChange={(e) => setDescText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 text-white outline-none focus:border-red-500"
            />
          </div>

          {/* Linkler (Canlı & Kaynak Kod) */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-slate-300">Canlı Site Linki (Opsiyonel)</label>
              <input
                type="text"
                value={form.links?.live ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    links: { ...form.links, live: e.target.value },
                  })
                }
                placeholder="https://..."
                className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 font-mono text-white outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block font-medium text-slate-300">Kaynak Kod / GitHub Linki (Opsiyonel)</label>
              <input
                type="text"
                value={form.links?.source ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    links: { ...form.links, source: e.target.value },
                  })
                }
                placeholder="https://github.com/..."
                className="w-full rounded-xl border border-white/10 bg-[#090a0f] p-2.5 font-mono text-white outline-none focus:border-red-500"
              />
            </div>
          </div>
        </div>

        {/* Modal Butonları */}
        <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/[.08] hover:text-white"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-500"
          >
            <Check size={14} weight="bold" />
            {isNew ? "Projeyi Ekle" : "Değişiklikleri Uygula"}
          </button>
        </div>
      </div>
    </div>
  );
}
