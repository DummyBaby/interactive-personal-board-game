import { gameSettings } from "@/data/gameSettings";
import type { GameStatus } from "@/types/game";

export { gameSettings };

export const START_POSITION = 0;
export const LAST_SPACE = gameSettings.lastSpace;
export const FINISH_POSITION = gameSettings.finishPosition;
export const MAX_GAME_SCORE = 1000;

export function computeMovePath(from: number, steps: number): number[] {
  const dest = from + steps;
  if (dest > LAST_SPACE) {
    return [];
  }

  const path: number[] = [];
  for (let pos = from + 1; pos <= dest; pos += 1) {
    path.push(pos);
  }
  return path;
}

export function overshootMessage(position: number, lastSpace = LAST_SPACE): string {
  const needed = lastSpace - position;
  if (needed <= 1) {
    return "Il faut faire 1 pour avancer.";
  }
  return `Il faut un ${needed} ou moins pour avancer.`;
}

export function canRoll(input: {
  gameStatus: GameStatus;
  isRolling: boolean;
  isMoving: boolean;
  currentPosition: number;
  gameCompleted: boolean;
}): boolean {
  return (
    input.gameStatus === "BOARD" &&
    !input.isRolling &&
    !input.isMoving &&
    !input.gameCompleted &&
    input.currentPosition < LAST_SPACE
  );
}

export function scoreForAnswers(correct: number, total: number, maxScore: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * maxScore);
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function knowledgePercent(totalScore: number): number {
  return Math.round((totalScore / MAX_GAME_SCORE) * 100);
}

export function answersMatch(input: string, expected: string): boolean {
  return input.trim().toLowerCase() === expected.trim().toLowerCase();
}
