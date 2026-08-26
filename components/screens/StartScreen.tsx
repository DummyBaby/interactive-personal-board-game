"use client";

import { GameBoard } from "@/components/board/GameBoard";
import { Button } from "@/components/ui/Button";
import { playSound } from "@/lib/sound";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";

export function StartScreen() {
  const hasSave = useGameStore((s) => s.hasSave);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const muted = useGameStore((s) => s.muted);
  const startNewGame = useGameStore((s) => s.startNewGame);
  const continueGame = useGameStore((s) => s.continueGame);
  const openHowToPlay = useGameStore((s) => s.openHowToPlay);
  const showContinue = hasSave || gameStarted;

  function click(action: () => void) {
    void playSound("click", muted);
    action();
  }

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center overflow-x-hidden px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-path">
          Un jeu de plateau sur une personne
        </p>
        <h1 className="font-display mt-3 text-4xl text-ink sm:text-6xl">
          Prêt à me connaître ?
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Lance le dé. Explore le plateau. Joue à quelques défis. Découvre mon histoire.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          {showContinue ? (
            <>
              <Button className="min-h-14 w-full text-lg" onClick={() => click(continueGame)}>
                Continuer
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => click(startNewGame)}
              >
                Nouvelle partie
              </Button>
            </>
          ) : (
            <Button className="min-h-14 w-full text-lg" onClick={() => click(startNewGame)}>
              Jouer
            </Button>
          )}
          <Button variant="ghost" onClick={() => click(openHowToPlay)}>
            Comment jouer
          </Button>
        </div>
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 0.15 }}
        className="pointer-events-none mt-8 w-full max-w-md origin-top scale-90 sm:scale-100"
      >
        <GameBoard
          position={0}
          passingPosition={null}
          completedSpaces={[]}
          decorative
        />
      </motion.div>
    </div>
  );
}
