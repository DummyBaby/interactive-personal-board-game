"use client";

import { spaceById } from "@/data/boardSpaces";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const ICONS: Record<string, string> = {
  school: "🎒",
  journey: "🗺️",
  achievement: "🌟",
  passions: "✨",
};

export function AboutMoment() {
  const activeActivity = useGameStore((s) => s.activeActivity);
  const completeAboutSpace = useGameStore((s) => s.completeAboutSpace);
  const space = activeActivity ? spaceById(activeActivity) : undefined;

  if (!space) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-board-bg/80 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-[0_18px_40px_rgba(28,36,48,0.18)] ring-1 ring-line"
      >
        <p className="text-4xl" aria-hidden>
          {ICONS[space.type] ?? "👤"}
        </p>
        <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-soft">
          Moment perso
        </p>
        <h2 className="font-display mt-1 text-3xl uppercase text-ink">{space.title}</h2>
        <p className="mt-3 text-sm text-ink-soft">{space.description}</p>
        <Button className="mt-6 w-full" onClick={completeAboutSpace}>
          Continuer
        </Button>
      </motion.div>
    </div>
  );
}
