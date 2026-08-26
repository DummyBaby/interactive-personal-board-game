"use client";

import { Button } from "@/components/ui/Button";
import { formatTime, knowledgePercent } from "@/lib/gameLogic";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

export function FinishScreen() {
  const totalScore = useGameStore((s) => s.totalScore);
  const completedSpaces = useGameStore((s) => s.completedSpaces);
  const startedAt = useGameStore((s) => s.startedAt);
  const finishedAt = useGameStore((s) => s.finishedAt);
  const muted = useGameStore((s) => s.muted);
  const playAgain = useGameStore((s) => s.playAgain);
  const openStoryExplorer = useGameStore((s) => s.openStoryExplorer);
  const percent = knowledgePercent(totalScore);
  const elapsed =
    startedAt && finishedAt ? formatTime(finishedAt - startedAt) : formatTime(0);
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: (i % 7) * 0.08,
        color: ["#2f8f7a", "#e07a3d", "#5b6abf", "#c9a227"][i % 4],
      })),
    [],
  );

  useEffect(() => {
    void playSound("finish", muted);
    // play once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center overflow-hidden px-4 py-10 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            className="absolute top-[-10px] h-3 w-2 rounded-sm"
            style={{ left: p.left, background: p.color }}
            initial={{ y: -20, rotate: 0, opacity: 1 }}
            animate={{ y: 720, rotate: 240, opacity: 0.2 }}
            transition={{ duration: 2.4, delay: p.delay, ease: "easeIn" }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl bg-card p-8 shadow-[0_24px_60px_rgba(28,36,48,0.18)] ring-1 ring-line"
      >
        <p className="text-4xl" aria-hidden>
          🏁
        </p>
        <h1 className="font-display mt-3 text-4xl text-ink">Tu es arrivé !</h1>
        <p className="mt-2 text-ink-soft">Tu as atteint la fin du plateau.</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-board-bg p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
              Score final
            </dt>
            <dd className="font-display text-2xl text-ink">{totalScore}</dd>
          </div>
          <div className="rounded-2xl bg-board-bg p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
              Activités
            </dt>
            <dd className="font-display text-2xl text-ink">{completedSpaces.length}/10</dd>
          </div>
          <div className="rounded-2xl bg-board-bg p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
              Temps de jeu
            </dt>
            <dd className="font-display text-2xl text-ink">{elapsed}</dd>
          </div>
          <div className="rounded-2xl bg-board-bg p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
              Tu me connais ?
            </dt>
            <dd className="font-display text-2xl text-ink">{percent}%</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-3">
          <Button className="w-full" onClick={playAgain}>
            Rejouer
          </Button>
          <Button variant="secondary" className="w-full" onClick={openStoryExplorer}>
            Explorer mon histoire
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
