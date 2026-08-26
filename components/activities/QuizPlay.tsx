"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { answersMatch } from "@/lib/gameLogic";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import type { QuizQuestion } from "@/types/game";
import { useState } from "react";

type Props = {
  questions: QuizQuestion[];
  maxScore: number;
  onDone: (score: number) => void;
  boss?: boolean;
};

export function QuizPlay({ questions, maxScore, onDone, boss }: Props) {
  const muted = useGameStore((s) => s.muted);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [feedback, setFeedback] = useState<"right" | "wrong" | null>(null);
  const q = questions[index];
  const last = index >= questions.length - 1;

  function lockAnswer(value: string) {
    if (feedback || !q) return;
    const ok = answersMatch(value, q.correctAnswer);
    setPicked(value);
    setFeedback(ok ? "right" : "wrong");
    if (ok) setCorrect((c) => c + 1);
    void playSound(ok ? "correct" : "wrong", muted);
  }

  function next() {
    if (!feedback) return;
    if (last) {
      const totalCorrect = feedback === "right" ? correct : correct;
      const score = Math.round((totalCorrect / questions.length) * maxScore);
      onDone(score);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setTyped("");
    setFeedback(null);
  }

  if (!q) return null;

  return (
    <div>
      <p
        className={cn(
          "text-sm font-bold",
          boss ? "text-white/60" : "text-ink-soft",
        )}
      >
        Question {index + 1} / {questions.length}
      </p>
      <div
        className={cn(
          "mt-2 h-2 overflow-hidden rounded-full",
          boss ? "bg-white/10" : "bg-line",
        )}
      >
        <div
          className="h-full bg-gold"
          style={{ width: `${((index + (feedback ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>
      <h2
        className={cn(
          "font-display mt-4 text-2xl",
          boss ? "text-white" : "text-ink",
        )}
      >
        {q.question}
      </h2>

      {q.type === "oneWord" ? (
        <form
          className="mt-5 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            lockAnswer(typed);
          }}
        >
          <label className={cn("text-sm font-bold", boss ? "text-white/70" : "text-ink-soft")}>
            Réponse en un mot
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={Boolean(feedback)}
              className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-ink"
            />
          </label>
          {!feedback ? (
            <Button type="submit" disabled={!typed.trim()}>
              Vérifier
            </Button>
          ) : null}
        </form>
      ) : (
        <div className="mt-5 grid gap-2">
          {(q.options ?? (q.type === "trueFalse" ? ["Vrai", "Faux"] : [])).map((opt) => {
            const chosen = picked === opt;
            const right = answersMatch(opt, q.correctAnswer);
            return (
              <button
                key={opt}
                type="button"
                disabled={Boolean(feedback)}
                onClick={() => lockAnswer(opt)}
                className={cn(
                  "focus-ring rounded-2xl px-4 py-3 text-left font-bold ring-1 transition",
                  boss ? "bg-white/5 text-white ring-white/15" : "bg-card text-ink ring-line",
                  feedback && right && "ring-2 ring-path bg-path/15",
                  feedback && chosen && !right && "ring-2 ring-game-deep bg-game-deep/15",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {feedback ? (
        <div className="mt-6 text-center">
          <p className={cn("font-display text-xl", feedback === "right" ? "text-path" : "text-game-deep")}>
            {feedback === "right" ? "Bravo !" : `Pas tout à fait — ${q.correctAnswer}`}
          </p>
          <Button className="mt-4" onClick={next}>
            {last ? "Voir le résultat" : "Suivant"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
