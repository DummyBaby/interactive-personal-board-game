"use client";

import { ActivityFrame } from "@/components/ui/ActivityFrame";
import { Button } from "@/components/ui/Button";
import { wouldYouRather } from "@/data/wouldYouRather";
import { scoreForAnswers } from "@/lib/gameLogic";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import { useState } from "react";

export function WouldYouRatherGame() {
  const completeActivity = useGameStore((s) => s.completeActivity);
  const skipActivity = useGameStore((s) => s.skipActivity);
  const exploringStory = useGameStore((s) => s.exploringStory);
  const muted = useGameStore((s) => s.muted);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<"a" | "b" | null>(null);
  const [correct, setCorrect] = useState(0);
  const q = wouldYouRather.questions[index];
  const last = index >= wouldYouRather.questions.length - 1;

  if (!q) return null;

  function pick(side: "a" | "b") {
    if (choice) return;
    setChoice(side);
    const ok = side === q.answer;
    if (ok) setCorrect((c) => c + 1);
    void playSound(ok ? "correct" : "wrong", muted);
  }

  function next() {
    if (!choice) return;
    if (last) {
      completeActivity(scoreForAnswers(correct, wouldYouRather.questions.length, 100));
      return;
    }
    setIndex((i) => i + 1);
    setChoice(null);
  }

  return (
    <ActivityFrame
      eyebrow="Jeu"
      title="Tu préfères ?"
      subtitle="Devine mes choix. Découvre un peu ma personnalité."
      onBack={exploringStory ? skipActivity : undefined}
    >
      <p className="text-center text-sm font-bold text-ink-soft">
        {index + 1} / {wouldYouRather.questions.length}
      </p>
      <h2 className="font-display mt-2 text-center text-2xl text-ink">{q.prompt}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {(["a", "b"] as const).map((side) => (
          <button
            key={side}
            type="button"
            disabled={Boolean(choice)}
            onClick={() => pick(side)}
            className="focus-ring min-h-28 rounded-3xl bg-card p-4 text-lg font-extrabold text-ink ring-1 ring-line"
          >
            {side === "a" ? q.a : q.b}
          </button>
        ))}
      </div>
      {choice ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="font-display text-2xl text-ink">
            {choice === q.answer ? "Bravo !" : `En vrai, je choisirais ${q.answer === "a" ? q.a : q.b}.`}
          </p>
          <Button className="mt-4" onClick={next}>
            {last ? "Voir le résultat" : "Suivant"}
          </Button>
        </motion.div>
      ) : null}
    </ActivityFrame>
  );
}
