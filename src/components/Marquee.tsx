"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** separator glyph between items */
  sep?: string;
};

/** Single kinetic marquee band (GPU transform, respects reduced motion). */
export function Marquee({ items, className, sep = "✦" }: MarqueeProps) {
  const reduce = useReducedMotion();
  // duplicate the list so the -50% translate loops seamlessly
  const list = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden border-y border-white/8 py-5",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "marquee-track flex shrink-0 items-center gap-8 whitespace-nowrap pr-8",
          reduce && "[animation-play-state:paused]",
        )}
      >
        {list.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-ink text-3xl font-semibold tracking-tight sm:text-5xl">
              {item}
            </span>
            <span className="text-accent/50 text-2xl sm:text-3xl">{sep}</span>
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
