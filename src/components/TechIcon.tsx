"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TechItem } from "@/lib/config";

type TechIconProps = {
  item: TechItem;
  size?: number;
  className?: string;
  /** show label tooltip on hover */
  withLabel?: boolean;
};

/**
 * Real brand SVG logo via simpleicons.org CDN.
 * slug comes from config — see https://simpleicons.org for the full list.
 * Renders white (f5f5f5) on dark theme. Falls back to first letter on error.
 */
export function TechIcon({ item, size = 40, className, withLabel = true }: TechIconProps) {
  const [failed, setFailed] = useState(false);
  const src = `https://cdn.simpleicons.org/${item.slug}/cbc9d8`;

  return (
    <span className={cn("group relative flex flex-col items-center gap-2.5", className)}>
      <span
        className="grid place-items-center rounded-2xl border border-white/8 bg-surface/60 p-3 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:bg-surface-2"
        style={{ width: size + 24, height: size + 24 }}
      >
        {failed ? (
          <span
            className="font-mono font-semibold text-chrome"
            style={{ fontSize: size * 0.35 }}
          >
            {item.name.charAt(0)}
          </span>
        ) : (
          <img
            src={src}
            alt={item.name}
            width={size}
            height={size}
            loading="lazy"
            onError={() => setFailed(true)}
            className="opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{ width: size, height: size }}
          />
        )}
      </span>
      {withLabel && (
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint transition-colors duration-500 group-hover:text-mute">
          {item.name}
        </span>
      )}
    </span>
  );
}

/**
 * Inline tech icon row — compact, no labels. For marquees and dense rows.
 */
export function TechIconInline({ item, size = 28 }: { item: TechItem; size?: number }) {
  const [failed, setFailed] = useState(false);
  const src = `https://cdn.simpleicons.org/${item.slug}/cbc9d8`;

  if (failed) {
    return (
      <span
        className="font-mono font-semibold text-chrome"
        style={{ fontSize: size * 0.5 }}
      >
        {item.name.charAt(0)}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={item.name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: size, height: size }}
    />
  );
}
