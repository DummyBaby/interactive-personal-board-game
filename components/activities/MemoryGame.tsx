"use client";

import { ActivityFrame } from "@/components/ui/ActivityFrame";
import { Button } from "@/components/ui/Button";
import { memoryGame } from "@/data/memoryGame";
import { scoreForAnswers } from "@/lib/gameLogic";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";

type Phase = "countdown" | "reveal" | "questions";

export function MemoryGame() {
  const completeActivity = useGameStore((s) => s.completeActivity);
  const skipActivity = useGameStore((s) => s.skipActivity);
  const exploringStory = useGameStore((s) => s.exploringStory);
  const muted = useGameStore((s) => s.muted);
  const [phase, setPhase] = useState<Phase>("countdown");
  const [count, setCount] = useState(3);
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "countdown") return;
    const t = window.setTimeout(() => {
      if (count <= 1) setPhase("reveal");
      else setCount((c) => c - 1);
    }, 700);
    return () => window.clearTimeout(t);
  }, [phase, count]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => setPhase("questions"), memoryGame.revealSeconds * 1000);
    return () => window.clearTimeout(t);
  }, [phase]);

  const question = memoryGame.questions[qIndex];

  function choose(option: string) {
    if (picked || !question) return;
    setPicked(option);
    const ok = option === question.correctAnswer;
    if (ok) setCorrect((c) => c + 1);
    void playSound(ok ? "correct" : "wrong", muted);
  }

  function next() {
    if (!picked) return;
    if (qIndex >= memoryGame.questions.length - 1) {
      completeActivity(scoreForAnswers(correct, memoryGame.questions.length, 150));
      return;
    }
    setQIndex((i) => i + 1);
    setPicked(null);
  }

  return (
    <ActivityFrame
      eyebrow="Jeu"
      title={memoryGame.title}
      subtitle="Observe bien. Ensuite, dis ce que tu as vu."
      onBack={exploringStory ? skipActivity : undefined}
    >
      {phase === "countdown" ? (
        <p className="font-display py-16 text-center text-7xl text-path">{count || "C’est parti"}</p>
      ) : null}
      {phase === "reveal" ? (
        <div>
          <p className="text-center text-sm font-bold text-ink-soft">Mémorise ces éléments</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {memoryGame.items.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl bg-card p-4 text-center ring-1 ring-line"
              >
                <p className="text-3xl">{item.emoji}</p>
                <p className="mt-2 text-sm font-bold text-ink">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {phase === "questions" && question ? (
        <div>
          <p className="text-sm font-bold text-ink-soft">
            Question {qIndex + 1} / {memoryGame.questions.length}
          </p>
          <h2 className="font-display mt-2 text-2xl text-ink">{question.question}</h2>
          <div className="mt-4 grid gap-2">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                disabled={Boolean(picked)}
                onClick={() => choose(option)}
                className="focus-ring rounded-2xl bg-card px-4 py-3 text-left font-bold ring-1 ring-line"
              >
                {option}
              </button>
            ))}
          </div>
          {picked ? (
            <Button className="mt-5 w-full" onClick={next}>
              {qIndex >= memoryGame.questions.length - 1 ? "Voir le résultat" : "Suivant"}
            </Button>
          ) : null}
        </div>
      ) : null}
    </ActivityFrame>
  );
}
