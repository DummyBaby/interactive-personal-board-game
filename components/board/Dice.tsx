"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  value: number | null;
  rolling: boolean;
  compact?: boolean;
};

const PIP_MAP: Record<number, Array<[number, number]>> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [2, 0],
    [0, 2],
    [2, 2],
  ],
  5: [
    [0, 0],
    [2, 0],
    [1, 1],
    [0, 2],
    [2, 2],
  ],
  6: [
    [0, 0],
    [2, 0],
    [0, 1],
    [2, 1],
    [0, 2],
    [2, 2],
  ],
};

function Face({ n }: { n: number }) {
  const pips = PIP_MAP[n] ?? PIP_MAP[1];
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-[18%]">
      {Array.from({ length: 9 }).map((_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const on = pips.some(([c, r]) => c === col && r === row);
        return (
          <span
            key={i}
            className={cn(
              "m-auto block h-[70%] w-[70%] rounded-full",
              on ? "bg-ink" : "bg-transparent",
            )}
          />
        );
      })}
    </div>
  );
}

export function Dice({ value, rolling, compact }: Props) {
  const reduce = useReducedMotion();
  const shown = value ?? 1;
  const [spinFace, setSpinFace] = useState(1);

  useEffect(() => {
    if (!rolling || reduce) return;
    const t = window.setInterval(() => {
      setSpinFace((n) => (n % 6) + 1);
    }, 80);
    return () => window.clearInterval(t);
  }, [rolling, reduce]);

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-card shadow-[0_10px_0_#d8cdbb,0_16px_24px_rgba(28,36,48,0.12)] ring-1 ring-line",
        compact ? "h-12 w-12" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
      )}
      animate={
        rolling && !reduce
          ? { rotate: [0, 18, -14, 10, -6, 0], y: [0, -8, 4, -4, 0] }
          : { rotate: 0, y: 0 }
      }
      transition={
        rolling && !reduce
          ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.25 }
      }
      aria-label={rolling ? "Dé en cours de lancement" : `Dé affichant ${shown}`}
      role="img"
    >
      {rolling && !reduce ? (
        <motion.div
          className="h-full w-full"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 0.12, repeat: Infinity }}
        >
          <Face n={spinFace} />
        </motion.div>
      ) : (
        <Face n={shown} />
      )}
    </motion.div>
  );
}
