"use client";

import { ActivityFrame } from "@/components/ui/ActivityFrame";
import { Button } from "@/components/ui/Button";
import { mysteryChallenge } from "@/data/mysteryChallenge";
import { scoreForAnswers } from "@/lib/gameLogic";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";

export function MysteryChallenge() {
  const completeActivity = useGameStore((s) => s.completeActivity);
  const skipActivity = useGameStore((s) => s.skipActivity);
  const exploringStory = useGameStore((s) => s.exploringStory);
  const muted = useGameStore((s) => s.muted);
  const [seconds, setSeconds] = useState(mysteryChallenge.seconds);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = mysteryChallenge.questions[index];

  useEffect(() => {
    if (done) return;
    const t = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [done]);

  function choose(option: string) {
    if (done || !q) return;
    const ok = option === q.correctAnswer;
    if (ok) setCorrect((c) => c + 1);
    void playSound(ok ? "correct" : "wrong", muted);
    if (index >= mysteryChallenge.questions.length - 1) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  return (
    <ActivityFrame
      variant="boss"
      eyebrow="Dernière surprise"
      title={mysteryChallenge.title}
      subtitle={mysteryChallenge.subtitle}
      onBack={exploringStory ? skipActivity : undefined}
    >
      <div className="flex items-center justify-between text-white">
        <p className="font-display text-3xl tabular-nums">{seconds}s</p>
        <p className="font-bold">Score {correct}</p>
      </div>
      {!done && q ? (
        <div className="mt-6">
          <h2 className="font-display text-2xl text-white">{q.question}</h2>
          <div className="mt-4 grid gap-2">
            {q.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                className="focus-ring rounded-2xl bg-white/8 px-4 py-3 text-left font-bold text-white ring-1 ring-white/15"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center text-white">
          <p className="text-4xl" aria-hidden>
            🎉
          </p>
          <h2 className="font-display mt-3 text-3xl">Bravo !</h2>
          <p className="mt-2 text-white/70">
            {correct} réponses rapides. Mystère terminé.
          </p>
          <Button
            className="mt-6"
            onClick={() =>
              completeActivity(
                scoreForAnswers(correct, mysteryChallenge.questions.length, 300),
              )
            }
          >
            Continuer
          </Button>
        </div>
      )}
    </ActivityFrame>
  );
}
