"use client";

import { motion } from "framer-motion";

type Props = {
  score: number;
};

export function ScoreDisplay({ score }: Props) {
  return (
    <div className="rounded-2xl bg-card/90 px-3 py-2 text-center shadow-sm ring-1 ring-line">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">
        Score
      </p>
      <motion.p
        key={score}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-xl text-ink tabular-nums"
      >
        {score}
      </motion.p>
    </div>
  );
}
