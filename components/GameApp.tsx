"use client";

import { ActivityRouter } from "@/components/activities/ActivityRouter";
import { BoardScreen } from "@/components/board/BoardScreen";
import { FinishScreen } from "@/components/screens/FinishScreen";
import { HowToPlay } from "@/components/screens/HowToPlay";
import { StartScreen } from "@/components/screens/StartScreen";
import { StoryExplorer } from "@/components/screens/StoryExplorer";
import { CompletionScreen } from "@/components/ui/CompletionScreen";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";

export function GameApp() {
  const [ready, setReady] = useState(false);
  const gameStatus = useGameStore((s) => s.gameStatus);
  const exploringStory = useGameStore((s) => s.exploringStory);

  useEffect(() => {
    let cancelled = false;
    void useGameStore.persist.rehydrate().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center text-ink-soft">
        Préparation du plateau…
      </div>
    );
  }

  return (
    <>
      {gameStatus === "START_SCREEN" ? <StartScreen /> : null}
      {gameStatus === "BOARD" ||
      gameStatus === "ROLLING" ||
      gameStatus === "MOVING" ||
      gameStatus === "LANDING" ? (
        <BoardScreen />
      ) : null}
      {gameStatus === "ACTIVITY" ? <ActivityRouter /> : null}
      {gameStatus === "ACTIVITY_COMPLETE" ? (
        <>
          <BoardScreen />
          <CompletionScreen />
        </>
      ) : null}
      {gameStatus === "FINISHED" ? <FinishScreen /> : null}
      {exploringStory && gameStatus === "FINISHED" ? <StoryExplorer /> : null}
      <HowToPlay />
    </>
  );
}
