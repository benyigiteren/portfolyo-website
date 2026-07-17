"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  external?: boolean;
};

/**
 * Magnetic pill link. Pulls toward the cursor via spring physics, presses on
 * tap. Reduced-motion users get a static, fully-usable link.
 */
export function MagneticButton({
  children,
  href,
  className,
  strength = 0.35,
  ariaLabel,
  external = false,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}
