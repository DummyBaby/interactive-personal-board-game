"use client";

import { ActivityFrame } from "@/components/ui/ActivityFrame";
import { Button } from "@/components/ui/Button";
import { hobbyGame } from "@/data/hobbyGame";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import { useState } from "react";

export function HobbyGame() {
  const completeActivity = useGameStore((s) => s.completeActivity);
  const skipActivity = useGameStore((s) => s.skipActivity);
  const exploringStory = useGameStore((s) => s.exploringStory);
  const muted = useGameStore((s) => s.muted);
  const [clueCount, setClueCount] = useState(1);
  const [guess, setGuess] = useState<string | null>(null);

  const revealed = hobbyGame.clues.slice(0, clueCount);
  const locked = Boolean(guess);

  function choose(option: string) {
    if (locked) return;
    setGuess(option);
    const ok = option === hobbyGame.correctAnswer;
    void playSound(ok ? "correct" : "wrong", muted);
  }

  return (
    <ActivityFrame
      eyebrow="Jeu"
      title={hobbyGame.title}
      subtitle={hobbyGame.subtitle}
      onBack={exploringStory ? skipActivity : undefined}
    >
      <ol className="space-y-3">
        {revealed.map((clue, i) => (
          <motion.li
            key={clue.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-card p-4 ring-1 ring-line"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-path">
              Indice {i + 1}
            </p>
            <p className="mt-1 text-ink">{clue.text}</p>
          </motion.li>
        ))}
      </ol>
      {!locked && clueCount < hobbyGame.clues.length ? (
        <Button
          variant="secondary"
          className="mt-4 w-full"
          onClick={() => setClueCount((c) => c + 1)}
        >
          Indice suivant
        </Button>
      ) : null}
      <div className="mt-5 grid gap-2">
        {hobbyGame.options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={locked}
            onClick={() => choose(option)}
            className="focus-ring rounded-2xl bg-card px-4 py-3 text-left font-bold text-ink ring-1 ring-line disabled:opacity-70"
          >
            {option}
          </button>
        ))}
      </div>
      {guess ? (
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 rounded-3xl bg-path/10 p-5 text-center"
        >
          <p className="font-display text-2xl text-ink">
            {guess === hobbyGame.correctAnswer ? "Trouvé !" : "Bien essayé."}
          </p>
          <p className="mt-2 text-ink-soft">{hobbyGame.reveal}</p>
          <Button
            className="mt-4"
            onClick={() =>
              completeActivity(guess === hobbyGame.correctAnswer ? 100 : 0)
            }
          >
            Continuer
          </Button>
        </motion.div>
      ) : null}
    </ActivityFrame>
  );
}
