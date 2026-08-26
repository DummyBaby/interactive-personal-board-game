"use client";

import { Button } from "@/components/ui/Button";
import { spaceById } from "@/data/boardSpaces";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";

const ABOUT_ICONS: Record<string, string> = {
  school: "🎒",
  journey: "🗺️",
  achievement: "🌟",
  passions: "✨",
};

export function LandingCard() {
  const activeActivity = useGameStore((s) => s.activeActivity);
  const completedSpaces = useGameStore((s) => s.completedSpaces);
  const startActivity = useGameStore((s) => s.startActivity);
  const skipActivity = useGameStore((s) => s.skipActivity);
  const completeAboutSpace = useGameStore((s) => s.completeAboutSpace);
  const space = activeActivity ? spaceById(activeActivity) : undefined;

  if (!space) return null;

  const alreadyDone = completedSpaces.includes(space.id);
  const isGame = space.category === "game";
  const icon = isGame
    ? space.id >= 9
      ? "🏆"
      : "🎮"
    : (ABOUT_ICONS[space.type] ?? "👤");

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[min(100%,28rem)] w-full max-w-sm overflow-y-auto rounded-3xl bg-card p-5 text-center shadow-[0_18px_40px_rgba(28,36,48,0.18)] ring-1 ring-line"
      >
        <p className="text-3xl" aria-hidden>
          {icon}
        </p>
        <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-soft">
          {isGame ? "Tu arrives sur" : "Moment perso"}
        </p>
        <h2 className="font-display mt-1 text-2xl uppercase text-ink">{space.title}</h2>
        <p className="mt-2 text-sm text-ink-soft">
          {isGame ? space.prompt : space.description}
        </p>
        {isGame ? (
          alreadyDone ? (
            <div className="mt-5 flex flex-col gap-2">
              <Button onClick={startActivity}>Rejouer</Button>
              <Button variant="secondary" onClick={skipActivity}>
                Passer
              </Button>
            </div>
          ) : (
            <Button className="mt-5 w-full" onClick={startActivity}>
              Commencer le défi
            </Button>
          )
        ) : (
          <Button className="mt-5 w-full" onClick={completeAboutSpace}>
            Continuer
          </Button>
        )}
      </motion.div>
    </div>
  );
}
