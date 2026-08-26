"use client";

import { Button } from "@/components/ui/Button";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";

export function CompletionScreen() {
  const activityScore = useGameStore((s) => s.activityScore);
  const lastWasReplay = useGameStore((s) => s.lastWasReplay);
  const currentPosition = useGameStore((s) => s.currentPosition);
  const returnToBoard = useGameStore((s) => s.returnToBoard);

  const heading = currentPosition === 10 ? "BRAVO !" : "DÉFI TERMINÉ !";
  const goingToFinish = currentPosition === 10;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/35 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl bg-card p-8 text-center shadow-[0_24px_60px_rgba(28,36,48,0.22)]"
      >
        <p className="text-4xl" aria-hidden>
          🎉
        </p>
        <h2 className="font-display mt-3 text-3xl text-ink">{heading}</h2>
        <p className="mt-2 text-ink-soft">
          {lastWasReplay
            ? "Belle revisite. Le score ne change pas."
            : activityScore > 0
              ? `+${activityScore} POINTS`
              : "Moment terminé. Pas de points sur cette case — juste une découverte."}
        </p>
        <Button className="mt-6 w-full" onClick={returnToBoard}>
          {goingToFinish ? "Vers l’arrivée" : "Continuer"}
        </Button>
      </motion.div>
    </div>
  );
}
