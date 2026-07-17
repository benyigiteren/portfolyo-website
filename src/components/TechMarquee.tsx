"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";
import { TechIconInline } from "@/components/TechIcon";

type MarqueeProps = {
  className?: string;
};

/**
 * Tech logo marquee — real brand SVGs drifting horizontally.
 * Duplicated list for seamless -50% loop. GPU transform only.
 */
export function TechMarquee({ className }: MarqueeProps) {
  const reduce = useReducedMotion();
  const items = [...config.about.languages, ...config.about.tools];
  const list = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden border-y border-white/8 py-6",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10",
          reduce && "[animation-play-state:paused]",
        )}
      >
        {list.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <TechIconInline item={item} size={28} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              {item.name}
            </span>
            <span className="text-accent/30">/</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-void" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-void" />
    </div>
  );
}
