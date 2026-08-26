"use client";

import { stopById, stopToPercent } from "@/lib/boardPath";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  position: number;
};

export function PlayerToken({ position }: Props) {
  const reduce = useReducedMotion();
  const stop = stopById(position);
  const { left, top } = stopToPercent(stop);

  return (
    <motion.div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[70%]"
      initial={false}
      animate={{ left, top }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 320, damping: 22, mass: 0.7 }
      }
      aria-hidden
    >
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
        <ellipse cx="18" cy="44" rx="10" ry="3.5" fill="rgba(28,36,48,0.22)" />
        <path
          d="M10 28 C10 20, 26 20, 26 28 L24 42 C24 44, 12 44, 12 42 Z"
          fill="#c45c4a"
          stroke="#fffdf8"
          strokeWidth="2"
        />
        <circle cx="18" cy="16" r="10" fill="#e07a3d" stroke="#fffdf8" strokeWidth="2.5" />
        <circle cx="15" cy="14" r="2" fill="#fffdf8" opacity="0.7" />
      </svg>
    </motion.div>
  );
}
