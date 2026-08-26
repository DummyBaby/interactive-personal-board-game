export type GameStatus =
  | "START_SCREEN"
  | "BOARD"
  | "ROLLING"
  | "MOVING"
  | "LANDING"
  | "ACTIVITY"
  | "ACTIVITY_COMPLETE"
  | "FINISHED";

export type SpaceCategory = "game" | "about";

export type SpaceType =
  | "quiz"
  | "school"
  | "hobby"
  | "memory"
  | "journey"
  | "wouldYouRather"
  | "achievement"
  | "passions"
  | "finalQuiz"
  | "mystery";

export type BoardSpace = {
  id: number;
  title: string;
  category: SpaceCategory;
  type: SpaceType;
  description: string;
  prompt: string;
  maxScore: number;
};

export type QuizQuestionType = "multipleChoice" | "trueFalse" | "oneWord";

export type QuizQuestion = {
  id: number;
  question: string;
  type: QuizQuestionType;
  options?: string[];
  correctAnswer: string;
};

export type HobbyClue = {
  id: number;
  text: string;
};

export type MemoryItem = {
  id: string;
  label: string;
  emoji: string;
};

export type MemoryQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type WouldYouRatherQuestion = {
  id: number;
  prompt: string;
  a: string;
  b: string;
  answer: "a" | "b";
};

export type TimelineEntry = {
  id: string;
  title: string;
  period: string;
  description: string;
};

export type SchoolSection = {
  id: string;
  title: string;
  description: string;
  detail?: string;
};

export type AchievementBeat = {
  id: string;
  title: string;
  body: string;
  stat?: { label: string; value: string };
};

export type Passion = {
  id: string;
  title: string;
  why: string;
  meaning: string;
  extra: string;
  emoji: string;
};

export type MysteryQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type BoardStop = {
  id: number;
  x: number;
  y: number;
  kind: "start" | "space" | "finish";
};

