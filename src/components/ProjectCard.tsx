"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@/components/icons";
import type { Project } from "@/lib/config";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  variant?: "feature" | "compact";
  className?: string;
  index?: number;
};

export function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: .7, delay: index * .06, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group h-full", className)}
    >
      <Link href={`/projeler/${project.slug}`} aria-label={`${project.title} projesini gör`} className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/9 bg-surface/70 transition-all duration-500 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_28px_80px_-45px_rgba(223,38,54,.45)] focus:outline-none">
        <div className="relative aspect-[4/3] overflow-hidden bg-black">
          <Image src={project.cover} alt={`${project.title} kapak görseli`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(223,38,54,.8)]" />
            <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-white/75">{config.ui.statusLabels[project.status]}</span>
          </div>
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-accent">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-faint">{project.year} · {project.tags.slice(0, 2).join(" / ")}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-none tracking-[-.04em] text-ink sm:text-3xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">{project.tagline}</p>
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/8 pt-5">
            <p className="line-clamp-2 text-xs leading-relaxed text-faint">{project.excerpt}</p>
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[.14em] text-ink">İncele</span>
          </div>
        </div>
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
      </Link>
    </motion.article>
  );
}