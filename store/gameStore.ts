"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { rollDie } from "@/lib/dice";
import {
  canRoll,
  computeMovePath,
  FINISH_POSITION,
  LAST_SPACE,
  overshootMessage,
  START_POSITION,
} from "@/lib/gameLogic";
import { gameSettings } from "@/data/gameSettings";
import type { GameStatus } from "@/types/game";

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

function safeStorage() {
  if (typeof window === "undefined") return noopStorage;
  try {
    const testKey = "__board_game_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch {
    return noopStorage;
  }
}

export type GameStore = {
  gameStatus: GameStatus;
  currentPosition: number;
  previousPosition: number;
  diceValue: number | null;
  isRolling: boolean;
  isMoving: boolean;
  passingPosition: number | null;
  activeActivity: number | null;
  completedSpaces: number[];
  totalScore: number;
  activityScore: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  startedAt: number | null;
  finishedAt: number | null;
  howToPlayOpen: boolean;
  muted: boolean;
  exploringStory: boolean;
  movePath: number[];
  lastWasReplay: boolean;
  hasSave: boolean;
  overshootHint: string | null;

  startNewGame: () => void;
  continueGame: () => void;
  openHowToPlay: () => void;
  closeHowToPlay: () => void;
  toggleMute: () => void;
  rollDice: () => void;
  beginMove: () => void;
  stepTo: (position: number) => void;
  land: () => void;
  startActivity: () => void;
  skipActivity: () => void;
  completeAboutSpace: () => void;
  completeActivity: (score: number) => void;
  returnToBoard: () => void;
  arriveAtFinish: () => void;
  finishGame: () => void;
  playAgain: () => void;
  openStoryExplorer: () => void;
  closeStoryExplorer: () => void;
  openAboutSpace: (spaceId: number) => void;
};

const initialPlayState = {
  gameStatus: "START_SCREEN" as GameStatus,
  currentPosition: START_POSITION,
  previousPosition: START_POSITION,
  diceValue: null as number | null,
  isRolling: false,
  isMoving: false,
  passingPosition: null as number | null,
  activeActivity: null as number | null,
  completedSpaces: [] as number[],
  totalScore: 0,
  activityScore: 0,
  gameStarted: false,
  gameCompleted: false,
  startedAt: null as number | null,
  finishedAt: null as number | null,
  movePath: [] as number[],
  lastWasReplay: false,
  exploringStory: false,
  overshootHint: null as string | null,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialPlayState,
      howToPlayOpen: false,
      muted: true,
      hasSave: false,

      startNewGame: () =>
        set({
          ...initialPlayState,
          gameStatus: "BOARD",
          gameStarted: true,
          startedAt: Date.now(),
          hasSave: true,
          howToPlayOpen: false,
          muted: get().muted,
        }),

      continueGame: () => {
        const state = get();
        if (state.gameCompleted) {
          set({ gameStatus: "FINISHED", exploringStory: false });
          return;
        }
        set({
          gameStatus: "BOARD",
          isRolling: false,
          isMoving: false,
          passingPosition: null,
          activeActivity: null,
          exploringStory: false,
        });
      },

      openHowToPlay: () => set({ howToPlayOpen: true }),
      closeHowToPlay: () => set({ howToPlayOpen: false }),
      toggleMute: () => set({ muted: !get().muted }),

      rollDice: () => {
        const state = get();
        if (!canRoll(state)) return;
        const value = rollDie(gameSettings.diceMin, gameSettings.diceMax);
        const path = computeMovePath(state.currentPosition, value);
        set({
          diceValue: value,
          isRolling: true,
          gameStatus: "ROLLING",
          movePath: path,
          overshootHint: null,
        });
      },

      beginMove: () => {
        const state = get();
        if (!state.isRolling) return;
        if (state.movePath.length === 0) {
          set({
            isRolling: false,
            isMoving: false,
            gameStatus: "BOARD",
            overshootHint: overshootMessage(state.currentPosition),
          });
          return;
        }
        set({
          isRolling: false,
          isMoving: true,
          gameStatus: "MOVING",
          overshootHint: null,
        });
      },

      stepTo: (position) => {
        const state = get();
        set({
          previousPosition: state.currentPosition,
          currentPosition: position,
          passingPosition: position,
        });
      },

      land: () => {
        const state = get();
        const pos = state.currentPosition;
        set({
          isMoving: false,
          passingPosition: null,
          gameStatus: "LANDING",
          activeActivity: pos,
        });
      },

      startActivity: () => {
        const state = get();
        if (!state.activeActivity) return;
        set({
          gameStatus: "ACTIVITY",
          lastWasReplay: state.completedSpaces.includes(state.activeActivity),
        });
      },

      skipActivity: () => {
        if (get().exploringStory) {
          set({
            gameStatus: "FINISHED",
            exploringStory: true,
            activeActivity: null,
            isRolling: false,
            isMoving: false,
          });
          return;
        }
        set({
          gameStatus: "BOARD",
          activeActivity: null,
          isRolling: false,
          isMoving: false,
        });
      },

      completeAboutSpace: () => {
        const state = get();
        const spaceId = state.activeActivity;
        if (!spaceId) {
          set({ gameStatus: "BOARD", isRolling: false, isMoving: false });
          return;
        }
        if (state.exploringStory) {
          set({
            gameStatus: "FINISHED",
            exploringStory: true,
            activeActivity: null,
            isRolling: false,
            isMoving: false,
          });
          return;
        }
        const replay = state.completedSpaces.includes(spaceId);
        set({
          gameStatus: "BOARD",
          activeActivity: null,
          isRolling: false,
          isMoving: false,
          activityScore: 0,
          completedSpaces: replay
            ? state.completedSpaces
            : [...state.completedSpaces, spaceId],
        });
      },

      completeActivity: (score) => {
        const state = get();
        const spaceId = state.activeActivity;
        if (!spaceId) return;
        const replay = state.completedSpaces.includes(spaceId);
        const earned = replay ? 0 : Math.max(0, score);
        if (state.exploringStory) {
          set({
            totalScore: state.totalScore,
            activityScore: 0,
            lastWasReplay: true,
            gameStatus: "FINISHED",
            exploringStory: true,
            activeActivity: null,
          });
          return;
        }
        set({
          totalScore: state.totalScore + earned,
          activityScore: earned,
          completedSpaces: replay
            ? state.completedSpaces
            : [...state.completedSpaces, spaceId],
          lastWasReplay: replay,
          gameStatus: "ACTIVITY_COMPLETE",
        });
      },

      returnToBoard: () => {
        const state = get();
        if (
          state.currentPosition === LAST_SPACE &&
          state.completedSpaces.includes(LAST_SPACE)
        ) {
          set({
            previousPosition: state.currentPosition,
            currentPosition: FINISH_POSITION,
            passingPosition: FINISH_POSITION,
            isMoving: true,
            gameStatus: "MOVING",
            activeActivity: null,
            movePath: [FINISH_POSITION],
          });
          return;
        }
        set({
          gameStatus: "BOARD",
          activeActivity: null,
          activityScore: 0,
        });
      },

      arriveAtFinish: () => {
        if (get().currentPosition !== FINISH_POSITION) return;
        get().finishGame();
      },

      finishGame: () =>
        set({
          gameStatus: "FINISHED",
          gameCompleted: true,
          isMoving: false,
          passingPosition: null,
          finishedAt: get().finishedAt ?? Date.now(),
          currentPosition: FINISH_POSITION,
        }),

      playAgain: () =>
        set({
          ...initialPlayState,
          gameStatus: "BOARD",
          gameStarted: true,
          startedAt: Date.now(),
          hasSave: true,
          muted: get().muted,
        }),

      openStoryExplorer: () => set({ exploringStory: true }),
      closeStoryExplorer: () =>
        set({ exploringStory: false, activeActivity: null, gameStatus: "FINISHED" }),

      openAboutSpace: (spaceId) =>
        set({
          exploringStory: true,
          activeActivity: spaceId,
          gameStatus: "ACTIVITY",
          lastWasReplay: true,
        }),
    }),
    {
      name: "personal-board-game",
      storage: createJSONStorage(() => safeStorage()),
      skipHydration: true,
      partialize: (state) => ({
        currentPosition: state.currentPosition,
        totalScore: state.totalScore,
        completedSpaces: state.completedSpaces,
        gameStarted: state.gameStarted,
        gameCompleted: state.gameCompleted,
        startedAt: state.startedAt,
        finishedAt: state.finishedAt,
        hasSave: state.gameStarted,
        muted: state.muted,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.isRolling = false;
        state.isMoving = false;
        state.passingPosition = null;
        state.activeActivity = null;
        state.howToPlayOpen = false;
        state.exploringStory = false;
        state.movePath = [];
        state.overshootHint = null;
        if (state.gameCompleted) {
          state.gameStatus = "START_SCREEN";
        } else if (state.gameStarted) {
          state.gameStatus = "START_SCREEN";
        } else {
          state.gameStatus = "START_SCREEN";
        }
      },
    },
  ),
);
