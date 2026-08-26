export function rollDie(min = 1, max = 6): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const DICE_ROLL_MS = 1100;
export const TOKEN_STEP_MS = 420;
