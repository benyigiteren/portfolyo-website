"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@/components/icons"
import type { Project } from "@/lib/config";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";



type ProjectCardProps = {
  project: Project;
  /** feature card = larger, image-led layout */
  variant?: "feature" | "compact";
  className?: string;
  index?: number;
};

/**
 * Project card with violet-duotone cover, hover lift, and arrow island.
 * Links to the per-project route. Uses next/image with remote picsum.
 */
export function ProjectCard({
  project,
  variant = "compact",
  className,
  index = 0,
}: ProjectCardProps) {
  const reduce = useReducedMotion();
  const isFeature = variant === "feature";

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 34, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative",
        className,
      )}
    >
      <Link
        href={`/projeler/${project.slug}`}
        className="block focus:outline-none"
        aria-label={`${project.title} projesini gör`}
      >
        {/* Double-bezel outer shell */}
        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.02] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:shadow-[0_40px_90px_-50px_rgba(139,92,246,0.55)]">
          {/* cover */}
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.2rem]",
              isFeature ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[16/11]",
            )}
          >
            <Image
              src={project.cover}
              alt={`${project.title} kapak görseli`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="duotone object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
            {/* violet duotone veil */}
            
            {/* bottom scrim for text legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/20 to-transparent"
              aria-hidden
            />

            {/* status pill (semantic) */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/12 bg-void/55 px-3 py-1.5 backdrop-blur-md">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  project.status === "shipped"
                    ? "bg-emerald-400"
                    : project.status === "geliştiriliyor"
                      ? "bg-accent-2"
                      : "bg-faint",
                )}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/80">
                {config.ui.statusLabels[project.status]}
              </span>
            </div>

            {/* arrow island */}
            <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-void/50 text-ink backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/40 group-hover:bg-accent/15">
              <ArrowUpRight size={18} weight="light" />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                  {project.year}
                </p>
                <h3
                  className={cn(
                    "mt-1.5 font-semibold tracking-tight text-ink",
                    isFeature ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                  )}
                >
                  {project.title}
                </h3>
                <p className="mt-1 truncate text-sm text-mute">{project.tagline}</p>
              </div>
            </div>
          </div>

          {/* inner core: excerpt + tags */}
          <div className="px-4 pb-4 pt-4 sm:px-5">
            <p className="text-sm leading-relaxed text-mute">{project.excerpt}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
