"use client";

import { Dice } from "@/components/board/Dice";
import { GameBoard } from "@/components/board/GameBoard";
import { LandingCard } from "@/components/board/LandingCard";
import { Button } from "@/components/ui/Button";
import { ProgressDisplay } from "@/components/ui/ProgressDisplay";
import { ScoreDisplay } from "@/components/ui/ScoreDisplay";
import { DICE_ROLL_MS, TOKEN_STEP_MS } from "@/lib/dice";
import { canRoll } from "@/lib/gameLogic";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function BoardScreen() {
  const gameStatus = useGameStore((s) => s.gameStatus);
  const currentPosition = useGameStore((s) => s.currentPosition);
  const passingPosition = useGameStore((s) => s.passingPosition);
  const completedSpaces = useGameStore((s) => s.completedSpaces);
  const totalScore = useGameStore((s) => s.totalScore);
  const diceValue = useGameStore((s) => s.diceValue);
  const isRolling = useGameStore((s) => s.isRolling);
  const isMoving = useGameStore((s) => s.isMoving);
  const muted = useGameStore((s) => s.muted);
  const gameCompleted = useGameStore((s) => s.gameCompleted);
  const overshootHint = useGameStore((s) => s.overshootHint);
  const rollDice = useGameStore((s) => s.rollDice);
  const beginMove = useGameStore((s) => s.beginMove);
  const stepTo = useGameStore((s) => s.stepTo);
  const land = useGameStore((s) => s.land);
  const arriveAtFinish = useGameStore((s) => s.arriveAtFinish);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const startNewGame = useGameStore((s) => s.startNewGame);
  const reduce = useReducedMotion();
  const rollingRef = useRef(false);
  const movingRef = useRef(false);

  const allowRoll = canRoll({
    gameStatus,
    isRolling,
    isMoving,
    currentPosition,
    gameCompleted,
  });

  useEffect(() => {
    if (gameStatus !== "ROLLING" || !isRolling) return;
    if (rollingRef.current) return;
    rollingRef.current = true;
    const wait = reduce ? 80 : DICE_ROLL_MS;
    const t = window.setTimeout(() => {
      beginMove();
      rollingRef.current = false;
    }, wait);
    return () => window.clearTimeout(t);
  }, [gameStatus, isRolling, beginMove, reduce]);

  useEffect(() => {
    if (gameStatus !== "MOVING" || !isMoving) return;
    if (movingRef.current) return;
    movingRef.current = true;
    const path = useGameStore.getState().movePath;
    const stepMs = reduce ? 80 : TOKEN_STEP_MS;
    let cancelled = false;

    (async () => {
      for (const pos of path) {
        if (cancelled) return;
        stepTo(pos);
        await new Promise((r) => window.setTimeout(r, stepMs));
      }
      if (cancelled) return;
      movingRef.current = false;
      if (useGameStore.getState().currentPosition === 11) {
        arriveAtFinish();
      } else {
        land();
      }
    })();

    return () => {
      cancelled = true;
      movingRef.current = false;
    };
  }, [gameStatus, isMoving, stepTo, land, arriveAtFinish, reduce]);

  function handleRoll() {
    if (!allowRoll) return;
    void playSound("roll", muted);
    rollDice();
  }

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col overflow-x-hidden px-3 py-3 sm:px-6 sm:py-4">
      <header className="grid grid-cols-[1fr_auto] items-center gap-2 sm:grid-cols-[auto_1fr_auto] sm:gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-path">
            Jeu de plateau
          </p>
          <h1 className="font-display truncate text-lg text-ink sm:text-2xl">
            Prêt à me connaître ?
          </h1>
        </div>
        <ProgressDisplay
          completed={completedSpaces.length}
          position={currentPosition}
        />
        <div className="col-span-2 flex items-center justify-end gap-2 sm:col-span-1">
          <ScoreDisplay score={totalScore} />
        </div>
      </header>

      <main className="relative mt-3 flex-1">
        <div className="board-texture rounded-[28px] bg-board-deep/40 p-2 shadow-[0_18px_40px_rgba(28,36,48,0.12)] ring-1 ring-line sm:p-4">
          <GameBoard
            position={currentPosition}
            passingPosition={passingPosition}
            completedSpaces={completedSpaces}
          />
        </div>
        {gameStatus === "LANDING" ? <LandingCard /> : null}
      </main>

      <footer className="sticky bottom-0 z-10 -mx-3 mt-3 bg-gradient-to-t from-board-bg via-board-bg to-transparent px-3 pb-3 pt-3 sm:static sm:mx-0 sm:bg-none sm:px-0">
        <div className="flex flex-col items-center gap-2">
          <AnimatePresence>
            {overshootHint ? (
              <motion.p
                key={overshootHint}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="max-w-sm text-center text-sm font-bold text-ink"
                role="status"
              >
                {overshootHint}
              </motion.p>
            ) : null}
          </AnimatePresence>
          <Dice value={diceValue} rolling={isRolling} compact />
          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="focus-ring rounded-full bg-card px-3 py-3 text-sm font-bold text-ink-soft ring-1 ring-line"
              aria-pressed={!muted}
              aria-label={muted ? "Activer le son" : "Couper le son"}
            >
              {muted ? "Son coupé" : "Son activé"}
            </button>
            <Button
              className="min-h-14 flex-1 text-lg"
              onClick={handleRoll}
              disabled={!allowRoll}
              aria-label="Lancer le dé"
            >
              {isRolling ? "Lancement…" : isMoving ? "Déplacement…" : "Lancer le dé"}
            </Button>
            <button
              type="button"
              onClick={startNewGame}
              className="focus-ring rounded-full bg-card px-3 py-3 text-sm font-bold text-ink-soft ring-1 ring-line"
            >
              Nouveau
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
